# PROGRESS.md

## Current State

F05-climate-finance redesign (user feedback: first version too basic/templated, copied About layout). New design: hero is a 'jargon translator' — six real terms (Additionality, Baseline, MRV, Leakage, Permanence, Benefit sharing) set as large muted display type, an ember strike draws through each on load (single orchestrated motion, respects reduced-motion), plain question appears beneath; sticky left column holds h1 + concept-stage note. Middle: 'How a carbon credit is made' 6-step track (genuine sequence) with 'We are here' pin on step 1 (aria-current=step) and dashed ember return arc Share→Listen ('Step six is agreed in step one'). FAQ split by who is asking (land / funders) with restyled shared FAQAccordion (borderless, ember plus→cross). Closing bg-deep band 'Found a word we haven't explained?' + DualCTA. Removed eyebrows/cards/CTA box. 28 suites / 82 tests, clean-check 5/5, Playwright 390/1440 0 overflow 0 page errors, screenshots reviewed.

F05-climate-finance (not_started → active → passing via `make verify-feature`): new `/climate-finance` route — hero (h1) + 4-point plain-language explainer (what climate finance is, carbon markets, communities first, where Carbon8 is today) + 6-item FAQ + CTA to /contact. Copy reuses existing site messaging; no stats/claims, explicitly states concept stage (test asserts no `%`/`$`/tonnes). Added shared `FAQAccordion` (`app/components/faq-accordion.tsx`) on shadcn `ui/accordion` (base-ui; generator's bad `cn` import fixed to `~/lib/utils`, its stray `cn` npm dep reverted). Nav: Climate Finance between About and Field Notes in header + footer. Evidence: lint/typecheck clean, 28 suites / 80 tests, build pass, prod server GET /climate-finance 200, Playwright 360/390/768/1024/1440: 0 horizontal overflow, 0 4xx, 0 page errors, FAQ toggles, nav aria-current=page, header nav no overflow at 768.

Previous: F09-responsive completion (state=passing → extended): mobile device-driven audit (Playwright, 360/390/768 px, scrolled, all 6 routes) now passes with no horizontal overflow, no image-load failures, no small tap targets, and no 4xx asset requests. Root-caused and fixed a real mobile image deadlock: MaskedImage's initial `clip-path: inset(100% 0 0 0)` collapsed the wrapper's IntersectionObserver rect to 0x0 on narrow layouts, so `whileInView` never fired AND native `loading="lazy"` never started on phones (team/benefits photos stayed hidden + never fetched on mobile emulations; desktop masked it). Fix: observe the unclipped outer wrapper (useInView, once, -80px vertical margin) and clip an inner motion.div; image loads eagerly (zero-area ancestors block native lazy). MaskedImage now delegates to ResponsivePicture (blur-up + webp twins) and accepts imgProps so the team carousel's `object-top` portrait crop actually reaches the `<img>`. Generated missing webp twins (`patrick.webp`, `tawina.webp`, committed existing `arial-photograph-1920.webp` that ResponsivePicture derives from srcSet — previously a 404 risk in prod). Tap targets: hero slide dots 24→27px hit area (size-9), consent checkbox 15→24px (size-8 — note 75% root scale). Blog-card mobile image band 147px→176/208px. Lint 0 errors/warnings, typecheck pass, L2 26 suites / 75 tests pass, L3 build pass, clean-check green at clock-out.

## In Progress

- None.

## Next Steps

- Pick up next not_started feature (F04-communities or F06-news): set `state=active`, do the work, run `make verify-feature`. F06 overlaps the existing Field Notes blog — decide whether News is separate before building.
- Optional: reuse `FAQAccordion` on Contact (FOLDER_STRUCTURE lists it there).
- Consider follow-up structural fix for the pre-existing arch false positive (contact-form → enquiry-cards same-feature import flagged by no-cross-feature-imports rule); needs rule refinement or moving EnquiryCards to shared — separate logical op.
- Optional follow-up: re-encode `arial-photograph-1920.webp` (1.05 MB) if the about image's 40vw column grows; the `-960` twin already exists.
- Keep the /tmp mobile-audit harness in mind as a review gate for future features; consider promoting it into `scripts/` + a Make target during a clean session.

## Blockers

- None. `public/assets/arial-photograph.jpg` (4536×8064 original, ~2.8 MiB) stays untracked per snapshot-limit note; only the 960/1920 twins are referenced by code.
