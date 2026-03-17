const CACHE_NAME = "anatohelp-v4";
const assets = ["./", "./index.html", "./style.css", "./manifest.json", "./icon-192.png"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        assets.map((path) => cache.add(path).catch(() => console.log("Erro no cache de: " + path)))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});