const CACHE_NAME = "anatohelp-v1";

// Liste todos os arquivos importantes aqui (CSS, JS, Imagens de anatomia)
const urlsToCache = [
  "./",
  "./index.html",
  "./menu.html",
  "./style.css",
  "./manifest.json"
];

self.addEventListener("install", event => {
  self.skipWaiting(); // Força a atualização para a nova versão
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim()); // Assume o controle da página imediatamente
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});