"use client";

import { motion } from "framer-motion";

export function Writing() {
  return (
    <section className="bg-[var(--gradient-section)] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          Writing & Thinking
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 space-y-6 text-[var(--muted-foreground)] leading-relaxed"
        >
          <p className="text-lg">
            I write about engineering, systems, and career leverage.
          </p>
          <p>
            I&apos;m currently writing a book titled{" "}
            <strong className="text-[var(--foreground)]">&quot;What No Programmer Discloses&quot;</strong>,
            a direct look at how engineers actually grow, where most advice fails, and what separates
            competent developers from impactful ones.
          </p>
          <p>
            If you care about clarity over comfort, you&apos;ll like it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
