import { Link } from "react-router";
import { TagChip } from "~/components/tag-chip";
import type { BlogPostMeta } from "~/lib/blog.server";

const COVERS = [
  "/assets/community-led-960.jpg",
  "/assets/collaboration-960.jpg",
  "/assets/verification-ready-960.jpg",
  "/assets/tree-planting-960.jpg",
];

export function coverFor(post: BlogPostMeta, index: number): string {
  let hash = index;
  for (const ch of post.slug) hash = (hash * 31 + ch.charCodeAt(0)) % 997;
  return COVERS[hash % COVERS.length];
}

export function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  const cover = coverFor(post, index);
  return (
    <article className="group grid overflow-hidden border border-[#DED7C8] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(74,54,46,0.35)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Link
        to={`/blog/${post.slug}`}
        className="relative block min-h-[220px] overflow-hidden md:min-h-full"
        aria-label={`Read ${post.title}`}
        tabIndex={-1}
      >
        <img
          src={cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span aria-hidden className="absolute inset-0 bg-[#4A362E]/10" />
        {post.tags?.[0] ? (
          <span className="absolute top-4 left-4">
            <TagChip label={post.tags[0]} tone="green" />
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-[#C46A2E] uppercase">
          {post.date}
          {post.status ? ` · ${post.status.replace("_", " ")}` : ""}
        </p>
        <h2 className="mt-3 text-2xl leading-snug font-semibold text-[#4A362E] [font-family:'Baloo_2',system-ui]">
          <Link to={`/blog/${post.slug}`} className="transition-colors group-hover:text-[#C46A2E]">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#4A362E]/70">
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
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold tracking-wide text-[#C46A2E] uppercase"
          aria-label={`Read ${post.title}`}
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
