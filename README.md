# AI 应用开发 GitHub 雷达

这是一个基于 React/Vite 的“AI 应用开发研究与学习工作台”。它保留暖白档案纸、深墨、苔绿、信号橙、Noto Serif SC + IBM Plex Sans + DM Mono 和非对称编辑式布局，同时把 GitHub 资源目录、活跃度信号、可执行学习 Checklist、收藏和个人进度放到同一页面。

## 本地运行与验证

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

## 数据口径

`research_data.json` 当前快照包含 **44 个仓库**，字段包括 `fullName`、`url`、`description`、`stars`、`forks`、`openIssues`、`language`、`topics`、`license`、`createdAt`、`updatedAt`、`pushedAt`、`archived`、`defaultBranch` 和 `category`。数据由 GitHub 官方公开 REST API `/repos/{owner}/{repo}` 读取，页面展示快照日期。`research_analysis.json` 由分析脚本生成分类汇总、岗位适配信号和研究报告所需的统计。

趋势区**不伪造历史 Star 增长**：使用真实的 `pushedAt` / `updatedAt` 将仓库分为近 7 天、近 30 天、近 90 天和更早，并统计各分类 90 天内活跃仓库比例。这些是 GitHub 活跃度信号，不是就业市场统计、岗位需求统计或技术选型承诺。

## 刷新研究数据

```bash
node scripts/fetch_github_metadata.mjs
node scripts/analyze_research.mjs
cp research_data.json client/src/data/research_data.json
```

采集脚本保留仓库清单、字段映射和官方 API 请求头。未配置 Token 时受 GitHub 未认证 API 速率限制影响；如遇 403，请稍后重试或使用已认证的 GitHub CLI 环境。刷新后应复核分类映射、许可证显示和快照日期，再运行 `pnpm check && pnpm build`。

## 已实现交互

资源目录支持分类、主语言、维护新鲜度、岗位能力筛选，关键词搜索和 Stars/最近推送/名称排序；点击仓库可查看真实指标、许可证、更新/推送日期、维护状态、岗位适配信号、建议练习和原始 GitHub 链接。图表的新鲜度筛选会联动目录，学习任务中的关联仓库会跳转并选中详情。

四个阶段包含 8 个可执行任务，每个任务都有目标、关联仓库、验证标准和建议产出物。状态可设为未开始、进行中或已完成，阶段进度与总进度实时更新。收藏仓库和任务状态保存在浏览器 `LocalStorage`，刷新页面后保留。导出按钮提供个性化 Markdown 和 JSON 报告，内容包括收藏、已完成/进行中/剩余任务和下一步建议；分享按钮通过 URL 参数分享当前筛选和选中仓库。

## 纯静态限制

这是纯静态网页，收藏和学习进度只保存在当前浏览器，**不提供跨设备或跨浏览器同步**。请使用 Markdown 或 JSON 导出作为备份和迁移手段。页面不提交用户数据到服务端。

## 视觉资产

迁移资产源文件保留在 `migration_assets/`，前端部署副本位于 `client/public/assets/`，页面使用 `/assets/` 路径，避免继续依赖原 Manus 项目的生命周期 `/manus-storage/` URL。

## 目录

| 路径 | 说明 |
| --- | --- |
| `client/src/pages/Home.tsx` | 研究工作台主页面、筛选、详情、Checklist、收藏、导出和分享 |
| `client/src/index.css` | Signal Library 视觉系统与响应式样式 |
| `research_data.json` | GitHub 官方 API 原始元数据快照 |
| `research_analysis.json` | 分类统计与研究分析 |
| `scripts/fetch_github_metadata.mjs` | 公开 API 采集脚本 |
| `scripts/analyze_research.mjs` | 统计分析脚本 |
| `migration_assets/` | 跨项目迁移的原始视觉资产 |
