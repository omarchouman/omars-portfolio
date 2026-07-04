"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
        On this page
      </p>
      <ul className="mt-4 space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={activeId === heading.id ? "location" : undefined}
              className={`block border-l-2 py-1 text-sm transition-colors ${
                heading.level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === heading.id
                  ? "border-[var(--blue-soft)] font-medium text-[var(--blue-soft)]"
                  : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
