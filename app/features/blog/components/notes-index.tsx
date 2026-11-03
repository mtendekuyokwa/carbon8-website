import { useState } from "react";
import { Link } from "react-router";

import { ResponsivePicture } from "~/components/responsive-picture";
import { coverFor } from "~/features/blog/utils/covers";
import type { BlogPostMeta } from "~/lib/blog.server";
import { cn } from "~/lib/utils";

/** Curated topics; each filters on a post's tags. Empty topics are hidden. */
const TOPICS = ["Community", "Climate finance", "GeoAI", "Building in public"] as const;
type Topic = (typeof TOPICS)[number];

function hasTopic(post: BlogPostMeta, topic: Topic) {
  return post.tags?.some((t) => t.toLowerCase() === topic.toLowerCase()) ?? false;
}

/** en-GB in UTC so server and client render the same string. */
function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function avatarFor(src?: string) {
  return src?.replace(/\.jpg$/i, "-128.jpg");
}

function Byline({ post, className }: { post: BlogPostMeta; className?: string }) {
  const name = post.author ?? "Carbon8 Team";
  const avatar = avatarFor(post.authorImage);
  return (
    <p className={cn("flex items-center gap-3 text-base text-bark/75", className)}>
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
        <span className="font-semibold text-bark">{name}</span>
        {post.authorRole ? <span>, {post.authorRole}</span> : null}
      </span>
    </p>
  );
}

type IndexedPost = { post: BlogPostMeta; cover: string };

export function NotesIndex({ posts }: { posts: readonly BlogPostMeta[] }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const all: IndexedPost[] = posts.map((post, i) => ({ post, cover: coverFor(post, i) }));
  const visible = topic ? all.filter(({ post }) => hasTopic(post, topic)) : all;
  const topics = TOPICS.map((t) => ({
    topic: t,
    count: all.filter(({ post }) => hasTopic(post, t)).length,
  })).filter((t) => t.count > 0);

  // Derived, not synced: fall back to the first visible note.
  const active =
    visible.find(({ post }) => post.slug === activeSlug) ?? visible[0] ?? null;

  if (posts.length === 0) {
    return (
      <p className="border-t border-bark/15 py-16 text-lg text-bark/80">
        The first notes are being written. Check back soon.
      </p>
    );
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Filter notes by topic"
        className="flex flex-wrap items-center gap-2 border-b border-bark/15 pb-6"
      >
        <FilterButton pressed={topic === null} onClick={() => setTopic(null)}>
          All notes <span className="text-current/60">{all.length}</span>
        </FilterButton>
        {topics.map(({ topic: t, count }) => (
          <FilterButton key={t} pressed={topic === t} onClick={() => setTopic(t)}>
            {t} <span className="text-current/60">{count}</span>
          </FilterButton>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <ol aria-label="Field notes" aria-live="polite" className="divide-y divide-bark/15">
          {visible.map(({ post, cover }) => {
            const isActive = active?.post.slug === post.slug;
            return (
              <li
                key={post.slug}
                className="group relative py-8 lg:py-10"
                onMouseEnter={() => setActiveSlug(post.slug)}
              >
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-base text-bark/70">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.tags?.[0] ? (
                    <span className="font-medium text-ember-deep">{post.tags[0]}</span>
                  ) : null}
                  <span className="hidden lg:inline">{post.author ?? "Carbon8 Team"}</span>
                </p>
                <h2
                  className={cn(
                    "mt-3 font-heading font-semibold tracking-tight transition-colors duration-300",
                    isActive ? "text-bark" : "text-bark lg:text-bark/60",
                  )}
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", lineHeight: 1.12 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    onFocus={() => setActiveSlug(post.slug)}
                    className="decoration-ember decoration-2 underline-offset-[0.2em] group-hover:underline after:absolute after:inset-0 focus-visible:underline focus-visible:outline-none"
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Inline detail for small screens; the preview panel takes over on lg. */}
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-bark/80 lg:sr-only">
                  {post.description}
                </p>
                <div className="mt-5 lg:hidden">
                  <Byline post={post} />
                  <div className="mt-5 aspect-video overflow-hidden rounded-sm bg-sand">
                    <ResponsivePicture
                      src={cover}
                      sizes="100vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {active ? (
          <aside aria-hidden="true" className="hidden lg:block">
            <div className="sticky top-28 pt-10">
              <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-sand">
                {visible.map(({ post, cover }) => (
                  <ResponsivePicture
                    key={post.slug}
                    src={cover}
                    sizes="420px"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "absolute inset-0 size-full object-cover transition-opacity duration-500 motion-reduce:transition-none",
                      post.slug === active.post.slug ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-bark/80">
                {active.post.description}
              </p>
              <Byline post={active.post} className="mt-5" />
            </div>
          </aside>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-lg text-bark/80">No notes on this topic yet.</p>
      ) : null}
    </div>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-4 py-2 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none",
        pressed
          ? "bg-bark text-white"
          : "border border-bark/20 text-bark/80 hover:border-bark/50 hover:text-bark",
      )}
    >
      {children}
    </button>
  );
}
