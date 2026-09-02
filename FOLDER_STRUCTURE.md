# Folder Structure

This project follows the [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) architecture. The `app/` directory is the equivalent of `src/` — all application code lives here.

## Top-level layout

```
app/
+-- routes             # React Router route config & page components
|   +-- home.tsx
|   +-- about.tsx
|   +-- projects.tsx
|   +-- communities.tsx
|   +-- climate-finance.tsx
|   +-- news.tsx
|   +-- contact.tsx
|
+-- components         # shared UI components (used across features)
|   +-- ui/            # shadcn/ui primitives (button, accordion, etc.)
|   +-- layout/        # header, footer, navigation, CTASection
|
+-- features           # feature-based modules (primary code location)
|
+-- hooks              # shared hooks
|
+-- lib                # reusable, preconfigured libraries (e.g. cn())
|
+-- types              # shared TypeScript types (Project, TeamMember, etc.)
|
+-- utils              # shared utility functions
|
+-- assets             # static assets (images, fonts, etc.)
|
+-- app.css            # Tailwind CSS v4 entry + brand tokens
+-- root.tsx           # HTML shell, global providers, error boundary
+-- routes.ts          # React Router route definitions
```

## Features (mapped to sitemap)

Each page gets its own feature folder. Only include subdirectories that the feature actually needs.

```
app/features/
+-- home/               # Home page
+-- about/              # About Us (Our Story, Our Approach, Our Values)
+-- projects/           # Our Projects (category overview)
+-- communities/        # Communities & Impact
+-- climate-finance/    # Climate Finance explainer + FAQ
+-- news/               # News & Updates
+-- contact/            # Contact form + info
```

### Feature internal structure

```
app/features/<feature-name>/
+-- api/         # exported API request declarations & API hooks
+-- assets/      # static assets specific to this feature
+-- components/  # components scoped to this feature
+-- hooks/       # hooks scoped to this feature
+-- types/       # TypeScript types used within this feature
+-- utils/       # utility functions for this feature
```

Example — the `about` feature:

```
app/features/about/
+-- components/
|   +-- team-member-card.tsx    # name + role + optional photo/bio
|   +-- values-section.tsx
|   +-- approach-section.tsx
|   +-- story-section.tsx
+-- types/
|   +-- index.ts                # exports TeamMember type
```

Example — the `projects` feature:

```
app/features/projects/
+-- components/
|   +-- project-card.tsx        # title, description, status tag, optional link
|   +-- category-overview.tsx
|   +-- project-steps.tsx       # numbered steps "how we choose projects"
+-- types/
|   +-- index.ts                # exports Project type
```

Example — the `news` feature:

```
app/features/news/
+-- components/
|   +-- news-card.tsx           # title, date, excerpt, link
|   +-- news-feed.tsx           # reverse-chronological list
+-- types/
|   +-- index.ts                # exports NewsPost type
```

## Shared components

Reusable components that appear across multiple pages live in `app/components/`.

| Component | Location | Used on |
|---|---|---|
| `PrincipleCard` | `components/` | Home, About |
| `CTASection` | `components/layout/` | Most pages |
| `FAQAccordion` | `components/` | Climate Finance, Contact |
| `StatBlock` | `components/` | Communities (future) |
| `Header` / `Footer` | `components/layout/` | All pages (root.tsx) |

shadcn/ui primitives go in `components/ui/`. Add via `npx shadcn add <component>`.

## Content data shapes

Shared types live in `app/types/`. These define the data contracts for future CMS integration.

```ts
// app/types/project.ts
type Project = {
  id: string;
  title: string;
  category: "afforestation" | "reforestation" | "other";
  status: "concept" | "in_development" | "active" | "complete";
  summary: string;
  body?: string;
  images?: string[];
  location?: string;
};

// app/types/team.ts
type TeamMember = {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
  bio?: string;
};

// app/types/news.ts
type NewsPost = {
  id: string;
  title: string;
  date: string; // ISO 8601
  excerpt: string;
  body: string;
  imageUrl?: string;
};

// app/types/contact.ts
type ContactSubmission = {
  name: string;
  email: string;
  role: "community" | "partner" | "funder" | "other";
  message: string;
};
```

## Content rules (pre-launch)

Carbon8 has no completed projects, photos, or verified impact data yet. Enforce these in code:

- Use forward-looking language in copy ("we are developing...", "our approach is...").
- Do not invent statistics, testimonials, or partner logos.
- `StatBlock` and testimonial components exist in codebase but stay **unpopulated/hidden** until real data.
- Where a photo would go, use a brand-coloured block or line-art icon.
- Project cards use `status: "concept"` or `"in_development"` — never `"active"` or `"complete"` until verified.

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
