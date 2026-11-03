import { Link } from "react-router";

import { ResponsivePicture } from "~/components/responsive-picture";
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

/** Split an ISO date into journal-style parts. UTC so SSR and client agree. */
function dateParts(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return { day: "", monthYear: iso, full: iso };
  const opts = { timeZone: "UTC" } as const;
  return {
    day: d.toLocaleDateString("en-GB", { ...opts, day: "numeric" }),
    monthYear: d.toLocaleDateString("en-GB", { ...opts, month: "short", year: "numeric" }),
    full: d.toLocaleDateString("en-GB", { ...opts, day: "numeric", month: "long", year: "numeric" }),
  };
}

/** Small portrait twin (`-128`) when the author photo is a known jpg. */
function avatarFor(src?: string) {
  return src?.replace(/\.jpg$/i, "-128.jpg");
}

function Byline({ post }: { post: BlogPostMeta }) {
  if (!post.author) return null;
  const avatar = avatarFor(post.authorImage);
  return (
    <p className="flex items-center gap-3 text-base text-bark/75">
      {avatar ? (
        <ResponsivePicture
          src={avatar}
          alt=""
          width={36}
          height={36}
          loading="lazy"
          decoding="async"
          className="size-9 shrink-0 rounded-full object-cover object-top"
        />
      ) : null}
      <span>
        <span className="font-semibold text-bark">{post.author}</span>
        {post.authorRole ? <span>, {post.authorRole}</span> : null}
      </span>
    </p>
  );
}

type BlogCardProps = {
  post: BlogPostMeta;
  index: number;
  /** `lead` is the newest note, set large; `entry` is a journal row. */
  variant?: "lead" | "entry";
};

export function BlogCard({ post, index, variant = "entry" }: BlogCardProps) {
  const cover = coverFor(post, index);
  const date = dateParts(post.date);
  const topic = post.tags?.[0];
  const href = `/blog/${post.slug}`;

  // The title link stretches over the whole entry (after:absolute), so the
  // entry is one click target and one tab stop with an accessible name.
  const titleLink = (
    <Link
      to={href}
      className="decoration-ember decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0 focus-visible:outline-none"
    >
      {post.title}
    </Link>
  );

  if (variant === "lead") {
    return (
      <article className="group relative grid gap-8 rounded-sm focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-8 focus-within:ring-offset-cream md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-12">
        <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-sand">
          <ResponsivePicture
            src={cover}
            sizes="(min-width: 768px) 640px, 100vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-[filter] duration-500 group-hover:brightness-105"
          />
        </div>
        <div>
          <p className="text-base text-bark/70">
            <time dateTime={post.date}>{date.full}</time>
          </p>
          {topic ? (
            <p className="mt-1 text-base font-medium text-ember-deep">{topic}</p>
          ) : null}
          <h2
            className="mt-4 font-heading font-semibold tracking-tight text-bark"
            style={{ fontSize: "clamp(1.85rem, 3.2vw, 2.6rem)", lineHeight: 1.1 }}
          >
            {titleLink}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-bark/80">
            {post.description}
          </p>
          <div className="mt-7">
            <Byline post={post} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-5 border-t border-bark/15 py-8 focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-4 focus-within:ring-offset-cream sm:grid-cols-[6rem_minmax(0,1fr)] md:grid-cols-[7rem_minmax(0,1fr)_14rem] md:gap-x-10 md:py-10"
    >
      <p className="row-span-2 md:row-span-1">
        <time dateTime={post.date} className="block">
          <span className="block font-heading text-4xl leading-none font-semibold text-bark sm:text-5xl">
            {date.day}
          </span>
          <span className="mt-2 block text-sm text-bark/70">{date.monthYear}</span>
        </time>
      </p>
      <div className="min-w-0">
        {topic ? <p className="text-base font-medium text-ember-deep">{topic}</p> : null}
        <h2 className="mt-2 font-heading text-2xl leading-snug font-semibold text-bark sm:text-[1.75rem]">
          {titleLink}
        </h2>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-bark/80">
          {post.description}
        </p>
        <div className="mt-5">
          <Byline post={post} />
        </div>
      </div>
      <div className="relative col-start-2 aspect-video overflow-hidden rounded-sm bg-sand md:col-start-3 md:row-start-1 md:aspect-4/3">
        <ResponsivePicture
          src={cover}
          sizes="(min-width: 768px) 260px, 80vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-[filter] duration-500 group-hover:brightness-105"
        />
      </div>
    </article>
  );
}
