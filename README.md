# AI 应用开发 GitHub 雷达

这是一个用于研究 AI 应用开发岗位相关开源项目、开发工具与学习资源的静态 React 网站。页面采用“信号图书馆”编辑式视觉系统，将 GitHub 仓库按应用框架、RAG 与数据、智能体编排、质量保障、推理与部署、学习资源和作品集案例进行组织，并提供分类筛选、关键词检索、交互式图表、项目明细和四阶段学习路径。

## 本地运行

项目使用 React 19、Vite、Tailwind CSS 4、Recharts、Wouter 和 shadcn/ui 组件。安装 Node.js 22 或兼容版本后执行：

```bash
pnpm install
pnpm dev
```

类型检查和生产构建命令如下：

```bash
pnpm check
pnpm build
```

## 研究资料

`research_data.json` 是通过 GitHub 公开 REST API 获取的仓库元数据快照；`research_analysis.json` 是基于该快照生成的分类、岗位适配度和学习路径分析；`AI应用开发_GitHub研究报告.md` 是完整研究报告；`research_notes.md` 保存了关键核验摘录。当前快照日期为 **2026-09-03（GMT+8）**。Stars、Forks 和更新时间是公开生态信号，不是岗位需求统计，也不构成技术选型或就业承诺。

## 研究脚本

如需刷新公开元数据，可执行：

```bash
node scripts/fetch_github_metadata.mjs
node scripts/analyze_research.mjs
```

脚本会访问 GitHub 官方公开 API，重新生成 `research_data.json`、`research_analysis.json` 和 `AI应用开发_GitHub研究报告.md`。如果遇到 API 速率限制，请稍后重试或配置 GitHub CLI 身份认证后再采集。

## 视觉资产与跨账号迁移

当前 Manus 在线版本使用 `/manus-storage/` 生命周期 URL 引用生成的视觉资产。为方便迁移，仓库同时保留一份原始资产副本于 `migration_assets/`，包括首屏背景、洞见插图、学习路径插图和品牌标志。迁移到新的 Manus 项目后，应先将这些图片重新上传为新项目的静态资产，再按新返回的 URL 更新 `client/src/pages/Home.tsx` 中的引用；不要将本地相对路径直接用于 Manus WebDev 部署。

## 目录说明

| 路径 | 说明 |
| --- | --- |
| `client/src/pages/Home.tsx` | 研究网页主页面与交互逻辑 |
| `client/src/index.css` | “信号图书馆”视觉系统与响应式样式 |
| `research_data.json` | GitHub 原始元数据快照 |
| `research_analysis.json` | 分类统计、能力地图与路线数据 |
| `AI应用开发_GitHub研究报告.md` | 研究报告与来源索引 |
| `scripts/` | 元数据采集与分析脚本 |
| `ideas.md` | 设计方向与品牌规范 |
| `migration_assets/` | 跨账号迁移时可重新上传的视觉资产 |

## 许可与来源

本仓库中的研究数据链接回各个原始 GitHub 仓库。使用第三方项目时，请遵守其各自的 MIT 或 Apache-2.0 等许可证及项目贡献者的使用条款。
