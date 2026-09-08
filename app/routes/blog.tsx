import { Link } from "react-router";
import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { listPosts } from "~/lib/blog.server";
import { BlogCard } from "~/features/blog/components/blog-card";

export function meta() {
  return [
    { title: "Field Notes — Carbon8" },
    {
      name: "description",
      content:
        "Learning notes from Carbon8 Malawi, a community-first climate organisation at concept stage.",
    },
  ];
}

export async function loader() {
  return { posts: await listPosts() };
}

const FILTERS = ["All notes", "Community", "Climate finance", "Building in public"] as const;

export default function Blog({
  loaderData,
}: {
  loaderData: { posts: Awaited<ReturnType<typeof listPosts>> };
}) {
  const { posts } = loaderData;
  return (
    <main className="bg-cream text-bark">
      {/* Breadcrumb + hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-10 sm:px-8 sm:pt-32 sm:pb-14 md:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-ember/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-40 -left-24 h-80 w-80 rounded-full bg-growth/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-bark/80">
            <Link to="/" className="transition-colors hover:text-ember">
              Home
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span aria-current="page" className="font-medium text-bark">
              Field Notes
            </span>
          </nav>
          <AnimatedHeading className="font-heading mt-6 max-w-3xl">
            <span
              id="blog-heading"
              style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)", display: "block", lineHeight: 1.02 }}
            >
              Field notes from the ground up.
            </span>
          </AnimatedHeading>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <AnimatedText
              className="max-w-xl text-base leading-relaxed text-bark/80"
              delay={0.1}
            >
              Honest, in-progress learning notes — no invented impact numbers,
              community voices first.
            </AnimatedText>
            <p className="text-sm font-medium text-bark/80">
              {posts.length} {posts.length === 1 ? "note" : "notes"} · updated as we learn
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" role="list" aria-label="Browse by theme">
            {FILTERS.map((f, i) => (
              <span
                key={f}
                role="listitem"
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  i === 0
                    ? "bg-bark text-white"
                    : "border border-sand bg-white text-bark/70"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* All notes — horizontal cards */}
      <section className="px-4 pb-16 sm:px-8 md:px-12 md:pb-24" aria-labelledby="blog-heading">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
          {posts.length === 0 ? (
              <p className="border border-dashed border-sand bg-white p-12 text-center text-bark/80">
              First notes are on their way — check back soon.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
