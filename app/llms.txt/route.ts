import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

const SITE_URL = "https://omar-chouman.com";

export async function GET() {
  const posts = getAllPosts();

  const postLines = posts
    .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`)
    .join("\n");

  const projectLines = projects
    .map((project) => `- [${project.title}](${project.href}): ${project.description}`)
    .join("\n");

  const content = `# Omar Chouman

> Software engineer focused on building reliable, scalable systems across cloud, AI, and full-stack architecture. Founder of JUSTECH.

Omar Chouman is a software engineer based in Beirut, Lebanon, specializing in backend systems, cloud infrastructure, and AI-powered applications. He is the founder of JUSTECH, a software development agency, and has professional experience at Aspire Software, Intalio, Kamkalima, and Cirrus.

## Pages

- [About](${SITE_URL}/about): Background, engineering philosophy, and professional experience
- [Projects](${SITE_URL}/projects): Selected projects across backend systems, full-stack platforms, and AI integration
- [Blog](${SITE_URL}/blog): Writing on engineering, systems, AWS, and career leverage
- [Contact](${SITE_URL}/contact): Get in touch

## Projects

${projectLines}

## Blog Posts

${postLines}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
