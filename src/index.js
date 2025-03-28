import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 注册Service Worker来启用PWA功能
// 这将使应用具有离线能力、可安装性和更好的性能
serviceWorkerRegistration.register(); 