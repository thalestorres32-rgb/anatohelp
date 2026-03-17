const CACHE_NAME = "anatohelp-v2";

const urlsToCache = [
  "./",
  "index.html",
  "menu.html",
  "style.css",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          urlsToCache.map(url => cache.add(url).catch(err => console.log("Erro no cache:", url)))
        );
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
