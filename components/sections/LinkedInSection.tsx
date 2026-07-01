import { Reveal } from "@/components/ui/Reveal";

export function LinkedInSection() {
  const embedUrl = process.env.NEXT_PUBLIC_LINKEDIN_EMBED_URL;

  if (!embedUrl) return null;

  return (
    <section className="section-glow bg-[var(--background)] py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal
          as="h2"
          className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          Latest on LinkedIn
        </Reveal>
        <Reveal delay={0.1} className="mt-6 w-full sm:mt-8 sm:w-fit">
          <div className="w-full min-w-0 max-w-[504px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-[var(--shadow-card)]">
            <div className="relative aspect-[504/545] w-full min-h-[320px] overflow-hidden">
              <iframe
                src={embedUrl}
                height="545"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title="LinkedIn post"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            <a
              href="https://www.linkedin.com/in/omarchouman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--blue-soft)] hover:underline"
            >
              Read my latest LinkedIn post →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
