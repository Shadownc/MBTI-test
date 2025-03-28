// 该文件负责处理service worker的注册
// 它将检查环境和浏览器支持，并适当地注册service worker

// 检查当前环境是否为生产环境
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] 是 IPv6 的 localhost 地址
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 被认为是 localhost
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  // 检查当前环境是否为生产环境，以及浏览器是否支持 service worker
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // 服务worker的URL必须是绝对路径
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // 如果PUBLIC_URL与当前页面不在同一个源，service worker将不起作用
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;

      if (isLocalhost) {
        // 这是在本地运行的情况，让我们检查service worker是否仍然存在
        checkValidServiceWorker(swUrl, config);

        // 在本地环境中向开发者添加一些额外的日志
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served by a service worker. ' +
              'To learn more, visit https://cra.link/PWA'
          );
        });
      } else {
        // 这不是localhost，直接注册service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // 此时，已经获取了更新的内容
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed.'
              );

              // 执行回调
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // 此时，一切都已预缓存
              console.log('Content is cached for offline use.');

              // 执行回调
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // 检查我们是否可以找到service worker文件
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // 确保service worker存在，以及我们真的得到了一个JS文件
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // 没有找到service worker文件，可能是另一个应用程序
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // 找到了service worker，正常进行
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
} 