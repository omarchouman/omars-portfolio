import { Reveal } from "@/components/ui/Reveal";

export function Founder() {
  return (
    <section className="section-glow bg-[var(--background)] py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal
          as="h2"
          className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          Founder
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-6 space-y-5 text-[var(--muted-foreground)] leading-relaxed sm:mt-8 sm:space-y-6"
        >
          <p className="text-base sm:text-lg">
            I&apos;m also the founder of <strong className="text-[var(--foreground)]">JUSTECH</strong>,
            a software development agency focused on complex systems, AI solutions, infrastructure,
            and end-to-end product development.
          </p>
          <p>
            We partner with businesses to scale revenue, optimize operations, and build intelligent
            platforms that create real leverage.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
