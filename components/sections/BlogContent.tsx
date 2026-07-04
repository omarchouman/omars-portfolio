import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";
import { CoverImage } from "@/components/blog/CoverImage";

type Props = { posts: BlogPostMeta[] };

function formatDate(date: string) {
  return date
    ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
}

export function BlogContent({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <Reveal viewport={false} className="mt-16">
        <div className="glass-card flex min-h-[240px] flex-col items-center justify-center rounded-2xl p-12 text-center">
          <p className="text-[var(--muted-foreground)]">No posts yet. Check back soon.</p>
        </div>
      </Reveal>
    );
  }

  return (
    <ul className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-8">
      {posts.map((post, i) => (
        <Reveal key={post.slug} as="li" viewport={false} duration={0.4} delay={i * 0.05} className="h-full">
          <Link
            href={`/blog/${post.slug}`}
            className="group glass-card flex h-full flex-col overflow-hidden transition-all hover:border-[var(--blue-soft)]/30 hover:shadow-lg"
          >
            <CoverImage
              src={post.cover}
              alt={post.title}
              aspectClassName="aspect-[16/9]"
              sizes="(max-width: 639px) 100vw, 448px"
              priority={i === 0}
            />
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--blue-soft)]">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 line-clamp-2 text-[var(--muted-foreground)]">{post.excerpt}</p>
              )}
              <div className="mt-4 flex flex-1 items-end text-sm text-[var(--muted-foreground)]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.date && <span className="mx-2">·</span>}
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
