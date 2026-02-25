"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";

const contactInfo = [
  { label: "Email", value: "omar@justechlb.com", href: "mailto:omar.chouman0@gmail.com" },
  { label: "Location", value: "Beirut, Lebanon", href: null },
  { label: "Company", value: "JUSTECH", href: null },
];

export function ContactContent() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl"
        >
          Let&apos;s Build Something That Lasts.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 max-w-2xl text-lg text-[var(--muted-foreground)] leading-relaxed"
        >
          If you&apos;re building something complex, scaling a platform, or rethinking how your
          systems are structured, I&apos;m open to conversations.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 text-[var(--muted-foreground)]"
        >
          I work with startups, enterprises, and founders who care about long-term quality.
        </motion.p>

        <div className="mt-16 grid gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Contact Info
            </h2>
            <ul className="space-y-4">
              {contactInfo.map(({ label, value, href }) => (
                <li key={label}>
                  <span className="block text-sm text-[var(--muted-foreground)]">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      className="text-[var(--foreground)] transition-colors hover:text-[var(--blue-soft)]"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-[var(--foreground)]">{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
