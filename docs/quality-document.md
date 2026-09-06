# Quality Document

Module health scores (A/B/C/D per dimension: correctness, arch compliance, test coverage, verification evidence, docs freshness). New sessions read this to prioritize.

| Module | Correctness | Arch | Tests | Evidence | Docs | Notes |
|---|---|---|---|---|---|---|
| `app/routes/` | B | B | C | C | B | Route types via `+types`; add route-level tests |
| `app/features/*` | B | B | C | C | B | 7 sitemap features; most unpopulated pre-launch |
| `app/components/` | A | A | B | B | B | shadcn + layout (header/footer/CTA) stable |
| `app/hooks/` | A | A | A | A | A | `CONSTRAINTS.md` contracts + `__tests__/` enforced |
| `app/lib/,utils/,types/` | A | A | B | B | B | `cn()`, shared types as CMS contracts |

Update the row you touched on every clock-out.
