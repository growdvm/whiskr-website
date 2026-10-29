import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  ogImage: z.string().optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
};

function readPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllSlugs(): string[] {
  return readPostFiles().map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const files = readPostFiles();
  const file = files.find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = FrontmatterSchema.parse(data);
  return { slug, frontmatter, content };
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
