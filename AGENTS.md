# carbon8-website

React Router v8 (SSR) + Vite 8 + TypeScript 5.9 + Tailwind CSS v4 + shadcn/ui.

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` (port 5173) |
| Typecheck | `npm run typecheck` (runs `react-router typegen && tsc`) |
| Build | `npm run build` |
| Serve prod | `npm run start` |
| Lint | `npm run lint` |

No format or test scripts are configured. Lint is configured: `npm run lint` (ESLint 9 flat config with `eslint-plugin-react-hooks` recommended rules). There is no Prettier config.

## Path alias

`~/` maps to `app/` (configured in `tsconfig.json` and Vite). Always use `~/` for app imports.

## Route definitions

Routes are defined explicitly in `app/routes.ts` (not file-convention based). Each route file lives in `app/routes/` and uses generated types from `./+types/<name>`.

## Styling

- Tailwind CSS v4 — uses CSS-first config in `app/app.css` (no `tailwind.config.js`).
- shadcn/ui with `base-maia` style and `@base-ui/react` primitives.
- Add components via `npx shadcn add <component>`.
- Utility: `cn()` from `~/lib/utils` (clsx + tailwind-merge).

## Key directories

```
app/
  routes.ts          # route config
  root.tsx           # HTML shell, error boundary
  app.css            # Tailwind + theme tokens
  lib/utils.ts       # cn() helper
  components/ui/     # shadcn UI components
```

## TypeScript

- `strict: true`, `verbatimModuleSyntax: true`, `noEmit: true`.
- Generated route types live in `.react-router/types/`.
- `npm run typecheck` must run `react-router typegen` first to regenerate these before `tsc`.

## Version control

Repo uses **Jujutsu (jj)** with a git backend. `.jj/` is the jj state directory.

## Deployment

Production build outputs to `build/` (client + server). Dockerfile uses multi-stage build with `node:24-alpine`. Production serve: `npm run start` via `@react-router/serve`.
