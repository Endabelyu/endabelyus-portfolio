export type ProjectType = 'Management Systems' | 'Websites & Storefronts' | 'Apps' | 'APIs & Automation';
export type ProjectStatus = 'Live' | 'In rollout' | 'In development' | 'Case study';

export interface Project {
  slug: string;
  name: string;
  outcome: string;
  domain: string;
  type: ProjectType;
  tech: string[];
  status: ProjectStatus;
  url?: string;
  repo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  { slug: 'order-lens', name: 'Order Lens Management', featured: true, status: 'Live',
    outcome: 'A complete lens-ordering system for optical shops — track orders, customers, and vendors in one dashboard.',
    domain: 'Optical', type: 'Management Systems', tech: ['React Router', 'TypeScript', 'shadcn'] },
  { slug: 'mili', name: 'Personal Finance Tracker', featured: true, status: 'Live',
    outcome: 'Take control of your money — track income, set budgets, and see where it all goes.',
    domain: 'Finance', type: 'Apps', tech: ['React Router v7', 'Better Auth', 'TypeScript'] },
  { slug: 'quadrant-calm', name: 'Quadrant Calm', featured: true, status: 'Live',
    outcome: 'Turn a messy to-do list into clear priorities, with a built-in Pomodoro timer and focus mode.',
    domain: 'Productivity', type: 'Apps', tech: ['Vite', 'React', 'shadcn'] },
  { slug: 'bunga-nona', name: 'Bunga Nona', featured: true, status: 'Live',
    outcome: 'A warm catalog site for a florist — browse blooms, explore custom arrangements, and order via WhatsApp.',
    domain: 'Florist', type: 'Websites & Storefronts', tech: ['React Router', 'Radix UI', 'TypeScript'] },
  { slug: 'iropin', name: 'iropin Member Management', featured: true, status: 'In rollout',
    outcome: 'Helps an organization manage its members end to end — running on the edge for speed and scale.',
    domain: 'Membership', type: 'Management Systems', tech: ['React Router v7', 'Cloudflare Workers', 'TypeScript'] },
  { slug: 'oms', name: 'OMS / OmniOptic', featured: false, status: 'Case study',
    outcome: 'A commercial optical-shop management system — sales, multi-branch stock, prescriptions, and financial reports.',
    domain: 'Optical', type: 'Management Systems', tech: ['React', 'Hono', 'PostgreSQL', 'Prisma'] },
  { slug: 'online-optic-store', name: 'Online Optic Store', featured: false, status: 'In development',
    outcome: 'A customer-facing online store for an optical shop — cart, checkout, and an admin back office — built monorepo-style with audit-ready security.',
    domain: 'Optical', type: 'Websites & Storefronts', tech: ['Hono', 'React', 'TypeScript', 'Docker'] },
  { slug: 'vinara', name: 'Vinara', featured: false, status: 'In development',
    outcome: 'An enterprise optical POS — patient records, multi-branch inventory, and tiered payments.',
    domain: 'Optical', type: 'Management Systems', tech: ['React', 'Hono', 'PostgreSQL', 'Better Auth'] },
  { slug: 'laundry-pos', name: 'Laundry POS', featured: false, status: 'In development',
    outcome: 'A point-of-sale and accounting system for laundries, with real-time financial reporting.',
    domain: 'Laundry', type: 'Management Systems', tech: ['Hono', 'PostgreSQL', 'AWS'] },
  { slug: 'mycuci', name: 'MyCuci Laundry', featured: false, status: 'Live',
    outcome: 'A polished, bilingual web presence for an express laundry brand — fast, responsive, built to convert.',
    domain: 'Laundry', type: 'Websites & Storefronts', tech: ['Remix', 'Tailwind', 'i18next'] },
  { slug: 'optik-talenta', name: 'Optik Talenta', featured: false, status: 'In development',
    outcome: 'An optical-shop system split into a dedicated backend and frontend.',
    domain: 'Optical', type: 'Management Systems', tech: ['React', 'Hono', 'TypeScript'] },
  { slug: 'wa-gsheet-api', name: 'WA GSheet API', featured: false, status: 'Live',
    outcome: 'An API that connects WhatsApp with Google Sheets — automate data flows without manual copy-paste.',
    domain: 'Integration', type: 'APIs & Automation', tech: ['Hono', 'Zod OpenAPI', 'Google API'] },
  { slug: 'wabot', name: 'WABot', featured: false, status: 'Live',
    outcome: 'A WhatsApp bot wired to Google Sheets for lightweight automation.',
    domain: 'Integration', type: 'APIs & Automation', tech: ['Hono', 'OpenAPI'] },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const projectTypes: ProjectType[] = ['Management Systems', 'Websites & Storefronts', 'Apps', 'APIs & Automation'];
