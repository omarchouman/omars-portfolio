"use client";

import { useState } from "react";

type Props = { slug: string; content: string };

export function SkillActions({ slug, content }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`/resources/skills/${slug}/download`}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--blue-royal)] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Download .skill
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--border)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--blue-soft)] hover:text-[var(--blue-soft)]"
      >
        {copied ? "Copied!" : "Copy SKILL.md"}
      </button>
    </div>
  );
}
