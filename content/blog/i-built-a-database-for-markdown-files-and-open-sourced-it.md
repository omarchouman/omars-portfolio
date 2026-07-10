---
title: "I Built a Database for Markdown Files (and Open Sourced It)"
slug: i-built-a-database-for-markdown-files-and-open-sourced-it
date: "2026-06-15"
excerpt: "Every developer has that one problem they keep bumping into. The kind that isn’t big enough to ruin your day, but shows up often enough that it starts to…"
cover: "https://cdn-images-1.medium.com/max/800/1*nE4di0T9RGzUz2SNJl61LA.png"
---

### How a recurring side-project frustration turned into flatmark, npm package

* * *

Every developer has that one problem they keep bumping into. The kind that isn’t big enough to ruin your day, but shows up often enough that it starts to bug you. For me, that problem was content.

Every time I started a new blog, a docs site, or even just a little page to write things down, I hit the same wall. My content was sitting right there in nice, clean markdown files. But the moment I wanted to actually do something with it, like show my five most recent posts or hide the drafts, I had two bad options.

I could hand-roll it. Read the directory, loop over the files, parse the frontmatter, sort the results, filter out the drafts. It works, but I’d end up writing the same fiddly glue code in every single project.

Or I could reach for a CMS. And that always felt like bringing a moving truck to carry a backpack. Suddenly I had a database to host, an admin panel I didn’t want, and my content was locked away somewhere instead of living in my repo.

I kept thinking the same thing: my markdown files are already structured data. Why can’t I just query them like a database?

So I built that. It’s called flatmark, and it’s my second official open source project.

![](https://cdn-images-1.medium.com/max/800/1*nE4di0T9RGzUz2SNJl61LA.png)

What FlatMark actually is

The simplest way I can describe it is this. FlatMark is like SQLite, but for markdown.

You point it at a folder of .md files and it gives you a clean query API over them. It reads every file, parses the YAML frontmatter, and builds an index in memory when your app starts. After that, querying is instant because nothing is touching the disk anymore.

Here is what using it looks like:

```typescript
import { FlatMark } from '@flatmark/core'const db = new FlatMark('./content')await db.load()const posts = db.collection('posts') .where({ draft: false }) .orderBy('date', 'desc') .limit(10) .get()
```

That is the whole thing. No server, no migrations, no config files. Just files.

One folder is one collection

The mental model is intentionally tiny. A folder is a collection. Every markdown file inside it is a record.

```css
content/ posts/ hello-world.md getting-started.md authors/ jane.md
```

So content/posts becomes db.collection(‘posts’) and each file turns into something you can query:

```typescript
{ _id: 'hello-world', _path: '/content/posts/hello-world.md', _body: '# Hello\n\nWelcome to my blog…', title: 'Hello World', date: '2024–01–15', draft: false, tags: ['typescript', 'markdown']}
```

All of your frontmatter fields sit right at the top level, so you can filter and sort on any of them. The frontmatter is standard YAML, which means it already plays nicely with Obsidian, Hugo, Astro, Jekyll, and basically every other markdown tool you already use.

A query API that reads like a sentence

This was the part I cared about most. I wanted the API to feel obvious. You chain methods until you describe what you want, then you call something to actually run it.

```typescript
// First post matching a slugconst post = db.collection('posts') .where({ slug: 'hello-world' }) .first()// Count the draftsconst drafts = db.collection('posts') .where({ draft: true }) .count()// Page two, ten per pageconst page2 = db.collection('posts') .where({ draft: false }) .orderBy('date', 'desc') .limit(10) .offset(10) .get()
```

When a simple equality check is not enough, there are filter operators for the common cases:

```typescript
.where({ views: { $gt: 100 } }).where({ tags: { $includes: 'typescript' } }).where({ hero: { $exists: true } })
```

And because the queries run against an in memory index, all of your reads are synchronous. You load once, then everything after that is just fast array operations under the hood.

It writes too

FlatMark is not read only. You can create, update, and delete files through the same API, and it keeps the in memory index in sync for you.

```typescript
await db.collection('posts').insert({ _id: 'my-new-post', title: 'My New Post', date: '2024–06–01', draft: true, _body: '# My New Post\n\nContent here.' })await db.collection('posts').update('my-new-post', { draft: false })await db.collection('posts').delete('my-new-post')
```

Reads are synchronous, writes are async because they touch the disk. That split kept the whole thing predictable.

A couple of nice extras

If you want guarantees about the shape of your frontmatter, you can pass a Zod schema and FlatMark will validate on writes. It is completely optional. The core library does not depend on Zod at all, so you only bring it in if you want it.

There is also a file watcher for development. Turn it on and the index updates itself whenever a file changes on disk, which is exactly what you want when you are editing posts and refreshing your dev server.

```typescript
await db.load({ watch: true })
```

Testing it on a real app

To make sure this was not just nice in theory, I built a small Next.js blog with it. Nine markdown posts, a homepage that lists the published ones newest first, individual post pages, and real pagination driven entirely by .limit() and .offset().

It just worked. Drafts stayed hidden, pages turned correctly, and there was no database anywhere in sight. That was the moment it clicked for me that this was actually useful and not just a fun weekend idea.

Where this is going

Right now FlatMark is a TypeScript package, but the longer term dream is to make it language agnostic. Markdown is universal, so the query layer over it should be too. This launch is really just the starting point.

If you have ever fought with content on a side project, I think you will get why I built this. And if it sounds useful to you, the best thing you can do is go give the repository a star. It genuinely helps a small open source project get noticed, and it would honestly mean a lot to me. Feedback, issues, and pull requests are all very welcome too.

You can find it here:

GitHub: [https://github.com/omarchouman/flatmark](https://github.com/omarchouman/flatmark)  
npm: [https://www.npmjs.com/package/@flatmark/core](https://www.npmjs.com/package/@flatmark/core)

Thanks for reading. Now go query some markdown.
