self.addEventListener('install', e => {
  e.waitUntil(caches.open('ai-tracker-v1').then(cache => cache.addAll(['/'])));
  self.skipWaiting();
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
