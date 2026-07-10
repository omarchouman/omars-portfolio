import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import { BlogContent } from "@/components/sections/BlogContent";
import { Pagination } from "@/components/blog/Pagination";

const POSTS_PER_PAGE = 6;

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;
  return {
    title: pageNumber > 1 ? `Blog – Page ${pageNumber}` : "Blog",
    description: "Omar Chouman — Writing about engineering, systems, AWS, and career leverage.",
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const currentPage = page === undefined ? 1 : Number(page);
  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="pt-20 sm:pt-24">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
          Writing & Thinking
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted-foreground)]">
          I write about engineering, systems, and career leverage.
        </p>
        <BlogContent posts={paginatedPosts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    </div>
  );
}
