"use client";

import { motion } from "framer-motion";

const expertise = [
  {
    title: "Scalable Backend Systems",
    description: "Microservices, APIs, performance optimization, system design.",
  },
  {
    title: "Cloud & Infrastructure",
    description: "AWS deployments, Docker, CI/CD pipelines, automation.",
  },
  {
    title: "AI & Intelligent Systems",
    description: "Machine learning integration, predictive analytics, workflow automation.",
  },
  {
    title: "Full Stack Development",
    description: "Laravel, Flask, React, Angular, modern frontend architecture.",
  },
];

export function CoreExpertise() {
  return (
    <section className="bg-[var(--gradient-section)] py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          Core Expertise
        </motion.h2>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {expertise.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-6 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
