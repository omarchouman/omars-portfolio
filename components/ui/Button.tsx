"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius-button)] px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-soft)] focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-[var(--blue-royal)] text-white shadow-[var(--shadow-soft)] hover:bg-[var(--blue-soft)] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--blue-soft)] hover:text-[var(--blue-soft)]",
    ghost:
      "text-[var(--muted-foreground)] hover:bg-[var(--border)] hover:text-[var(--foreground)]",
  };

  const combined = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combined}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} className={combined}>
        {children}
      </Link>
    </motion.span>
  );
}
