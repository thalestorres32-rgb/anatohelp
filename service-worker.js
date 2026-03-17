const CACHE_NAME = "anatohelp-v1";

// Lista de arquivos essenciais para o funcionamento offline
// Certifique-se de que os nomes dos ícones estão EXATAMENTE assim no seu GitHub
const urlsToCache = [
  "./",
  "./index.html",
  "./menu.html",
  "./style.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Instalação: Salva os arquivos no cache do navegador
self.addEventListener("install", event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Abrindo cache e adicionando arquivos...");
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error("Falha ao cachear arquivos. Verifique se todos os nomes no urlsToCache estão corretos no GitHub:", error);
      })
  );
});

// Ativação: Limpa caches antigos se você mudar o CACHE_NAME no futuro
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Limpando cache antigo...");
            return caches.delete(cache);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

// Intercepta as requisições para funcionar offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o arquivo do cache se encontrar, senão busca na rede
        return response || fetch(event.request);
      })
      .catch(() => {
        // Opcional: Você pode retornar uma página de "você está offline" aqui
      })
  );
});