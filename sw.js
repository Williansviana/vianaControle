const CACHE_NAME = 'viana-v3';
const ASSETS = [
  './login.html',
  './index.html',
  './manifest.json',
  './img/logo oficial.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});