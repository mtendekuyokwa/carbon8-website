#!/usr/bin/env bash
# verify-feature.sh — harness gate: run a feature's layers in order, print repair on failure.
# Usage: bash scripts/verify-feature.sh F01-home
set -euo pipefail
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"
F="${1:-${F:-}}"
if [[ -z "$F" ]]; then echo "Usage: make verify-feature F=<id>"; exit 2; fi
FL="$REPO/feature_list.json"
if ! command -v jq >/dev/null 2>&1; then echo "jq is required (npm i -g jq or apt install jq)"; exit 2; fi
if ! jq -e --arg f "$F" '.[] | select(.id==$f)' "$FL" >/dev/null; then echo "Feature $F not found in feature_list.json"; exit 2; fi

current="$(jq -r --arg f "$F" '.[] | select(.id==$f) | .state' "$FL")"
if [[ "$current" == "passing" ]]; then echo "Feature $F is already passing (evidence: $(jq -r --arg f "$F" '.[] | select(.id==$f) | .evidence' "$FL"))"; exit 0; fi
if [[ "$current" != "active" ]]; then
  echo "Refusing: $F has state '$current' — activate it first (not_started → active → passing, no skipping)."
  echo "How to fix: set state to active in feature_list.json, do the work, then re-run verification."
  exit 2
fi

run_layer() {
  local label="$1" cmd="$2" repair="$3"
  echo "▶ $label: $cmd"
  if bash -c "$cmd" 2>&1; then echo "  ✓ $label passed"; return 0; fi
  echo "  ✗ $label FAILED"
  echo "  How to fix: $repair"
  return 1
}

count=$(jq --arg f "$F" '[.[] | select(.id==$f) | .layers[]] | length' "$FL")
i=0
while [[ $i -lt $count ]]; do
  label=$(jq -r --arg f "$F" --argjson i "$i" '[.[] | select(.id==$f) | .layers[$i] | .label] | first' "$FL")
  cmd=$(jq -r --arg f "$F" --argjson i "$i" '[.[] | select(.id==$f) | .layers[$i] | .cmd] | first' "$FL")
  repair=$(jq -r --arg f "$F" --argjson i "$i" '[.[] | select(.id==$f) | .layers[$i] | .repair] | first' "$FL")
  if ! run_layer "$label" "$cmd" "$repair"; then
    echo "verify-feature $F: FAILED at $label"
    bash "$REPO/scripts/session-trace.sh" event "verify-feature $F failed: $label" 2>/dev/null || true
    exit 1
  fi
  i=$((i+1))
done

evidence="verified $(date -u +%Y-%m-%d), layers $count/$count pass"
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT
jq --arg f "$F" --arg e "$evidence" 'map(if .id==$f then .state="passing" | .evidence=$e else . end)' "$FL" > "$tmp" && mv "$tmp" "$FL"
trap - EXIT
echo "verify-feature $F: PASSING ($evidence)"
bash "$REPO/scripts/session-trace.sh" event "verify-feature $F passing" 2>/dev/null || true
