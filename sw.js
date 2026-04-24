const CACHE_NAME = 'viana-cache-v2'; // Mude a versão sempre que atualizar o código
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './login.html',
  './manifest.json',
  './img/logo oficial.png'
];

// Instalação: Salva os arquivos essenciais no dispositivo
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Viana PWA: Arquivos cacheados com sucesso');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Força o SW a se tornar ativo imediatamente, sem esperar o usuário fechar o app
  self.skipWaiting();
});

// Ativação: Limpa caches antigos de versões anteriores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Viana PWA: Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Garante que o SW controle as abas abertas imediatamente
  self.clients.claim();
});

// Busca (Fetch): Estratégia "Cache First, falling back to Network"
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o arquivo do cache se existir, senão busca na internet
      return response || fetch(event.request);
    })
  );
});