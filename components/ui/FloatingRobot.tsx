"use client";

import { motion } from "framer-motion";

export function FloatingRobot() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-20 w-20 text-[var(--blue-soft)] sm:h-24 sm:w-24"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
      <rect x="4" y="6" width="16" height="13" rx="3" />
      <line x1="4" y1="10" x2="2" y2="10" />
      <line x1="20" y1="10" x2="22" y2="10" />
      <circle cx="9" cy="12.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.5" r="1.4" fill="currentColor" stroke="none" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </motion.svg>
  );
}
