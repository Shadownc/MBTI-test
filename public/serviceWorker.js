// MBTI测试应用 Service Worker
const CACHE_NAME = 'mbti-app-v1';

// 需要缓存的资源
const urlsToCache = [
  '/',
  '/index.html',
  '/static/css/main.chunk.css',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// 安装service worker并缓存核心资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活service worker，清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // 删除不在白名单中的缓存
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 网络请求拦截
self.addEventListener('fetch', event => {
  // 跳过不合理的请求
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存命中，直接返回缓存的资源
        if (response) {
          return response;
        }
        
        // 缓存未命中，尝试从网络获取
        return fetch(event.request.clone())
          .then(response => {
            // 检查是否是有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆响应，因为响应是流，只能使用一次
            const responseToCache = response.clone();
            
            // 将获取的资源添加到缓存
            caches.open(CACHE_NAME)
              .then(cache => {
                // 只缓存GET请求
                if (event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                }
              });
              
            return response;
          })
          .catch(() => {
            // 网络错误，尝试返回离线页面
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            // 或者返回一个默认的占位图像
            if (event.request.destination === 'image') {
              return caches.match('/images/offline-image.png');
            }
            
            // 其他资源类型的离线策略
            return new Response('网络连接失败，请检查网络设置。', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// 当应用推送离线消息时处理
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || '有新的MBTI测试内容等你查看！',
    icon: '/logo192.png',
    badge: '/badge.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('MBTI心理测试', options)
  );
});

// 当用户点击通知时
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({type: 'window'})
      .then(clientList => {
        // 如果已有窗口，则聚焦到该窗口
        for (const client of clientList) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        // 否则打开新窗口
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});

// 后台同步，用于延迟处理操作（如保存结果等）
self.addEventListener('sync', event => {
  if (event.tag === 'save-result') {
    event.waitUntil(
      // 从IndexedDB获取待保存的结果并同步到服务器
      syncSavedResults()
    );
  }
});

// 从IndexedDB获取待同步的结果并发送到服务器
const syncSavedResults = async () => {
  try {
    // 获取待同步的数据
    const db = await openDatabase();
    const tx = db.transaction('pending-results', 'readwrite');
    const store = tx.objectStore('pending-results');
    const results = await store.getAll();
    
    // 如果有待同步的数据，则发送到服务器
    if (results.length > 0) {
      for (const result of results) {
        try {
          // 尝试发送结果到服务器
          const response = await fetch('/api/results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
          });
          
          if (response.ok) {
            // 同步成功，从待处理列表中删除
            await store.delete(result.id);
          }
        } catch (err) {
          console.error('Failed to sync result:', err);
          // 同步失败，保留在待处理列表
        }
      }
    }
  } catch (err) {
    console.error('Error syncing results:', err);
  }
};

// 打开IndexedDB数据库
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mbti-app-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore('pending-results', { keyPath: 'id' });
    };
  });
}; 