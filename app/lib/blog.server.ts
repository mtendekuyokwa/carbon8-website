import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  status?: "concept" | "in_development";
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function listPosts(): Promise<BlogPostMeta[]> {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) =>
    f.endsWith(".mdx"),
  );
  const posts: BlogPostMeta[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    posts.push({ slug, ...(data as BlogFrontmatter) });
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
