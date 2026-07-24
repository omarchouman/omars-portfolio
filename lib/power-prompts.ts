import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROMPTS_DIR = path.join(process.cwd(), "content/power-prompts");

export type PowerPrompt = {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
};

export type PowerPromptMeta = Omit<PowerPrompt, "content">;

function ensurePromptsDir() {
  if (!fs.existsSync(PROMPTS_DIR)) {
    fs.mkdirSync(PROMPTS_DIR, { recursive: true });
  }
}

export function getAllPrompts(): PowerPromptMeta[] {
  ensurePromptsDir();
  const files = fs.readdirSync(PROMPTS_DIR).filter((f) => f.endsWith(".md"));
  const prompts = files.map((file) => {
    const fullPath = path.join(PROMPTS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    return {
      slug: data.slug ?? file.replace(/\.md$/, ""),
      title: data.title ?? "Untitled",
      description: data.description ?? "",
      category: data.category ?? "General",
    };
  });
  return prompts.sort((a, b) => a.title.localeCompare(b.title));
}

export function getPromptBySlug(slug: string): PowerPrompt | null {
  ensurePromptsDir();
  const files = fs.readdirSync(PROMPTS_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const fullPath = path.join(PROMPTS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug ?? file.replace(/\.md$/, "");
    if (fileSlug === slug) {
      return {
        slug: fileSlug,
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        category: data.category ?? "General",
        content: content.trim(),
      };
    }
  }
  return null;
}
