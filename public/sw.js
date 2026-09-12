// Fix PWA Day5 - Unregister Day5 SW - Day8 FINAL Full 12 Routes Stable
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys();for(const k of ks) await caches.delete(k); await self.registration.unregister();})())});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request))});
