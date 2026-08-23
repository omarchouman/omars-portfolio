import Link from "next/link";
import type { SkillMeta } from "@/lib/skills";

type Props = { skill: SkillMeta };

export function SkillCard({ skill }: Props) {
  return (
    <Link
      href={`/resources/skills/${skill.slug}`}
      className="group glass-card flex h-full flex-col p-6 transition-all hover:border-[var(--blue-soft)]/30 hover:shadow-lg"
    >
      <span className="inline-flex w-fit items-center rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
        {skill.category}
      </span>
      <h2 className="mt-4 text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--blue-soft)]">
        {skill.title}
      </h2>
      {skill.description && (
        <p className="mt-2 line-clamp-3 flex-1 text-[var(--muted-foreground)]">{skill.description}</p>
      )}
      <span className="mt-4 text-sm font-medium text-[var(--blue-soft)]">View skill →</span>
    </Link>
  );
}
