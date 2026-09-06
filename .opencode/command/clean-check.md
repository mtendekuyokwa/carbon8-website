---
description: Clock-out gate — build, tests, feature list, debug artifacts, startup path.
agent: build
---

1. Run `make clean-check` (5 dimensions in `templates/clean-state-checklist.md`).
2. If green: update `PROGRESS.md` Current State + Next Steps and `docs/quality-document.md` for the touched module.
3. Then run `make check`. Commit only when both pass, with a WHY message.
