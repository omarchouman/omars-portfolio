"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import Link from "next/link";

export function ProjectsGrid() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-2xl text-[var(--muted-foreground)]"
        >
          Selected work across backend systems, full-stack platforms, and AI integration.
        </motion.p>
        <div className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="h-full"
            >
              <Link href={project.href} className="group block h-full" target="_blank" rel="noopener noreferrer">
                <div className="glass-card flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:shadow-lg group-hover:border-[var(--blue-soft)]/30">
                  <h3 className="text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--blue-soft)]">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-grow flex-wrap content-start gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-[var(--blue-royal)]/10 px-2.5 py-1 text-xs font-medium text-[var(--blue-soft)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--blue-soft)]">
                    View project →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
