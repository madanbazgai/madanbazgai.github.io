importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js"
);

const { StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute([{ url: "/404.html", revision: null }]);

workbox.routing.registerRoute(
  ({ request }) => {
    return (
      request.destination === "style" ||
      request.destination === "document" ||
      request.destination === "image"
    );
  },
  new StaleWhileRevalidate({
    cacheName: "my-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ request }) => {
    return request.destination === "image";
  },
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case "document":
      return caches.match("/404.html");
    default:
      return Response.error();
  }
});
