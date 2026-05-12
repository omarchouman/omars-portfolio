"use client";

import { motion } from "framer-motion";

const expertise = [
  {
    title: "Scalable Backend Systems",
    description: "PHP/Laravel, Node.js, Python/Flask, GraphQL. Microservices architecture, fault tolerance, API performance at scale.",
  },
  {
    title: "Cloud & Infrastructure",
    description: "AWS, Terraform, Docker, Linux. CI/CD pipelines and IAC for reusable, production-grade infrastructure.",
  },
  {
    title: "AI & Intelligent Systems",
    description: "ML model integration, anomaly detection systems, natural language query interfaces, predictive analytics, and workflow automation.",
  },
  {
    title: "Full Stack Development",
    description: "ReactJS, Next.js, AngularJS, Vue.js. End-to-end delivery across ERP, ed-tech, recruitment, and enterprise platforms.",
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
