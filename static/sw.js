const OFFLINE_VERSION = 10;
const CACHE_NAME = "offline";
const DYNAMIC_CACHE = "dynamic-v10";
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/404.html",
  "/madmax.avif",
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     (async () => {
//       if ("navigationPreload" in self.registration) {
//         await self.registration.navigationPreload.enable();
//       }
//     })()
//   );

//   self.clients.claim();
// });

// activate event
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(function (res) {
            return caches.open(DYNAMIC_CACHE).then(function (cache) {
              cache.put(event.request.url, res.clone());
              // limitCacheSize(DYNAMIC_CACHE, 15);
              return res;
            });
          });
        }
      })
      .catch(() => caches.match("404.html"))
  );
});
