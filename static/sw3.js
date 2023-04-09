importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

const CACHE_NAME = 'my-pwa-cache';

// URLs to cache on the first load
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/404.html',
    '/madmax.avif',
];

// Cache the URLs on the first load
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

// Delete old caches on activation
self.addEventListener('activate', (event) => {
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

// Use the stale-while-revalidate strategy for the specified URLs
workbox.routing.registerRoute(
    ({ url }) => {
        return url.pathname === '/' ||
            url.pathname === '/index.html' ||
            url.pathname === '/manifest.json' ||
            url.pathname === '/404.html' ||
            url.pathname === '/madmax.avif';
    },
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'my-pwa-cache',
    })
);

// Use the network-only strategy for all other URLs
workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());

// Return the 404.html page for any failed requests
workbox.routing.setCatchHandler(({ event }) => {
    if (event.request.destination === 'document') {
        return caches.match('/404.html');
    }
    return Response.error();
});

