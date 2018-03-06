self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/bundle.js',
        '/index.html',
        '/offline.html'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cacheResponse => {
    if (typeof cacheResponse !== 'undefined') {
      return cacheResponse;
    } else {
      return fetch(event.request).then(fetchResponse => {
        const responseClone = fetchResponse.clone();
        caches.open('v1').then(cache => cache.put(event.request, responseClone));

        return fetchResponse;
      });
    }
  }).catch(() => caches.match('offline.html')));
});
