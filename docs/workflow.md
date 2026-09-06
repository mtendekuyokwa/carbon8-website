# Workflow

## Clock-in (before touching code)

1. Read `PROGRESS.md` (Current State + Next Steps).
2. Run `make check` to confirm green baseline.
3. Read `feature_list.json`; activate at most one feature (`WIP=1`).

## Clock-out (before closing)

1. Run `make clean-check` (build, tests, feature list, debug artifacts, startup path).
2. Update `PROGRESS.md` Current State + Next Steps.
3. Update `docs/quality-document.md` for the module touched (A/B/C/D per dimension).
4. Run `make check`; commit one logical operation with WHY message.

## State machine

`not_started → active → passing`. No skipping. Only the harness (`verify-feature`) moves to `passing`.

## WIP=1

Only one feature may have `state=active` at a time. Complete and verify to `passing` before activating the next. VCR = passing / activated must stay 1.0 (`make vcr`).

## Definition of Done

A task is complete when runtime evidence passes — not when code is written or the agent is confident. All layers pass, app reaches ready state, side effects correct, no debug artifacts (`console.log`, `debugger`, `.only`, stray files).

## Context anxiety

If running low on context, do NOT rush to finish — stop, update `PROGRESS.md`, commit a clean checkpoint.

## Commits

One logical operation per commit; repo consistent (`make check` exits 0) after every commit. Messages explain WHY, not just what.

## Observability

Sprint contract (`templates/sprint-contract.md`) before each feature, `session-trace` events during verification, rubric scoring (`templates/evaluator-rubric.md` — every dimension must reach B or above) after completion.

## Cleanup (dual-mode)

Immediate cleanup at every session end + periodic (weekly/monthly) full-system sweep for structural drift.
