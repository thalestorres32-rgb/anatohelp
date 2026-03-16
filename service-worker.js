const CACHE_NAME = "anatohelp-cache-v1";

const urlsToCache = [
  "index.html",
  "coracao.html",
  "pulmao.html",
  "cavidadenasal.html",
  "cavidadebucal.html",
  "checklist_coracao.html",
  "checklist_pulmao.html",
  "checklist_cavidadenasal.html",
  "checklist_cavidadebucal.html",
  "resumo_coracao.html",
  "resumo_pulmao.html",
  "resumo_cavidadenasal.html",
  "resumo_cavidadebucal.html"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});