// Service worker template. The build (see astro.config.mjs) fills in VERSION and PRECACHE
// and writes the result to dist/sw.js.
const VERSION = "__VERSION__";
const PRECACHE = ["__PRECACHE__"];
const PAGES = `site-${VERSION}`;
const RUNTIME = "runtime";

// Cache every page and asset up front, so the whole site works offline.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(PAGES).then((cache) => cache.addAll(PRECACHE)));
});

// Drop caches from older deploys (and from previous service workers).
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key !== PAGES && key !== RUNTIME) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || new URL(request.url).origin !== location.origin) return;

  // Pages: fresh from the network when online, cached copy when offline.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(request, { ignoreSearch: true })));
    return;
  }

  // Everything else: cache first. Images and PDFs are cached the first time they're viewed.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ??
        fetch(request).then((response) => {
          if (response.ok && /\.(png|jpe?g|webp|avif|gif|svg|pdf)$/.test(request.url)) {
            const copy = response.clone();
            caches.open(RUNTIME).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
