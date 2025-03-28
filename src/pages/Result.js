import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { fetchPersonalityTypes } from '../services/api';

// Animation keyframes
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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem 3rem;
  max-width: var(--page-max-width);
  margin: 0 auto;
  width: 100%;
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
  box-shadow: 0 10px 20px rgba(90, 67, 190, 0.2);
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ResultHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const PersonalityType = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const PersonalityCode = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 3px;
  padding: 0.5rem 1.5rem;
  border-radius: var(--border-radius-full);
  margin: 0.5rem 0;
  background-color: rgba(255, 255, 255, 0.15);
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 0.4rem 1.2rem;
  }
`;

const DetailsSection = styled.div`
  width: 100%;
`;

const SectionCard1 = styled.div`
  background-color: white;
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  margin-bottom: 1.2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(90, 67, 190, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  animation: ${fadeIn} 0.5s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.1s;
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);
    border-color: rgba(90, 67, 190, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary), var(--secondary));
    border-radius: 2px;
  }
`;

const SectionCard2 = styled(SectionCard1)`
  animation-delay: 0.2s;
`;

const SectionCard3 = styled(SectionCard1)`
  animation-delay: 0.3s;
`;

const SectionCard4 = styled(SectionCard1)`
  animation-delay: 0.4s;
`;

const SectionCard5 = styled(SectionCard1)`
  animation-delay: 0.5s;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.color || 'var(--primary)'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 1.2rem;
    height: 1.2rem;
    flex-shrink: 0;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const TraitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TraitRow1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
  animation: ${slideIn} 0.4s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.1s;
`;

const TraitRow2 = styled(TraitRow1)`
  animation-delay: 0.2s;
`;

const TraitRow3 = styled(TraitRow1)`
  animation-delay: 0.3s;
`;

const TraitRow4 = styled(TraitRow1)`
  animation-delay: 0.4s;
`;

const TraitLabel = styled.span`
  font-weight: 600;
  color: var(--primary);
  margin-right: 0.75rem;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
`;

const TraitBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: rgba(90, 67, 190, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
`;

const TraitFill = styled.div`
  height: 100%;
  width: ${props => `${props.percentage}%`};
  background: linear-gradient(to right, var(--primary), var(--secondary));
  border-radius: 4px;
`;

const TraitPercentage = styled.span`
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.9rem;
  width: 35px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const RetakeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: var(--border-radius-full);
  text-decoration: none;
  transition: all 0.3s;
  gap: 0.5rem;
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ShareButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: var(--primary);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: var(--border-radius-full);
  border: 1px solid var(--primary);
  cursor: pointer;
  transition: all 0.3s;
  gap: 0.5rem;
  
  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
  
  &:hover {
    background: rgba(90, 67, 190, 0.05);
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ReturnButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border-radius: var(--border-radius-full);
  text-decoration: none;
  transition: all 0.3s;
  gap: 0.5rem;
  
  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
  
  &:hover {
    color: var(--primary);
    background: rgba(90, 67, 190, 0.03);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(108, 92, 231, 0.1);
  border-radius: 50%;
  border-top-color: #6c5ce7;
  margin-bottom: 2rem;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: #6c5ce7;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #6c5ce7, #8e44ad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Result = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const { type } = useParams();
  const shareTextAreaRef = useRef(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const personalityTypes = await fetchPersonalityTypes();
        if (type && personalityTypes[type]) {
          // 假设我们获取到了MBTI类型及其特性百分比
          const typeResult = {
            ...personalityTypes[type],
            type: type,
            traits: {
              introversion: type.includes('I') ? 75 : 25,
              intuition: type.includes('N') ? 70 : 30,
              thinking: type.includes('T') ? 65 : 35,
              judging: type.includes('J') ? 60 : 40
            }
          };
          
          setResult(typeResult);
        } else {
          // 如果URL中没有类型参数或类型不存在，显示一个默认类型
          setResult({
            type: 'INTJ',
            name: '建筑师',
            description: '独立思考，有战略眼光，擅长系统思维，高标准。喜欢理论和抽象概念，总是寻求更好的解决方案。',
            strengths: ['战略眼光', '独立思考', '求知欲强', '决断力强'],
            weaknesses: ['过于批判', '傲慢', '情感隔离', '过度追求完美'],
            careers: ['科学家', '策略家', '系统分析师', '工程师', '企业家'],
            relationships: 'INTJ型人在人际关系中往往重视智力上的共鸣和相互理解，寻找能够欣赏他们独立思考能力的伴侣。他们可能会在表达情感方面显得有些保守，但会对关系投入深度的思考和忠诚。',
            traits: {
              introversion: 75,
              intuition: 70,
              thinking: 65,
              judging: 60
            }
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching personality types:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [type]);
  
  const handleShare = () => {
    // 实现分享功能
    if (navigator.share) {
      navigator.share({
        title: `MBTI测试结果：${result.type} - ${result.name}`,
        text: `我的MBTI人格类型是 ${result.type} (${result.name})。\n\n${result.description}`,
        url: window.location.href
      })
      .catch(err => {
        console.log('分享失败:', err);
        // 备选方案：复制结果到剪贴板
        fallbackShare();
      });
    } else {
      // 备选方案：复制结果到剪贴板
      fallbackShare();
    }
  };
  
  const fallbackShare = () => {
    // 使用useRef创建的引用而非直接在DOM中创建元素
    if (!shareTextAreaRef.current) {
      shareTextAreaRef.current = document.createElement('textarea');
      document.body.appendChild(shareTextAreaRef.current);
    }
    
    const textArea = shareTextAreaRef.current;
    const shareText = `我的MBTI人格类型是 ${result.type} (${result.name})。\n\n${result.description}\n\n了解更多：${window.location.href}`;
    
    textArea.value = shareText;
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('测试结果已复制到剪贴板，你可以分享给好友了！');
      } else {
        alert('复制失败，请手动复制分享。');
      }
    } catch (err) {
      console.error('无法复制到剪贴板:', err);
      alert('复制失败，请手动复制分享。');
    }
  };
  
  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (shareTextAreaRef.current) {
        document.body.removeChild(shareTextAreaRef.current);
        shareTextAreaRef.current = null;
      }
    };
  }, []);
  
  if (loading || !result) {
    return <ResultContainer>加载中...</ResultContainer>;
  }
  
  return (
    <ResultContainer>
      <ResultCard>
        <ResultHeader>
          <ResultTitle>您的MBTI测试结果</ResultTitle>
          <PersonalityType>{result.name}</PersonalityType>
          <PersonalityCode>
            {result.type}
          </PersonalityCode>
        </ResultHeader>
      </ResultCard>
      
      <DetailsSection>
        <SectionCard1>
          <SectionTitle color="#6c5ce7">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 4V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.7782 7.22184L17.7782 9.22184" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.22183 7.22184L6.22183 9.22184" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.22183 14.7782L4.22183 16.7782" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.7782 16.7782L17.7782 14.7782" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            个性洞察
          </SectionTitle>
          <Description>{result.description}</Description>
          
          <TraitsContainer>
            <TraitRow1>
              <TraitLabel>I</TraitLabel>
              <TraitBar>
                <TraitFill percentage={result.traits.introversion} />
              </TraitBar>
              <TraitPercentage>{result.traits.introversion}%</TraitPercentage>
            </TraitRow1>
            <TraitRow2>
              <TraitLabel>N</TraitLabel>
              <TraitBar>
                <TraitFill percentage={result.traits.intuition} />
              </TraitBar>
              <TraitPercentage>{result.traits.intuition}%</TraitPercentage>
            </TraitRow2>
            <TraitRow3>
              <TraitLabel>T</TraitLabel>
              <TraitBar>
                <TraitFill percentage={result.traits.thinking} />
              </TraitBar>
              <TraitPercentage>{result.traits.thinking}%</TraitPercentage>
            </TraitRow3>
            <TraitRow4>
              <TraitLabel>J</TraitLabel>
              <TraitBar>
                <TraitFill percentage={result.traits.judging} />
              </TraitBar>
              <TraitPercentage>{result.traits.judging}%</TraitPercentage>
            </TraitRow4>
          </TraitsContainer>
        </SectionCard1>
        
        <SectionCard2>
          <SectionTitle color="#4CAF50">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            优势特质
          </SectionTitle>
          <List>
            {result.strengths.map((strength, index) => {
              const DelayedListItem = styled.li`
                position: relative;
                padding-left: 1.8rem;
                margin-bottom: 0.7rem;
                font-size: 1rem;
                line-height: 1.5;
                color: var(--text-secondary);
                animation: ${slideIn} 0.4s ease-out;
                animation-fill-mode: both;
                animation-delay: ${0.1 + index * 0.1}s;
                
                &:last-child {
                  margin-bottom: 0;
                }
                
                &::before {
                  content: "✓";
                  color: white;
                  position: absolute;
                  left: 0;
                  font-size: 0.8rem;
                  background: linear-gradient(135deg, #4CAF50, #8BC34A);
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 2px 5px rgba(76, 175, 80, 0.3);
                }
              `;
              return (
                <DelayedListItem key={index}>
                  {strength}
                </DelayedListItem>
              );
            })}
          </List>
        </SectionCard2>
        
        <SectionCard3>
          <SectionTitle color="#F44336">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.29 3.86L1.82001 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.6415 19.6871 1.81443 19.9905C1.98737 20.2939 2.23673 20.5467 2.53771 20.7239C2.83869 20.901 3.1808 20.9962 3.53001 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.5661 13.2807 3.32311 12.9812 3.15447C12.6817 2.98584 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98584 11.0188 3.15447C10.7193 3.32311 10.4683 3.5661 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            潜在挑战
          </SectionTitle>
          <List>
            {result.weaknesses.map((weakness, index) => {
              const DelayedListItem = styled.li`
                position: relative;
                padding-left: 1.8rem;
                margin-bottom: 0.7rem;
                font-size: 1rem;
                line-height: 1.5;
                color: var(--text-secondary);
                animation: ${slideIn} 0.4s ease-out;
                animation-fill-mode: both;
                animation-delay: ${0.1 + index * 0.1}s;
                
                &:last-child {
                  margin-bottom: 0;
                }
                
                &::before {
                  content: "!";
                  color: white;
                  position: absolute;
                  left: 0;
                  font-size: 0.8rem;
                  background: linear-gradient(135deg, #F44336, #FF5722);
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 2px 5px rgba(244, 67, 54, 0.3);
                }
              `;
              return (
                <DelayedListItem key={index}>
                  {weakness}
                </DelayedListItem>
              );
            })}
          </List>
        </SectionCard3>
        
        <SectionCard4>
          <SectionTitle color="#2196F3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            职业发展
          </SectionTitle>
          <List>
            {result.careers.map((career, index) => {
              const DelayedListItem = styled.li`
                position: relative;
                padding-left: 1.8rem;
                margin-bottom: 0.7rem;
                font-size: 1rem;
                line-height: 1.5;
                color: var(--text-secondary);
                animation: ${slideIn} 0.4s ease-out;
                animation-fill-mode: both;
                animation-delay: ${0.1 + index * 0.1}s;
                
                &:last-child {
                  margin-bottom: 0;
                }
                
                &::before {
                  content: "→";
                  color: white;
                  position: absolute;
                  left: 0;
                  font-size: 0.8rem;
                  background: linear-gradient(135deg, #2196F3, #03A9F4);
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 2px 5px rgba(33, 150, 243, 0.3);
                }
              `;
              return (
                <DelayedListItem key={index}>
                  {career}
                </DelayedListItem>
              );
            })}
          </List>
        </SectionCard4>
        
        <SectionCard5>
          <SectionTitle color="#FF9800">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C10.4292 4.099 9.82279 3.69365 9.15535 3.41708C8.48791 3.14052 7.77254 2.99817 7.05 2.99817C6.32746 2.99817 5.61209 3.14052 4.94465 3.41708C4.27721 3.69365 3.6708 4.099 3.16 4.61C2.13432 5.63651 1.55987 7.02534 1.55987 8.47C1.55987 9.91466 2.13432 11.3035 3.16 12.33L4.22 13.39L12 21.17L19.78 13.39L20.84 12.33C21.351 11.8192 21.7563 11.2128 22.0329 10.5454C22.3095 9.87792 22.4518 9.16254 22.4518 8.44C22.4518 7.71746 22.3095 7.00208 22.0329 6.33464C21.7563 5.6672 21.351 5.0608 20.84 4.55V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            人际关系
          </SectionTitle>
          <Description>{result.relationships}</Description>
        </SectionCard5>
      </DetailsSection>
      
      <ButtonContainer>
        <RetakeButton to="/test">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3L21 7L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 7H11C7.13401 7 4 10.134 4 14C4 17.866 7.13401 21 11 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          重新测试
        </RetakeButton>
        <ShareButton onClick={handleShare}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          分享结果
        </ShareButton>
        <ReturnButton to="/">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          返回首页
        </ReturnButton>
      </ButtonContainer>
    </ResultContainer>
  );
};

export default Result; 