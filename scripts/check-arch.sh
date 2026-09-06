#!/usr/bin/env bash
# check-arch.sh — run .harness/arch-rules.json, output WHAT/WHY/FIX on violations.
# Each rule declares `expect`: "empty" (check output must be empty) or "non-empty".
set -euo pipefail
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RULES="$REPO/.harness/arch-rules.json"
fail=0
if ! command -v jq >/dev/null 2>&1; then echo "jq is required for check-arch"; exit 2; fi
n=$(jq '.rules | length' "$RULES")
for ((i=0;i<n;i++)); do
  id=$(jq -r ".rules[$i].id" "$RULES")
  desc=$(jq -r ".rules[$i].description" "$RULES")
  check=$(jq -r ".rules[$i].check" "$RULES")
  expect=$(jq -r ".rules[$i].expect // \"empty\"" "$RULES")
  what=$(jq -r ".rules[$i].what" "$RULES")
  why=$(jq -r ".rules[$i].why" "$RULES")
  fix=$(jq -r ".rules[$i].fix" "$RULES")
  out=$(cd "$REPO" && bash -c "$check" 2>&1 || true)
  violated=0
  if [[ "$expect" == "empty" && -n "$out" ]]; then violated=1; fi
  if [[ "$expect" == "non-empty" && -z "$out" ]]; then violated=1; fi
  if [[ $violated -eq 1 ]]; then
    echo "✗ [$id] $desc"
    echo "  WHAT: $what"
    echo "  WHY: $why"
    echo "  FIX: $fix"
    echo "  Evidence:"; echo "$out" | head -10 | sed 's/^/    /'
    fail=1
  else
    echo "✓ [$id] $desc"
  fi
done
exit $fail
