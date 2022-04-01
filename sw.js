
// On network request
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
            //If response found return it, else fetch again
            return response || fetch(event.request);
        })
    );
});