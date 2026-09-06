#!/usr/bin/env bash
# vcr.sh — print VCR ratio: passing / activated (active+passing).
set -euo pipefail
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FL="$REPO/feature_list.json"
if command -v jq >/dev/null 2>&1; then
  active=$(jq '[.[] | select(.state=="active")] | length' "$FL")
  passing=$(jq '[.[] | select(.state=="passing")] | length' "$FL")
else
  active=$(grep -c '"state"[[:space:]]*:[[:space:]]*"active"' "$FL" 2>/dev/null || true)
  passing=$(grep -c '"state"[[:space:]]*:[[:space:]]*"passing"' "$FL" 2>/dev/null || true)
fi
activated=$((active + passing))
if [[ $activated -eq 0 ]]; then echo "VCR: 1.0 (0 activated — OK to activate first feature)"; exit 0; fi
echo "VCR: $passing/$activated (active=$active passing=$passing)"
[[ $active -eq 0 ]]
