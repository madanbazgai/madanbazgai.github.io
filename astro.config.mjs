// @ts-check
import sitemap from "@astrojs/sitemap";
import { AstroPWAIntegration } from "@vite-pwa/astro";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://madanbajgai.com.np",
  trailingSlash: "always",
  integrations: [
    // Only pages worth ranking: tag/category lists and search are marked noindex.
    sitemap({ filter: (page) => !/\/(tags|categories|search)\//.test(new URL(page).pathname) }),
    AstroPWAIntegration({
      registerType: "autoUpdate",
      injectRegister: false,
      includeManifestIcons: false,
      includeAssets: ["favicon.ico"],
      manifest: {
        id: "/",
        name: "Madan Bazgai",
        short_name: "Madan Bazgai",
        description: "My personal portfolio & blog app",
        start_url: "/",
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#000",
        background_color: "#000",
        icons: [
          { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      generateSW: {
        // Precache every page and the app shell; images and note PDFs are cached when first viewed.
        globPatterns: ["**/*.{html,css,js,woff2,json}"],
        globIgnores: ["404.html"],
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: { cacheName: "images", expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 } },
          },
          {
            urlPattern: ({ url }) => url.pathname.endsWith(".pdf"),
            handler: "CacheFirst",
            options: { cacheName: "notes", expiration: { maxEntries: 50 } },
          },
        ],
      },
    }),
  ],
  markdown: {
    shikiConfig: { theme: "gruvbox-dark-medium" },
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
    },
  ],
});
