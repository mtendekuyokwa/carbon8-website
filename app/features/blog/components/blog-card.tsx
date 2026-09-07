import type { BlogPostMeta } from "~/lib/blog.server";
import { Link } from "react-router";

export function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <article className="grid grid-cols-12 gap-4 border-b border-foreground/15 py-10 md:gap-8">
      <span className="col-span-2 text-sm text-muted-foreground md:col-span-1">
        ({String(index + 1).padStart(2, "0")})
      </span>
      <div className="col-span-10 md:col-span-4">
        <p className="text-sm text-muted-foreground">{post.date}</p>
        <h2 className="mt-2 text-2xl font-medium md:text-3xl">
          <Link to={`/blog/${post.slug}`} className="transition-opacity hover:opacity-70">
            {post.title}
          </Link>
        </h2>
      </div>
      <div className="col-span-10 col-start-3 md:col-span-7 md:col-start-6">
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase"
          aria-label={`Read ${post.title}`}
        >
          Read note <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
