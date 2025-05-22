import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: white;
  padding: 0.8rem 1rem;
  box-shadow: 0 4px 12px rgba(90, 67, 190, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
  height: 60px;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    height: 56px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--page-max-width);
  margin: 0 auto;
  position: relative;
  width: 100%;
  padding: 0 0.5rem;
`;

const Logo = styled(Link)`
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  position: relative;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s;
  z-index: 101;
  
  &:hover {
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  
  &::before {
    content: '✦';
    margin-right: 0.4rem;
    font-size: 1.1rem;
    transition: transform 0.3s;
  }
  
  &:hover::before {
    transform: rotate(45deg);
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    width: 280px;
    height: 100vh;
    background: linear-gradient(135deg, 
      rgba(90, 67, 190, 0.98),
      rgba(78, 56, 178, 0.98) 50%,
      rgba(108, 92, 231, 0.98) 100%
    );
    flex-direction: column;
    gap: 0;
    align-items: center;
    display: flex;
    transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: ${({ $isOpen }) => ($isOpen ? '-10px 0 30px rgba(0, 0, 0, 0.2)' : 'none')};
    z-index: 1001;
    border-radius: 20px 0 0 20px;
    overflow-y: auto;
    animation: ${props => props.$isOpen ? slideIn : 'none'} 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.12), transparent 40%);
      pointer-events: none;
    }
  }
`;

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  
  @media (min-width: 769px) {
    .menu-title, .menu-reminder {
      display: none; /* Hide menu title and reminder on PC */
    }
  }
`;

const NavHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 56px;
  background: rgba(90, 67, 190, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const NavTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: rotate(90deg);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  cursor: pointer;
  z-index: 101;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
  
  ${({ $isOpen }) => $isOpen && css`
    background: rgba(255, 255, 255, 0.25);
  `}
`;

const HamburgerLine = styled.span`
  display: block;
  height: 2px;
  width: 18px;
  border-radius: 4px;
  background-color: white;
  transition: all 0.3s ease;
  
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      &:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      
      &:nth-child(2) {
        opacity: 0;
        transform: translateX(-10px);
      }
      
      &:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  flex: 1;
  gap: 1.5rem;
  overflow-y: auto;
`;

const NavItem = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  opacity: 0;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    transform: translateX(20px);
    
    ${({ $isOpen }) => $isOpen && css`
      animation: ${fadeIn} 0.6s forwards;
      animation-delay: ${props => props.$delay || '0s'};
    `}
  }
`;

const NavFooter = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  background: rgba(78, 56, 178, 0.95);
  z-index: 2;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    margin-top: 0.5rem;
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-2px);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.25rem 0;
  font-family: 'Nunito', sans-serif;
  opacity: ${props => props.$active ? '1' : '0.85'};
  font-size: 0.95rem;
  
  &::after {
    content: '';
    position: absolute;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: white;
    transition: width 0.3s;
  }
  
  &:hover {
    opacity: 1;
    color: white;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    margin: 0.8rem 0;
    font-size: 1.15rem;
    padding: 0.6rem 2rem;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    letter-spacing: 0.03em;
    transition: all 0.3s;
    border-radius: 30px;
    
    &::after {
      bottom: -4px;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
    
    ${props => props.$active && css`
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      
      &::after {
        width: 50px;
        left: 50%;
        transform: translateX(-50%);
      }
    `}
  }
`;

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 处理滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 处理菜单打开时禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // 路由变化时关闭菜单
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <HeaderContainer style={{ 
      padding: scrolled ? '0 1rem' : '0 1rem',
      boxShadow: scrolled ? '0 4px 15px rgba(90, 67, 190, 0.2)' : '0 4px 12px rgba(90, 67, 190, 0.15)'
    }}>
      <NavContainer>
        <Logo to="/">MBTI 人格测试</Logo>
        
        <HamburgerButton onClick={toggleMenu} $isOpen={isOpen}>
          <HamburgerLine $isOpen={isOpen} />
          <HamburgerLine $isOpen={isOpen} />
          <HamburgerLine $isOpen={isOpen} />
        </HamburgerButton>
        
        <Overlay $isOpen={isOpen} onClick={toggleMenu} />
        
        <NavLinks $isOpen={isOpen}>
          <MobileMenuContent>
            <NavHeader className="menu-title">
              <NavTitle>选择菜单</NavTitle>
              <CloseButton onClick={toggleMenu}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CloseButton>
            </NavHeader>
            
            <NavItemsContainer>
              <NavItem $isOpen={isOpen} $delay="0.1s">
                <NavLink to="/" $active={location.pathname === '/' ? 1 : 0}>首页</NavLink>
              </NavItem>
              <NavItem $isOpen={isOpen} $delay="0.2s">
                <NavLink to="/test" $active={location.pathname === '/test' ? 1 : 0}>开始测试</NavLink>
              </NavItem>
              <NavItem $isOpen={isOpen} $delay="0.3s">
                <NavLink to="/result/:type" $active={location.pathname.includes('/result') ? 1 : 0}>测试结果</NavLink>
              </NavItem>
            </NavItemsContainer>
            
            <NavFooter className="menu-reminder">
              温馨提示：请完成所有问题后查看结果
              <br />
              <a href="#" onClick={(e) => {e.preventDefault(); setIsOpen(false);}}>返回</a>
            </NavFooter>
          </MobileMenuContent>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 