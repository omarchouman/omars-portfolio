import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { CoverImage } from "@/components/blog/CoverImage";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Reveal } from "@/components/ui/Reveal";
import { getBlogPostingJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

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

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="pt-20 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogPostingJsonLd(post)) }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          href="/blog"
          className="mb-6 inline-block text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--blue-soft)]"
        >
          ← Back to blog
        </Link>
        <Reveal viewport={false}>
          <CoverImage
            src={post.cover}
            alt={post.title}
            aspectClassName="aspect-[21/9]"
            priority
            sizes="(max-width: 1024px) 100vw, 992px"
            className="rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)]"
          />
        </Reveal>
      </div>

      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:items-start">
          <div className="min-w-0">
            <Reveal as="div" viewport={false} delay={0.05}>
              <header className="mb-12">
                <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex items-center text-sm text-[var(--muted-foreground)]">
                  <time dateTime={post.date}>
                    {post.date
                      ? new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </time>
                  {post.date && <span className="mx-2">·</span>}
                  <span>{post.readingTime} min read</span>
                </div>
              </header>
            </Reveal>
            <div className="blog-content">
              <MarkdownRenderer content={post.content} headings={post.headings} />
            </div>
          </div>

          {post.headings.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents headings={post.headings} />
            </aside>
          )}
        </div>

        <RelatedPosts posts={related} />
      </article>
    </div>
  );
}
