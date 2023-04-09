// i want to create a service worker file for pwa and i want to implement these things:
// 1. stale while revalidate
// 2. cache all the response on first page load on install event
// 3. serve 404.html file if the item is not present in cache and the device is offline
// give me an example code for this implementation

// const CACHE_NAME = "cache_v1";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/404.html",
//   "/manifest.json",
//   "madmax.avif",
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         if (response) {
//           return response;
//         }

//         // clone request stream
//         var fetchRequest = event.request.clone();

//         return fetch(fetchRequest).then((response) => {
//           if (!response || response.status !== 200) {
//             return caches.match("/404.html");
//           }

//           // clone response stream
//           var responseToCache = response.clone();

//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseToCache);
//           });

//           return response;
//         });
//       })
//       .catch(() => {
//         return caches.match("/404.html");
//       })
//   );
// });


// Define the cache name and the files to cache
const CACHE_NAME = "pwa-caches";
const urlsToCache = [
  "/",
  "/index.html",
  "/404.html",
  "/manifest.json",
  "madmax.avif",
];

// Use the stale-while-revalidate strategy for images
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.routing.registerRoute(
  // Match any request that ends with .png, .jpg, .jpeg or .svg.
  ({ request }) => request.destination === 'image',
  // Use the stale-while-revalidate strategy.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'image-cache',
  })
);

// Install the service worker and cache the files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});


// Activate the service worker and delete the old caches
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

// Fetch the requests and respond with the cached or network response
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
        if (fetchRequest.url.startsWith("https://") && event.request.url.indexOf(self.origin) === -1) {
          return caches.match("/404.html");
        }
        return fetch(fetchRequest).then((response) => {
          // if (event.request.url.startsWith("https") && event.request.url.indexOf(self.location.origin) === -1) {
          //   return caches.match("/404.html");
          // }
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


