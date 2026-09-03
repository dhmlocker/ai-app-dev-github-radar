import { writeFile } from "node:fs/promises";

const repositories = [
  "langchain-ai/langchain",
  "langchain-ai/langgraph",
  "run-llama/llama_index",
  "microsoft/semantic-kernel",
  "qdrant/qdrant",
  "vllm-project/vllm",
  "langfuse/langfuse",
  "promptfoo/promptfoo",
  "openai/openai-cookbook",
  "microsoft/generative-ai-for-beginners",
  "shubhamsaboo/awesome-llm-apps",
  "dswh/ai-engineer-roadmap"
];

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "ai-app-dev-github-radar-research"
};

const records = [];
for (const fullName of repositories) {
  const response = await fetch(`https://api.github.com/repos/${fullName}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API 请求失败：${fullName} (${response.status})`);
  }
  const repo = await response.json();
  records.push({
    fullName: repo.full_name,
    url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    language: repo.language,
    topics: repo.topics,
    license: repo.license?.spdx_id ?? "未标注",
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    archived: repo.archived,
    defaultBranch: repo.default_branch
  });
}

await writeFile(
  "/home/ubuntu/ai-app-dev-github-radar/research_data.json",
  `${JSON.stringify({ snapshotAt: new Date().toISOString(), records }, null, 2)}\n`,
  "utf8"
);

console.log(`已写入 ${records.length} 条仓库元数据。`);
