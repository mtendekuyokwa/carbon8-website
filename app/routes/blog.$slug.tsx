import { Suspense, lazy } from "react";
import { data, Link } from "react-router";
import { Eyebrow } from "~/components/eyebrow";
import { listPosts } from "~/lib/blog.server";
import type { Route } from "./+types/blog.$slug";

// Static MDX article modules — compiled at build time by @mdx-js/rollup.
// Lazy components are created once at module level (never during render).
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
    <Suspense fallback={<p>Loading…</p>}>
      <Body />
    </Suspense>
  );
}

export function meta({ loaderData }: Route.MetaArgs) {
  const post = loaderData as unknown as
    | { title: string; description: string }
    | undefined;
  if (!post) return [{ title: "Not found — Carbon8" }];
  return [
    { title: `${post.title} — Carbon8` },
    { name: "description", content: post.description },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.slug || !slugs.includes(params.slug)) {
    throw data("Not found", { status: 404 });
  }
  const posts = await listPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) throw data("Not found", { status: 404 });
  return post;
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  return (
    <main className="bg-[#F4F1EC] text-[#4A362E]">
      <article
        className="mx-auto max-w-5xl px-8 pt-32 pb-20 md:px-12"
        aria-labelledby="blog-post-heading"
      >
        <Eyebrow withRule className="mb-10">
          <Link to="/blog" className="transition-opacity hover:opacity-70">
            ← All notes
          </Link>
        </Eyebrow>
        <h1
          id="blog-post-heading"
          className="max-w-4xl font-medium leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
        >
          {loaderData.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {loaderData.date} · {loaderData.status ?? "concept"}
        </p>
        <div className="prose mt-12 max-w-2xl">
          <ArticleBody slug={loaderData.slug} />
        </div>
      </article>
    </main>
  );
}
