const VERSION = 'v1';

self.addEventListener('install', function(e) {
    console.log(`install event !!`, e);
    // キャッシュ完了まで待機する
    e.waitUntil(
        caches.open(VERSION).then((cache) => {
            return cache.addAll([
                './index.html',
                './main.js',
                './ServiceWorkerTest.js',
            ]);
        })
    );
});
self.addEventListener('fetch', function(e) {
    console.log('fetch event !!', e);
    e.respondWith(
        // リクエストに一致するデータがキャッシュにあるかどうか
        caches.match(e.request).then(function(cacheResponse) {
            console.log('has cache: ', cacheResponse);
            // キャッシュがあればそれを返す、なければリクエストを投げる
            return cacheResponse || fetch(e.request).then(function(response) {
                return caches.open(VERSION).then(function(cache) {
                    // レスポンスをクローンしてキャッシュに入れる
                    cache.put(e.request, response.clone());
                    // オリジナルのレスポンスはそのまま返す
                    return response;
                });  
            });
        })
    );
});
self.addEventListener('activate', function(e) {
    console.log(`activate event !!`, e);
});

