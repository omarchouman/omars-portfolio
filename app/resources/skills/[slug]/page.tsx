import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSkills, getSkillBySlug } from "@/lib/skills";
import { SkillActions } from "@/components/resources/SkillActions";
import { SkillInstall } from "@/components/resources/SkillInstall";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { Reveal } from "@/components/ui/Reveal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const skills = getAllSkills();
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return {};
  return {
    title: skill.title,
    description: skill.description,
  };
}

export default async function SkillPage({ params }: Props) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) notFound();

  return (
    <div className="pt-20 sm:pt-24">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <Link
          href="/resources/skills"
          className="mb-6 inline-block text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--blue-soft)]"
        >
          ← Back to Skills
        </Link>

        <Reveal as="div" viewport={false}>
          <header className="mb-8">
            <span className="inline-flex w-fit items-center rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
              {skill.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {skill.title}
            </h1>
            {skill.description && (
              <p className="mt-4 text-lg text-[var(--muted-foreground)]">{skill.description}</p>
            )}
          </header>

          <SkillActions slug={skill.slug} content={skill.raw} />

          <SkillInstall slug={skill.slug} files={skill.files} />

          <div className="mt-12 border-t border-[var(--border)] pt-10">
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
              SKILL.md
            </p>
            <MarkdownRenderer content={skill.content} />
          </div>
        </Reveal>
      </article>
    </div>
  );
}
