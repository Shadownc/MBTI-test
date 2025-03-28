// 直接使用本地数据，不再使用外部API
import localQuestions from '../data/questions';
import localPersonalityTypes from '../data/personalityTypes';

/**
 * 获取MBTI题库
 * @returns {Promise<Array>} 题目列表
 */
export const fetchQuestions = async () => {
  return Promise.resolve(localQuestions);
};

/**
 * 获取MBTI性格类型数据
 * @returns {Promise<Object>} 性格类型数据
 */
export const fetchPersonalityTypes = async () => {
  return Promise.resolve(localPersonalityTypes);
};

/**
 * 计算MBTI结果
 * @param {Object} answers - 用户的回答
 * @returns {Object} 分析结果
 */
export const calculateResults = (answers) => {
  // 计算各维度的分数
  const dimensionScores = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
  };

  // 遍历所有回答，累加各维度的分数
  Object.keys(answers).forEach(questionId => {
    const value = answers[questionId];
    dimensionScores[value]++;
  });

  // 确定每个维度的主导特质
  const personalityType = [
    dimensionScores.E > dimensionScores.I ? 'E' : 'I',
    dimensionScores.S > dimensionScores.N ? 'S' : 'N',
    dimensionScores.T > dimensionScores.F ? 'T' : 'F',
    dimensionScores.J > dimensionScores.P ? 'J' : 'P',
  ].join('');

  return {
    personalityType,
    scores: dimensionScores
  };
};

export default {
  fetchQuestions,
  fetchPersonalityTypes,
  calculateResults
}; 