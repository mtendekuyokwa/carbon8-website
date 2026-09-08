# Quality Document

Module health scores (A/B/C/D per dimension: correctness, arch compliance, test coverage, verification evidence, docs freshness). New sessions read this to prioritize.

| Module | Correctness | Arch | Tests | Evidence | Docs | Notes |
|---|---|---|---|---|---|---|
| `app/routes/` | A | A | B | A | B | home route composes hero/team/benefits; `home.test.tsx` + e2e GET / 200 |
| `app/features/*` | A | A | A | A | B | F11 mobile hero rebuild: in-flow layout, dot nav, short mobile copy, 48px CTA, reduced-motion; desktop unchanged; 67/67 green |
| `app/hooks/` | A | A | A | A | A | `CONSTRAINTS.md` contracts + `__tests__/` enforced |
| `app/lib/,utils/,types/` | A | A | B | B | B | `cn()`, shared types as CMS contracts |

Update the row you touched on every clock-out.
