// i want to create a service worker file for pwa and i want to implement these things:
// 1. stale while revalidate
// 2. cache all the response on first page load on install event
// 3. serve 404.html file if the item is not present in cache and the device is offline
// give me an example code for this implementation

const CACHE_NAME = "cache_v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/404.html",
  "/manifest.json",
  "madmax.avif",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        // clone request stream
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200) {
            return caches.match("/404.html");
          }

          // clone response stream
          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        return caches.match("/404.html");
      })
  );
});
