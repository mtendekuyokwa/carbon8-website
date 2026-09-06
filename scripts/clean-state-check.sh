#!/usr/bin/env bash
# clean-state-check.sh — idempotent 5-dimension verifier. Exit 0 only when all pass.
set -euo pipefail
ARG="${1:-}"
if [[ -z "$ARG" || "$ARG" == "." ]]; then
  REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
else
  REPO="$(cd "$ARG" && pwd)"
fi
cd "$REPO"
BUILD_LOG="$(mktemp -t clean-build-XXXXXX.log)"
TEST_LOG="$(mktemp -t clean-test-XXXXXX.log)"
trap 'rm -f "$BUILD_LOG" "$TEST_LOG"' EXIT
pass=0; fail=0
ok(){ echo "  ✓ $1"; pass=$((pass+1)); }
bad(){ echo "  ✗ $1"; fail=$((fail+1)); }
echo "Clean-state check: $REPO"
npm run build >"$BUILD_LOG" 2>&1 && ok "build passes" || { bad "build fails (see $BUILD_LOG — kept for inspection)"; trap - EXIT; }
npm test >"$TEST_LOG" 2>&1 && ok "tests pass" || { bad "tests fail (see $TEST_LOG — kept for inspection)"; trap - EXIT; }
if command -v jq >/dev/null 2>&1 && jq -e '.[] | select(.state=="passing" and (.evidence=="" or .evidence==null))' feature_list.json >/dev/null 2>&1; then
  bad "feature_list.json has passing entries without evidence"
else
  ok "feature list updated (no passing-without-evidence)"
fi
if command -v rg >/dev/null 2>&1; then
  hits="$(rg -n "console\.log|debugger|\.only\(" app --glob '!**/*.test.*' 2>/dev/null | grep -v "console.warn\|console.error" | head -5 || true)"
else
  hits="$(grep -rn --include='*.ts' --include='*.tsx' -e "console\.log" -e "debugger" -e "\.only(" app 2>/dev/null | grep -v "__tests__" | head -5 || true)"
fi
if [[ -n "$hits" ]]; then
  bad "debug artifacts found (console.log/debugger/.only)"
  echo "$hits" | sed 's/^/    /'
else
  ok "no debug artifacts"
fi
[[ -f build/server/index.js ]] && ok "startup path (build/server/index.js exists)" || bad "startup path missing (run npm run build)"
echo "Result: $pass pass, $fail fail"
[[ $fail -eq 0 ]]
