"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type SpotlightCardProps = {
  as?: "article" | "div";
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Set to false when nesting inside an element that already handles its own entrance fade-in. */
  reveal?: boolean;
};

/** Wraps a card with a radial glow that follows the cursor on hover. */
export function SpotlightCard({
  as = "article",
  children,
  className = "",
  delay = 0,
  reveal = true,
}: SpotlightCardProps) {
  const MotionTag = as === "article" ? motion.article : motion.div;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.15), transparent 80%)`;

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const revealProps = reveal
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay },
      }
    : {};

  return (
    <MotionTag
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden ${className}`}
      {...revealProps}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </MotionTag>
  );
}
