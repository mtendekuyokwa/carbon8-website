#!/usr/bin/env bash
# e2e-smoke.sh — build + boot prod server + HTTP smoke check. Required when
# changes cross component/domain boundaries (docs/workflow.md E2E rule).
set -euo pipefail
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"
PORT="${PORT:-3000}"
npm run build >/dev/null 2>&1
(PORT="$PORT" npm run start >/tmp/e2e-server.log 2>&1 & echo $! > /tmp/e2e-server.pid)
trap 'kill "$(cat /tmp/e2e-server.pid)" 2>/dev/null || true; pkill -f "react-router-serve ./build/server" 2>/dev/null || true; rm -f /tmp/e2e-server.pid' EXIT
for _ in $(seq 1 30); do
  if curl -sf "http://localhost:$PORT/" >/dev/null 2>&1; then
    echo "e2e smoke: PASS (GET / → 200 on port $PORT)"
    exit 0
  fi
  sleep 1
done
echo "e2e smoke: FAIL (no 200 from http://localhost:$PORT/ within 30s; see /tmp/e2e-server.log)"
exit 1
