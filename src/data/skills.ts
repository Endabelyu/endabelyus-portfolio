export interface SkillGroup { label: string; items: string[]; }

export const skills: SkillGroup[] = [
  { label: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'shadcn/ui'] },
  { label: 'Backend', items: ['Hono', 'REST API', 'JWT Auth'] },
  { label: 'Database', items: ['PostgreSQL', 'Prisma', 'Drizzle'] },
  { label: 'Infra / DevOps', items: ['Docker', 'VPS', 'Nginx', 'MinIO'] },
  { label: 'Exploring', items: ['Python', 'LLM APIs', 'LangChain', 'RAG', 'MCP'] },
];
