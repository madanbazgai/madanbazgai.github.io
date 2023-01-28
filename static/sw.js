// i want to create a service worker file for pwa and i want to implement these things:
// 1. stale while revalidate
// 2. cache all the response on first page load on install event
// 3. serve 404.html file if the item is not present in cache and the device is offline
// give me an example code for this implementation

const CACHE_NAME = "my-cache-name";
const urlsToCache = [
  "/",
  "/404.html",
  "index.html",
  "manifest.json",
  "madmax.avif",
];

// Add event listener for 'install' event
self.addEventListener("install", (event) => {
  // Wait until the cache is created
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Add all URLs to cache
      return cache.addAll(urlsToCache);
    })
  );
});

// Add event listener for 'fetch' event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // If the request is already in cache, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch the request and add it to cache
        else {
          // Clone request stream
          var fetchRequest = event.request.clone();

          return fetch(fetchRequest).then((response) => {
            // If the response is not valid, return 404 page
            if (!response || response.status !== 200) {
              return caches.match("/404.html");
            }
            // Otherwise, clone response stream and add it to cache
            else {
              var responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
              return response;
            }
          });
        }
      })
      // If there is an error, return 404 page
      .catch(() => {
        return caches.match("/404.html");
      })
  );
});
