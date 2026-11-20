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
  content/notes/       notes (Markdown)
  lib/posts.ts         sorting, summaries, taxonomies, dates
  lib/structured-data.ts  JSON-LD for search engines
  lib/social-image.ts  link-preview image helper
  layouts/Base.astro   page shell (head, header, footer)
  components/          header, footer, post card, TOC, share buttons... (each with its own scoped <style>)
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

`@vite-pwa/astro` (configured in `astro.config.mjs`) generates `manifest.webmanifest` and a Workbox
service worker at build time. Every page, the CSS/JS and fonts are precached for offline use; images and
note PDFs are cached the first time they're viewed. New deploys update the service worker automatically.
Test it with `pnpm build && pnpm preview` (the service worker is not active in `pnpm dev`).

## SEO

Every page gets a title, description, canonical URL and Open Graph/Twitter tags (`src/layouts/Base.astro`).
Posts also get `BlogPosting` + breadcrumb structured data, and the home page `Person` + `WebSite`
(`src/lib/schema.ts`). Tag and search pages are `noindex` and left out of the sitemap.
Old Hugo URLs are redirected in `public/_redirects`.

## Deploy

Netlify builds with `pnpm build` and publishes `dist/` (see `netlify.toml`).
