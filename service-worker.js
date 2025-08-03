self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pcms-cache').then(cache => {
      return cache.addAll([
        './index.html',
        './style.css',
        './app.js',
        './manifest.json',
        './Pending_Cases_Biswanath_Cleaned.csv'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});