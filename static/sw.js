// i want to create a service worker file for pwa and i want to implement these things:
// 1. stale while revalidate
// 2. cache all the response on first page load on install event
// 3. serve 404.html file if the item is not present in cache and the device is offline
// give me an example code for this implementation

const CACHE_NAME = "my-cache-name";
const urlsToCache = [
  "/",
  "/404.html", // custom 404 page
  "index.html",
  "manifest.json",
  "madmax.avif",
];

// Listen for the 'install' event
self.addEventListener("install", (event) => {
  // Open the cache and add all URLs to it
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for the 'fetch' event
self.addEventListener("fetch", (event) => {
  // Check if the browser is offline
  if (!navigator.onLine) {
    // Redirect the user to the custom 404 page
    event.respondWith(caches.match("/404.html"));
  } else {
    // Check if the request is already in the cache
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // If the request is in the cache, return it
          return response;
        }
        // If the request is not in the cache, fetch it and add it to the cache
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200) {
              // If the response is not valid, redirect to the custom 404 page
              return caches.match("/404.html");
            }
            // If the response is valid, clone it and add it to the cache
            var responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch(() => {
            // If the request fails, redirect to the custom 404 page
            return caches.match("/404.html");
          });
      })
    );
  }
});
