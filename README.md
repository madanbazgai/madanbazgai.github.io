# madanbajgai.com.np

Personal portfolio and blog, built with [Astro](https://astro.build). Live at **[madanbajgai.com.np](https://madanbajgai.com.np)**.

## Commands

```sh
pnpm install   # install dependencies
pnpm dev       # dev server at http://localhost:4321
pnpm build     # static build into dist/
pnpm preview   # serve dist/
pnpm check     # type-check
```

## Structure

```
src/
  config.ts            site info, menu, sections
  content.config.ts    content collections + front matter schema
  content/blog/        blog posts (Markdown)
  data/notes.ts        study notes: subjects and their PDF units (edit to add a PDF)
  lib/posts.ts         sorting, summaries, taxonomies, dates
  lib/structured-data.ts  JSON-LD for search engines
  lib/social-image.ts  link-preview image helper
  layouts/Base.astro   page shell (head, header, footer)
  components/          header, footer, post card, TOC... (each with its own scoped <style>)
  pages/               routes (/, /blog/, /notes/, /tags/, /search/, feeds)
  assets/              images and fonts (optimized at build time)
  icons/               SVG icons, imported as components
  styles/global.css    design tokens (light/dark), reset, base layout, article typography
public/                static files served as-is (note PDFs, icons, redirects, headers)
```

## Writing a post

Add a Markdown file to `src/content/blog/` (the file name is the URL slug):

```md
---
title: "My Post"
date: 2026-01-01T10:00:00+05:45
description: "One-sentence summary shown on cards, in Google and in link previews (max 160 chars)"
tags: ["react"]
pinned: true            # optional: list it under "Pinned Articles" on the home page
cover:
  image: "../../assets/images/blogicon/my-post.png"   # relative path, gets optimized
  alt: "Describe the image"
---
```

Images inside a post work the same way: `![Alt text](../../assets/images/postsimage/x.png)`.

## PWA

The site is an installable, offline-capable PWA with no PWA dependency:

- `public/manifest.webmanifest` is the web app manifest.
- `src/service-worker.js` is the service worker (about 40 lines). After each build, a small integration in
  `astro.config.mjs` fills in the list of every page and asset plus a content-hash version and writes `dist/sw.js`.
- Pages are fetched fresh when online and served from the cache offline; assets are cache-first; images and
  note PDFs are cached the first time they're viewed. Each deploy gets a new version, and old caches are deleted.

Test it with `pnpm build && pnpm preview` (no service worker in `pnpm dev`).

## SEO

Every page gets a title, description, canonical URL and Open Graph/Twitter tags (`src/layouts/Base.astro`).
Posts also get `BlogPosting` + breadcrumb structured data, and the home page `Person` + `WebSite`
(`src/lib/structured-data.ts`). Tag and search pages are `noindex` and left out of the sitemap.
Old Hugo URLs are redirected in `public/_redirects`.

## Deploy

Netlify builds with `pnpm build` and publishes `dist/` (see `netlify.toml`).
