# Blog

## Purpose
Chiel's writing on QA, Playwright patterns, and AI testing. MDX files in the repo — no CMS, no database.

## Files
- `lib/blog.ts` — data layer (read + parse MDX files)
- `content/blog/*.mdx` — blog post content
- `app/blog/page.tsx` — listing page
- `app/blog/[slug]/page.tsx` — post detail page
- `components/BlogPostCard.tsx` — card on listing page

## Data Layer (lib/blog.ts)

### PostMeta interface
```ts
{ slug, title, date, excerpt, tags: string[], readingTime }
```

### Post interface
Extends PostMeta with `source: string` (raw MDX content).

### getAllPosts()
- Reads all `.mdx` files from `content/blog/`
- Parses frontmatter via `gray-matter`
- Calculates reading time: `Math.ceil(words / 200)` min, minimum 1
- Returns sorted by date DESC

### getPostBySlug(slug)
- Reads single `.mdx` file
- Returns `Post` or `null` if not found

## MDX Frontmatter Schema
```yaml
---
title: string        # required
date: YYYY-MM-DD     # required
excerpt: string      # required — shown on listing card
tags: string[]       # optional
---
```

## Listing Page (/blog)
- Title: `Thoughts on QA` — `text-5xl md:text-6xl`
- Max width `max-w-3xl` (narrower than other pages)
- Empty state: `Posts coming soon.`
- Posts rendered as `<BlogPostCard />` components

## BlogPostCard (components/BlogPostCard.tsx)
Displays: title (h2, `text-text-primary text-2xl`), date, excerpt, tags, reading time.
Links to `/blog/[slug]`.

## Post Detail Page (/blog/[slug])
- Renders MDX source using `@next/mdx` or custom renderer
- Applies `.prose-dark` class for MDX styling (see design-system spec)
- `generateStaticParams()` pre-renders all posts at build time
- Returns 404 if slug not found

## Adding a Post
Create `content/blog/<slug>.mdx` with required frontmatter. The post appears automatically on the listing page after next build/restart.

## Current Posts
- `hello-world.mdx` — introductory post
