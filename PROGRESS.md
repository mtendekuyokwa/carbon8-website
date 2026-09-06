# PROGRESS.md

## Current State

Last commit: F01-home landing (TDD, verify-feature 4/4) | `make check`: passing (2026-09-06) | `make check-arch`: 6/6 | `make clean-check`: 5/5 | `make e2e`: PASS (GET / 200) | F01-home: passing (re-verified 2026-09-06 via gate after Pelmatech-layout rework) | F08-hooks-contracts: passing | tests: 18 suites / 44 pass | Home reworked to Pelmatech layout (hero + team carousel + benefits) with Carbon8 copy, remote assets via qclay.design, global SiteHeader + 1728px zoom in root.tsx

## In Progress

- None — F01-home landed via TDD vertical slices (tests-first per tdd skill: red→green per slice, seams at route + section components, no mocks).

## Next Steps

- Activate next feature (F02-about) when ready: set `state=active`, do the work, run `make verify-feature F=F02-about`.
- Commit in small logical units (harness scripts → docs → feature list) per atomicity rule; do NOT commit both `smoke-coming-up.jpg` copies (keep one, compress, or ignore).

## Blockers

- None. Large images (`smoke-coming-up.jpg`, 2.8 MiB) hit jj snapshot limit — consider compressing or gitignoring duplicates (`public/assets/` vs root).
