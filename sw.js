// The game used to be installable from this site with an offline cache. It is now sold as a Windows app,
// so this worker removes the old cache, unregisters itself and reloads open pages to show the current site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('beaconvale-')) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
  })());
});
