import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { slugify, stripMarkdownInline } from "@/lib/slugify";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;

export type Heading = { id: string; text: string; level: 2 | 3 };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  readingTime: number;
  content: string;
  headings: Heading[];
};

export type BlogPostMeta = Omit<BlogPost, "content" | "headings">;

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function stripCodeFences(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, "");
}

function computeReadingTime(content: string): number {
  const words = stripCodeFences(content).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function extractHeadings(content: string): Heading[] {
  const stripped = stripCodeFences(content);
  const matches = stripped.matchAll(/^(#{2,3})\s+(.+)$/gm);
  const headings: Heading[] = [];
  for (const match of matches) {
    const text = stripMarkdownInline(match[2]);
    headings.push({ id: slugify(text), text, level: match[1].length as 2 | 3 });
  }
  return headings;
}

export function getAllPosts(): BlogPostMeta[] {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug ?? file.replace(/\.md$/, ""),
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      cover: data.cover ?? undefined,
      readingTime: computeReadingTime(content),
    };
  });
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug ?? file.replace(/\.md$/, "");
    if (fileSlug === slug) {
      return {
        slug: fileSlug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        cover: data.cover ?? undefined,
        readingTime: computeReadingTime(content),
        content,
        headings: extractHeadings(content),
      };
    }
  }
  return null;
}
