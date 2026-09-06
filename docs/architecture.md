# Architecture

Router for agent navigation. Full rules live in `CONSTRAINTS.md` (React purity) and `FOLDER_STRUCTURE.md` (Bulletproof layout). This file is the module map.

## System

Carbon8 website is a React Router v8 SSR marketing site (Vite 8, TS 5.9 strict, Tailwind v4 CSS-first, shadcn `base-maia`). No backend; content types in `app/types/` are contracts for future CMS.

## Layer model

```
app/        <- imports from features + shared (routes/, root.tsx)
features/   <- imports from shared only, never other features
shared      <- components/, hooks/, lib/, types/, utils/ (imported by anything)
```

- Routes defined explicitly in `app/routes.ts`; page components in `app/routes/` use `./+types/<name>`.
- `~/` maps to `app/` (tsconfig + Vite). Always use `~/` for app imports.
- shadcn primitives in `app/components/ui/` via `npx shadcn add`. Styling via `cn()` from `~/lib/utils`.
- No barrel files (`index.ts` re-exports forbidden — breaks tree-shaking).
- No cross-feature imports. Compose in routes/shared instead.

## Features (sitemap → folder)

`home`, `about`, `projects`, `communities`, `climate-finance`, `news`, `contact` under `app/features/<name>/{components,hooks,types,utils,api,assets}/`.

## Content rules (pre-launch)

Forward-looking copy only. No invented stats/testimonials/logos. `StatBlock` stays hidden. Project status is `concept`/`in_development` only. Photos → brand-coloured block or line-art icon.

## Enforcement

`make check-arch` enforces the above. Every new code-review error category becomes a rule in `.harness/arch-rules.json` (review-to-automation promotion).
