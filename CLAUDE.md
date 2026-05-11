# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Production build
npm run lint      # Run ESLint
```

No test suite is configured.

## Environment Variables

Copy `.env.example` to `.env.local` before running locally. Required vars:

- `BLOG_ADMIN_SECRET` — JWT signing secret, minimum 32 characters (generate with `openssl rand -base64 32`)
- `BLOG_ADMIN_PASSWORD` — plaintext password for the blog admin login
- `NEXT_PUBLIC_LINKEDIN_EMBED_URL` — (optional) LinkedIn post embed URL for the home page LinkedIn section

## Architecture

**Next.js 16.1.6 App Router** project using React 19, TypeScript, Tailwind CSS v4, Framer Motion, and `next-themes`.

### Page Structure

- `/` — Home page: composing section components (Hero, WhatIDo, CoreExpertise, Founder, Writing, LinkedInSection)
- `/about`, `/projects`, `/contact` — Single-section pages wrapping components from `components/sections/`
- `/blog` — Public blog listing, reads from `content/blog/*.md`
- `/blog/[slug]` — Individual blog post page
- `/blog/admin` — Protected CMS (requires JWT cookie); redirected to `/blog/admin/login` if unauthenticated

### Blog CMS

Blog posts are **Markdown files on disk** at `content/blog/`. All CRUD is handled by:
- `lib/blog.ts` — filesystem helpers (`getAllPosts`, `getPostBySlug`, `createPost`, `updatePost`, `deletePost`) using `gray-matter` for frontmatter
- API routes at `app/api/blog/` — POST (create), GET/PUT/DELETE at `app/api/blog/[slug]/`
- `components/blog/BlogAdmin.tsx` — client-side admin UI
- `components/blog/MarkdownRenderer.tsx` — renders post content via `react-markdown` + `remark-gfm`

Frontmatter schema: `title`, `slug`, `date` (YYYY-MM-DD), `excerpt`.

### Auth

`middleware.ts` protects `/blog/admin/**` and API write routes by verifying a JWT stored in an `httpOnly` cookie (`blog_admin_token`). Auth logic lives in `lib/auth.ts` (uses `jose`). Login/logout endpoints: `app/api/auth/blog-login/route.ts` and `app/api/auth/blog-logout/route.ts`.

### Static Data

`lib/projects.ts` exports a hardcoded `projects` array consumed by `components/sections/ProjectsGrid.tsx`.

### Styling Conventions

- Tailwind CSS v4 (PostCSS-based, no `tailwind.config` file)
- Design tokens defined as CSS custom properties in `app/globals.css` (`:root` and `.dark`)
- Key token names: `--foreground`, `--muted-foreground`, `--blue-royal`, `--blue-soft`, `--border`, `--card`
- Reusable utility class `.glass-card` for frosted-glass cards
- Dark mode via `next-themes` with `attribute="class"`
- Font: Inter (Google Fonts)
- Max content width: `max-w-6xl` for nav, `max-w-3xl`/`max-w-4xl` for page content
- Pages offset for the fixed navbar with `pt-20 sm:pt-24`
