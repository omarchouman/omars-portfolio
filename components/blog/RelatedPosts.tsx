import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { CoverImage } from "@/components/blog/CoverImage";

type Props = { posts: BlogPostMeta[] };

export function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-[var(--border)] pt-12">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">More from the blog</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group glass-card flex flex-col overflow-hidden transition-all hover:border-[var(--blue-soft)]/30 hover:shadow-lg"
          >
            <CoverImage
              src={post.cover}
              alt={post.title}
              aspectClassName="aspect-[16/10]"
              sizes="(max-width: 639px) 100vw, 325px"
            />
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--blue-soft)]">
                {post.title}
              </h3>
              <time dateTime={post.date} className="mt-2 text-xs text-[var(--muted-foreground)]">
                {post.date
                  ? new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
