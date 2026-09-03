/**
 * Design reminder — Signal Library: editorial research index, warm archival paper,
 * ink typography, moss-green system cues, and signal-orange emphasis only for verified actions.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Copy,
  Download,
  ExternalLink,
  Filter,
  Github,
  Layers3,
  Menu,
  Radar,
  Search,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar as RadarShape,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Repository = {
  fullName: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  license: string;
  category: string;
  stage: string;
  role: string;
  skills: string[];
  fit: number;
  verdict: string;
};

const repoData: Repository[] = [
  { fullName: "langchain-ai/langchain", url: "https://github.com/langchain-ai/langchain", stars: 145567, forks: 24292, language: "Python", license: "MIT", category: "应用框架", stage: "基础 → 进阶", role: "把模型调用、提示词、检索和工具整合成应用", skills: ["模型 API", "提示词与结构化输出", "工具调用", "RAG 基础"], fit: 94, verdict: "首选的应用集成入口；建议以一个垂直场景助手作为练习载体。" },
  { fullName: "Shubhamsaboo/awesome-llm-apps", url: "https://github.com/Shubhamsaboo/awesome-llm-apps", stars: 135857, forks: 19982, language: "Python", license: "Apache-2.0", category: "作品集案例", stage: "基础 → 高阶", role: "覆盖 Agents、Agent Skills、RAG 的可参考实现集合", skills: ["需求拆解", "场景复刻", "架构阅读", "作品集改造"], fit: 95, verdict: "不要只 Fork；选一个案例替换真实数据源、加入评测和部署说明。" },
  { fullName: "microsoft/generative-ai-for-beginners", url: "https://github.com/microsoft/generative-ai-for-beginners", stars: 119060, forks: 62732, language: "Jupyter", license: "MIT", category: "学习资源", stage: "基础", role: "21 课生成式 AI 入门与动手课程", skills: ["提示工程", "语义搜索", "应用设计", "负责任 AI"], fit: 88, verdict: "适合系统建立生成式 AI 应用开发的基础词汇和第一个端到端原型。" },
  { fullName: "vllm-project/vllm", url: "https://github.com/vllm-project/vllm", stars: 90869, forks: 21638, language: "Python", license: "Apache-2.0", category: "推理与部署", stage: "进阶 → 高阶", role: "高吞吐、内存效率导向的大模型推理与服务", skills: ["模型服务", "吞吐优化", "GPU 推理", "OpenAI 兼容接口"], fit: 78, verdict: "适用于需要理解开源模型服务、性能与成本权衡的岗位。" },
  { fullName: "openai/openai-cookbook", url: "https://github.com/openai/openai-cookbook", stars: 75717, forks: 12796, language: "Jupyter", license: "MIT", category: "学习资源", stage: "基础", role: "OpenAI API 的示例与指南集合", skills: ["API 调用", "结构化输出", "函数调用", "应用模式"], fit: 86, verdict: "适合作为模型能力与 SDK 使用方式的官方练习册。" },
  { fullName: "run-llama/llama_index", url: "https://github.com/run-llama/llama_index", stars: 51994, forks: 8075, language: "Python", license: "MIT", category: "RAG 与数据", stage: "进阶", role: "将企业文档与数据源接入可检索的 LLM 应用", skills: ["文档摄取", "索引", "检索策略", "文档智能体"], fit: 90, verdict: "适合知识库问答、文档处理与数据密集型项目。" },
  { fullName: "langchain-ai/langgraph", url: "https://github.com/langchain-ai/langgraph", stars: 40982, forks: 6913, language: "Python", license: "MIT", category: "智能体编排", stage: "进阶", role: "构建有状态、可恢复、可人工审核的智能体工作流", skills: ["状态机", "任务编排", "持久化", "人工介入"], fit: 92, verdict: "适合把单轮 Demo 升级为可控的多步骤业务流程。" },
  { fullName: "qdrant/qdrant", url: "https://github.com/qdrant/qdrant", stars: 34361, forks: 2631, language: "Rust", license: "Apache-2.0", category: "RAG 与数据", stage: "进阶", role: "为语义检索与混合搜索提供向量数据库能力", skills: ["向量检索", "过滤", "混合搜索", "检索评估"], fit: 89, verdict: "RAG 项目从原型走向可维护数据层时的关键基础设施。" },
  { fullName: "langfuse/langfuse", url: "https://github.com/langfuse/langfuse", stars: 34146, forks: 3685, language: "TypeScript", license: "MIT", category: "质量保障", stage: "进阶 → 高阶", role: "提示词管理、追踪、评测、指标与调试", skills: ["可观测性", "评测数据集", "提示词版本", "成本与延迟分析"], fit: 93, verdict: "把“模型效果不错”变成可衡量、可迭代工程结论的关键工具。" },
  { fullName: "microsoft/semantic-kernel", url: "https://github.com/microsoft/semantic-kernel", stars: 28527, forks: 4752, language: "C#", license: "MIT", category: "应用框架", stage: "基础 → 进阶", role: "面向 .NET、Python、Java 的企业应用 LLM 集成", skills: ["企业 SDK", "插件", "跨语言开发", "服务集成"], fit: 82, verdict: "若目标岗位偏 Microsoft/.NET 技术栈，应优先纳入作品集。" },
  { fullName: "promptfoo/promptfoo", url: "https://github.com/promptfoo/promptfoo", stars: 24780, forks: 2257, language: "TypeScript", license: "MIT", category: "质量保障", stage: "进阶 → 高阶", role: "提示词、RAG、智能体测试与 AI 红队扫描", skills: ["测试集", "回归测试", "安全评测", "CI/CD"], fit: 91, verdict: "建议在作品集项目中加入可重复的评测与安全检查命令。" },
  { fullName: "dswh/ai-engineer-roadmap", url: "https://github.com/dswh/ai-engineer-roadmap", stars: 673, forks: 117, language: "—", license: "Apache-2.0", category: "学习资源", stage: "基础 → 高阶", role: "将 AI 工程能力划分为基础、中级、高级路线", skills: ["学习规划", "项目选题", "能力盘点", "LLMOps 视野"], fit: 80, verdict: "适合校准学习顺序；因近期代码推送较早，具体工具选择需结合主项目文档。" },
];

const categoryData = [
  { name: "学习资源", stars: 195450, color: "#52745E" },
  { name: "应用框架", stars: 174094, color: "#10202D" },
  { name: "作品集案例", stars: 135857, color: "#FF5C35" },
  { name: "推理与部署", stars: 90869, color: "#8197A2" },
  { name: "RAG 与数据", stars: 86355, color: "#B5A25B" },
  { name: "质量保障", stars: 58926, color: "#344C5C" },
  { name: "智能体编排", stars: 40982, color: "#B9694F" },
];

const skillData = [
  { subject: "模型与 API", score: 92, fullMark: 100 },
  { subject: "RAG 与检索", score: 90, fullMark: 100 },
  { subject: "智能体工作流", score: 88, fullMark: 100 },
  { subject: "评测与观测", score: 93, fullMark: 100 },
  { subject: "部署与推理", score: 80, fullMark: 100 },
];

const learningPath = [
  { step: "01", title: "做出可用的单场景助手", summary: "模型 API、提示词、结构化输出与简单 Web 界面", resources: "Generative AI for Beginners · OpenAI Cookbook · LangChain" },
  { step: "02", title: "让回答有证据", summary: "文档摄取、向量检索、引用来源与 RAG 评测", resources: "LlamaIndex · Qdrant · Langfuse" },
  { step: "03", title: "把对话改造成工作流", summary: "工具调用、状态、重试与人工审核", resources: "LangGraph · Awesome LLM Apps" },
  { step: "04", title: "为生产环境设护栏", summary: "提示词版本、回归评测、安全扫描、成本与吞吐", resources: "Promptfoo · Langfuse · vLLM" },
];

const categories = ["全部", ...categoryData.map((item) => item.name)];
const formatNumber = (value: number) => new Intl.NumberFormat("zh-CN").format(value);
const formatCompact = (value: number) => `${(value / 10000).toFixed(value >= 100000 ? 1 : 2).replace(/\.0$/, "")} 万`;

function MiniBadge({ children, color = "ink" }: { children: React.ReactNode; color?: "ink" | "orange" | "green" }) {
  return <span className={`mini-badge mini-badge--${color}`}>{children}</span>;
}

function LogoMark() {
  return <img className="logo-mark" src="/manus-storage/github-radar-mark_5a50e609.png" alt="GitHub 雷达标志" />;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(repoData[1]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredRepos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return repoData.filter((repo) => {
      const categoryMatch = activeCategory === "全部" || repo.category === activeCategory;
      const queryMatch = !normalizedQuery || [repo.fullName, repo.category, repo.role, ...repo.skills]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  const exportSummary = () => {
    const markdown = `# AI 应用开发 GitHub 雷达\n\n数据快照：2026-09-03（GMT+8）\n\n本研究筛选 12 个 AI 应用开发相关开源资源，累计 782,533 Stars 与 169,870 Forks。\n\n${repoData.map((repo) => `- [${repo.fullName}](${repo.url})：${repo.role}；${formatNumber(repo.stars)} Stars；岗位适配度 ${repo.fit}/100。`).join("\n")}\n\n来源：GitHub 公开仓库页面与 API 快照。`;
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "AI应用开发_GitHub雷达_研究摘要.md";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const copyLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回顶部">
          <LogoMark />
          <span className="brand-lockup"><strong>GitHub 雷达</strong><small>AI 应用开发</small></span>
        </a>
        <nav className="desktop-nav" aria-label="主导航">
          <a href="#overview">生态总览</a>
          <a href="#directory">资源目录</a>
          <a href="#path">学习路径</a>
          <a href="#method">研究方法</a>
        </nav>
        <div className="topbar-actions">
          <span className="snapshot"><CircleDot size={13} />数据快照 · 2026.09.03</span>
          <Button variant="outline" size="sm" className="export-btn" onClick={exportSummary}><Download size={15} />导出摘要</Button>
          <button className="mobile-menu" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="切换导航菜单">
            {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {mobileNavOpen && <nav className="mobile-nav" aria-label="移动端主导航">
          <a onClick={() => setMobileNavOpen(false)} href="#overview">生态总览</a>
          <a onClick={() => setMobileNavOpen(false)} href="#directory">资源目录</a>
          <a onClick={() => setMobileNavOpen(false)} href="#path">学习路径</a>
          <a onClick={() => setMobileNavOpen(false)} href="#method">研究方法</a>
        </nav>}
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <img className="hero-art" src="/manus-storage/github-radar-hero_53845a77.png" alt="开源生态的抽象雷达等高线图" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> RESEARCH INDEX / 2026</div>
            <h1 id="hero-title">从 GitHub 信号<br /><em>到岗位能力。</em></h1>
            <p>为 AI 应用开发者筛选可落到代码的框架、数据层、质量工具与学习资源；不只看热度，更标注它帮助你交付什么。</p>
            <div className="hero-cta-row">
              <Button className="signal-button" asChild><a href="#directory">查看 12 个精选仓库 <ArrowDown size={17} /></a></Button>
              <button className="quiet-action" onClick={copyLink}><Copy size={15} />复制研究链接</button>
            </div>
          </div>
          <div className="hero-stat-sheet" aria-label="研究概览统计">
            <div className="sheet-head"><span>研究样本</span><span>01 / 01</span></div>
            <div className="sheet-main-stat"><strong>12</strong><span>个<br />开源资源</span></div>
            <div className="stat-rule" />
            <div className="sheet-grid">
              <div><small>累计 Stars</small><b>{formatCompact(782533)}</b></div>
              <div><small>累计 Forks</small><b>{formatCompact(169870)}</b></div>
              <div><small>能力层</small><b>05</b></div>
              <div><small>资源类别</small><b>07</b></div>
            </div>
          </div>
          <div className="hero-footnote"><span>注</span> 指标为 GitHub 公开元数据快照；用于观察生态信号，而非岗位需求统计。</div>
        </section>

        <section className="page-frame overview-section" id="overview" aria-labelledby="overview-title">
          <aside className="section-index"><span>01</span><div /><p>生态<br />总览</p></aside>
          <div className="section-content">
            <div className="section-heading">
              <div><p className="kicker">生态读数</p><h2 id="overview-title">热度指向入口，<br /><em>能力决定路线。</em></h2></div>
              <p className="heading-note">在 12 个资源中，学习资源与应用框架汇聚了最多公开关注；质量保障类仓库数量虽少，却以更高的平均岗位适配度构成生产化的关键缺口。</p>
            </div>
            <div className="overview-grid">
              <article className="chart-panel chart-panel--bars">
                <div className="panel-title"><span><BarChart3 size={17} />类别关注度</span><small>按累计 Stars</small></div>
                <div className="bar-chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 24, left: 4, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={76} tickLine={false} axisLine={false} tick={{ fill: "#52606C", fontSize: 11, fontFamily: "IBM Plex Sans" }} />
                      <Tooltip cursor={{ fill: "rgba(16,32,45,0.05)" }} contentStyle={{ border: "1px solid #d8d0c3", borderRadius: 0, boxShadow: "none", fontFamily: "DM Mono", fontSize: 12 }} formatter={(value: number) => [`${formatNumber(value)} Stars`, "累计关注"]} />
                      <Bar dataKey="stars" radius={[0, 3, 3, 0]} barSize={16}>{categoryData.map((item) => <Cell key={item.name} fill={item.color} />)}</Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="panel-caption">“学习资源”包含系统课程、官方示例与路线索引，因此具有更广泛的阅读与 Fork 属性；它不等同于技术选型的排名。</p>
              </article>
              <article className="chart-panel chart-panel--radar">
                <div className="panel-title"><span><Radar size={17} />岗位能力地图</span><small>建议覆盖度</small></div>
                <div className="radar-chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skillData} outerRadius="68%">
                      <PolarGrid stroke="#d7cfc1" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#52606C", fontSize: 11, fontFamily: "IBM Plex Sans" }} />
                      <RadarShape dataKey="score" stroke="#FF5C35" fill="#FF5C35" fillOpacity={0.22} strokeWidth={2} />
                      <Tooltip contentStyle={{ border: "1px solid #d8d0c3", borderRadius: 0, boxShadow: "none", fontFamily: "DM Mono", fontSize: 12 }} formatter={(value: number) => [`${value}/100`, "覆盖度"]} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <p className="panel-caption">覆盖度表示本次入选资源对该能力层的支持强度，不代表个人掌握程度。建议将“评测与可观测性”作为作品集的显性证据。</p>
              </article>
              <article className="signal-note">
                <div className="signal-note-number">01</div>
                <Sparkles size={24} />
                <h3>把“会调用模型”升级为“能交付系统”。</h3>
                <p>优秀项目应同时展示真实数据源、失败处理、质量评测与运行说明。框架只是入口，证据链才是区分度。</p>
                <a href="#path">查看四阶段路线 <ArrowUpRight size={15} /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="directory-section" id="directory" aria-labelledby="directory-title">
          <div className="page-frame directory-frame">
            <aside className="section-index section-index--light"><span>02</span><div /><p>资源<br />目录</p></aside>
            <div className="section-content">
              <div className="directory-head">
                <div><p className="kicker kicker--light">可筛选研究目录</p><h2 id="directory-title">找到适合<br /><em>下一步的仓库。</em></h2></div>
                <p>筛选不会改变原始数据，只会重新组织阅读顺序。点击任一条目查看其岗位价值，再打开原始仓库核验。</p>
              </div>
              <div className="directory-controls">
                <div className="filter-scroll" aria-label="资源分类筛选">
                  {categories.map((category) => <button key={category} className={activeCategory === category ? "filter-pill is-active" : "filter-pill"} onClick={() => setActiveCategory(category)}>{category}{category !== "全部" && <span>{repoData.filter((repo) => repo.category === category).length}</span>}</button>)}
                </div>
                <div className="search-wrap"><Search size={16} /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索仓库、能力或场景" aria-label="搜索资源目录" /></div>
              </div>
              <div className="directory-meta"><span><Filter size={14} />显示 {filteredRepos.length} / 12 个资源</span><span>按公开 Stars 排序</span></div>
              <div className="directory-layout">
                <div className="repo-list">
                  {filteredRepos.length ? filteredRepos.map((repo, index) => <button key={repo.fullName} className={selectedRepo?.fullName === repo.fullName ? "repo-row is-selected" : "repo-row"} onClick={() => setSelectedRepo(repo)}>
                    <span className="repo-rank">{String(index + 1).padStart(2, "0")}</span>
                    <span className="repo-copy"><strong>{repo.fullName}</strong><small>{repo.role}</small></span>
                    <span className="repo-tags"><MiniBadge color="green">{repo.category}</MiniBadge><span className="star-count">★ {formatCompact(repo.stars)}</span></span>
                    <ChevronRight className="repo-chevron" size={17} />
                  </button>) : <div className="empty-state"><Search size={24} /><p>没有匹配的资源。尝试换一个关键词或重置分类。</p><button onClick={() => { setQuery(""); setActiveCategory("全部"); }}>重置筛选</button></div>}
                </div>
                {selectedRepo && <aside className="repo-detail" aria-live="polite">
                  <div className="detail-topline"><span>研究卡片</span><span>{selectedRepo.stage}</span></div>
                  <h3>{selectedRepo.fullName}</h3>
                  <p className="detail-role">{selectedRepo.role}</p>
                  <div className="detail-score"><div><span>岗位适配度</span><b>{selectedRepo.fit}<small>/100</small></b></div><div className="score-ring"><svg viewBox="0 0 36 36"><path className="ring-base" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831" /><path className="ring-progress" strokeDasharray={`${selectedRepo.fit}, 100`} d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831" /></svg></div></div>
                  <div className="detail-divider" />
                  <div className="detail-stats"><div><small>Stars</small><b>{formatCompact(selectedRepo.stars)}</b></div><div><small>Forks</small><b>{formatCompact(selectedRepo.forks)}</b></div><div><small>主语言</small><b>{selectedRepo.language}</b></div></div>
                  <div className="skill-tags"><small>建议练习能力</small><div>{selectedRepo.skills.map((skill) => <MiniBadge key={skill}>{skill}</MiniBadge>)}</div></div>
                  <div className="researcher-note"><span>研究员批注</span><p>{selectedRepo.verdict}</p></div>
                  <a className="source-link" href={selectedRepo.url} target="_blank" rel="noreferrer"><Github size={16} />打开原始仓库<ExternalLink size={14} /></a>
                </aside>}
              </div>
            </div>
          </div>
        </section>

        <section className="page-frame path-section" id="path" aria-labelledby="path-title">
          <aside className="section-index"><span>03</span><div /><p>学习<br />路径</p></aside>
          <div className="section-content">
            <div className="path-header">
              <div><p className="kicker">从演示到交付</p><h2 id="path-title">作品集应当呈现<br /><em>递进的证据链。</em></h2></div>
              <div className="path-visual"><img src="/manus-storage/github-radar-path_f91b1da5.png" alt="表示进阶学习路径的抽象索引纸带" /></div>
            </div>
            <div className="path-list">
              {learningPath.map((item) => <article className="path-row" key={item.step}>
                <span className="path-step">{item.step}</span>
                <div><h3>{item.title}</h3><p>{item.summary}</p></div>
                <span className="path-resources">{item.resources}</span>
                <Target size={19} />
              </article>)}
            </div>
            <div className="portfolio-callout"><CheckCircle2 size={20} /><p><strong>最小可展示单元：</strong>一个真实场景 + 可溯源回答/可控工作流 + 可重复评测 + 清晰 README。四者结合，比堆叠术语更能说明你的 AI 应用开发能力。</p></div>
          </div>
        </section>

        <section className="insight-strip">
          <img src="/manus-storage/github-radar-insight_562095b7.png" alt="抽象信号波纹" />
          <div><p className="kicker">研究判断</p><h2>不是追逐最多的框架，<br />而是建立完整的<strong>交付闭环</strong>。</h2></div>
          <div className="strip-facts"><span>01 / 选择真实场景</span><span>02 / 接入可验证数据</span><span>03 / 加入评测与护栏</span></div>
        </section>

        <section className="page-frame method-section" id="method" aria-labelledby="method-title">
          <aside className="section-index"><span>04</span><div /><p>研究<br />方法</p></aside>
          <div className="section-content method-content">
            <div><p className="kicker">口径与来源</p><h2 id="method-title">透明的筛选，<br /><em>可复查的推荐。</em></h2></div>
            <div className="method-grid">
              <article><span>筛选口径</span><p>优先纳入能直接服务于 LLM 应用、RAG、智能体、评测/观测、部署推理，或能产出可展示项目的公开 GitHub 仓库。</p></article>
              <article><span>质量判断</span><p>综合观察用途清晰度、公开 Stars/Forks、许可、是否归档和近期活动。Stars 仅是社区关注的辅助信号，不构成技术选型结论。</p></article>
              <article><span>数据来源</span><p>GitHub 公开仓库页面与官方 REST API 快照，采集时间为 2026-09-03（GMT+8）。页面的每个资源链接均直达原始仓库。</p></article>
              <article><span>阅读提示</span><p>路线资源用于建立能力顺序，案例集合用于场景拆解，框架与基础设施用于实践，质量工具用于把 Demo 变成可评测的工程交付。</p></article>
            </div>
            <div className="source-register"><BookOpen size={18} /><span>原始来源索引</span><div>{repoData.map((repo, index) => <a key={repo.fullName} href={repo.url} target="_blank" rel="noreferrer">[{String(index + 1).padStart(2, "0")}] {repo.fullName}</a>)}</div></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><LogoMark /><span><strong>GitHub 雷达</strong><small>AI 应用开发研究索引</small></span></div>
        <p>数据快照：2026.09.03 · 12 个公开开源资源 · 可筛选、可核验、可导出</p>
        <a href="#top">返回顶部 <ArrowDown size={14} /></a>
      </footer>
    </div>
  );
}
