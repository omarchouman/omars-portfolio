import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogContent } from "@/components/sections/BlogContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Omar Chouman — Writing about engineering, systems, AWS, and career leverage.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-20 sm:pt-24">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
          Writing & Thinking
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted-foreground)]">
          I write about engineering, systems, and career leverage.
        </p>
        <BlogContent posts={posts} />
      </section>
    </div>
  );
}
