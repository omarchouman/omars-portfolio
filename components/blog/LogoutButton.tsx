"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/blog-logout", { method: "POST" });
    router.push("/blog/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400"
    >
      Sign out
    </button>
  );
}
