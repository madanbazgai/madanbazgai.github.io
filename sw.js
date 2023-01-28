const CACHE_NAME = "static-v2";
const DYNAMIC_CACHE = "dynamic-v2";
const assets = ["/", "index.html", "manifest.json", "404.html", "madmax.avif"];
const dynamicCacheLimit = 20;

const limitCacheSize = async (name, maxItems) => {
  try {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      const oldestKey = keys.sort((a, b) => {
        const dateA = new Date(a.headers.get("date")) || new Date();
        const dateB = new Date(b.headers.get("date")) || new Date();
        return dateA - dateB;
      })[0];
      await cache.delete(oldestKey);
      console.log(`Oldest item removed: ${oldestKey.url}`);
    }
  } catch (err) {
    console.log(`Error deleting oldest item: ${err}`);
  }
};

const cacheFirstStrategy = async (request) => {
  try {
    const response = await caches.match(request);
    if (response) {
      return response;
    }
    const res = await fetch(request);
    if (res.status === 301) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, res.clone());
      return res;
    }
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, res.clone());
    return res;
  } catch (err) {
    console.log(err);
    const errorRes = await caches.match("404.html");
    return errorRes || new Response("error");
  }
};

self.addEventListener("install", async (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(assets);
    })()
  );
});

self.addEventListener("activate", async (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const deletePromises = keys
        .filter(
          (key) => key.startsWith("static-") || key.startsWith("dynamic-")
        )
        .map((key) => caches.delete(key));
      await Promise.all(deletePromises);
    })()
  );
});

self.addEventListener("fetch", async (event) => {
  event.respondWith(cacheFirstStrategy(event.request));
});

setInterval(() => limitCacheSize(DYNAMIC_CACHE, dynamicCacheLimit), 300000);
