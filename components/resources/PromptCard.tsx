import Link from "next/link";
import type { PowerPromptMeta } from "@/lib/power-prompts";

type Props = { prompt: PowerPromptMeta };

export function PromptCard({ prompt }: Props) {
  return (
    <Link
      href={`/resources/power-prompts/${prompt.slug}`}
      className="group glass-card flex h-full flex-col p-6 transition-all hover:border-[var(--blue-soft)]/30 hover:shadow-lg"
    >
      <span className="inline-flex w-fit items-center rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
        {prompt.category}
      </span>
      <h2 className="mt-4 text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--blue-soft)]">
        {prompt.title}
      </h2>
      {prompt.description && (
        <p className="mt-2 line-clamp-3 flex-1 text-[var(--muted-foreground)]">{prompt.description}</p>
      )}
      <span className="mt-4 text-sm font-medium text-[var(--blue-soft)]">View prompt →</span>
    </Link>
  );
}
