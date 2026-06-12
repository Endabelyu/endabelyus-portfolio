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
    outcome: 'A complete lens-ordering system for optical shops — track orders, customers, and vendors in one dashboard.',
    problem: 'Optical shops juggle lens orders across spreadsheets and chat messages, making it hard to track who ordered what, from which vendor, and where each order stands.',
    features: ['Create, edit, and track lens orders through their lifecycle', 'Customer and vendor records linked to every order', 'Dashboard overview with status at a glance', 'Reports and a recoverable deleted-orders view'],
    domain: 'Optical', type: 'Management Systems', tech: ['React Router', 'TypeScript', 'shadcn/ui'],
  },
  {
    slug: 'mili', name: 'Personal Finance Tracker', featured: true, status: 'Live',
    outcome: 'Take control of your money — track income, set budgets, and see where it all goes.',
    problem: 'Most people lose track of their spending because logging transactions and seeing the bigger picture lives in separate, tedious tools.',
    features: ['Income and expense tracking with filtering, search, and CSV export', 'Monthly budgets by category with visual progress', 'Reports: income vs. expense trends and category breakdowns', 'Secure email auth and full dark mode'],
    domain: 'Finance', type: 'Apps', tech: ['React Router v7', 'Better Auth', 'TypeScript'],
    url: 'https://mili.endabelyu.com',
  },
  {
    slug: 'eisenhower-matrix', name: 'Eisenhower Matrix', featured: true, status: 'Live',
    outcome: 'Turn a messy to-do list into clear priorities, with a built-in Pomodoro timer and focus mode.',
    problem: 'A long flat to-do list hides what actually matters — everything looks equally urgent until the day is gone.',
    features: ['Sort tasks into Do, Schedule, Delegate, and Hold', 'Daily Focus view with a time-budget summary', 'Built-in Pomodoro timer and progress stats', 'Export/import data and global keyboard shortcuts'],
    domain: 'Productivity', type: 'Apps', tech: ['Vite', 'React', 'shadcn/ui'],
    url: 'https://eisenhower.endabelyu.com',
  },
  {
    slug: 'bunga-nona', name: 'Bunga Nona', featured: true, status: 'Live',
    outcome: 'A warm catalog site for a florist — browse blooms, explore custom arrangements, and order via WhatsApp.',
    problem: 'A florist needed an online presence that feels as warm as their shop, without the overhead of a full e-commerce checkout.',
    features: ['Product catalog with category browsing and detail pages', 'Custom-arrangement showcase and featured products', 'Testimonials, FAQ, and location sections', 'One-tap ordering through WhatsApp'],
    domain: 'Florist', type: 'Websites & Storefronts', tech: ['React Router', 'Radix UI', 'TypeScript'],
    url: 'https://bunganona.endabelyu.com',
  },
  {
    slug: 'iropin', name: 'iropin Member Management', featured: true, status: 'In rollout', private: true,
    outcome: 'Helps an organization manage its members end to end — running on the edge for speed and scale.',
    problem: 'An organization tracked its members through forms and spreadsheets, with no single source of truth for membership data.',
    features: ['Member records and registration management', 'Runs on Cloudflare Workers for fast, global access', 'Structured API with documented endpoints', 'Currently rolling out to real members'],
    domain: 'Membership', type: 'Management Systems', tech: ['React Router v7', 'Cloudflare Workers', 'TypeScript'],
  },
  {
    slug: 'oms', name: 'OMS / OmniOptic', featured: false, status: 'Case study',
    outcome: 'A commercial optical-shop management system — sales, multi-branch stock, prescriptions, and financial reports.',
    problem: 'Optical retailers need an all-in-one system tailored to their workflow: medical prescriptions, tiered transactions, and multi-branch inventory — sold as a real product with packaged tiers.',
    features: ['POS with OD/OS medical prescription records', 'Centralized, real-time multi-branch inventory', 'Automated profit-and-loss reporting', 'Role-based access (cashier, supervisor, admin) and WhatsApp automation'],
    domain: 'Optical', type: 'Management Systems', tech: ['React', 'Hono', 'PostgreSQL', 'Prisma'],
  },
  {
    slug: 'online-optic-store', name: 'Online Optic Store', featured: false, status: 'In development',
    outcome: 'A customer-facing online store for an optical shop — cart, checkout, and an admin back office.',
    problem: 'An optical brand wanted to sell online while keeping operations in-house, built to enterprise security standards.',
    features: ['Storefront with cart and a guided order wizard', 'Admin back office for orders and payment methods', 'Monorepo: separate API, web, and shared types', 'Documented to SOC 2 / ISO 27001 readiness'],
    domain: 'Optical', type: 'Websites & Storefronts', tech: ['Hono', 'React', 'TypeScript', 'Docker'],
    url: 'https://online-optic-web.endabelyu.com',
  },
  {
    slug: 'vinara', name: 'Vinara', featured: false, status: 'In development',
    outcome: 'An enterprise optical POS — patient records, multi-branch inventory, and tiered payments.',
    problem: 'Optical clinics need to move a customer from walk-in to fully-paid glasses while tracking prescriptions, lab status, and partial payments.',
    features: ['Patient management with linked prescription history', 'POS lifecycle state machine (draft → in-lab → dispensed)', 'Multi-branch inventory with stock transfers', 'Fractional down-payments and BPJS integration with audit trails'],
    domain: 'Optical', type: 'Management Systems', tech: ['React', 'Hono', 'PostgreSQL', 'Better Auth'],
  },
  {
    slug: 'laundry-pos', name: 'Laundry POS', featured: false, status: 'In development',
    outcome: 'A point-of-sale and accounting system for laundries, with real-time financial reporting.',
    problem: 'Laundry businesses run their counter and their books separately, so revenue and costs never line up cleanly.',
    features: ['Point-of-sale tied to a chart of accounts', 'Real-time financial reporting', 'Multi-tenant with multi-factor authentication', 'Deployed on AWS App Runner with hardened infrastructure'],
    domain: 'Laundry', type: 'Management Systems', tech: ['Hono', 'PostgreSQL', 'AWS'],
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
