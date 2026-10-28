/* SismoAlerta - service worker
   1) Recibe las alertas push con la app cerrada.
   2) Guarda una copia de la app para que abra aunque no haya internet (siempre intenta primero la versión nueva). */
const CACHE = 'sismoalerta-v25';
const BASE = ['./', 'index.html', 'manifest.json', 'manifest-clima.json', 'icon-192.png', 'icon-clima-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Primero internet; si falla, la copia guardada. Solo archivos de este mismo sitio. */
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r)
      .then((res) => {
        if (res && res.ok) {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(r, copia)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(r).then((x) => x || caches.match('index.html')))
  );
});

/* Llega una alerta desde el servidor (función sismo-alertas) */
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data ? e.data.text() : '' }; }
  const titulo = d.title || 'SismoAlerta';
  e.waitUntil(
    self.registration.showNotification(titulo, {
      body: d.body || 'Hay un sismo cerca de ti.',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: d.tag || 'sismo',
      requireInteraction: true,
      vibrate: [500, 200, 500, 200, 500],
      data: { url: './' },
    })
  );
});

/* Al tocar la notificación se abre (o se trae al frente) la app */
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ws) => {
      for (const w of ws) { if ('focus' in w) return w.focus(); }
      return self.clients.openWindow('./');
    })
  );
});
