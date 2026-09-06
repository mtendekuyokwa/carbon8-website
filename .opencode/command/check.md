---
description: Run the full verification pipeline (lint + typecheck + tests + build).
agent: build
---

Run the repo's single consistent-state predicate and report layer by layer:

1. `make check` (L1 `npm run lint` + `npm run typecheck`, L2 `npm test`, L3 `npm run build`).
2. If a layer fails, stop, show the failing output, and suggest the fix. Do not proceed to the next layer.
3. Also run `make check-arch` and report any WHAT/WHY/FIX violations.

$ARGUMENTS
