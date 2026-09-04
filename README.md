# AI 应用开发 GitHub 雷达

这是一个基于 React/Vite 的“AI 应用开发研究与学习工作台”。它保留暖白档案纸、深墨、苔绿、信号橙、Noto Serif SC + IBM Plex Sans + DM Mono 和非对称编辑式布局，并拆分为研究首页、资源探索、学习路径、个人工作台和研究方法五个入口。

## 本地运行与验证

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

## 数据口径

`research_data.json` 当前快照保留 **27 个精选仓库**，字段包括 `fullName`、`url`、`description`、`stars`、`forks`、`openIssues`、`language`、`topics`、`license`、`createdAt`、`updatedAt`、`pushedAt`、`archived`、`defaultBranch`、`category`、`role` 和 `jobFitNote`。精选标准是有明确工程用途、可运行入口或示例、许可证清楚、存在维护信号，并能支撑具体练习；官网、无动手入口或高度重复的条目不占核心目录。岗位字段是研究标注，不是 GitHub 原始字段。

趋势区**不伪造历史 Star 增长**：使用真实的 `pushedAt` / `updatedAt` 将仓库分为近 7 天、近 30 天、近 90 天和更早，并统计各分类 90 天内活跃仓库比例。这些是 GitHub 活跃度信号，不是就业市场统计、岗位需求统计或技术选型承诺。

## 刷新研究数据

```bash
node scripts/fetch_github_metadata.mjs
node scripts/analyze_research.mjs
cp research_data.json client/src/data/research_data.json
```

采集脚本保留仓库清单、字段映射和官方 API 请求头。未配置 Token 时受 GitHub 未认证 API 速率限制影响；如遇 403，请稍后重试或使用已认证的 GitHub CLI 环境。刷新后应复核分类映射、许可证显示和快照日期，再运行 `pnpm check && pnpm build`。

## 页面与已实现交互

`/explore` 资源目录支持分类、关键词搜索和 GitHub 仓库/课程方法筛选；点击资源可查看真实指标或学习目标、适用阶段、预计时间、建议产出和原始链接。资源不再局限于 GitHub，已整合 Hugging Face Agents Course、Full Stack Deep Learning、DeepLearning.AI RAG 课程和 Hugging Face Learn 等公开入口。

`/learn` 提供四阶段、16 个可执行任务。每个任务都有目标、预计时间、步骤、外部资源、关联仓库、步骤级勾选、验收标准和建议产出物；完成标准是留下可复现的代码、命令、日志、截图或评测结果，而不是单纯打开链接。`/workbench` 提供下一步推荐、阶段进度、进行中任务和收藏资源入口；任务步骤和收藏状态保存在浏览器 `LocalStorage`，刷新页面后保留。

`/method` 说明从问题定义、最小实现、证据留存到回归复盘的学习闭环。导出和分享能力保留在工作台中；当前版本使用 `radar-status-v2`、`radar-checks-v2` 和 `radar-favorites-v2` 保存状态。纯静态网页不提供账号和跨设备同步，JSON 手动迁移是唯一的跨设备方案。

## 纯静态限制

这是纯静态网页，收藏和学习进度只保存在当前浏览器，**不提供跨设备或跨浏览器同步**。请使用 Markdown 或 JSON 导出作为备份和迁移手段。页面不提交用户数据到服务端。

## 视觉资产

迁移资产源文件保留在 `migration_assets/`；WebDev 发布项目使用重新上传后的 `/manus-storage/` 资产 URL，避免依赖旧项目的资产地址。源码仓库保留原始迁移资产，发布副本不提交大体积图片。

## 目录

| 路径 | 说明 |
| --- | --- |
| `client/src/pages/Workbench.tsx` | 多页面路由、资源探索、学习路径、个人工作台和研究方法 |
| `client/src/pages/Home.tsx` | 旧版单页实现，保留作迁移参考 |
| `client/src/index.css` | Signal Library 视觉系统与响应式样式 |
| `research_data.json` | GitHub 官方 API 原始元数据快照 |
| `research_analysis.json` | 分类统计与研究分析 |
| `scripts/fetch_github_metadata.mjs` | 公开 API 采集脚本 |
| `scripts/analyze_research.mjs` | 统计分析脚本 |
| `migration_assets/` | 跨项目迁移的原始视觉资产 |


## v3.0 多路线学习系统

项目名称升级为 **AI 应用工程训练场**，桌面端内容重排为独立模块：总览、资源探索、学习路径、工具训练、面试准备、能力提升和我的工作台。GitHub 仓库与课程、文档、Playbook 使用统一资源卡片，不做来源视觉分区。

当前提供四条路线：AI 应用开发岗完整路线、AI 工程工具熟悉路线、编码与工程能力提升路线、AI 应用开发面试路线。完整路线包含 16 个任务；工具、能力提升和面试模块各包含 6 个训练任务。每个任务均包含目标、步骤、验收、产出物和常见偏差。

本轮重点修复 v2.0 桌面端问题：减少固定大框和无效留白，使用桌面网格、阶段目录与详情面板承载信息；移动端保留原有单列和折叠菜单体验，并做回归验证。状态保存在 `radar-status-v3`、`radar-checks-v3` 和 `radar-favorites-v3`，纯静态项目不提供账号或跨设备同步；工作台可导出 JSON 手动迁移。


## v3.1 体验增强

本轮增加了桌面端统一宽度约束、当前路由高亮、页面切换滚动复位、移动菜单自动关闭、键盘焦点样式和 reduced-motion 支持。任务面板增加开始前信息与证据目录命令；资源探索读取并回写 `q`、`category` URL 参数；本地状态增加 `radar-workbench-v1` 版本化聚合快照，同时兼容原有状态 key；工作台支持 JSON 与 Markdown 学习报告导出。


## v3.2 任务执行与状态迁移

v3.2 增加阶段门槛、任务开始前信息、证据目录命令、步骤执行提示、非法路线空状态，以及 JSON 进度导入。资源探索新增主语言筛选、Stars/最近更新排序，并将搜索词、分类、语言和排序写入 URL。工作台支持 JSON 备份和 Markdown 学习报告导出。详细计划与限制见 `AI应用工程训练场-v3.2-计划.md`。


## v3.3 工作台行动层

v3.3 增加路线阶段门槛、前置任务提示、核心 API 任务示例命令、我的证据清单和阻塞记录。阻塞记录保存在当前浏览器，并同步到版本化工作台快照；资源探索继续支持主语言、Stars/最近更新时间排序和 URL 分享。完整范围与限制见 `AI应用工程训练场-v3.3-计划.md`。
