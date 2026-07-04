"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Something went wrong");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6">
      <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" && errorMessage && (
        <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
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
      <p role="status" aria-live="polite" className="sr-only">
        {status === "sending" && "Sending message"}
        {status === "sent" && "Message sent successfully"}
        {status === "error" && (errorMessage ?? "Something went wrong, please try again")}
      </p>
    </form>
  );
}
