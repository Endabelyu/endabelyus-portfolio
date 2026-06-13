export interface SkillGroup { label: string; items: string[]; }

export const skills: SkillGroup[] = [
  { label: 'Frontend', items: ['React', 'Next.js', 'Remix', 'React Router', 'SvelteKit', 'TypeScript'] },
  { label: 'UI / Styling', items: ['Tailwind CSS', 'shadcn/ui', 'Material UI', 'Ant Design'] },
  { label: 'State', items: ['Zustand', 'Redux Toolkit', 'Context API'] },
  { label: 'Backend & Data', items: ['Hono', 'PostgreSQL', 'Drizzle', 'Prisma', 'JWT', 'Zod', 'REST'] },
  { label: 'DevOps & Deploy', items: ['Docker', 'GitHub Actions', 'Jenkins CI/CD', 'PM2', 'VPS', 'Cloudflare Workers', 'Vercel', 'Netlify'] },
  { label: 'Exploring', items: ['Python', 'LLM APIs', 'RAG', 'MCP'] },
];
