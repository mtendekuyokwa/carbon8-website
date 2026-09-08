# PROGRESS.md

## Current State

F09-responsive in progress (state=active): zoom-scaling hack removed from root.tsx, SiteHeader hamburger overlay + responsive desktop pills, footer gutters tightened, home hero/team/carousel/mission/benefits/manifesto reflow at 360px+, About/Blog/Contact containers given mobile px/py steps, hero Contribute CTA fixed /contribute → /contact (dead route), contact checkbox accent-[#c2410c] → accent-ember-deep (arch hex-token rule). L1 lint 0 errors, typecheck pass, L2 26 suites / 65 pass, L3 build pass, e2e smoke PASS (GET / 200). Pre-existing arch note: no-cross-feature-imports flags contact-form → enquiry-cards (same-feature import, in HEAD, rule false positive — structural move out of scope for F09).

## In Progress

- None — F11-mobile-hero landed (verify-feature 4/4 2026-09-08, clean-check 5/5): in-flow mobile hero (no clipping), short mobile sub-copy, dot indicators, full-width 48px primary CTA, stronger mobile scrim, reduced-motion respect, global matchMedia test mock; desktop unchanged.

## Next Steps

- Pick up next not_started feature (F04-communities, F05-climate-finance, or F06-news): set `state=active`, do the work, run `make verify-feature`.
- Consider follow-up structural fix for the pre-existing arch false positive (contact-form → enquiry-cards same-feature import flagged by no-cross-feature-imports rule); needs rule refinement or moving EnquiryCards to shared — separate logical op.
- Commit in small logical units per atomicity rule; do NOT commit stray untracked assets (`public/assets/arial-photograph.*`, `smoke-coming-up.jpg` copies).

## Blockers

- None. Large images (`smoke-coming-up.jpg`, 2.8 MiB) hit jj snapshot limit — consider compressing or gitignoring duplicates (`public/assets/` vs root).
