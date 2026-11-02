# PROGRESS.md

## Current State

F09-responsive completion (state=passing → extended): mobile device-driven audit (Playwright, 360/390/768 px, scrolled, all 6 routes) now passes with no horizontal overflow, no image-load failures, no small tap targets, and no 4xx asset requests. Root-caused and fixed a real mobile image deadlock: MaskedImage's initial `clip-path: inset(100% 0 0 0)` collapsed the wrapper's IntersectionObserver rect to 0x0 on narrow layouts, so `whileInView` never fired AND native `loading="lazy"` never started on phones (team/benefits photos stayed hidden + never fetched on mobile emulations; desktop masked it). Fix: observe the unclipped outer wrapper (useInView, once, -80px vertical margin) and clip an inner motion.div; image loads eagerly (zero-area ancestors block native lazy). MaskedImage now delegates to ResponsivePicture (blur-up + webp twins) and accepts imgProps so the team carousel's `object-top` portrait crop actually reaches the `<img>`. Generated missing webp twins (`patrick.webp`, `tawina.webp`, committed existing `arial-photograph-1920.webp` that ResponsivePicture derives from srcSet — previously a 404 risk in prod). Tap targets: hero slide dots 24→27px hit area (size-9), consent checkbox 15→24px (size-8 — note 75% root scale). Blog-card mobile image band 147px→176/208px. Lint 0 errors/warnings, typecheck pass, L2 26 suites / 75 tests pass, L3 build pass, clean-check green at clock-out.

## In Progress

- None.

## Next Steps

- Pick up next not_started feature (F04-communities, F05-climate-finance, or F06-news): set `state=active`, do the work, run `make verify-feature`.
- Consider follow-up structural fix for the pre-existing arch false positive (contact-form → enquiry-cards same-feature import flagged by no-cross-feature-imports rule); needs rule refinement or moving EnquiryCards to shared — separate logical op.
- Optional follow-up: re-encode `arial-photograph-1920.webp` (1.05 MB) if the about image's 40vw column grows; the `-960` twin already exists.
- Keep the /tmp mobile-audit harness in mind as a review gate for future features; consider promoting it into `scripts/` + a Make target during a clean session.

## Blockers

- None. `public/assets/arial-photograph.jpg` (4536×8064 original, ~2.8 MiB) stays untracked per snapshot-limit note; only the 960/1920 twins are referenced by code.
