/* Guarda la app entera la primera vez que se abre, para que despues ande sin internet.
   Sirve lo guardado al instante y, en paralelo, busca si hay version nueva:
   el cambio aparece la segunda vez que se abre con internet. */
var CACHE = "anotador-truco-v8";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

/* GitHub Pages manda el HTML con diez minutos de cache de navegador. Si pidieramos
   normal, el refresco nos devolveria la copia vieja y el cambio no llegaria nunca.
   Con "no-cache" el navegador siempre le pregunta al servidor; si no cambio nada,
   el servidor contesta 304 y no se descarga de nuevo. */
function pedidoFresco(url) {
  return new Request(url, { cache: "no-cache", credentials: "same-origin" });
}

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(ASSETS.map(function (u) {
        return fetch(pedidoFresco(u)).then(function (res) {
          if (res && res.ok) return c.put(u, res);
        });
      }));
    }).then(function () { return self.skipWaiting(); })
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
  var pedido = mismoSitio ? pedidoFresco(req.url) : req;

  var actualizacion = caches.open(CACHE).then(function (c) {
    return fetch(pedido).then(function (res) {
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
