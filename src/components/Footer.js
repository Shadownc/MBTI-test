import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
  color: rgba(255, 255, 255, 0.95);
  padding: 1.5rem 1rem 1rem;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 -4px 12px rgba(90, 67, 190, 0.12);
  position: relative;
`;

const FooterContent = styled.div`
  max-width: var(--page-max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1.2rem;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s;
  font-family: 'Nunito', sans-serif;
  font-size: 0.9rem;
  
  &:hover {
    color: white;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
`;

const Divider = styled.div`
  width: 60px;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.5rem auto 1rem;
  border-radius: 1px;
`;

const Copyright = styled.p`
  margin: 0;
  opacity: 0.8;
  font-family: 'Nunito', sans-serif;
  font-size: 0.85rem;
`;

const HeartIcon = styled.span`
  display: inline-block;
  color: #fd79a8;
  animation: ${pulse} 1.5s infinite;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink to="/">首页</FooterLink>
          <FooterLink to="/test">开始测试</FooterLink>
          <FooterLink to="/result/:type">测试结果</FooterLink>
          <FooterLink to="/">关于我们</FooterLink>
        </FooterLinks>
        
        <Divider />
        
        <Copyright>
          © {new Date().getFullYear()} MBTI 人格测试 - 用 <HeartIcon>♥</HeartIcon> 打造
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 