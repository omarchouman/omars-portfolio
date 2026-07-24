"use client";

import { useState } from "react";

type Props = { slug: string; content: string };

export function PromptActions({ slug, content }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slug}.md`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--blue-royal)] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        {copied ? "Copied!" : "Copy prompt"}
      </button>
      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--border)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--blue-soft)] hover:text-[var(--blue-soft)]"
      >
        Download
      </button>
    </div>
  );
}
