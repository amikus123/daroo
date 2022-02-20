const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;
// Install SW
self.addEventListener("install", (event) => {
  // eslint-disable-next-line no-restricted-globals
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opened");
      return cache.addAll(urlsToCache);
    })
  );
});
// Listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    })
  );
});
// Activate SW
self.addEventListener("activate", (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames=>Promise.all(
            // eslint-disable-next-line array-callback-return
            cacheNames.map((cacheName)=>{
            if(!cacheWhiteList.includes(cacheName)){
                return caches.delete(cacheName)
            }
            })
        )))
    )

});