---
title: "Tailwind CSS V4 got simpler,lighter and faster."
date: 2025-01-13T23:03:02+05:45
draft: false
# weight: 1
# aliases: ["/first"]
categories: ["css"]
tags: ["tailwindcss", "pinned"]
author: "Me"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
# description: "Desc Text."
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
cover:
  image: "/images/blogicon/tailwindcss.png" # image path/url
  alt: "Tailwind CSS V4 got simpler,lighter and faster." # alt text
  caption: "<blog image>" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: true # only hide on current single page
---

![TailwindCss](/images/blogicon/tailwindcss.png)
Tailwind CSS is one of my favorite and go-to tools. It's almost a standard way of writing CSS these days. Even LLMs and AI tools are giving Tailwind CSS code these days.

Here are some of the highlights of V4:

1.  Build time **10X faster**, Incremental build **100X faster**.
2.  **35% smaller** footprint.
3.  Power of **Rust** and **Lightning CSS**.
4.  **2X Faster** parser.
5.  **CSS-first** config, **Unified** toolchain.
6.  **Modern CSS** features.

## Getting Started (with Vite)

Here's a quick guide to get started with Tailwind CSS V4 and Vite:

1.  **Install**

    ```bash
    pnpm i tailwindcss @tailwindcss/vite
    ```

2.  **Import in `vite.config.ts`**

    ```javascript
    import { defineConfig } from "vite";
    import tailwindcss from "@tailwindcss/vite";

    export default defineConfig({
      plugins: [tailwindcss()],
    });
    ```

3.  **Root CSS File (`index.css`)**

    ```css
    @import "tailwindcss";
    ```
