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

Copy `.env.example` to `.env.local` before running locally. Vars:

- `RESEND_API_KEY` — Resend API key used by `app/api/contact/route.ts` to send contact form emails
- `NEXT_PUBLIC_LINKEDIN_EMBED_URL` — (optional) LinkedIn post embed URL for the home page LinkedIn section

## Architecture

**Next.js 16.1.6 App Router** project using React 19, TypeScript, Tailwind CSS v4, Framer Motion, and `next-themes`.

### Page Structure

- `/` — Home page: composing section components (Hero, WhatIDo, CoreExpertise, Founder, Writing, LinkedInSection)
- `/about`, `/projects`, `/contact` — Single-section pages wrapping components from `components/sections/`
- `/blog` — Public blog listing, reads from `content/blog/*.md`
- `/blog/[slug]` — Individual blog post page

### Blog Content

Blog posts are **Markdown files on disk** at `content/blog/`, committed to the repo — there is no in-app editor or write API. To publish, add/edit a `.md` file under `content/blog/` and push; the site reads them at build time.

- `lib/blog.ts` — filesystem read helpers (`getAllPosts`, `getPostBySlug`) using `gray-matter` for frontmatter
- `components/blog/MarkdownRenderer.tsx` — renders post content via `react-markdown` + `remark-gfm`

Frontmatter schema: `title`, `slug`, `date` (YYYY-MM-DD), `excerpt`.

### Contact Form

`components/ContactForm.tsx` posts to `app/api/contact/route.ts`, which sends email via Resend (`no-reply@omarchouman.com` → `omar.chouman0@gmail.com`, with `replyTo` set to the submitter's address). Includes a hidden honeypot field (`company`) for basic spam filtering.

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
