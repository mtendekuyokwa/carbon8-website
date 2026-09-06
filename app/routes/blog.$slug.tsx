import { Suspense, lazy } from "react";
import { data, Link } from "react-router";
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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/blog" className="text-sm underline">
        ← All posts
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{loaderData.title}</h1>
      <p className="mt-2 text-sm opacity-70">
        {loaderData.date} · {loaderData.status ?? "concept"}
      </p>
      <div className="prose mt-8 max-w-none">
        <ArticleBody slug={loaderData.slug} />
      </div>
    </main>
  );
}
