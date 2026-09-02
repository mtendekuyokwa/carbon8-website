# Folder Structure

This project follows the [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) architecture. The `app/` directory is the equivalent of `src/` — all application code lives here.

## Top-level layout

```
app/
+-- routes             # React Router route config & page components
|   +-- home.tsx
|   +-- ...
|
+-- components         # shared UI components (used across features)
|   +-- ui/            # shadcn/ui primitives
|
+-- config             # global configuration, exported env variables
|
+-- features           # feature-based modules (primary code location)
|
+-- hooks              # shared hooks
|
+-- lib                # reusable, preconfigured libraries (e.g. cn())
|
+-- stores             # global state stores
|
+-- types              # shared TypeScript types
|
+-- utils              # shared utility functions
|
+-- testing            # test utilities and mocks
|
+-- assets             # static assets (images, fonts, etc.)
|
+-- app.css            # Tailwind CSS v4 entry + theme tokens
+-- root.tsx           # HTML shell, global providers, error boundary
+-- routes.ts          # React Router route definitions
```

## Feature structure

Each feature lives in `app/features/<feature-name>/`. Only include subdirectories that the feature actually needs.

```
app/features/awesome-feature/
+-- api/         # exported API request declarations & API hooks
+-- assets/      # static assets specific to this feature
+-- components/  # components scoped to this feature
+-- hooks/       # hooks scoped to this feature
+-- stores/      # state stores for this feature
+-- types/       # TypeScript types used within this feature
+-- utils/       # utility functions for this feature
```

Example — a "dashboard" feature might look like:

```
app/features/dashboard/
+-- api/
|   +-- use-get-stats.ts
|   +-- use-update-settings.ts
+-- components/
|   +-- stats-card.tsx
|   +-- dashboard-layout.tsx
+-- types/
|   +-- index.ts
```

## Rules

### No barrel files

Do not create `index.ts` barrel files to re-export everything from a feature. Import files directly. Barrel files break Vite tree-shaking and hurt bundle size.

### No cross-feature imports

Features must not import from other features. Compose features at the application level (in routes or shared components) instead.

### Unidirectional data flow

Code flows in one direction: `shared → features → app`

- **Shared** (`components/`, `hooks/`, `lib/`, `types/`, `utils/`) can be used by anything.
- **Features** can import from shared, but not from other features or from `app/`.
- **App** (`routes/`, `root.tsx`) can import from features and shared.

```
┌─────────────────────────────────┐
│              app/               │  ← imports from features + shared
├─────────────────────────────────┤
│          features/              │  ← imports from shared only
├─────────────────────────────────┤
│  components/ hooks/ lib/        │  ← imported by anything
│  types/ utils/                  │
└─────────────────────────────────┘
```

### Centralized API layer (optional)

If multiple features share API calls, keep them in a top-level `app/api/` folder instead of duplicating inside each feature.
