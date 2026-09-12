// Fix PWA Day5 - Unregister Day5 SW - Day8 FINAL Full 12 Routes Stable
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys();for(const k of ks) await caches.delete(k); await self.registration.unregister();})())});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request))});
// Day8 FINAL + Phase1 Go Live - Fix PWA Day5 - Unregister Day5 SW - Full 12 Routes Stable - CHECKIN_1789105301946
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys(); for(const k of ks) await caches.delete(k); await self.registration.unregister();})())});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request))});
