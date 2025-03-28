# MBTI 人格测试应用

这是一个基于 React 的 MBTI 人格测试应用，主要针对移动端使用。应用使用超大本地题库提供专业级别的人格分析结果。

## 功能特点

- 完整的 MBTI 人格测试问题集（117题）
- 平衡的测试题目，每个维度近30个问题
- 专业设计的问题和选项，提供商业测试水准的评估
- 移动端友好的界面设计
- 16 种人格类型的详细描述
- 个性化结果分析和职业建议
- 与结果类型相似的名人对比
- 响应式布局，适配各种设备

## 技术栈

- React
- React Router
- Styled Components
- JavaScript (ES6+)

## 项目结构

```
src/
├── components/       # 通用组件
├── data/             # 本地数据
│   ├── questions.js  # 测试题库（117题）
│   └── personalityTypes.js # 性格类型描述
├── pages/            # 页面组件
│   ├── Home.js       # 首页
│   ├── Test.js       # 测试页面
│   └── Result.js     # 结果页面
├── services/         # 服务
│   └── api.js        # 数据处理服务
└── App.js            # 应用入口
```

## 测试内容

本MBTI测试包含117个精心设计的问题，涵盖四个核心维度：

- 外向 vs 内向 (E/I) - 29-30题
- 感觉 vs 直觉 (S/N) - 29-30题
- 思考 vs 情感 (T/F) - 29-30题
- 判断 vs 感知 (J/P) - 29-30题

每个问题都有两个选项，代表维度的两个极端，用户选择最符合自己性格的选项。测试完成后，系统会根据用户的选择计算出MBTI类型。这种大量题目的设计确保了测试结果的准确性和稳定性，提供与商业测试相当的专业水准。

## 专业性特点

- **全面覆盖**：问题涵盖各种生活和工作场景，全面评估性格特征
- **平衡设计**：每个维度题量平衡，避免测量偏差
- **专业标准**：问题设计参考心理学测量标准，确保科学性
- **详细反馈**：提供深入的性格分析和个性化建议

## 本地开发

### 前提条件

- Node.js (v14.0.0 或更高版本)
- npm 或 yarn

### 安装和运行

1. 克隆仓库或下载源代码
2. 安装依赖包

```bash
npm install
# 或者
yarn install
```

3. 启动开发服务器

```bash
npm start
# 或者
yarn start
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 构建生产版本

```bash
npm run build
# 或者
yarn build
```

构建完成后，生产版本文件将位于 `build` 目录中。

## 自定义题库

如果你想自定义题库，可以修改 `src/data/questions.js` 文件。每个问题需要包含以下信息：

```javascript
{
  id: 1,
  text: "问题文本",
  options: [
    { text: "选项1文本", value: "E/I/S/N/T/F/J/P" },
    { text: "选项2文本", value: "E/I/S/N/T/F/J/P" }
  ],
  dimension: "EI/SN/TF/JP" // 问题所属维度
}
```

## 使用说明

1. 在首页点击"开始测试"按钮
2. 回答所有测试问题，每个问题选择最符合你的选项
3. 完成测试后，查看你的 MBTI 人格类型分析结果

## 参考资源

本应用参考了 [16personalities.com](https://mbti16personalities.com/) 的 MBTI 测试、《心理类型》(Psychological Types) 以及多个专业心理测量工具的评估标准。

## 许可证

MIT 