# app/ARCHITECTURE.md

Module-level design for `app/` (the entire application layer).

## Role

`app/` owns composition: `routes/` + `root.tsx` import from `features/` and shared (`components/`, `hooks/`, `lib/`, `types/`, `utils/`). It must not contain reusable business logic — that lives in features or shared.

## Route wiring

- `app/routes.ts` is the explicit route config (no file-convention routing).
- Each `app/routes/*.tsx` uses generated types from `./+types/<name>`; regenerate via `react-router typegen` (part of `npm run typecheck`).
- `root.tsx` renders inside `React.StrictMode`, provides HTML shell + error boundary + header/footer.

## Import discipline

- Always `~/...` for app imports. Relative imports only for `./+types` and siblings.
- Never import `app/` from `features/` or shared (flow is one-way down).

## Styling entry

`app/app.css` is the Tailwind v4 CSS-first entry + brand tokens from `DESIGN.md`.
