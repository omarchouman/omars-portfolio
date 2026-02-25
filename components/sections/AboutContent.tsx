"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const experience = [
  { role: "Software Engineer", company: "Intalio" },
  { role: "Senior Software Engineer", company: "JUSTECH" },
  { role: "Previous roles", company: "ERP systems, cloud infrastructure, education platforms" },
];

export function AboutContent() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="relative mx-auto h-72 w-72 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] md:mx-0 md:h-80 md:w-80">
              <Image
                src="/images/omar2.jpeg"
                alt="Omar Chouman"
                fill
                sizes="(max-width: 768px) 288px, 320px"
                className="object-cover"
              />
            </div>
          </motion.div>
          <div className="min-w-0 flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl"
            >
              I Build Systems. But I Think in Trade-offs.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-12 space-y-6 text-[var(--muted-foreground)] leading-relaxed"
            >
          <p className="text-lg">
            I started programming early. Not just learning syntax, but learning what it costs to
            build things that matter.
          </p>
          <p>
            Over the last 5+ years, I&apos;ve worked across startups and established companies,
            designing AI-powered microservices, scalable architectures, ERP systems, and
            production-grade platforms.
          </p>
          <p>
            But skill alone isn&apos;t what shaped me.
          </p>
          <p>
            Shipping imperfect systems did.
            <br />
            Owning failures did.
            <br />
            Working under constraints did.
          </p>
          <p className="text-[var(--foreground)] font-medium">
            That&apos;s where judgment comes from.
          </p>
        </motion.div>
          </div>
        </div>
      </section>

      <section className="section-glow bg-[var(--gradient-section)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            My Engineering Philosophy
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 space-y-6 text-[var(--muted-foreground)] leading-relaxed"
          >
            <p className="text-lg">
              Most developers focus on correctness. I focus on defensibility.
            </p>
            <ul className="list-none space-y-2">
              <li>— What breaks first?</li>
              <li>— What scales poorly?</li>
              <li>— What decision will cost us later?</li>
              <li>— What should we not build?</li>
            </ul>
            <p className="text-[var(--foreground)] font-medium">
              Good engineers execute.
              <br />
              Strong engineers reduce uncertainty.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Professional Experience
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-10 space-y-0"
          >
            {experience.map((item, i) => (
              <li
                key={item.company}
                className="relative flex flex-col gap-1 border-l-2 border-[var(--blue-soft)] pl-8 pb-10 last:pb-0"
              >
                <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[var(--blue-soft)]" />
                <span className="text-sm font-medium text-[var(--blue-soft)]">
                  {item.role}
                </span>
                <span className="text-[var(--foreground)]">{item.company}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section-glow bg-[var(--gradient-section)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Beyond Code
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 space-y-6 text-[var(--muted-foreground)] leading-relaxed"
          >
            <p>
              I contribute to open source, including contributions to Laravel, and built{" "}
              <strong className="text-[var(--foreground)]">LaraUtilX</strong>, a Laravel utility
              package designed to streamline everyday development tasks.
            </p>
            <p>
              I write regularly about system design, AWS, engineering growth, and long-term career
              leverage.
            </p>
            <p className="text-[var(--foreground)]">
              My work sits at the intersection of technical depth and strategic thinking.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
