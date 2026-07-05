import type { BlogPost, BlogPostMeta } from "@/lib/blog";

const SITE_URL = "https://omar-chouman.com";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Omar Chouman",
    url: SITE_URL,
    image: `${SITE_URL}/images/Omar.jpg`,
    jobTitle: "Software Engineer",
    email: "omar.chouman0@gmail.com",
    sameAs: ["https://www.linkedin.com/in/omarchouman"],
    worksFor: {
      "@type": "Organization",
      name: "JUSTECH",
      url: "https://justechlb.com",
    },
    description:
      "Software engineer focused on building reliable, scalable systems across cloud, AI, and full-stack architecture. Founder of JUSTECH.",
  };
}

export function getBlogPostingJsonLd(post: BlogPost | BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date || undefined,
    url: `${SITE_URL}/blog/${post.slug}`,
    image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
    author: {
      "@type": "Person",
      name: "Omar Chouman",
      url: SITE_URL,
    },
  };
}
