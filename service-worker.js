const CACHE_NAME = "anatohelp-v6-icons";
const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Adiciona um por um para não travar se algum falhar
      return Promise.all(
        assets.map((path) => cache.add(path).catch(() => console.log("Aguardando arquivo: " + path)))
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
