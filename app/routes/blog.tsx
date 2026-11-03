import { Link } from "react-router";
import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { listPosts } from "~/lib/blog.server";
import { NotesIndex } from "~/features/blog/components/notes-index";

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

export default function Blog({
  loaderData,
}: {
  loaderData: { posts: Awaited<ReturnType<typeof listPosts>> };
}) {
  const { posts } = loaderData;
  return (
    <main className="bg-cream text-bark">
      <section className="px-4 pt-28 pb-10 sm:px-8 sm:pt-32 sm:pb-14 md:px-12">
        <div className="mx-auto max-w-6xl">
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
          <AnimatedHeading as="h1" className="mt-6 max-w-3xl font-heading">
            <span
              id="blog-heading"
              style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)", display: "block", lineHeight: 1.02 }}
            >
              Field notes from the ground up.
            </span>
          </AnimatedHeading>
          <AnimatedText
            className="mt-6 max-w-xl text-lg leading-relaxed text-bark/80"
            delay={0.1}
          >
            Honest, in-progress learning notes from the Carbon8 team. No
            invented impact numbers, community voices first.
          </AnimatedText>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-8 md:px-12 md:pb-28" aria-labelledby="blog-heading">
        <div className="mx-auto max-w-6xl">
          <NotesIndex posts={posts} />
        </div>
      </section>
    </main>
  );
}
