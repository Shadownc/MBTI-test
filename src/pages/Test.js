import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { fetchQuestions, calculateResults } from '../services/api';

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

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

// Styled Components
const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem 3rem;
  max-width: var(--page-max-width);
  margin: 0 auto;
  width: 100%;
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius-md);
  padding: 0;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
  width: 100%;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out forwards;
  overflow: hidden;
  border: 1px solid rgba(90, 67, 190, 0.08);
`;

const QuestionHeader = styled.div`
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 1.5px;
  }
  
  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const QuestionCounter = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  
  span {
    font-weight: 700;
    margin: 0 0.2rem;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    top: 1.25rem;
    right: 1.25rem;
    padding: 0.3rem 0.6rem;
  }
`;

const QuestionText = styled.h2`
  font-weight: 600;
  font-size: 1.3rem;
  color: white;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding-right: 2rem;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.5rem;
  
  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const OptionButton = styled.button`
  background-color: white;
  border: 1px solid rgba(90, 67, 190, 0.15);
  border-radius: var(--border-radius-md);
  padding: 1.2rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  text-align: left;
  transition: all 0.3s;
  position: relative;
  
  &:hover, &:active {
    border-color: var(--primary);
    background-color: rgba(90, 67, 190, 0.03);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  ${({ $selected }) => $selected && css`
    border-color: var(--primary);
    background-color: rgba(90, 67, 190, 0.05);
    color: var(--primary);
    font-weight: 600;
    box-shadow: var(--shadow-sm);
    transform: translateY(-2px);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(to bottom, var(--primary), var(--secondary));
      border-radius: 2px 0 0 2px;
    }
  `}
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(90, 67, 190, 0.1);
  border-radius: var(--border-radius-full);
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

const ProgressBar = styled.div`
  height: 100%;
  border-radius: var(--border-radius-full);
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  width: ${props => props.progress || '0%'};
  transition: width 0.5s ease-in-out;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  width: 100%;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(90, 67, 190, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary);
  margin-bottom: 1.5rem;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.5rem;
`;

const RetryButton = styled.button`
  background: var(--primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius-full);
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  box-shadow: 0 4px 8px rgba(90, 67, 190, 0.3);
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(90, 67, 190, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const InfoText = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 1.5rem;
  text-align: center;
  max-width: 600px;
`;

const ProgressText = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${props => props.$warning && css`
    color: #e74c3c;
    font-weight: 500;
    animation: ${shake} 0.5s ease-in-out;
  `}
`;

const CompletionStatus = styled.div`
  background: ${props => props.$isComplete ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)'};
  color: ${props => props.$isComplete ? '#27ae60' : '#e74c3c'};
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  width: 100%;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NextButton = styled.button`
  background: var(--primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--border-radius-full);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
  
  ${props => props.$warning && css`
    animation: ${shake} 0.5s ease-in-out;
  `}
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const PrevButton = styled(NextButton)`
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
  
  &:hover:not(:disabled) {
    background: rgba(90, 67, 190, 0.05);
    color: var(--primary-dark);
    border-color: var(--primary-dark);
  }
  
  @media (max-width: 480px) {
    order: 2;
  }
`;

const CompletionAlert = styled.div`
  background: linear-gradient(135deg, #ff7675, #e74c3c);
  color: white;
  padding: 1rem;
  border-radius: var(--border-radius-md);
  margin-bottom: 1rem;
  box-shadow: var(--shadow-sm);
  text-align: center;
  animation: ${fadeIn} 0.4s ease-out;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
`;

// Test component
const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompletionWarning, setShowCompletionWarning] = useState(false);
  const [buttonWarning, setButtonWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 组件加载时清除完成标记
    localStorage.removeItem('testCompleted');
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const questionData = await fetchQuestions();
      setQuestions(questionData);
      setLoading(false);
    } catch (err) {
      setError('加载问题失败，请重试');
      setLoading(false);
      console.error('Error loading questions:', err);
    }
  };

  const handleOptionSelect = (option) => {
    // 保存答案
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: option.value
    });
    
    // 清除错误提示
    setShowCompletionWarning(false);
    setButtonWarning(false);
  };
  
  const goToNextQuestion = () => {
    // 如果是最后一个问题，验证所有问题是否回答
    if (currentQuestionIndex === questions.length - 1) {
      const allQuestionsAnswered = checkAllQuestionsAnswered();
      if (allQuestionsAnswered) {
        // 设置测试完成标记
        localStorage.setItem('testCompleted', 'true');
        calculateAndNavigate(answers);
      } else {
        setShowCompletionWarning(true);
        setButtonWarning(true);
        
        // 2秒后关闭按钮抖动
        setTimeout(() => {
          setButtonWarning(false);
        }, 2000);
      }
    } else {
      // 否则前进到下一题
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowCompletionWarning(false);
    }
  };

  const checkAllQuestionsAnswered = () => {
    return questions.every(question => answers[question.id] !== undefined);
  };

  const calculateAndNavigate = (allAnswers) => {
    const result = calculateResults(allAnswers);
    navigate(`/result/${result.personalityType}`);
  };

  // 查找未完成的问题索引
  const findUnansweredQuestionIndex = () => {
    return questions.findIndex(question => answers[question.id] === undefined);
  };

  // 跳转到第一个未回答的问题
  const goToUnansweredQuestion = () => {
    const index = findUnansweredQuestionIndex();
    if (index !== -1) {
      setCurrentQuestionIndex(index);
      setShowCompletionWarning(false);
    }
  };

  // 计算已完成的问题数量
  const completedQuestionsCount = Object.keys(answers).length;
  const isAllQuestionsCompleted = completedQuestionsCount === questions.length;
  
  // 计算完成百分比
  const completionPercent = questions.length > 0 
    ? Math.round((completedQuestionsCount / questions.length) * 100) 
    : 0;

  if (loading) {
    return (
      <TestContainer>
        <LoadingContainer>
          <Spinner />
          <LoadingText>正在加载测试题目</LoadingText>
          <p>我们正在准备精心设计的问题</p>
        </LoadingContainer>
      </TestContainer>
    );
  }

  if (error) {
    return (
      <TestContainer>
        <LoadingContainer>
          <LoadingText>加载失败</LoadingText>
          <p style={{ marginBottom: "1.5rem" }}>{error}</p>
          <RetryButton onClick={loadQuestions}>重新加载</RetryButton>
        </LoadingContainer>
      </TestContainer>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const hasAnswered = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <TestContainer>
      {showCompletionWarning && (
        <CompletionAlert>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.29 3.86L1.82001 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.6415 19.6871 1.81443 19.9905C1.98737 20.2939 2.23673 20.5467 2.53771 20.7239C2.83869 20.901 3.1808 20.9962 3.53001 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.5661 13.2807 3.32311 12.9812 3.15447C12.6817 2.98584 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98584 11.0188 3.15447C10.7193 3.32311 10.4683 3.5661 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            您还有 {questions.length - completedQuestionsCount} 题未完成，请回答所有问题后再查看结果。
            <div 
              onClick={goToUnansweredQuestion} 
              style={{ textDecoration: 'underline', cursor: 'pointer', marginTop: '0.25rem', fontSize: '0.9rem' }}
            >
              点击前往未完成题目
            </div>
          </div>
        </CompletionAlert>
      )}
      
      <ProgressBarContainer>
        <ProgressBar progress={`${progress}%`} />
      </ProgressBarContainer>
      
      <QuestionCard>
        <QuestionHeader>
          <QuestionCounter>
            问题 <span>{currentQuestionIndex + 1}</span> / {questions.length}
          </QuestionCounter>
          
          <BackButton 
            onClick={handlePrevious} 
            disabled={currentQuestionIndex === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回
          </BackButton>
          
          <QuestionText>{currentQuestion.text}</QuestionText>
        </QuestionHeader>
        
        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleOptionSelect(option)}
              $selected={answers[currentQuestion.id] === option.value}
            >
              {option.text}
            </OptionButton>
          ))}
        </OptionsContainer>
      </QuestionCard>
      
      <ButtonContainer>
        {currentQuestionIndex > 0 && (
          <PrevButton onClick={handlePrevious}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            上一题
          </PrevButton>
        )}
        
        <NextButton 
          onClick={goToNextQuestion} 
          disabled={!hasAnswered}
          $warning={buttonWarning}
        >
          {isLastQuestion ? '查看结果' : '下一题'}
          {!isLastQuestion && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </NextButton>
      </ButtonContainer>
      
      <ProgressText $warning={showCompletionWarning && !isAllQuestionsCompleted}>
        已完成 {completedQuestionsCount} 题，共 {questions.length} 题
        <span>({completionPercent}%)</span>
      </ProgressText>
      
      <CompletionStatus $isComplete={isAllQuestionsCompleted}>
        {isAllQuestionsCompleted ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            所有问题已完成，可以查看结果
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            请完成所有问题后查看结果
          </>
        )}
      </CompletionStatus>
      
      <InfoText>
        选择最符合你真实想法的选项。没有对错之分，请根据你的第一反应作答，不要过度思考。
      </InfoText>
    </TestContainer>
  );
};

export default Test; 