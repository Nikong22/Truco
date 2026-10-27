/* Guarda la app entera la primera vez que se abre, para que despues ande sin internet.
   Sirve lo guardado al instante y, en paralelo, busca si hay version nueva:
   el cambio aparece la segunda vez que se abre con internet. */
var CACHE = "anotador-truco-v3";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var mismoSitio = new URL(req.url).origin === location.origin;

  var actualizacion = caches.open(CACHE).then(function (c) {
    return fetch(req).then(function (res) {
      /* Las tipografias de Google llegan como respuesta opaca: tambien se guardan. */
      if (res && (res.ok || res.type === "opaque")) {
        return c.put(req, res.clone()).then(function () { return res; });
      }
      return res;
    });
  });

  /* Sin este waitUntil el navegador puede apagar el service worker apenas
     entrego la copia guardada, y la version nueva nunca termina de bajar. */
  e.waitUntil(actualizacion.catch(function () {}));

  e.respondWith(
    caches.match(req).then(function (guardado) {
      if (guardado) return guardado;
      return actualizacion.catch(function () {
        if (mismoSitio) return caches.match("./index.html");
        return new Response("", { status: 504 });
      });
    })
  );
});
