import { Link } from "react-router";
import { ResponsivePicture } from "~/components/responsive-picture";
import { TagChip } from "~/components/tag-chip";
import type { BlogPostMeta } from "~/lib/blog.server";

// Explicit per-article covers so every note has a distinct, thematically
// fitting image. These also back the blurred hero in
// `app/routes/blog.$slug.tsx` via `coverFor`.
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

export function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  const cover = coverFor(post, index);
  return (
    <article className="group grid overflow-hidden border border-sand bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--color-bark)_35%,transparent)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Link
        to={`/blog/${post.slug}`}
        className="relative block min-h-[147px] overflow-hidden md:min-h-full"
        tabIndex={-1}
      >
        <ResponsivePicture
          src={cover}
          sizes="(min-width: 768px) 480px, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span aria-hidden className="absolute inset-0 bg-bark/10" />
        {post.tags?.[0] ? (
          <span className="absolute top-4 left-4">
            <TagChip label={post.tags[0]} tone="green" />
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-ember-deep uppercase">
          {post.date}
          {post.status ? ` · ${post.status.replace("_", " ")}` : ""}
        </p>
        <h2 className="font-heading mt-3 text-2xl leading-snug font-semibold text-bark">
          <Link to={`/blog/${post.slug}`} className="transition-colors group-hover:text-ember">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-[10px] leading-relaxed text-bark/70">
          {post.description}
        </p>
        {post.tags && post.tags.length > 1 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(1, 4).map((tag) => (
              <TagChip key={tag} label={`#${tag}`} tone="sand" />
            ))}
          </div>
        ) : null}
        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold tracking-wide text-ember-deep uppercase"
        >
          Read note
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
