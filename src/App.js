import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// Pages
import Home from './pages/Home';
import Test from './pages/Test';
import Result from './pages/Result';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import OfflineNotification from './components/OfflineNotification';

// 全局样式
const GlobalStyle = createGlobalStyle`
  body {
    background: #f8f7ff;
    margin: 0;
    padding: 0;
    min-height: 100%;
    overflow-x: hidden;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  isolation: isolate;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 页面容器组件
const PageContainer = styled.div`
  animation: ${fadeIn} 0.4s ease-out;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// 路由保护组件
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // 检查本地存储中是否有测试完成的标记
    const testCompleted = localStorage.getItem('testCompleted');
    setIsAuthenticated(testCompleted === 'true');
    setIsChecking(false);
  }, []);
  
  if (isChecking) {
    // 加载中状态
    return <div style={{ padding: '2rem', textAlign: 'center' }}>加载中...</div>;
  }
  
  if (!isAuthenticated) {
    // 如果未完成测试，重定向到测试页面
    return <Navigate to="/test" replace />;
  }
  
  return children;
};

// ScrollToTop组件
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <OfflineNotification />
        <Header />
        <Main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<PageContainer><Home /></PageContainer>} />
            <Route path="/test" element={<PageContainer><Test /></PageContainer>} />
            <Route 
              path="/result/:type" 
              element={
                <PageContainer>
                  <ProtectedRoute>
                    <Result />
                  </ProtectedRoute>
                </PageContainer>
              } 
            />
          </Routes>
        </Main>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;