import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-20 text-center sm:px-6 sm:pt-24">
      <Reveal
        viewport={false}
        y={12}
        duration={0.5}
        className="mx-auto mb-6 h-px w-12 bg-[var(--blue-soft)]"
      />
      <Reveal
        as="span"
        viewport={false}
        delay={0.1}
        className="text-sm font-medium uppercase tracking-wide text-[var(--muted-foreground)]"
      >
        Error 404
      </Reveal>
      <Reveal
        as="h1"
        viewport={false}
        delay={0.15}
        className="mt-4 text-6xl font-bold tracking-tight text-[var(--foreground)] sm:text-7xl"
      >
        404
      </Reveal>
      <Reveal
        as="p"
        viewport={false}
        delay={0.2}
        className="mt-6 max-w-md text-lg font-medium text-[var(--foreground)]"
      >
        This route returned a 404, not a stack trace.
      </Reveal>
      <Reveal
        as="p"
        viewport={false}
        delay={0.25}
        className="mt-2 max-w-md text-[var(--muted-foreground)]"
      >
        Whatever you were looking for isn&apos;t here. Let&apos;s get you back on a route that
        actually resolves.
      </Reveal>
      <Reveal
        viewport={false}
        delay={0.3}
        className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-[var(--blue-royal)] px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-soft)] transition-all hover:bg-[var(--blue-soft)] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-soft)] focus-visible:ring-offset-2"
        >
          Back to Home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-transparent px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--blue-soft)] hover:text-[var(--blue-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-soft)] focus-visible:ring-offset-2"
        >
          View Projects
        </Link>
      </Reveal>
      <Reveal as="p" viewport={false} delay={0.35} className="mt-6 text-sm text-[var(--muted-foreground)]">
        Or press{" "}
        <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-sans text-xs">
          ⌘K
        </kbd>{" "}
        to search
      </Reveal>
    </div>
  );
}
