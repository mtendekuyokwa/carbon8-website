import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";
import { listPosts } from "~/lib/blog.server";
import { BlogCard } from "~/features/blog/components/blog-card";

export function meta() {
  return [
    { title: "Blog — Carbon8" },
    {
      name: "description",
      content: "Learning notes from Carbon8 Malawi, a community-first climate organisation at concept stage.",
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
    <main className="bg-[#F4F1EC] text-[#4A362E]">
      <section
        className="px-8 pt-32 pb-20 md:px-12"
        aria-labelledby="blog-heading"
      >
        <div className="mx-auto max-w-5xl">
          <Eyebrow withRule className="mb-10">
            Blog — Learning notes
          </Eyebrow>
          <AnimatedHeading className="max-w-4xl font-medium leading-[1.05]">
            <span
              id="blog-heading"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.65rem)", display: "block" }}
            >
              Honest notes from early, in-progress work.
            </span>
          </AnimatedHeading>
          <AnimatedText
            className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80"
            delay={0.1}
          >
            Learning notes — honest, in-progress, no invented impact numbers.
          </AnimatedText>
          <ol className="mt-16 border-t border-foreground/15">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <BlogCard post={post} index={i} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
