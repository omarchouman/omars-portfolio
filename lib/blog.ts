import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

export function getAllPosts(): BlogPostMeta[] {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(content);
    return {
      slug: data.slug ?? file.replace(/\.md$/, ""),
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
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
        content,
      };
    }
  }
  return null;
}

export function createPost(
  slug: string,
  title: string,
  excerpt: string,
  content: string
): { success: boolean; error?: string } {
  ensureBlogDir();
  const filename = `${slug}.md`;
  const fullPath = path.join(BLOG_DIR, filename);
  if (fs.existsSync(fullPath)) {
    return { success: false, error: "A post with this slug already exists." };
  }
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: ${slug}
date: "${new Date().toISOString().slice(0, 10)}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
---

${content}`;
  fs.writeFileSync(fullPath, frontmatter, "utf-8");
  return { success: true };
}

export function updatePost(
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  newSlug?: string
): { success: boolean; error?: string } {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const targetSlug = newSlug ?? slug;
  let found = false;

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const fileSlug = data.slug ?? file.replace(/\.md$/, "");

    if (fileSlug === slug) {
      found = true;
      if (newSlug && newSlug !== slug) {
        fs.unlinkSync(fullPath);
      }
      const filename = `${targetSlug}.md`;
      const newPath = path.join(BLOG_DIR, filename);
      const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: ${targetSlug}
date: "${(data.date ?? new Date().toISOString().slice(0, 10)).toString().slice(0, 10)}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
---

${content}`;
      fs.writeFileSync(newPath, frontmatter, "utf-8");
      break;
    }
  }

  if (!found) {
    return { success: false, error: "Post not found." };
  }
  return { success: true };
}

export function deletePost(slug: string): { success: boolean; error?: string } {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const fileSlug = data.slug ?? file.replace(/\.md$/, "");
    if (fileSlug === slug) {
      fs.unlinkSync(fullPath);
      return { success: true };
    }
  }
  return { success: false, error: "Post not found." };
}
