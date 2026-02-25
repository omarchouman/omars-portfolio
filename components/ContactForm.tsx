"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate submit; replace with your API or form service
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors focus:border-[var(--blue-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-soft)]/20"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors focus:border-[var(--blue-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-soft)]/20"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-2 w-full resize-none rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors focus:border-[var(--blue-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-soft)]/20"
          placeholder="What are you building?"
        />
      </div>
      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-[var(--radius-button)] bg-[var(--blue-royal)] px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-soft)] transition-all hover:bg-[var(--blue-soft)] hover:shadow-md disabled:opacity-70"
        whileHover={{ scale: status === "idle" ? 1.01 : 1 }}
        whileTap={{ scale: status === "idle" ? 0.99 : 1 }}
      >
        {status === "idle" && "Send message"}
        {status === "sending" && "Sending…"}
        {status === "sent" && "Message sent"}
        {status === "error" && "Try again"}
      </motion.button>
    </form>
  );
}
