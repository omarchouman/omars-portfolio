import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SKILLS_DIR = path.join(process.cwd(), "content/skills");

export type Skill = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** SKILL.md body with the frontmatter stripped, for rendering. */
  content: string;
  /** The SKILL.md file exactly as it ships, for copying. */
  raw: string;
  files: string[];
};

export type SkillMeta = Omit<Skill, "content" | "raw" | "files">;

type SkillMetaFile = Partial<Pick<SkillMeta, "title" | "description" | "category">>;

function ensureSkillsDir() {
  if (!fs.existsSync(SKILLS_DIR)) {
    fs.mkdirSync(SKILLS_DIR, { recursive: true });
  }
}

/** Every directory under content/skills that actually holds a SKILL.md. */
function skillDirs(): string[] {
  ensureSkillsDir();
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(SKILLS_DIR, name, "SKILL.md")));
}

/** Optional meta.json overrides the SKILL.md frontmatter, which is written for LLM triggering. */
function readMetaFile(slug: string): SkillMetaFile {
  const metaPath = path.join(SKILLS_DIR, slug, "meta.json");
  if (!fs.existsSync(metaPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(metaPath, "utf-8")) as SkillMetaFile;
  } catch {
    return {};
  }
}

/** Relative paths of every file that ships inside the .skill package. */
function skillFiles(dir: string, prefix = ""): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) return skillFiles(path.join(dir, entry.name), relative);
      return relative === "meta.json" ? [] : [relative];
    })
    .sort();
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function readSkill(slug: string): Skill {
  const skillDir = path.join(SKILLS_DIR, slug);
  const raw = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf-8");
  const { data, content } = matter(raw);
  const meta = readMetaFile(slug);

  return {
    slug,
    title: meta.title ?? titleFromSlug(data.name ?? slug),
    description: meta.description ?? data.description ?? "",
    category: meta.category ?? "General",
    content: content.trim(),
    raw,
    files: skillFiles(skillDir),
  };
}

export function getAllSkills(): SkillMeta[] {
  const skills = skillDirs().map((slug) => {
    const { title, description, category } = readSkill(slug);
    return { slug, title, description, category };
  });
  return skills.sort((a, b) => a.title.localeCompare(b.title));
}

export function getSkillBySlug(slug: string): Skill | null {
  if (!skillDirs().includes(slug)) return null;
  return readSkill(slug);
}

/** Absolute path plus packaged files for a skill, used to build the .skill archive. */
export function getSkillPackage(slug: string): { dir: string; files: string[] } | null {
  if (!skillDirs().includes(slug)) return null;
  const dir = path.join(SKILLS_DIR, slug);
  return { dir, files: skillFiles(dir) };
}
