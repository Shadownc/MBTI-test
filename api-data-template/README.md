# MBTI 测试 API 数据

这个仓库包含用于 MBTI 人格测试应用的 JSON 数据文件。你可以通过 GitHub Pages 来托管这些文件，为你的 MBTI 应用提供 API 数据源。

## 包含的文件

- `questions.json` - 30个 MBTI 测试问题，涵盖所有四个维度 (E/I, S/N, T/F, J/P)
- `personality-types.json` - 16种 MBTI 人格类型的详细介绍，包括特点、优势、弱点和适合职业等

## 如何使用 GitHub Pages 托管这些 API 数据

1. 创建一个新的 GitHub 仓库
2. 将这些 JSON 文件上传到仓库
3. 启用 GitHub Pages (在仓库设置中)
4. 你的数据将通过以下 URL 可用:
   - `https://[你的用户名].github.io/[仓库名]/questions.json`
   - `https://[你的用户名].github.io/[仓库名]/personality-types.json`

## 在 MBTI 应用中配置

修改 `src/services/api.js` 文件中的 `API_SOURCES.GITHUB_PAGES` 值:

```javascript
const API_SOURCES = {
  // GitHub Pages静态JSON (修改为您自己的GitHub Pages URL)
  GITHUB_PAGES: 'https://[你的用户名].github.io/[仓库名]'
};
```

## 自定义和扩展

你可以:

1. 添加更多问题到 `questions.json`
2. 为每个性格类型添加更详细的描述和相似名人

## 许可证

这些数据仅供个人和教育用途使用。 