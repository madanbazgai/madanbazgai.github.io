const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
const DYNAMIC_CACHE = "dynamic-v1";
const assets = ["/", "index.html", "manifest.json", "404.html", "madmax.avif"];

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
              limitCacheSize(DYNAMIC_CACHE, 10);
              return res;
            });
          });
        }
      })
      .catch(() => caches.match("404.html"))
  );
});

// self.addEventListener("fetch", function (event) {
//   var url = "https://localhost:1313";

//   if (event.request.url.indexOf(url) > -1) {
//     event.respondWith(
//       caches.open(DYNAMIC_CACHE).then(function (cache) {
//         return fetch(event.request).then(function (res) {
//           cache.put(event.request, res.clone());
//           return res;
//         });
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then(function (response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function (res) {
//               return caches.open(DYNAMIC_CACHE).then(function (cache) {
//                 cache.put(event.request.url, res.clone());
//                 return res;
//               });
//             })
//             .catch(function (err) {
//               return caches.open(CACHE_NAME).then(function (cache) {
//                 return cache.match("404");
//               });
//             });
//         }
//       })
//     );
//   }
// });
