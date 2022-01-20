function initCache() {
    const CACHE_NAME = '0.0.1';
    /*
    const CACHE_NAMES = {
        UI: {
            CURSOR: 'CURSOR',
            FONT: 'FONT',
            BORDER: 'BORDER',
            CLIP_PATH: 'CLIP_PATH',
        }
        ASSETS: {
            IMAGE: 'IMAGE',
            AUDIO: 'AUDIO',
            VIDEO: 'VIDEO',
        }
        CONTENT: {
            READ: 'CONTENT',
            UNREAD: 'UNREAD',
        }
    }
    */
    /*
    window.caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
            '/assets/images/cursors/arrow-left-16x16.png',
            '/assets/images/cursors/return-left-16x16.png',
            '/assets/images/cursors/setting-16x16.png',
        ]);
    });
    */
    window.addEventListener('fetch', (event) => {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    return response || fetch(event.request).then((response) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    });
}
