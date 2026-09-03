import { writeFile } from 'node:fs/promises';
const repositories = [
  'langchain-ai/langchain','langchain-ai/langgraph','run-llama/llama_index','microsoft/semantic-kernel','qdrant/qdrant','vllm-project/vllm','langfuse/langfuse','promptfoo/promptfoo','openai/openai-cookbook','microsoft/generative-ai-for-beginners','Shubhamsaboo/awesome-llm-apps','dswh/ai-engineer-roadmap',
  'vercel/ai','BerriAI/litellm','crewAIInc/crewAI','microsoft/autogen','run-llama/llama-agents','deepset-ai/haystack','weaviate/weaviate','milvus-io/milvus','chroma-core/chroma','pgvector/pgvector','elastic/elasticsearch','stanfordnlp/dspy','huggingface/transformers','huggingface/lerobot','huggingface/smolagents','open-webui/open-webui','ollama/ollama','ggml-org/llama.cpp','lm-sys/FastChat','openai/openai-python','anthropics/anthropic-sdk-python','google-gemini/deprecated-generative-ai-python','microsoft/llmlingua','NVIDIA-NeMo/Guardrails','guardrails-ai/guardrails','truera/trulens','Arize-ai/phoenix','wandb/wandb','mlflow/mlflow','microsoft/graphrag','stanfordnlp/pyreft','cloudflare/ai'
];
const headers={Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'ai-app-dev-github-radar-research'};
const roleMap={
  '应用框架':['vercel/ai','deepset-ai/haystack','BerriAI/litellm','openai/openai-python','anthropics/anthropic-sdk-python','google-gemini/deprecated-generative-ai-python'],
  'RAG 与向量数据库':['run-llama/llama_index','qdrant/qdrant','weaviate/weaviate','milvus-io/milvus','chroma-core/chroma','pgvector/pgvector','elastic/elasticsearch','microsoft/graphrag'],
  '智能体编排':['langchain-ai/langgraph','crewAIInc/crewAI','microsoft/autogen','run-llama/llama-agents','huggingface/smolagents'],
  '多模态':['huggingface/transformers','huggingface/lerobot','cloudflare/ai'],
  '模型服务与部署':['vllm-project/vllm','ollama/ollama','ggml-org/llama.cpp','lm-sys/FastChat','open-webui/open-webui','mlflow/mlflow'],
  '评测与可观测性':['langfuse/langfuse','promptfoo/promptfoo','truera/trulens','Arize-ai/phoenix','wandb/wandb','stanfordnlp/pyreft'],
  'AI 安全':['NVIDIA-NeMo/Guardrails','guardrails-ai/guardrails','microsoft/llmlingua'],
  '学习资源与作品集':['openai/openai-cookbook','microsoft/generative-ai-for-beginners','Shubhamsaboo/awesome-llm-apps','dswh/ai-engineer-roadmap']
};
const categoryByRepo=Object.fromEntries(Object.entries(roleMap).flatMap(([cat,names])=>names.map(n=>[n,cat])));
const records=[];
for (const fullName of repositories) { const r=await fetch(`https://api.github.com/repos/${fullName}`,{headers}); if(!r.ok) throw new Error(`${fullName} ${r.status}`); const repo=await r.json(); records.push({fullName:repo.full_name,url:repo.html_url,description:repo.description,stars:repo.stargazers_count,forks:repo.forks_count,openIssues:repo.open_issues_count,language:repo.language??'未标注',topics:repo.topics??[],license:repo.license?.spdx_id??'未标注',createdAt:repo.created_at,updatedAt:repo.updated_at,pushedAt:repo.pushed_at,archived:repo.archived,defaultBranch:repo.default_branch,category:categoryByRepo[repo.full_name.toLowerCase()] ?? categoryByRepo[repo.full_name]??'应用框架'}); }
const snapshotAt=new Date().toISOString();
await writeFile('research_data.json',JSON.stringify({snapshotAt,source:'GitHub REST API /repos/{owner}/{repo}',records},null,2)+'\n');
console.log(`写入 ${records.length} 条，快照 ${snapshotAt}`);
