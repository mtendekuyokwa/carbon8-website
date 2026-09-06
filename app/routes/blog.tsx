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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-2 opacity-80">
        Learning notes — honest, in-progress, no invented impact numbers.
      </p>
      <div className="mt-8 grid gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
