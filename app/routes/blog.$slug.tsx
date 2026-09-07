import { Suspense, lazy } from "react";
import { data, Link } from "react-router";
import { listPosts } from "~/lib/blog.server";
import { ResponsivePicture } from "~/components/responsive-picture";
import { TagChip } from "~/components/tag-chip";import { Eyebrow } from "~/components/eyebrow";
import { coverFor } from "~/features/blog/components/blog-card";
import type { Route } from "./+types/blog.$slug";

const articles = import.meta.glob("../../content/blog/*.mdx");
const articleComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {};
for (const [filePath, load] of Object.entries(articles)) {
  const slug = filePath.split("/").pop()?.replace(/\.mdx$/, "");
  if (slug) {
    articleComponents[slug] = lazy(
      load as () => Promise<{ default: React.ComponentType }>,
    );
  }
}
const slugs = Object.keys(articleComponents);

function ArticleBody({ slug }: { slug: string }) {
  const Body = articleComponents[slug];
  return (
    <Suspense fallback={<p className="text-bark/60">Loading…</p>}>
      <Body />
    </Suspense>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Small co-founder thumbs — the 48px avatar never needs the full photo.
const AUTHOR_PHOTOS: Record<string, string> = {
  Patrick: "/assets/patrick-128.jpg",
  Tawina: "/assets/tawina-128.jpg",
};

// Frontmatter may point at the full-size photo — swap to the 128px twin.
function thumbFor(src: string): string {
  const thumb = src.replace(/\.jpe?g$/i, "-128.jpg");
  return thumb === src ? src : thumb;
}

function AuthorAvatar({ author, image }: { author: string; image?: string }) {
  const src = image ? thumbFor(image) : AUTHOR_PHOTOS[author];
  if (src) {
    return (
      <ResponsivePicture
        src={src}
        alt={`Photo of ${author}`}
        loading="lazy"
        decoding="async"
        width={128}
        height={128}
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/25"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="font-heading flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mint text-sm font-bold text-bark"
    >
      {initials(author)}
    </span>
  );
}

export function meta({ loaderData }: Route.MetaArgs) {
  const post = loaderData as unknown as
    | { post: { title: string; description: string } }
    | undefined;
  if (!post) return [{ title: "Not found — Carbon8" }];
  return [
    { title: `${post.post.title} — Carbon8` },
    { name: "description", content: post.post.description },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.slug || !slugs.includes(params.slug)) {
    throw data("Not found", { status: 404 });
  }
  const posts = await listPosts();
  const idx = posts.findIndex((p) => p.slug === params.slug);
  if (idx === -1) throw data("Not found", { status: 404 });
  return {
    post: posts[idx],
    prev: idx + 1 < posts.length ? posts[idx + 1] : null,
    next: idx - 1 >= 0 ? posts[idx - 1] : null,
    index: idx,
  };
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post, prev, next, index } = loaderData;
  const cover = coverFor(post, index);
  const author = post.author ?? "Carbon8 Team";
  const authorRole = post.authorRole ?? "Field notes";
  const readMins = Math.max(2, Math.round(post.description.length / 180));

  return (
    <main className="bg-cream text-bark">
      {/* Blurred editorial hero — blur hides low-res source */}
      <section className="relative isolate overflow-hidden bg-bark">
        <ResponsivePicture
          src={cover}
          sizes="100vw"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.55] saturate-[1.1]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-bark via-bark/45 to-bark/25"
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-14 pb-12 md:px-10 md:pt-20 md:pb-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span> Back to Articles
          </Link>

          <Eyebrow tone="light" className="mt-8 !text-mint">
            Field note · {post.date} · {readMins} min read
          </Eyebrow>
          <h1
            id="blog-post-heading"
            className="font-heading mt-4 font-semibold text-balance text-white"
            style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.6rem)", lineHeight: 1.06 }}
          >
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <TagChip key={tag} label={tag} tone="glass" />
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
            <AuthorAvatar author={author} image={post.authorImage} />
            <div>
              <p className="font-semibold text-white">{author}</p>
              <p className="text-sm text-white/65">
                {authorRole} · {post.status?.replace("_", " ") ?? "concept"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open reading surface — no card, airy editorial type */}
      <article
        className="mx-auto w-full max-w-5xl px-6 pt-12 pb-20 md:px-10 md:pt-16"
        aria-labelledby="blog-post-heading"
      >
        <div className="blog-article max-w-none">
          <ArticleBody slug={post.slug} />
        </div>

        <hr className="my-12 border-sand" />

        <p className="text-lg text-bark/80">
          Written by <strong className="text-bark">{author}</strong>,{" "}
          {authorRole}.
        </p>

        <nav
          aria-label="More articles"
          className="mt-10 flex items-center justify-between gap-4 text-base font-semibold"
        >
          {prev ? (
              <Link to={`/blog/${prev.slug}`} className="text-ember-deep hover:underline">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/blog/${next.slug}`}
                className="ml-auto text-right text-ember-deep hover:underline"
            >
              {next.title} →
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}
