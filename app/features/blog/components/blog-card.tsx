import type { BlogPostMeta } from "~/lib/blog.server";
import { Link } from "react-router";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="rounded-2xl border p-6">
      <p className="text-sm opacity-70">{post.date}</p>
      <h2 className="mt-2 text-xl font-semibold">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-2 opacity-80">{post.description}</p>
    </article>
  );
}
