const CACHE_NAME = "gamelink-v1";

const archivos = [
    "/frontend/index.html",
    "/frontend/inicio.html",
    "/frontend/perfil.html",
    "/frontend/mensajes.html",
    "/frontend/nova.html",

    "/frontend/css/style.css",
    "/frontend/js/app.js",
    "/frontend/js/nessie.js"
];
self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
.then(cache => {
    return Promise.all(
        archivos.map(archivo => {
            return fetch(archivo)
                .then(() => {
                    console.log("Existe:", archivo);
                    return cache.add(archivo);
                })
                .catch(() => {
                    console.log("NO EXISTE:", archivo);
                });
        })
    );
})    );

});


self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })
    );

});