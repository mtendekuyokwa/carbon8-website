# Quality Document

Module health scores (A/B/C/D per dimension: correctness, arch compliance, test coverage, verification evidence, docs freshness). New sessions read this to prioritize.

| Module | Correctness | Arch | Tests | Evidence | Docs | Notes |
|---|---|---|---|---|---|---|
| `app/routes/` | A | A | B | A | B | home route composes hero/team/benefits; `/climate-finance` route added (F05, prod GET 200); `home.test.tsx` + e2e GET / 200 |
| `app/components/` | A | A | B | B | A | MaskedImage reveal rewritten (unclipped IO pivot + inner clip, eager img — fixes mobile also never-lazy deadlock), delegates to ResponsivePicture (blur-up/webp), imgProps passthrough; device-audit at 360–768 pass. Footer redesigned: newsletter removed, contour-terrain band (generated SVG, decorative, aria-hidden), test asserts no signup form. New shared `FAQAccordion` (+ shadcn `ui/accordion`, base-ui) with toggle test; nav adds Climate Finance (header active-state test) |
| `app/features/*` | A | A | A | A | B | Blog cards → journal entries (lead + dated rows, bylines, single link target; tests for date/byline/no ISO or hashtags). F05-climate-finance redesigned: term→question reference hero (FPIC + integrity criteria, no motion), 6-step credit path with 'We are here' pin + return arc, FAQ grouped by audience; tests cover translator, aria-current step, FAQ groups, no-stats; 28 suites / 82 tests green. F09-responsive done: 0 overflow/0 broken images/0 small taps/0 4xx at 360/390/768 (6 routes); mobile hero dots size-9, consent checkbox size-8, blog-card image band h-44; 26 suites / 75 tests green |
| `app/hooks/` | A | A | A | A | A | `CONSTRAINTS.md` contracts + `__tests__/` enforced |
| `app/lib/,utils/,types/` | A | A | B | B | B | `cn()`, shared types as CMS contracts |

Update the row you touched on every clock-out.
