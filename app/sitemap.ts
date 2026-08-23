import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllPrompts } from "@/lib/power-prompts";
import { getAllSkills } from "@/lib/skills";

const SITE_URL = "https://omar-chouman.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const prompts = getAllPrompts();
  const skills = getAllSkills();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/resources/power-prompts`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/resources/skills`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const promptRoutes: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${SITE_URL}/resources/power-prompts/${prompt.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const skillRoutes: MetadataRoute.Sitemap = skills.map((skill) => ({
    url: `${SITE_URL}/resources/skills/${skill.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...promptRoutes, ...skillRoutes];
}
