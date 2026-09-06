# Verification

Single consistent-state predicate: **the repo is consistent when `make check` exits 0.**

## Commands

| Layer | Command | What it proves |
|---|---|---|
| L1 syntax/static | `npm run lint` | ESLint + `react-hooks/recommended-latest`, Tailwind rules |
| L1 types | `npm run typecheck` | `react-router typegen && tsc` (strict, `verbatimModuleSyntax`, `noEmit`) |
| L2 runtime behavior | `npm test` | Jest + jsdom (`app/**/*.test.{ts,tsx}`) |
| L3 system confirmation | `make e2e` | build + prod-server boot + `GET /` 200 smoke (`scripts/e2e-smoke.sh`, `PORT` env, default 3000) |
| Arch boundaries | `make check-arch` | `.harness/arch-rules.json` WHAT/WHY/FIX checks |
| Clean state | `make clean-check` | 5-dimension clock-out gate |

Run `make check` before every commit. Do not proceed to Layer N+1 if Layer N fails.

## Per-feature gate

Never set `feature_list.json` state to `passing` directly — run `make verify-feature F=<id>` (runs that feature's `layers[]` in order, prints `repair` on failure, stamps `evidence` on success).

## E2E rule

Layer 3 (`npm run build` + startup smoke) is required when changes cross component or domain boundaries (e.g. shared component + two features, route + feature + layout).
