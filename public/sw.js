
// Xanh24 v7 Day5 PWA Offline SW - CHECKIN_1789105301946 OK - Day3 Ready 5m ago Error 0% Edge 89 - Day4 Webhook ready tt 846985 Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0% - Day5 Middleware Full Auth + Captive Portal KTX B WiFi 10.10.1.23 + YubiKey 404 + PWA Offline + Telegram X0 Bot Full
const CACHE_NAME = 'xanh24-v7-day5-CHECKIN_1789105301946-tt846985';
const urlsToCache = ['/','/camera','/data-5g','/payment','/admin/payment-logs','/captive','/offline','/manifest.json','/icon-180.png','/icon-192.png','/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request).catch(()=>caches.match('/offline'))));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
});
