{
  "$schema": "https://json.schemastore.org/web-manifest-combined.json",
  "name": "{{name}}",
  "short_name": "{{short-name}}",
  "categories": ["books", "entertainment"],
  "start_url": ".",
  "display_override": ["window-controls-overlay", "minimal-ui"],
  "display": "standalone",
  "theme_color": "#fff",
  "background_color": "#fff",
  "lang": "ja-JP",
  "description": "読むことができるハッカーニュースアプリです。",
  "icons": [{
    "src": "images/touch/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen72.png",
    "sizes": "72x72",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen96.png",
    "sizes": "96x96",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen168.png",
    "sizes": "168x168",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen192.png",
    "sizes": "192x192",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen512.png",
    "sizes": "512x512",
    "type": "image/png"
  }],
  "related_applications": [{
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
  }],
  "screenshots" : [
    {
      "src": "screenshot1.webp",
      "sizes": "1280x720",
      "type": "image/webp",
      "platform": "wide",
      "label": "Homescreen of Awesome App"
    },
    {
      "src": "screenshot2.webp",
      "sizes": "1280x720",
      "type": "image/webp",
      "platform": "wide",
      "label": "List of Awesome Resources available in Awesome App"
    }
  ],
  "shortcuts": [{
    "name": "",
    "short_name": "",
    "description": "",
    "url": "",
    "icons": [{ "src": "./shortcuts/home-256.png", "sizes": "256x256" }]
  }],
}

