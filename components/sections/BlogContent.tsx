import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";

type Props = { posts: BlogPostMeta[] };

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
    <ul className="mt-16 space-y-6">
      {posts.map((post, i) => (
        <Reveal key={post.slug} as="li" viewport={false} duration={0.4} delay={i * 0.05}>
          <Link
            href={`/blog/${post.slug}`}
            className="glass-card block rounded-2xl p-6 transition-all hover:border-[var(--blue-soft)]/30 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="mt-2 line-clamp-2 text-[var(--muted-foreground)]">
                {post.excerpt}
              </p>
            )}
            <time
              dateTime={post.date}
              className="mt-3 block text-sm text-[var(--muted-foreground)]"
            >
              {post.date ? new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) : ""}
            </time>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
