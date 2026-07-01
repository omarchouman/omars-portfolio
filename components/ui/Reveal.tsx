"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

const tags = {
  div: motion.div,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  article: motion.article,
  li: motion.li,
  ul: motion.ul,
};

type RevealTag = keyof typeof tags;

type RevealProps = {
  as?: RevealTag;
  children?: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  delay?: number;
  duration?: number;
  /** Animate once when scrolled into view (default) vs. immediately on mount. */
  viewport?: boolean;
  transition?: Transition;
};

/** Client-only fade/slide-in wrapper so parent content components can stay server components. */
export function Reveal({
  as = "div",
  children,
  className,
  x = 0,
  y = 20,
  delay = 0,
  duration = 0.5,
  viewport = true,
  transition,
}: RevealProps) {
  const MotionTag = tags[as];
  const revealProps = viewport
    ? { whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true } }
    : { animate: { opacity: 1, x: 0, y: 0 } };

  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      transition={transition ?? { duration, delay }}
      className={className}
      {...revealProps}
    >
      {children}
    </MotionTag>
  );
}
