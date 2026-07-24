import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPrompts, getPromptBySlug } from "@/lib/power-prompts";
import { PromptActions } from "@/components/resources/PromptActions";
import { Reveal } from "@/components/ui/Reveal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return {};
  return {
    title: prompt.title,
    description: prompt.description,
  };
}

export default async function PowerPromptPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  return (
    <div className="pt-20 sm:pt-24">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <Link
          href="/resources/power-prompts"
          className="mb-6 inline-block text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--blue-soft)]"
        >
          ← Back to Power Prompts
        </Link>

        <Reveal as="div" viewport={false}>
          <header className="mb-8">
            <span className="inline-flex w-fit items-center rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
              {prompt.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {prompt.title}
            </h1>
            {prompt.description && (
              <p className="mt-4 text-lg text-[var(--muted-foreground)]">{prompt.description}</p>
            )}
          </header>

          <PromptActions slug={prompt.slug} content={prompt.content} />

          <pre className="glass-card mt-8 overflow-x-auto whitespace-pre-wrap break-words rounded-2xl p-6 font-mono text-sm leading-relaxed text-[var(--foreground)]">
            {prompt.content}
          </pre>
        </Reveal>
      </article>
    </div>
  );
}
