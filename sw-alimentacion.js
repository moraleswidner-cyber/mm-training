// Service Worker — NM Alimentación
// Incrementar CACHE_VERSION en cada deploy para forzar actualización en PWA
var CACHE_VERSION = 'alim-v30';
var CACHE_NAME = 'nm-alim-' + CACHE_VERSION;
var APP_SHELL = ['/alimentacion.html'];

// INSTALL — pre-cachea el shell
self.addEventListener('install', function(e) {
  self.skipWaiting(); // activa de inmediato sin esperar cierre de pestaña antigua
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_SHELL);
    })
  );
});

// ACTIVATE — borra cachés viejos
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim(); // toma control de todas las pestañas abiertas
    })
  );
});

// FETCH — Network-first para HTML (siempre verifica si hay versión nueva)
//         Cache-first para todo lo demás
self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  // Solo manejar peticiones del mismo origen
  if (url.origin !== self.location.origin) return;

  // HTML → network-first: siempre intenta red, cae a caché si offline
  if (e.request.destination === 'document' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request).then(function(resp) {
        var clone = resp.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, clone); });
        return resp;
      }).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }

  // Resto → cache-first
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(resp) {
        var clone = resp.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, clone); });
        return resp;
      });
    })
  );
});
