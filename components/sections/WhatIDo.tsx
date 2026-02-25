"use client";

import { motion } from "framer-motion";

export function WhatIDo() {
  return (
    <section className="section-glow bg-[var(--background)] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          What I Actually Do
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 space-y-6 text-[var(--muted-foreground)] leading-relaxed"
        >
          <p className="text-lg">
            I design and ship systems that survive reality.
          </p>
          <p>
            From AI-powered microservices to full-stack platforms, I focus on building software
            that is not just correct, but defensible. Clean architecture. Clear trade-offs.
            Scalable infrastructure.
          </p>
          <p>
            I&apos;ve worked across backend engineering, cloud systems, DevOps pipelines, frontend
            applications, and machine learning workflows. My work is grounded in production, not
            theory.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
