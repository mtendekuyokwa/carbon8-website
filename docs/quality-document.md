# Quality Document

Module health scores (A/B/C/D per dimension: correctness, arch compliance, test coverage, verification evidence, docs freshness). New sessions read this to prioritize.

| Module | Correctness | Arch | Tests | Evidence | Docs | Notes |
|---|---|---|---|---|---|---|
| `app/routes/` | A | A | B | A | B | home route composes hero/team/benefits; `home.test.tsx` + e2e GET / 200 |
| `app/features/*` | A | A | B | A | B | home reworked to Pelmatech layout (hero/team-section/benefits + tests); carousel data in feature, mechanics in shared; 6 features still unpopulated pre-launch |
| `app/components/` | A | A | A | A | B | AnimatedHeading/Text/MaskedImage + SiteHeader + TeamCarousel with tests; 44/44 green, verify-feature F01 4/4 |
| `app/hooks/` | A | A | A | A | A | `CONSTRAINTS.md` contracts + `__tests__/` enforced |
| `app/lib/,utils/,types/` | A | A | B | B | B | `cn()`, shared types as CMS contracts |

Update the row you touched on every clock-out.
