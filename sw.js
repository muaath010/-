// اسم النسخة المخبأة (لتحديثها مستقبلاً إذا غيرت التصميم)
const CACHE_NAME = 'naawn-delivery-v1';

// الملفات الأساسية التي نريد حفظها ليعمل التطبيق بسرعة
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// 1. مرحلة التثبيت: حفظ الملفات في ذاكرة الهاتف
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح الكاش بنجاح');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. مرحلة الجلب: عرض الملفات المحفوظة لتسريع التطبيق
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، يعرضه فوراً. وإلا يجلبه من الإنترنت
        return response || fetch(event.request);
      })
  );
});

// 3. مرحلة التفعيل: مسح النسخ القديمة إذا قمت بتحديث التطبيق
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
