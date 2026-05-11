import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogAdmin } from "@/components/blog/BlogAdmin";
import { LogoutButton } from "@/components/blog/LogoutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Blog",
  description: "Add, edit, and delete blog posts.",
  robots: "noindex, nofollow",
};

export default function BlogAdminPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-20 sm:pt-24">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/blog"
              className="mb-4 inline-block text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--blue-soft)]"
            >
              ← Back to blog
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Manage posts
            </h1>
            <p className="mt-2 text-[var(--muted-foreground)]">
              Add, edit, or delete blog posts.
            </p>
          </div>
          <LogoutButton />
        </div>
        <BlogAdmin initialPosts={posts} />
      </div>
    </div>
  );
}
