import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem 3rem;
  text-align: center;
  max-width: var(--page-max-width);
  margin: 0 auto;
  width: 100%;
  
  & > * {
    animation: ${fadeIn} 0.5s ease-out;
    animation-fill-mode: both;
  }
  
  & > *:nth-child(1) { animation-delay: 0.1s; }
  & > *:nth-child(2) { animation-delay: 0.2s; }
  & > *:nth-child(3) { animation-delay: 0.3s; }
  & > *:nth-child(4) { animation-delay: 0.4s; }
  & > *:nth-child(5) { animation-delay: 0.5s; }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.25rem;
  color: var(--primary);
  font-weight: 700;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    border-radius: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 600px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const StartButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.9rem 2.5rem;
  border-radius: var(--border-radius-full);
  text-decoration: none;
  transition: all 0.3s;
  margin-top: 1rem;
  box-shadow: 0 8px 15px rgba(90, 67, 190, 0.25);
  position: relative;
  overflow: hidden;
  animation: ${pulse} 2s infinite ease-in-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: all 0.75s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 20px rgba(90, 67, 190, 0.3);
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 10px rgba(90, 67, 190, 0.3);
  }
`;

const TypeList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0 0;
  width: 100%;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const TypeCard = styled.div`
  background-color: white;
  padding: 1.25rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
  border: 1px solid rgba(90, 67, 190, 0.08);
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => `${props.delay || '0s'}`};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    border-color: rgba(90, 67, 190, 0.15);
  }
`;

const TypeTitle = styled.h3`
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const TypeText = styled.p`
  color: var(--text-tertiary);
  font-size: 0.95rem;
  margin-bottom: 0;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 1.5rem;
  margin: 1.5rem 0 2rem;
  text-align: left;
  border-radius: var(--border-radius-md);
  background: white;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(90, 67, 190, 0.08);
  position: relative;
  width: 100%;
  
  @media (max-width: 480px) {
    padding: 1.25rem;
    margin: 1.25rem 0 1.75rem;
  }
`;

const FeatureItem = styled.li`
  position: relative;
  padding-left: 1.8rem;
  margin-bottom: 0.9rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: "✓";
    color: white;
    position: absolute;
    left: 0;
    font-weight: bold;
    font-size: 0.8rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(90, 67, 190, 0.2);
  }
`;

const Badge = styled.div`
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: var(--border-radius-full);
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 10px rgba(90, 67, 190, 0.2);
`;

const Divider = styled.div`
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  margin: 2rem auto 1.5rem;
  border-radius: 2px;
  opacity: 0.7;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>发现你的MBTI人格类型</Title>
      <Badge>专业级测试</Badge>
      <Subtitle>
        通过这个免费的MBTI测试，了解你的个性特征，发现你的优势和成长方向。
        我们使用精心设计的117题全面测试，提供专业级别的性格分析结果。
      </Subtitle>
      
      <FeatureList>
        <FeatureItem>包含117个精心设计的问题，全面评估你的性格特征</FeatureItem>
        <FeatureItem>每个维度近30个问题，确保结果更加专业和精准</FeatureItem>
        <FeatureItem>移动端友好的界面设计，随时随地完成测试</FeatureItem>
        <FeatureItem>详细的结果分析，包括性格描述、优势和职业建议</FeatureItem>
      </FeatureList>
      
      <StartButton to="/test">开始测试</StartButton>
      
      <Divider />
      
      <Subtitle style={{ marginBottom: '1.5rem' }}>
        MBTI将人的性格分为16种不同的类型，每种类型都有其独特的特征和优势
      </Subtitle>
      
      <TypeList>
        <TypeCard delay="0s">
          <TypeTitle>分析者</TypeTitle>
          <TypeText>INTJ, INTP, ENTJ, ENTP</TypeText>
        </TypeCard>
        <TypeCard delay="0.1s">
          <TypeTitle>外交官</TypeTitle>
          <TypeText>INFJ, INFP, ENFJ, ENFP</TypeText>
        </TypeCard>
        <TypeCard delay="0.2s">
          <TypeTitle>守卫者</TypeTitle>
          <TypeText>ISTJ, ISFJ, ESTJ, ESFJ</TypeText>
        </TypeCard>
        <TypeCard delay="0.3s">
          <TypeTitle>探索者</TypeTitle>
          <TypeText>ISTP, ISFP, ESTP, ESFP</TypeText>
        </TypeCard>
      </TypeList>
    </HomeContainer>
  );
};

export default Home; 