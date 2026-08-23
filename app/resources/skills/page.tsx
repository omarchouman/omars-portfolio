import type { Metadata } from "next";
import { getAllSkills } from "@/lib/skills";
import { SkillCard } from "@/components/resources/SkillCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Agent skills I build and use, packaged so you can drop them into Claude Code or any model that reads instructions.",
};

export default function SkillsPage() {
  const skills = getAllSkills();

  return (
    <div className="pt-20 sm:pt-24">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
          Skills
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted-foreground)]">
          Agent skills I actually run, refined over time. Download one as a ready to install package, or read the
          instructions and use them anywhere.
        </p>

        {skills.length === 0 ? (
          <Reveal viewport={false} className="mt-16">
            <div className="glass-card flex min-h-[240px] flex-col items-center justify-center rounded-2xl p-12 text-center">
              <p className="text-[var(--muted-foreground)]">No skills yet. Check back soon.</p>
            </div>
          </Reveal>
        ) : (
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-8">
            {skills.map((skill, i) => (
              <Reveal key={skill.slug} as="li" viewport={false} duration={0.4} delay={i * 0.05} className="h-full">
                <SkillCard skill={skill} />
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
