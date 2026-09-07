import { Suspense, lazy, useEffect } from "react";
import { data, Link } from "react-router";
import { listPosts } from "~/lib/blog.server";
import { TagChip } from "~/components/tag-chip";
import { Eyebrow } from "~/components/eyebrow";
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

// Known co-founder photos — used when a post has no explicit authorImage.
const AUTHOR_PHOTOS: Record<string, string> = {
  Patrick: "/assets/patrick.jpg",
  Tawina: "/assets/tawina.jpg",
};

function AuthorAvatar({ author, image }: { author: string; image?: string }) {
  const src = image ?? AUTHOR_PHOTOS[author];
  if (src) {
    return (
      <img
        src={src}
        alt={`Photo of ${author}`}
        loading="lazy"
        decoding="async"
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

  // The site applies a global `zoom = viewport/1728` (see root.tsx) which
  // shrinks everything ~20% on typical laptops. Reading pages opt out so
  // article type renders at true size; a capture-phase resize listener
  // keeps the opt-out ahead of the global handler, and zoom is restored
  // to a freshly computed value on unmount.
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.zoom;
    const pin = () => {
      el.style.zoom = "1";
    };
    pin();
    window.addEventListener("resize", pin, { capture: true });
    return () => {
      window.removeEventListener("resize", pin, { capture: true });
      const w = el.clientWidth;
      el.style.zoom = prev || (w < 1728 ? String(w / 1728) : "1");
    };
  }, []);

  return (
    <main className="bg-cream text-bark">
      {/* Blurred editorial hero — blur hides low-res source */}
      <section className="relative isolate overflow-hidden bg-bark">
        <img
          src={cover}
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
          <p className="mt-4 max-w-2xl text-xl leading-relaxed text-white/80">
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
        <div className="prose max-w-none prose-headings:font-heading prose-headings:font-semibold prose-headings:text-bark prose-headings:text-balance prose-h2:mt-16 prose-h2:text-[2.5rem] prose-h2:leading-[1.2] prose-h3:mt-12 prose-h3:text-[2rem] prose-p:mt-8 prose-p:text-[1.5rem] prose-p:leading-[1.85] prose-p:font-normal prose-p:text-bark/90 prose-a:font-medium prose-a:text-ember prose-a:underline-offset-4 hover:prose-a:text-bark prose-blockquote:my-12 prose-blockquote:border-ember prose-blockquote:border-l-4 prose-blockquote:pl-8 prose-blockquote:text-[1.6rem] prose-blockquote:leading-[1.8] prose-li:mt-4 prose-li:text-[1.45rem] prose-li:leading-[1.85] prose-li:text-bark/90 prose-hr:my-14 prose-hr:border-sand prose-ul:mt-8 prose-ol:mt-8">
          <ArticleBody slug={post.slug} />
        </div>

        <hr className="my-12 border-sand" />

        <p className="text-lg text-bark/70">
          Written by <strong className="text-bark">{author}</strong>,{" "}
          {authorRole}.
        </p>

        <nav
          aria-label="More articles"
          className="mt-10 flex items-center justify-between gap-4 text-base font-semibold"
        >
          {prev ? (
            <Link to={`/blog/${prev.slug}`} className="text-ember hover:underline">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/blog/${next.slug}`}
              className="ml-auto text-right text-ember hover:underline"
            >
              {next.title} →
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}
