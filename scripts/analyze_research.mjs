import { readFile, writeFile } from "node:fs/promises";

const inputPath = "/home/ubuntu/ai-app-dev-github-radar/research_data.json";
const outputPath = "/home/ubuntu/ai-app-dev-github-radar/research_analysis.json";
const reportPath = "/home/ubuntu/ai-app-dev-github-radar/AI应用开发_GitHub研究报告.md";

const { snapshotAt, records } = JSON.parse(await readFile(inputPath, "utf8"));

const blueprint = {
  "langchain-ai/langchain": {
    category: "应用框架",
    stage: "基础 → 进阶",
    role: "把模型调用、提示词、检索和工具整合成应用",
    skills: ["模型 API", "提示词与结构化输出", "工具调用", "RAG 基础"],
    fit: 94,
    verdict: "首选的应用集成入口；建议以一个垂直场景助手作为练习载体。"
  },
  "langchain-ai/langgraph": {
    category: "智能体编排",
    stage: "进阶",
    role: "构建有状态、可恢复、可人工审核的智能体工作流",
    skills: ["状态机", "任务编排", "持久化", "人工介入"],
    fit: 92,
    verdict: "适合把单轮 Demo 升级为可控的多步骤业务流程。"
  },
  "run-llama/llama_index": {
    category: "RAG 与数据",
    stage: "进阶",
    role: "将企业文档与数据源接入可检索的 LLM 应用",
    skills: ["文档摄取", "索引", "检索策略", "文档智能体"],
    fit: 90,
    verdict: "适合知识库问答、文档处理与数据密集型项目。"
  },
  "microsoft/semantic-kernel": {
    category: "应用框架",
    stage: "基础 → 进阶",
    role: "面向 .NET、Python、Java 的企业应用 LLM 集成",
    skills: ["企业 SDK", "插件", "跨语言开发", "服务集成"],
    fit: 82,
    verdict: "若目标岗位偏 Microsoft/.NET 技术栈，应优先纳入作品集。"
  },
  "qdrant/qdrant": {
    category: "RAG 与数据",
    stage: "进阶",
    role: "为语义检索与混合搜索提供向量数据库能力",
    skills: ["向量检索", "过滤", "混合搜索", "检索评估"],
    fit: 89,
    verdict: "RAG 项目从原型走向可维护数据层时的关键基础设施。"
  },
  "vllm-project/vllm": {
    category: "推理与部署",
    stage: "进阶 → 高阶",
    role: "高吞吐、内存效率导向的大模型推理与服务",
    skills: ["模型服务", "吞吐优化", "GPU 推理", "OpenAI 兼容接口"],
    fit: 78,
    verdict: "适用于需要理解开源模型服务、性能与成本权衡的岗位。"
  },
  "langfuse/langfuse": {
    category: "质量保障",
    stage: "进阶 → 高阶",
    role: "提示词管理、追踪、评测、指标与调试",
    skills: ["可观测性", "评测数据集", "提示词版本", "成本与延迟分析"],
    fit: 93,
    verdict: "把“模型效果不错”变成可衡量、可迭代工程结论的关键工具。"
  },
  "promptfoo/promptfoo": {
    category: "质量保障",
    stage: "进阶 → 高阶",
    role: "提示词、RAG、智能体测试与 AI 红队扫描",
    skills: ["测试集", "回归测试", "安全评测", "CI/CD"],
    fit: 91,
    verdict: "建议在作品集项目中加入可重复的评测与安全检查命令。"
  },
  "openai/openai-cookbook": {
    category: "学习资源",
    stage: "基础",
    role: "OpenAI API 的示例与指南集合",
    skills: ["API 调用", "结构化输出", "函数调用", "应用模式"],
    fit: 86,
    verdict: "适合作为模型能力与 SDK 使用方式的官方练习册。"
  },
  "microsoft/generative-ai-for-beginners": {
    category: "学习资源",
    stage: "基础",
    role: "21 课生成式 AI 入门与动手课程",
    skills: ["提示工程", "语义搜索", "应用设计", "负责任 AI"],
    fit: 88,
    verdict: "适合系统建立生成式 AI 应用开发的基础词汇和第一个端到端原型。"
  },
  "Shubhamsaboo/awesome-llm-apps": {
    category: "作品集案例",
    stage: "基础 → 高阶",
    role: "覆盖 Agents、Agent Skills、RAG 的可参考实现集合",
    skills: ["需求拆解", "场景复刻", "架构阅读", "作品集改造"],
    fit: 95,
    verdict: "不要只 Fork；选一个案例替换真实数据源、加入评测和部署说明。"
  },
  "dswh/ai-engineer-roadmap": {
    category: "学习资源",
    stage: "基础 → 高阶",
    role: "将 AI 工程能力划分为基础、中级、高级路线",
    skills: ["学习规划", "项目选题", "能力盘点", "LLMOps 视野"],
    fit: 80,
    verdict: "适合校准学习顺序；因近期代码提交较早，具体工具选择需结合主项目文档。"
  }
};

const repos = records.map((repo) => ({ ...repo, ...blueprint[repo.fullName] }));
const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0);
const categories = [...new Set(repos.map((repo) => repo.category))].map((name) => {
  const scoped = repos.filter((repo) => repo.category === name);
  return {
    name,
    count: scoped.length,
    stars: scoped.reduce((sum, repo) => sum + repo.stars, 0),
    averageFit: Math.round(scoped.reduce((sum, repo) => sum + repo.fit, 0) / scoped.length)
  };
}).sort((a, b) => b.stars - a.stars);

const skills = [
  { name: "模型与 API 集成", score: 92, resources: ["LangChain", "OpenAI Cookbook", "Generative AI for Beginners"] },
  { name: "RAG 与检索", score: 90, resources: ["LlamaIndex", "Qdrant", "LangChain"] },
  { name: "智能体工作流", score: 88, resources: ["LangGraph", "LangChain", "Awesome LLM Apps"] },
  { name: "评测与可观测性", score: 93, resources: ["Langfuse", "Promptfoo"] },
  { name: "部署与推理", score: 80, resources: ["vLLM", "LangGraph", "Semantic Kernel"] }
];

const analysis = {
  snapshotAt,
  totalStars,
  totalForks,
  repos: repos.sort((a, b) => b.stars - a.stars),
  categories,
  skills,
  recommendedPath: [
    { phase: "01", title: "做出可用的单场景助手", focus: "模型 API、提示词、结构化输出与简单 Web 界面", repos: ["microsoft/generative-ai-for-beginners", "openai/openai-cookbook", "langchain-ai/langchain"] },
    { phase: "02", title: "让回答有证据", focus: "文档摄取、向量检索、引用来源与 RAG 评测", repos: ["run-llama/llama_index", "qdrant/qdrant", "langfuse/langfuse"] },
    { phase: "03", title: "把对话改造成工作流", focus: "工具调用、状态、重试与人工审核", repos: ["langchain-ai/langgraph", "shubhamsaboo/awesome-llm-apps"] },
    { phase: "04", title: "为生产环境设护栏", focus: "提示词版本、回归评测、安全扫描、成本与吞吐", repos: ["promptfoo/promptfoo", "langfuse/langfuse", "vllm-project/vllm"] }
  ]
};

const sourceLines = analysis.repos.map((repo, index) => `[${index + 1}]: ${repo.url} "${repo.fullName}"`).join("\n");
const tableRows = analysis.repos.map((repo, index) => `| ${index + 1} | [\`${repo.fullName}\`][${index + 1}] | ${repo.category} | ${repo.stage} | ${repo.stars.toLocaleString("en-US")} | ${repo.license} | ${repo.fit}/100 |`).join("\n");

const report = `# AI 应用开发岗位：GitHub 资源研究报告

**作者：Manus AI**  
**数据快照：${new Date(snapshotAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false })}（GitHub 公开接口）**

## 研究结论

本研究聚焦的不是通用的“AI 学习仓库”，而是能够帮助开发者交付 **LLM 应用、RAG 系统、智能体工作流与生产级质量保障** 的 GitHub 资源。筛选时同时观察了仓库的用途清晰度、社区采纳度、公开许可和近期更新。最终入选的 12 个仓库累计约 **${totalStars.toLocaleString("en-US")} Stars** 与 **${totalForks.toLocaleString("en-US")} Forks**；这不是岗位需求的统计样本，而是衡量公开开发者关注度与生态成熟度的辅助信号。[1] [2] [7] [8]

> AI 应用开发岗位的核心，不是从零训练基础模型，而是把模型、私有数据、业务工具、评测机制与运行环境整合为可控的软件产品。路线仓库也将这一进程概括为从 API/提示工程，到 RAG/智能体，再到部署、LLMOps 与微调的递进过程。[12]

## 入选资源目录

| 序号 | 仓库 | 资源类型 | 建议阶段 | Stars | 许可 | 岗位适配度 |
| --- | --- | --- | --- | ---: | --- | ---: |
${tableRows}

## 能力地图与学习优先级

对于转向 AI 应用开发的工程师，建议首先完成一个带真实输入与可验证输出的单场景助手；随后为其加入检索、引用、评测和部署。这个顺序优先建立可交付能力，而不是过早追逐复杂的多智能体架构。LangGraph 的持久执行、人机协同与记忆机制，代表了工作流进入复杂阶段后的要求；Langfuse 与 Promptfoo 则代表“可测量、可调试、可防护”的工程成熟度。[2] [7] [8]

| 能力层 | 为什么重要 | 优先参考的仓库 |
| --- | --- | --- |
| 模型与 API 集成 | 将模型的生成、结构化输出、工具调用嵌进现有产品，是最基础的交付能力。 | LangChain、OpenAI Cookbook、Generative AI for Beginners |
| RAG 与检索 | 能使回答基于私有知识并可溯源，是企业 AI 应用的常见实现模式。 | LlamaIndex、Qdrant、LangChain |
| 智能体工作流 | 把单轮问答变成多步骤任务，涉及状态、失败恢复、工具调用与人工审核。 | LangGraph、Awesome LLM Apps |
| 评测与可观测性 | 让团队能回归验证质量、查看链路、管理提示词并追踪成本。 | Langfuse、Promptfoo |
| 部署与推理 | 用于理解开源模型服务、性能、吞吐与成本权衡。 | vLLM、Semantic Kernel |

## 推荐的四阶段作品集路线

| 阶段 | 交付物 | 必须展示的证据 | 建议资源 |
| --- | --- | --- | --- |
| 01 | 一个垂直场景助手 | 真实业务输入、错误处理、结构化输出与使用说明。 | Generative AI for Beginners、OpenAI Cookbook、LangChain |
| 02 | 可引用的知识库问答 | 文档摄取、检索策略、来源引用、基础评测集。 | LlamaIndex、Qdrant、Langfuse |
| 03 | 可控的任务型智能体 | 状态图、工具边界、重试策略、人工审核节点。 | LangGraph、Awesome LLM Apps |
| 04 | 具备运行护栏的 AI 服务 | 测试命令、红队/安全检查、运行追踪、成本或性能观察。 | Promptfoo、Langfuse、vLLM |

## 使用建议与边界

高 Stars 不应被误解为“唯一正确的技术选型”。例如，awesome-llm-apps 的价值主要是场景原型与架构阅读；应挑选其中一个案例，替换为自己的真实数据源，并加入评测、说明文档与部署信息，而不是停留在 Fork。dswh/ai-engineer-roadmap 在学习路径上有启发性，但其 GitHub 页面显示最近代码推送时间较早，因此对具体 SDK 版本和工具的选择应回到主项目文档核验。[11] [12]

## 参考来源

${sourceLines}
`;

await writeFile(outputPath, `${JSON.stringify(analysis, null, 2)}\n`, "utf8");
await writeFile(reportPath, report, "utf8");
console.log(`已生成研究分析：${analysis.repos.length} 个仓库，${analysis.categories.length} 个类别。`);
