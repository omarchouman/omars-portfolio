import type { Metadata } from "next";
import { getAllPrompts } from "@/lib/power-prompts";
import { PromptCard } from "@/components/resources/PromptCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Power Prompts",
  description: "A directory of prompts I use and refine for engineering, writing, and career work. Copy or download any of them.",
};

export default function PowerPromptsPage() {
  const prompts = getAllPrompts();

  return (
    <div className="pt-20 sm:pt-24">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
          Power Prompts
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted-foreground)]">
          Prompts I actually use, refined over time. Copy them straight into your LLM of choice, or download them
          for later.
        </p>

        {prompts.length === 0 ? (
          <Reveal viewport={false} className="mt-16">
            <div className="glass-card flex min-h-[240px] flex-col items-center justify-center rounded-2xl p-12 text-center">
              <p className="text-[var(--muted-foreground)]">No prompts yet. Check back soon.</p>
            </div>
          </Reveal>
        ) : (
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-8">
            {prompts.map((prompt, i) => (
              <Reveal key={prompt.slug} as="li" viewport={false} duration={0.4} delay={i * 0.05} className="h-full">
                <PromptCard prompt={prompt} />
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
