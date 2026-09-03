# AI 应用开发 GitHub 雷达：研究摘录

研究日期：2026-09-03（GMT+8）

## 已核验资源

| 仓库 | 用途判断 | 核验信号 | 适合岗位阶段 | 来源 |
| --- | --- | --- | --- | --- |
| `dswh/ai-engineer-roadmap` | 面向 AI 工程师的结构化路线与外部学习索引。 | README 按初级（LLM API、提示工程、开源模型）、中级（向量库、RAG、智能体）、高级（部署、LLMOps、微调、多模态与安全）组织，并给出功能产品想法；Apache-2.0；页面显示 673 stars、117 forks、最新 README 提交为 2024-06-05。 | 认知框架与项目选题 | https://github.com/dswh/ai-engineer-roadmap |
| `shubhamsaboo/awesome-llm-apps` | 可直接阅读、克隆和改造的 LLM 应用、RAG 与智能体案例集合。 | 仓库自述“100+ open-source AI agents, agent skills, and RAG apps”；目录含 starter/advanced/always-on agents、advanced LLM apps、MCP agents、RAG tutorials、voice AI agents 等；Apache-2.0；页面显示约 136k stars、20k forks、1,212 commits，近期提交活跃。 | 作品集练习与场景拆解 | https://github.com/shubhamsaboo/awesome-llm-apps |
| `langchain-ai/langgraph` | 面向复杂智能体的低层编排框架。 | README 定义其为构建有状态智能体的低层编排框架；突出 durable execution、human-in-the-loop、短期与长期记忆、执行路径调试、生产部署。页面显示约 41k stars、6.9k forks、7,068 commits、572 tags 与近期提交；MIT。 | 智能体工作流、状态管理、人工审核 | https://github.com/langchain-ai/langgraph |
| `langfuse/langfuse` | 开源 AI 工程平台，覆盖应用质量与运行可见性。 | 仓库定位为 LLM evals、observability、metrics、prompt management、playground 与 datasets 平台，并标注 OpenTelemetry、LangChain、OpenAI SDK、LiteLLM 等集成；页面显示约 34.1k stars、3.7k forks、9,049 commits，最新提交为 2026-09-03；MIT。 | 追踪、提示词版本、离线/在线评测、成本与调试 | https://github.com/langfuse/langfuse |

## 初步研究判断

“AI 应用开发”岗位不等同于模型训练岗位。用户可迁移能力主要围绕：**模型与 API 接入、检索增强、工作流/智能体编排、评测与可观测性、部署与安全**。其中 LangGraph 证明“能把对话变成可恢复、有状态流程”是一项独立能力；Langfuse 则使“可评测、可追踪、可调试”成为可展示的工程交付。后续仓库筛选将覆盖这五层能力，并在网页中区分“框架、基础设施、质量保障、学习资源、可展示作品”五类。
