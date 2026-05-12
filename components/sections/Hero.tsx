"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] pt-14 md:pt-16 lg:min-h-[100vh]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center px-4 sm:px-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-12 lg:gap-12">
        {/* Content — left */}
        <div className="relative order-1 flex flex-col justify-center py-8 sm:py-12 md:py-16 lg:order-1 lg:col-span-7 lg:pr-0">
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
            className="text-3xl font-bold leading-[1.2] tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"
          >
            Build Systems That Scale.
            <br />
            <span className="text-[var(--muted-foreground)]">Think in Leverage. Deliver with Clarity.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)] sm:mt-8 sm:text-lg"
          >
            I&apos;m Omar Chouman, a software engineer focused on building reliable, scalable
            systems across cloud, AI, and full-stack architecture.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center rounded-xl bg-[var(--blue-royal)] px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-soft)] transition-all hover:bg-[var(--blue-soft)] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-soft)] focus-visible:ring-offset-2"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-xl border border-[var(--border)] bg-transparent px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--blue-soft)] hover:text-[var(--blue-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-soft)] focus-visible:ring-offset-2"
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
          className="relative order-2 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end"
        >
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[26rem] lg:w-[26rem] xl:h-[30rem] xl:w-[30rem]">
            <Image
              src="/images/Omar.jpg"
              alt="Omar Chouman"
              fill
              priority
              sizes="(max-width: 1023px) 384px, 480px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
