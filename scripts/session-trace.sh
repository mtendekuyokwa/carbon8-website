#!/usr/bin/env bash
# session-trace.sh — append structured JSONL runtime signals.
# Usage: bash scripts/session-trace.sh start "msg..." | end "msg..." | event "msg..."
set -euo pipefail
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TRACE_DIR="$REPO/.harness/traces"
mkdir -p "$TRACE_DIR"
FILE="$TRACE_DIR/traces.jsonl"
kind="${1:-event}"; shift || true
msg="$*"
ts="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
commit="$(git -C "$REPO" rev-parse --short HEAD 2>/dev/null || echo unknown)"
jq -c -n --arg ts "$ts" --arg kind "$kind" --arg msg "$msg" --arg commit "$commit" \
  '{ts:$ts,kind:$kind,msg:$msg,commit:$commit}' >> "$FILE"
echo "traced: [$kind] $msg"
