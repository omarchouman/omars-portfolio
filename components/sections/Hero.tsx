"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-[var(--background)] pt-16">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl grid-cols-1 items-center px-6 lg:grid-cols-12 lg:gap-12">
        {/* Content — left */}
        <div className="relative order-1 flex flex-col justify-center py-16 lg:order-1 lg:col-span-8 lg:pr-0">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 block h-px w-12 bg-[var(--blue-soft)]"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
          >
            Build Systems That Scale.
            <br />
            <span className="text-[var(--muted-foreground)]">Think in Leverage. Deliver with Clarity.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted-foreground)]"
          >
            I&apos;m Omar Chouman, a software engineer focused on building reliable, scalable
            systems across cloud, AI, and full-stack architecture.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center rounded-xl bg-[var(--blue-royal)] px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-soft)] transition-all hover:bg-[var(--blue-soft)] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-soft)] focus-visible:ring-offset-2"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-[var(--border)] bg-transparent px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--blue-soft)] hover:text-[var(--blue-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-soft)] focus-visible:ring-offset-2"
            >
              Work With Me
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-soft)] focus-visible:ring-offset-2"
            >
              Read My Writing
            </Link>
          </motion.div>
        </div>

        {/* Image — right, smaller */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 flex justify-center lg:order-2 lg:col-span-4 lg:justify-end"
        >
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <Image
              src="/images/Omar.jpg"
              alt="Omar Chouman"
              fill
              priority
              sizes="(max-width: 1023px) 288px, 320px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
