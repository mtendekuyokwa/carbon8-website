import { Suspense, lazy } from "react";
import { data, Link } from "react-router";
import { listPosts } from "~/lib/blog.server";
import { CTASection } from "~/components/layout/cta-section";
import { TagChip } from "~/components/tag-chip";
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
    <Suspense fallback={<p>Loading…</p>}>
      <Body />
    </Suspense>
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
  return (
    <main className="bg-[#F4F1EC] text-[#4A362E]">
      {/* Cover hero */}
      <section className="relative overflow-hidden">
        <img
          src={cover}
          alt=""
          className="h-[52vh] min-h-[380px] w-full object-cover"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#4A362E]/85 via-[#4A362E]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-8 pb-10 md:px-12">
          <div className="mx-auto max-w-3xl text-white">
            <nav aria-label="Breadcrumb" className="text-sm text-white/70">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden className="mx-2">
                /
              </span>
              <Link to="/blog" className="hover:text-white">
                Field Notes
              </Link>
              <span aria-hidden className="mx-2">
                /
              </span>
              <span aria-current="page" className="text-white">
                {post.title}
              </span>
            </nav>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <TagChip key={tag} label={tag} tone="glass" />
              ))}
            </div>
            <h1
              id="blog-post-heading"
              className="mt-4 font-semibold [font-family:'Baloo_2',system-ui]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.05 }}
            >
              {post.title}
            </h1>
            <p className="mt-3 text-sm tracking-wide text-white/75 uppercase">
              {post.date} · {post.status?.replace("_", " ") ?? "concept"} ·{" "}
              {Math.max(2, Math.round(post.description.length / 180))} min read
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-8 py-14 md:px-12" aria-labelledby="blog-post-heading">
        <p className="border-l-4 border-[#C46A2E] pl-5 text-xl leading-relaxed text-[#4A362E]/85 italic">
          {post.description}
        </p>
        <div className="prose prose-lg mt-10 max-w-none prose-headings:[font-family:'Baloo_2',system-ui] prose-headings:text-[#4A362E] prose-a:text-[#C46A2E]">
          <ArticleBody slug={post.slug} />
        </div>

        <div className="mt-14 grid gap-4 border-t border-[#DED7C8] pt-8 md:grid-cols-2">
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="group border border-[#DED7C8] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-xs font-bold tracking-[0.18em] text-[#4A362E]/50 uppercase">
                ← Older
              </span>
              <span className="mt-2 block text-lg font-semibold group-hover:text-[#C46A2E]">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/blog/${next.slug}`}
              className="group border border-[#DED7C8] bg-white p-6 text-right transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-xs font-bold tracking-[0.18em] text-[#4A362E]/50 uppercase">
                Newer →
              </span>
              <span className="mt-2 block text-lg font-semibold group-hover:text-[#C46A2E]">
                {next.title}
              </span>
            </Link>
          ) : null}
        </div>

        <CTASection
          className="mt-8"
          heading="Building something with your community? Let's talk."
          body="We are at concept stage and learning in the open. Say hello — we read everything."
          primaryLabel="Get in touch →"
          primaryHref="mailto:openbasedigital@gmail.com"
        />
      </article>
    </main>
  );
}
