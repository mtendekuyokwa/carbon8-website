# DECISIONS.md

Architectural decisions with rationale (newest last).

## D01 — React Router v8 SSR + Vite 8 + TS strict

- Decision: Build marketing site on React Router v8 framework mode (SSR), Vite 8, TypeScript 5.9 `strict` + `verbatimModuleSyntax` + `noEmit`.
- Why: SSR for content/SEO, typegen route safety, single Vite toolchain.
- Date: 2026-09-01.

## D02 — Tailwind v4 CSS-first + shadcn `base-maia`

- Decision: Theme tokens in `app/app.css`; shadcn primitives via `@base-ui/react`.
- Why: No `tailwind.config.js` drift; brand system in `DESIGN.md` maps to CSS tokens.
- Date: 2026-09-01.

## D03 — Bulletproof layout under `app/` (= `src/`)

- Decision: `app/{routes,features,components,hooks,lib,types,utils}`; no barrel files; no cross-feature imports.
- Why: Tree-shaking, unidirectional `shared → features → app` flow (see `FOLDER_STRUCTURE.md`).
- Date: 2026-09-02.

## D04 — `~/` path alias

- Decision: `~/` maps to `app/` in tsconfig + Vite; mandatory for app imports.
- Why: Stable imports across routes/features; enforced by `check-arch`.
- Date: 2026-09-03.

## D05 — Rules of React as bugs

- Decision: Purity + hooks rules enforced via `eslint-plugin-react-hooks recommended-latest`; only two sanctioned disables (`usePrevious` refs read, `useIntersectionObserver` threshold key).
- Why: SSR + StrictMode surface violations; lint is authoritative (see `CONSTRAINTS.md`).
- Date: 2026-09-03.

## D06 — Pre-launch honesty

- Decision: Forward-looking copy; no invented stats/testimonials/logos; projects stay `concept`/`in_development`.
- Why: No verified impact data yet; enforced by `check-arch`.
- Date: 2026-09-06.
