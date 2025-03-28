import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// 动画效果
const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

// 样式组件
const NotificationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ isOnline }) => 
    isOnline 
      ? 'linear-gradient(90deg, #4CAF50, #8BC34A)' 
      : 'linear-gradient(90deg, #E53935, #FF5252)'};
  color: white;
  padding: calc(0.5rem + var(--safe-area-inset-top)) 1rem 0.5rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${({ isVisible, isOnline }) => 
    isVisible ? slideIn : slideOut} 0.3s forwards ease-out;
  transform: translateY(-100%);
`;

const IconContainer = styled.div`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
`;

const OfflineNotification = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    // 监听在线/离线事件
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setNotificationVisible(true);
      
      // 5秒后自动隐藏"在线"通知
      setTimeout(() => {
        setNotificationVisible(false);
        setTimeout(() => setShowNotification(false), 300);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
      setNotificationVisible(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 如果页面加载时已经离线，则显示通知
    if (!navigator.onLine) {
      setShowNotification(true);
      setNotificationVisible(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <NotificationContainer isVisible={notificationVisible} isOnline={isOnline}>
      <IconContainer>
        {isOnline ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.72 11.06C17.5391 11.4233 18.305 11.9041 19 12.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 12.5C5.60433 11.9116 6.29428 11.4322 7.05 11.08" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.71 5.05C11.1629 5.01751 11.6181 5.00014 12.075 5C16.647 5 20.752 7.909 22.525 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.5 12.5C2.42 10.18 4 8.26 6 6.99" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.53 16.11C9.5452 16.6793 10.7597 16.9205 11.94 16.79C13.1203 16.6596 14.2289 16.1653 15.07 15.39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 20V20.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </IconContainer>
      <NotificationText>
        {isOnline ? '网络已恢复连接' : '您当前处于离线状态'}
      </NotificationText>
    </NotificationContainer>
  );
};

export default OfflineNotification; 