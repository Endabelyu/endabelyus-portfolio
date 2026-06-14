export type ProjectType = 'Management Systems' | 'Websites & Storefronts' | 'Apps' | 'APIs & Automation';
export type ProjectStatus = 'Live' | 'In rollout' | 'In development' | 'Case study';

export interface Project {
  slug: string;
  name: string;
  outcome: string;        // one-line problem -> result (cards)
  problem: string;        // the context / why it exists
  features: string[];     // what it does (detail page)
  domain: string;         // industry label
  type: ProjectType;
  tech: string[];
  status: ProjectStatus;
  url?: string;           // live demo
  repo?: string;
  featured: boolean;
  private?: boolean;      // internal/client tool, no public demo
}

export const projects: Project[] = [
  {
    slug: 'order-lens', name: 'Order Lens Management', featured: true, status: 'Live', private: true,
    outcome: 'A full-stack system for optical shops — order lifecycle, customer/vendor tracking, and lens prescriptions in one place.',
    problem: 'Optical shops juggle lens orders, prescriptions, and vendor data across spreadsheets and chats, making status and history hard to track.',
    features: ['Order lifecycle with lens prescription data (SPH / CYL / axis / PD) and real-time status', 'Customer and vendor tracking with soft-delete recovery', 'Analytics dashboard: revenue, profit margin, and order trends, filterable by date', 'JWT auth, role-based access, PDF invoices, and CI/CD to a self-hosted VPS'],
    domain: 'Optical', type: 'Management Systems', tech: ['React Router v7', 'Hono', 'PostgreSQL', 'TypeScript', 'Docker'],
  },
  {
    slug: 'mili', name: 'Mili', featured: true, status: 'Live',
    outcome: 'A personal finance platform — track accounts, transactions, and per-category budgets, end to end.',
    problem: 'Most people lose track of their money because logging transactions and seeing the bigger picture lives in separate, tedious tools.',
    features: ['Multi-account balance tracking with auto-updating transactions', 'Per-category monthly budgets with recurring support and real-time spend %', 'Mobile-first PWA with offline support and Recharts visualizations', 'Better Auth with multi-factor auth, plus CI/CD to a self-hosted VPS'],
    domain: 'Finance', type: 'Apps', tech: ['React Router v7', 'Hono', 'Drizzle', 'Better Auth', 'TypeScript'],
    url: 'https://mili.endabelyu.com',
  },
  {
    slug: 'eisenhower-matrix', name: 'Eisenhower Matrix', featured: true, status: 'Live',
    outcome: 'Turn a messy to-do list into clear priorities, with a built-in Pomodoro timer and focus mode.',
    problem: 'A long flat to-do list hides what actually matters — everything looks equally urgent until the day is gone.',
    features: ['Sort tasks into Do, Schedule, Delegate, and Hold', 'Daily Focus view with a time-budget summary and Pomodoro timer', 'Cloud sync and auth via Supabase, plus a Spotify focus integration', 'Export/import data and global keyboard shortcuts'],
    domain: 'Productivity', type: 'Apps', tech: ['React', 'Vite', 'Supabase', 'shadcn/ui', 'TypeScript'],
    url: 'https://eisenhower.endabelyu.com',
  },
  {
    slug: 'bunga-nona', name: 'Bunga Nona', featured: true, status: 'Live',
    outcome: 'A warm catalog site for a florist — browse blooms, explore custom arrangements, and order via WhatsApp.',
    problem: 'A florist needed an online presence that feels as warm as their shop, without the overhead of a full e-commerce checkout.',
    features: ['Product catalog with category browsing and detail pages', 'WhatsApp order CTA and an accessible FAQ accordion', 'Server-side rendered on Cloudflare Workers edge for fast global loads', 'Cross-device responsive across mobile, tablet, and desktop'],
    domain: 'Florist', type: 'Websites & Storefronts', tech: ['React Router v7', 'TypeScript', 'Tailwind', 'shadcn/ui', 'Cloudflare Workers'],
    url: 'https://bunganona.endabelyu.com',
  },
  {
    slug: 'iropin', name: 'iropin Member Management', featured: true, status: 'In rollout', private: true,
    outcome: 'Helps an organization manage its members end to end — full-stack on the edge for speed and scale.',
    problem: 'An organization tracked its members through forms and spreadsheets, with no single source of truth for membership data.',
    features: ['Member records and registration management', 'Full-stack on Cloudflare Workers — React Router v7 frontend + a Hono API', 'PostgreSQL (Neon) via Prisma, file storage on Cloudflare R2, payments via Midtrans', 'Secure auth with Better Auth and a typed OpenAPI contract', 'Currently rolling out to real members'],
    domain: 'Membership', type: 'Management Systems', tech: ['React Router v7', 'Hono', 'PostgreSQL', 'Prisma', 'Cloudflare Workers', 'Better Auth'],
  },
  {
    slug: 'oms', name: 'OMS / OmniOptic', featured: false, status: 'Case study',
    outcome: 'A commercial optical-shop management system — sales, multi-branch stock, prescriptions, and financial reports.',
    problem: 'Optical retailers need an all-in-one system tailored to their workflow: medical prescriptions, tiered transactions, and multi-branch inventory — sold as a real product with packaged tiers.',
    features: ['POS with OD/OS medical prescription records', 'Centralized, real-time multi-branch inventory', 'Automated profit-and-loss reporting', 'Role-based access (cashier, supervisor, admin) and WhatsApp automation'],
    domain: 'Optical', type: 'Management Systems', tech: ['React', 'Hono', 'PostgreSQL', 'Drizzle'],
  },
  {
    slug: 'online-optic-store', name: 'Online Optic Store', featured: false, status: 'In development',
    outcome: 'A customer-facing online store for an optical shop — cart, checkout, and an admin back office.',
    problem: 'An optical brand wanted to sell online while keeping operations in-house, built to enterprise security standards.',
    features: ['Storefront with cart and a guided order wizard', 'Admin back office for orders and payment methods', 'Monorepo: separate API, web, and shared types', 'Documented to SOC 2 / ISO 27001 readiness'],
    domain: 'Optical', type: 'Websites & Storefronts', tech: ['Hono', 'React', 'PostgreSQL', 'Drizzle', 'TypeScript', 'Docker'],
    url: 'https://online-optic-web.endabelyu.com',
  },
  {
    slug: 'vinara', name: 'Vinara', featured: false, status: 'In development',
    outcome: 'An enterprise optical POS — patient records, multi-branch inventory, and tiered payments.',
    problem: 'Optical clinics need to move a customer from walk-in to fully-paid glasses while tracking prescriptions, lab status, and partial payments.',
    features: ['Patient management with linked prescription history', 'POS lifecycle state machine (draft → in-lab → dispensed)', 'Multi-branch inventory with stock transfers', 'Fractional down-payments and BPJS integration with audit trails'],
    domain: 'Optical', type: 'Management Systems', tech: ['React', 'Hono', 'PostgreSQL', 'Prisma', 'Better Auth'],
  },
  {
    slug: 'laundry-pos', name: 'Laundry POS', featured: false, status: 'In development',
    outcome: 'A point-of-sale and accounting system for laundries, with real-time financial reporting.',
    problem: 'Laundry businesses run their counter and their books separately, so revenue and costs never line up cleanly.',
    features: ['Point-of-sale tied to a chart of accounts', 'Real-time financial reporting', 'Multi-tenant with multi-factor authentication', 'Deployed on AWS App Runner with hardened infrastructure'],
    domain: 'Laundry', type: 'Management Systems', tech: ['Hono', 'PostgreSQL', 'Drizzle', 'AWS'],
  },
  {
    slug: 'mycuci', name: 'MyCuci Laundry', featured: false, status: 'Live',
    outcome: 'A polished, bilingual web presence for an express laundry brand — fast, responsive, built to convert.',
    problem: 'An express laundry brand needed a professional online front door that works for both Indonesian and English-speaking customers.',
    features: ['Bilingual content (English / Indonesian) via i18next', 'Service categories and transparent pricing tiers', 'Promotions, loyalty, and an interactive FAQ', 'SEO-optimized and deployed on Netlify'],
    domain: 'Laundry', type: 'Websites & Storefronts', tech: ['Remix', 'Tailwind', 'i18next'],
  },
  {
    slug: 'optik-talenta', name: 'Optik Talenta', featured: false, status: 'In development',
    outcome: 'An optical-shop system split into a dedicated backend and frontend.',
    problem: 'A growing optical shop needed its own management system with a clean separation between API and interface.',
    features: ['Separated backend and frontend codebases', 'Tailored to the shop’s daily operations', 'Built on a modern TypeScript stack'],
    domain: 'Optical', type: 'Management Systems', tech: ['React', 'Hono', 'TypeScript'],
  },
  {
    slug: 'wa-gsheet-api', name: 'WA GSheet API', featured: false, status: 'Live',
    outcome: 'An API that connects WhatsApp with Google Sheets — automate data flows without manual copy-paste.',
    problem: 'Teams capture data over WhatsApp but then re-type it into spreadsheets by hand, which is slow and error-prone.',
    features: ['Bridges WhatsApp messages and Google Sheets', 'Typed, validated endpoints (Zod + OpenAPI)', 'Webhook-driven automation', 'Interactive API reference via Scalar'],
    domain: 'Integration', type: 'APIs & Automation', tech: ['Hono', 'Zod OpenAPI', 'Google API'],
  },
  {
    slug: 'wabot', name: 'WABot', featured: false, status: 'Live',
    outcome: 'A WhatsApp bot wired to Google Sheets for lightweight automation.',
    problem: 'Small teams want simple WhatsApp automations without standing up heavy infrastructure.',
    features: ['Responds to WhatsApp messages automatically', 'Reads and writes Google Sheets', 'Lightweight Hono + OpenAPI service'],
    domain: 'Integration', type: 'APIs & Automation', tech: ['Hono', 'OpenAPI'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const projectTypes: ProjectType[] = ['Management Systems', 'Websites & Storefronts', 'Apps', 'APIs & Automation'];
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
