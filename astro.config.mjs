// @ts-check
import sitemap from "@astrojs/sitemap";
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";

/**
 * Writes dist/sw.js from src/service-worker.js, listing every page and asset to precache.
 * @returns {import("astro").AstroIntegration}
 */
const serviceWorker = () => ({
  name: "service-worker",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const root = fileURLToPath(dir);
      const files = (await readdir(root, { recursive: true }))
        .map((file) => file.replaceAll("\\", "/"))
        .filter((file) => /\.(html|css|js|woff2|json|webmanifest|ico)$/.test(file) && !["404.html", "sw.js"].includes(file))
        .sort();
      const hash = createHash("sha256");
      for (const file of files) hash.update(file).update(await readFile(join(root, file)));
      const urls = files.map((file) => `/${file.replace(/(^|\/)index\.html$/, "$1")}`);
      const template = await readFile(new URL("./src/service-worker.js", import.meta.url), "utf8");
      const sw = template
        .replace("__VERSION__", hash.digest("hex").slice(0, 12))
        .replace('["__PRECACHE__"]', JSON.stringify(urls));
      await writeFile(join(root, "sw.js"), sw);
    },
  },
});

export default defineConfig({
  site: "https://madanbajgai.com.np",
  trailingSlash: "always",
  integrations: [
    // Only pages worth ranking: tag lists and search are marked noindex.
    sitemap({ filter: (page) => !/\/(tags|search)\//.test(new URL(page).pathname) }),
    serviceWorker(),
  ],
  // Minify the SVG icons imported from src/icons.
  experimental: { svgOptimizer: svgoOptimizer() },
  // Responsive images: correct aspect ratio and a srcset so phones get smaller files.
  image: { layout: "constrained", responsiveStyles: true },
  markdown: {
    shikiConfig: {
      // Light and dark variants; global.css picks one with light-dark() based on the page theme.
      themes: { light: "github-light", dark: "gruvbox-dark-medium" },
      defaultColor: false,
      // Drop Shiki's inline styles on <pre>; global.css styles code blocks instead.
      transformers: [{ pre: (node) => void delete node.properties.style }],
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "madmax",
      cssVariable: "--font-madmax",
      fallbacks: [],
      options: {
        variants: [{ src: ["./src/assets/fonts/madmax.woff2"], weight: 500, style: "normal" }],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      fallbacks: ["monospace"],
      weights: [400],
      styles: ["normal"],
    },
  ],
});
