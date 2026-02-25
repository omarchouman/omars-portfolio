import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="pt-24">
      <article className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--blue-soft)]"
        >
          ← Back to blog
        </Link>
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="mt-4 block text-sm text-[var(--muted-foreground)]"
          >
            {post.date
              ? new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </time>
        </header>
        <div className="blog-content">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
}
