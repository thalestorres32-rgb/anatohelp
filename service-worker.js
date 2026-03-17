const CACHE_NAME = "anatohelp-v3";
const assets = [
  "./",
  "./index.html",
  "./menu.html",
  "./style.css",
  "./manifest.json"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        assets.map(asset => {
          return cache.add(asset).catch(err => console.log("Pulando arquivo opcional: " + asset));
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});