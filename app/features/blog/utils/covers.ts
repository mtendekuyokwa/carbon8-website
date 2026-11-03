import type { BlogPostMeta } from "~/lib/blog.server";

// Explicit per-article covers so every note has a distinct, thematically
// fitting image. Used by the Field Notes index and the post hero.
const COVERS_BY_SLUG: Record<string, string> = {
  "climate-change-in-malawi": "/assets/community-led-960.jpg",
  "geoai-explained": "/assets/arial-photograph-960.jpg",
  "ai-governance-carbon-tokenization": "/assets/verification-ready-960.jpg",
  "we-stopped-talking-about-the-ozone-layer": "/assets/planting-trees-960.jpg",
};

// Rotation for future notes without an explicit cover.
// NOTE: `tree-planting-*` is a misnamed industrial-plant photo —
// do not use it for article covers.
const FALLBACK_COVERS = [
  "/assets/community-led-960.jpg",
  "/assets/collaboration-960.jpg",
  "/assets/planting-trees-960.jpg",
  "/assets/verification-ready-960.jpg",
  "/assets/arial-photograph-960.jpg",
];

export function coverFor(post: BlogPostMeta, index: number): string {
  const explicit = COVERS_BY_SLUG[post.slug];
  if (explicit) return explicit;
  let hash = index;
  for (const ch of post.slug) hash = (hash * 31 + ch.charCodeAt(0)) % 997;
  return FALLBACK_COVERS[hash % FALLBACK_COVERS.length];
}
