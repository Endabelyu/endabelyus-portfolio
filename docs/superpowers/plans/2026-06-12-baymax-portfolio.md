# Baymax Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Naswa Wilantama's single-page developer portfolio — Baymax-themed (white/red, editorial), English, overseas-focused, static Astro + Tailwind, deployable to Cloudflare Pages.

**Architecture:** Astro static site, zero-JS by default. Two tiny client islands: (1) Baymax eyes that follow the cursor in the hero, (2) project filter chips. Design tokens live in Tailwind config + CSS variables. SEO (meta, Open Graph, JSON-LD) in a reusable `<Head>` component. Content (projects, skills) lives in typed data files so sections stay declarative.

**Tech Stack:** Astro 4, Tailwind CSS, TypeScript, self-hosted Fraunces + Inter fonts, bun (dev), Cloudflare Pages (deploy via local build).

**Reference spec:** `docs/superpowers/specs/2026-06-12-baymax-portfolio-design.md`

---

## File Structure

```
portfolio-baymax/
├── astro.config.mjs          # site URL, sitemap, integrations
├── tailwind.config.mjs       # design tokens (colors, fonts, radius, spacing)
├── package.json
├── tsconfig.json
├── public/
│   ├── robots.txt
│   ├── favicon.svg           # Baymax eyes
│   ├── og-image.png          # 1200x630 (user-provided / generated later)
│   └── fonts/                # self-hosted Fraunces + Inter woff2
├── src/
│   ├── styles/
│   │   └── global.css        # CSS variables, font-face, base
│   ├── data/
│   │   ├── projects.ts       # all projects (featured flag, type, domain, links)
│   │   └── skills.ts         # skill categories
│   ├── components/
│   │   ├── Head.astro        # SEO: meta, OG, Twitter, JSON-LD
│   │   ├── Nav.astro         # sticky top nav
│   │   ├── BaymaxEyes.astro  # eyes markup + cursor island script
│   │   ├── SectionHeading.astro  # numbered "01 — About" overline + h2
│   │   ├── ProjectCard.astro     # featured card
│   │   ├── ProjectRow.astro      # compact archive row
│   │   └── ProjectFilter.astro   # filter chips + island script
│   ├── layouts/
│   │   └── Base.astro        # <html>, <head> via Head, <slot>
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── Experience.astro
│   │   └── Contact.astro
│   └── pages/
│       └── index.astro       # assembles sections
```

---

## Task 0: Git init + project scaffold

**Files:**
- Create: `.gitignore`, `package.json`, `astro.config.mjs`, `tsconfig.json`

- [ ] **Step 1: Init git + Astro project**

Run in `C:/Project/portfolio-baymax`:
```bash
git init
bun create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```
If the directory-not-empty prompt blocks (docs/ exists), scaffold in a temp dir and copy, or answer "continue". Expected: `src/pages/index.astro`, `astro.config.mjs`, `package.json` created.

- [ ] **Step 2: Add Tailwind + sitemap integrations**

Run:
```bash
bun astro add tailwind --yes
bun astro add sitemap --yes
```
Expected: `@astrojs/tailwind`, `@astrojs/sitemap`, `tailwindcss` in `package.json`; `tailwind.config.mjs` created.

- [ ] **Step 3: Install deps**

Run: `bun install`
Expected: `node_modules/` populated, `bun.lock` created.

- [ ] **Step 4: Verify dev server boots**

Run: `bun run dev` then open `http://localhost:4321`
Expected: default Astro page renders, no errors. Stop server (Ctrl+C).

- [ ] **Step 5: Write `.gitignore`**

```
node_modules/
dist/
.astro/
.DS_Store
*.log
.env
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro + Tailwind + sitemap"
```

---

## Task 1: Configure site URL + astro.config

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Set site + integrations**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://endabelyu.com',
  integrations: [tailwind(), sitemap()],
});
```

- [ ] **Step 2: Verify build generates sitemap**

Run: `bun run build`
Expected: build succeeds, `dist/sitemap-index.xml` exists.

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: set site URL + sitemap"
```

---

## Task 2: Design tokens (Tailwind config + global CSS)

**Files:**
- Modify: `tailwind.config.mjs`
- Create: `src/styles/global.css`
- Download: `public/fonts/` (Fraunces, Inter woff2)

- [ ] **Step 1: Write Tailwind token config**

`tailwind.config.mjs`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        surface: '#F7F8FA',
        'surface-sunken': '#F0F2F5',
        ink: '#14161A',
        'ink-2': '#5B6470',
        'ink-3': '#9AA3AF',
        border: '#E4E7EC',
        'border-strong': '#CDD2DA',
        accent: '#E1241B',
        'accent-hover': '#C51A12',
        'accent-pressed': '#A6140D',
        'accent-soft': '#FDEBEA',
        success: '#16A34A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xs: '4px', sm: '8px', md: '12px', lg: '16px',
      },
      maxWidth: { content: '1200px' },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Self-host fonts**

Download woff2 into `public/fonts/`: `fraunces-600.woff2` (opsz high, weight 600), `inter-400.woff2`, `inter-500.woff2`, `inter-600.woff2`. Source: gwfh.mranftl.com (Google Webfonts Helper) or Fontsource. (If unavailable at execution time, fall back to Google Fonts `<link preconnect>` in Head — note the tradeoff in commit message.)

- [ ] **Step 3: Write global.css**

`src/styles/global.css`:
```css
@font-face {
  font-family: 'Fraunces'; src: url('/fonts/fraunces-600.woff2') format('woff2');
  font-weight: 600; font-display: swap; font-style: normal;
}
@font-face {
  font-family: 'Inter'; src: url('/fonts/inter-400.woff2') format('woff2');
  font-weight: 400; font-display: swap;
}
@font-face {
  font-family: 'Inter'; src: url('/fonts/inter-500.woff2') format('woff2');
  font-weight: 500; font-display: swap;
}
@font-face {
  font-family: 'Inter'; src: url('/fonts/inter-600.woff2') format('woff2');
  font-weight: 600; font-display: swap;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }
html { scroll-behavior: smooth; }
body {
  background: theme('colors.bg'); color: theme('colors.ink');
  font-family: theme('fontFamily.sans'); line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}
h1,h2,h3 { font-family: theme('fontFamily.display'); font-weight: 600; font-optical-sizing: auto; }
:focus-visible { outline: 2px solid theme('colors.accent'); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: succeeds, no Tailwind errors.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.mjs src/styles/global.css public/fonts/
git commit -m "feat: design tokens + self-hosted fonts"
```

---

## Task 3: Base layout + SEO Head component

**Files:**
- Create: `src/components/Head.astro`, `src/layouts/Base.astro`, `public/favicon.svg`, `public/robots.txt`

- [ ] **Step 1: Favicon (Baymax eyes)**

`public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32">
  <rect width="64" height="32" fill="#FFFFFF"/>
  <circle cx="20" cy="16" r="7" fill="#14161A"/>
  <circle cx="44" cy="16" r="7" fill="#14161A"/>
  <rect x="20" y="14.5" width="24" height="3" fill="#14161A"/>
</svg>
```

- [ ] **Step 2: robots.txt**

`public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://endabelyu.com/sitemap-index.xml
```

- [ ] **Step 3: Head.astro (meta + OG + JSON-LD)**

`src/components/Head.astro`:
```astro
---
interface Props { title?: string; description?: string; }
const {
  title = 'Naswa Wilantama — Fullstack Developer',
  description = 'Naswa Wilantama (Endabelyu) — Fullstack Developer based in Indonesia, available for remote work worldwide. Building modern web apps with React, TypeScript, Hono, and PostgreSQL.',
} = Astro.props;
const site = 'https://endabelyu.com';
const ogImage = `${site}/og-image.png`;
const person = {
  '@context': 'https://schema.org', '@type': 'Person',
  name: 'Naswa Wilantama', alternateName: 'Endabelyu', url: site, image: ogImage,
  jobTitle: 'Fullstack Developer', nationality: 'Indonesian',
  address: { '@type': 'PostalAddress', addressCountry: 'ID' },
  knowsAbout: ['Fullstack Development','React','TypeScript','Hono','PostgreSQL','Docker','AI Engineering'],
  sameAs: ['https://github.com/Endabelyu','https://www.linkedin.com/in/naswa-wilantama'],
};
---
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<meta name="description" content={description} />
<meta name="author" content="Naswa Wilantama" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#FFFFFF" />
<link rel="canonical" href={site + '/'} />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta property="og:type" content="website" />
<meta property="og:url" content={site + '/'} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
<meta property="og:site_name" content="Naswa Wilantama" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
<script type="application/ld+json" set:html={JSON.stringify(person)} />
```

- [ ] **Step 4: Base.astro**

`src/layouts/Base.astro`:
```astro
---
import Head from '../components/Head.astro';
import '../styles/global.css';
interface Props { title?: string; description?: string; }
const { title, description } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head><Head title={title} description={description} /></head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 5: Wire into index.astro**

`src/pages/index.astro`:
```astro
---
import Base from '../layouts/Base.astro';
---
<Base>
  <main class="mx-auto max-w-content px-6">
    <h1 class="font-display text-5xl">Naswa Wilantama</h1>
  </main>
</Base>
```

- [ ] **Step 6: Verify**

Run: `bun run build` then inspect `dist/index.html`.
Expected: build passes; `dist/index.html` contains `<title>`, OG tags, and the JSON-LD `<script type="application/ld+json">`.

- [ ] **Step 7: Commit**

```bash
git add src/components/Head.astro src/layouts/Base.astro src/pages/index.astro public/favicon.svg public/robots.txt
git commit -m "feat: base layout + SEO head + favicon"
```

---

## Task 4: Shared components (Nav, SectionHeading)

**Files:**
- Create: `src/components/Nav.astro`, `src/components/SectionHeading.astro`

- [ ] **Step 1: Nav.astro**

```astro
---
const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];
---
<nav class="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
  <div class="mx-auto flex max-w-content items-center justify-between px-6 py-4">
    <a href="#top" class="font-display text-lg">Naswa<span class="text-accent">.</span></a>
    <ul class="hidden gap-6 text-sm text-ink-2 sm:flex">
      {links.map((l) => <li><a href={l.href} class="hover:text-accent">{l.label}</a></li>)}
    </ul>
  </div>
</nav>
```

- [ ] **Step 2: SectionHeading.astro**

```astro
---
interface Props { number: string; title: string; }
const { number, title } = Astro.props;
---
<div class="mb-10">
  <span class="text-xs font-semibold uppercase tracking-[0.12em] text-ink-3">{number} — {title}</span>
  <h2 class="mt-2 text-3xl tracking-tight sm:text-5xl">{title}</h2>
</div>
```

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: passes (components compile even if unused).

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.astro src/components/SectionHeading.astro
git commit -m "feat: nav + section heading components"
```

---

## Task 5: Baymax eyes component (cursor-following island)

**Files:**
- Create: `src/components/BaymaxEyes.astro`

- [ ] **Step 1: Write component with inline island script**

`src/components/BaymaxEyes.astro`:
```astro
---
interface Props { class?: string; }
const { class: cls = '' } = Astro.props;
---
<svg class={cls} viewBox="0 0 240 120" role="img" aria-label="Baymax-style face" data-baymax-eyes>
  <rect x="2" y="2" width="236" height="116" rx="58" fill="#F7F8FA" stroke="#E4E7EC" stroke-width="2"/>
  <g data-eye-left><circle cx="80" cy="60" r="16" fill="#14161A"/></g>
  <g data-eye-right><circle cx="160" cy="60" r="16" fill="#14161A"/></g>
  <rect x="80" y="57" width="80" height="6" rx="3" fill="#14161A"/>
  <circle cx="200" cy="92" r="7" fill="#E1241B"/>
</svg>
<script>
  const svg = document.querySelector('[data-baymax-eyes]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (svg && !reduce && fine) {
    const lEye = svg.querySelector('[data-eye-left] circle') as SVGCircleElement;
    const rEye = svg.querySelector('[data-eye-right] circle') as SVGCircleElement;
    const lBase = { x: 80, y: 60 }, rBase = { x: 160, y: 60 }, MAX = 4;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => {
      const r = svg.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      tx = Math.max(-1, Math.min(1, dx)) * MAX;
      ty = Math.max(-1, Math.min(1, dy)) * MAX;
    });
    const tick = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      lEye.setAttribute('cx', String(lBase.x + cx));
      lEye.setAttribute('cy', String(lBase.y + cy));
      rEye.setAttribute('cx', String(rBase.x + cx));
      rEye.setAttribute('cy', String(rBase.y + cy));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
</script>
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: passes; `dist/index.html` won't include it yet (used in Hero next task).

- [ ] **Step 3: Commit**

```bash
git add src/components/BaymaxEyes.astro
git commit -m "feat: Baymax eyes cursor-following island"
```

---

## Task 6: Hero section

**Files:**
- Create: `src/sections/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Hero.astro**

```astro
---
import BaymaxEyes from '../components/BaymaxEyes.astro';
---
<section id="top" class="relative mx-auto max-w-content px-6 pt-24 pb-32">
  <p class="pointer-events-none absolute inset-x-0 top-16 select-none text-center font-display text-[18vw] leading-none text-surface" aria-hidden="true">PORTFOLIO</p>
  <div class="relative grid items-center gap-12 sm:grid-cols-2">
    <div>
      <p class="font-sans text-ink-2">Hi, I'm</p>
      <h1 class="mt-2 text-5xl leading-[1.02] tracking-tight sm:text-7xl">Naswa Wilantama</h1>
      <p class="mt-4 max-w-md text-lg text-ink-2">I help turn ideas into web apps people actually use — from interface to deployment. Based in Indonesia, working worldwide.</p>
      <div class="mt-8 flex gap-4">
        <a href="#projects" class="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover">View Work</a>
        <a href="#contact" class="rounded-sm border border-border-strong px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent">Get in Touch</a>
      </div>
    </div>
    <div class="flex justify-center">
      <BaymaxEyes class="w-full max-w-sm" />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Mount in index.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../sections/Hero.astro';
---
<Base>
  <Nav />
  <main>
    <Hero />
  </main>
</Base>
```

- [ ] **Step 3: Visual verify**

Run: `bun run dev`, open `http://localhost:4321`. Move mouse over the face.
Expected: eyes follow cursor smoothly (≤4px), watermark "PORTFOLIO" behind, red CTA. Resize to mobile width — eyes stop tracking, layout stacks.

- [ ] **Step 4: Build + commit**

```bash
bun run build
git add src/sections/Hero.astro src/pages/index.astro
git commit -m "feat: hero section with Baymax eyes"
```

---

## Task 7: Skills data + section

**Files:**
- Create: `src/data/skills.ts`, `src/sections/Skills.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: skills.ts**

```ts
export interface SkillGroup { label: string; items: string[]; }
export const skills: SkillGroup[] = [
  { label: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'shadcn/ui'] },
  { label: 'Backend', items: ['Hono', 'REST API', 'JWT Auth'] },
  { label: 'Database', items: ['PostgreSQL', 'Prisma', 'Drizzle'] },
  { label: 'Infra / DevOps', items: ['Docker', 'VPS', 'Nginx', 'MinIO'] },
  { label: 'Exploring', items: ['Python', 'LLM APIs', 'LangChain', 'RAG', 'MCP'] },
];
```

- [ ] **Step 2: Skills.astro**

```astro
---
import SectionHeading from '../components/SectionHeading.astro';
import { skills } from '../data/skills';
---
<section id="skills" class="mx-auto max-w-content px-6 py-24">
  <SectionHeading number="02" title="Skills" />
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {skills.map((g) => (
      <div class="rounded-md border border-border bg-surface p-6">
        <h3 class="text-xl">{g.label}</h3>
        <ul class="mt-4 flex flex-wrap gap-2">
          {g.items.map((i) => (
            <li class="rounded-xs border border-border bg-bg px-3 py-1 text-sm text-ink-2">{i}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Mount + verify**

Add `import Skills` and `<Skills />` after `<Hero />` in `index.astro`. Run `bun run build`. Expected: passes, skills grid renders.

- [ ] **Step 4: Commit**

```bash
git add src/data/skills.ts src/sections/Skills.astro src/pages/index.astro
git commit -m "feat: skills section"
```

---

## Task 8: Projects data + types

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Write typed project data**

```ts
export type ProjectType = 'Management Systems' | 'Websites & Storefronts' | 'Apps' | 'APIs & Automation';
export type ProjectStatus = 'Live' | 'In rollout' | 'In development' | 'Case study';

export interface Project {
  slug: string;
  name: string;
  outcome: string;        // plain-English problem -> result
  domain: string;         // industry label (Optical, Laundry, ...)
  type: ProjectType;
  tech: string[];
  status: ProjectStatus;
  url?: string;           // live demo
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
```

> NOTE: `url`/`repo` left blank where unknown — user provides live URLs + screenshots later. Cards render without a demo link gracefully (Task 9).

- [ ] **Step 2: Verify it type-checks**

Run: `bun run build`
Expected: passes (data imported in later task; build still compiles TS).

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: project data model"
```

---

## Task 9: Project card + row components

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/components/ProjectRow.astro`

- [ ] **Step 1: ProjectCard.astro (featured)**

```astro
---
import type { Project } from '../data/projects';
interface Props { project: Project; }
const { project: p } = Astro.props;
---
<article class="group rounded-md border border-border bg-bg p-6 transition-transform hover:-translate-y-1">
  <div class="flex items-center justify-between">
    <span class="text-xs uppercase tracking-wide text-ink-3">{p.domain}</span>
    <span class="rounded-xs bg-accent-soft px-2 py-1 text-xs text-accent-pressed">{p.status}</span>
  </div>
  <h3 class="mt-3 text-2xl">{p.name}</h3>
  <p class="mt-2 text-ink-2">{p.outcome}</p>
  <ul class="mt-4 flex flex-wrap gap-2">
    {p.tech.map((t) => <li class="rounded-xs border border-border px-2 py-0.5 text-xs text-ink-2">{t}</li>)}
  </ul>
  {p.url && <a href={p.url} class="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover">View live →</a>}
</article>
```

- [ ] **Step 2: ProjectRow.astro (archive)**

```astro
---
import type { Project } from '../data/projects';
interface Props { project: Project; }
const { project: p } = Astro.props;
---
<article class="flex flex-col gap-2 rounded-md border border-border p-4 sm:flex-row sm:items-center sm:justify-between" data-type={p.type}>
  <div>
    <div class="flex items-center gap-2">
      <h4 class="font-sans text-base font-medium">{p.name}</h4>
      <span class="text-xs uppercase tracking-wide text-ink-3">{p.domain}</span>
    </div>
    <p class="text-sm text-ink-2">{p.outcome}</p>
  </div>
  <ul class="flex flex-wrap gap-1.5">
    {p.tech.slice(0, 3).map((t) => <li class="rounded-xs border border-border px-2 py-0.5 text-xs text-ink-3">{t}</li>)}
  </ul>
</article>
```

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.astro src/components/ProjectRow.astro
git commit -m "feat: project card + row components"
```

---

## Task 10: Projects section + filter island

**Files:**
- Create: `src/sections/Projects.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Projects.astro**

```astro
---
import SectionHeading from '../components/SectionHeading.astro';
import ProjectCard from '../components/ProjectCard.astro';
import ProjectRow from '../components/ProjectRow.astro';
import { projects, featuredProjects, projectTypes } from '../data/projects';
---
<section id="projects" class="mx-auto max-w-content px-6 py-24">
  <SectionHeading number="03" title="Projects" />

  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {featuredProjects.map((p) => <ProjectCard project={p} />)}
  </div>

  <h3 class="mt-16 mb-6 text-xl">All projects</h3>
  <div class="mb-6 flex flex-wrap gap-2" data-filter-bar>
    <button class="rounded-full border border-border-strong px-4 py-1.5 text-sm" data-filter="all" aria-pressed="true">All</button>
    {projectTypes.map((t) => (
      <button class="rounded-full border border-border px-4 py-1.5 text-sm text-ink-2" data-filter={t} aria-pressed="false">{t}</button>
    ))}
  </div>
  <div class="grid gap-3" data-project-list>
    {projects.map((p) => <ProjectRow project={p} />)}
  </div>
</section>
<script>
  const bar = document.querySelector('[data-filter-bar]');
  const rows = Array.from(document.querySelectorAll('[data-project-list] [data-type]')) as HTMLElement[];
  bar?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button[data-filter]') as HTMLButtonElement | null;
    if (!btn) return;
    const f = btn.dataset.filter;
    bar.querySelectorAll('button').forEach((b) => {
      const on = b === btn;
      b.setAttribute('aria-pressed', String(on));
      b.classList.toggle('border-border-strong', on);
      b.classList.toggle('text-ink-2', !on);
    });
    rows.forEach((r) => { r.style.display = (f === 'all' || r.dataset.type === f) ? '' : 'none'; });
  });
</script>
```

- [ ] **Step 2: Mount + verify filter**

Add `<Projects />` after `<Skills />` in `index.astro`. Run `bun run dev`. Click each filter chip.
Expected: featured grid (5 cards) on top; archive list below; clicking "Apps" shows only Apps rows; "All" restores all. Pressed chip is visually distinct.

- [ ] **Step 3: Build + commit**

```bash
bun run build
git add src/sections/Projects.astro src/pages/index.astro
git commit -m "feat: projects section with type filter"
```

---

## Task 11: About + Experience sections

**Files:**
- Create: `src/sections/About.astro`, `src/sections/Experience.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: About.astro**

```astro
---
import SectionHeading from '../components/SectionHeading.astro';
---
<section id="about" class="mx-auto max-w-content px-6 py-24">
  <SectionHeading number="01" title="About" />
  <div class="grid gap-10 sm:grid-cols-[280px_1fr] sm:items-start">
    <div class="aspect-[4/5] overflow-hidden rounded-md border border-border bg-surface">
      <!-- Replace with user's photo: src/assets/naswa.jpg via astro:assets <Image /> -->
      <img src="/naswa-placeholder.jpg" alt="Naswa Wilantama" width="280" height="350" class="h-full w-full object-cover" />
    </div>
    <div class="space-y-5 text-lg text-ink-2">
      <p>Hi, I'm Naswa — some people call me Endabelyu. I'm a fullstack developer who builds web products end to end: clean interfaces, solid backends, and making sure everything runs reliably in production. To me, good software isn't just code that works — it's code that's easy to maintain and a product that genuinely helps people.</p>
      <p>I started on the frontend, then grew into backend, databases, and infrastructure — so I can take a product from idea to shipped. Lately I've been exploring AI engineering (LLMs, RAG, automation) to see how these tools can make products more useful.</p>
    </div>
  </div>
</section>
```

> Placeholder image at `public/naswa-placeholder.jpg` until user drops the real photo. Swap to `astro:assets` `<Image>` with `src/assets/naswa.jpg` when provided.

- [ ] **Step 2: Experience.astro (timeline; placeholder data until user provides)**

```astro
---
import SectionHeading from '../components/SectionHeading.astro';
const items = [
  { year: '2025', role: 'Freelance Fullstack Developer', detail: 'Built business systems (optical POS, laundry, member management) for small businesses — frontend to deployment.' },
];
---
<section id="experience" class="mx-auto max-w-content px-6 py-24">
  <SectionHeading number="04" title="Experience" />
  <ol class="space-y-8">
    {items.map((it) => (
      <li class="grid gap-2 sm:grid-cols-[100px_1fr]">
        <span class="font-display text-ink-3">{it.year}</span>
        <div>
          <h3 class="text-xl">{it.role}</h3>
          <p class="mt-1 text-ink-2">{it.detail}</p>
        </div>
      </li>
    ))}
  </ol>
</section>
```

> `items` is placeholder — user confirms real experience. If user has none to share, drop this section from `index.astro`.

- [ ] **Step 3: Mount (About before Skills, Experience after Projects) + verify**

`index.astro` order: Nav, Hero, About, Skills, Projects, Experience, Contact. Run `bun run build`.
Expected: passes; sections in order.

- [ ] **Step 4: Commit**

```bash
git add src/sections/About.astro src/sections/Experience.astro src/pages/index.astro
git commit -m "feat: about + experience sections"
```

---

## Task 12: Contact + Footer

**Files:**
- Create: `src/sections/Contact.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Contact.astro**

```astro
---
import SectionHeading from '../components/SectionHeading.astro';
const channels = [
  { label: 'Email', href: 'mailto:endabelyuproject@gmail.com', text: 'endabelyuproject@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Endabelyu', text: 'github.com/Endabelyu' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/naswa-wilantama', text: 'linkedin.com/in/naswa-wilantama' },
];
---
<section id="contact" class="mx-auto max-w-content px-6 py-24">
  <SectionHeading number="05" title="Contact" />
  <h3 class="font-display text-3xl">Let's connect</h3>
  <p class="mt-3 max-w-md text-lg text-ink-2">Got a project in mind or just want to chat? I'd love to hear from you.</p>
  <ul class="mt-8 grid gap-3 sm:max-w-md">
    {channels.map((c) => (
      <li>
        <a href={c.href} class="flex items-center justify-between rounded-md border border-border px-4 py-3 hover:border-accent hover:text-accent">
          <span class="text-sm text-ink-3">{c.label}</span>
          <span class="text-sm font-medium">{c.text}</span>
        </a>
      </li>
    ))}
  </ul>
  <footer class="mt-24 border-t border-border pt-8 text-sm text-ink-3">
    <p>Built with care by Naswa Wilantama © 2026.</p>
  </footer>
</section>
```

- [ ] **Step 2: Mount + verify**

Add `<Contact />` last in `index.astro`. Run `bun run build`.
Expected: passes; contact links + footer render.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Contact.astro src/pages/index.astro
git commit -m "feat: contact section + footer"
```

---

## Task 13: Polish — responsive, a11y, OG image placeholder

**Files:**
- Create: `public/og-image.png` (placeholder), `public/naswa-placeholder.jpg` (placeholder)
- Modify: section files as needed

- [ ] **Step 1: Add placeholder assets**

Add a 1200×630 `public/og-image.png` (solid white with "Naswa Wilantama — Fullstack Developer" text; replace later) and a 280×350 `public/naswa-placeholder.jpg`. Generate via any tool or a simple script; real assets come from user.

- [ ] **Step 2: Accessibility + responsive pass**

Verify: every `<img>` has `alt`; nav links reachable by keyboard; headings are h1→h2→h3 in order (1 h1 = hero name); color contrast ok (ink on bg). Test at 375px, 768px, 1280px widths in dev.
Expected: no overflow, readable, eyes disabled on mobile.

- [ ] **Step 3: Build + commit**

```bash
bun run build
git add public/og-image.png public/naswa-placeholder.jpg src/
git commit -m "chore: placeholder assets + a11y/responsive polish"
```

---

## Task 14: Build verification + deploy prep

**Files:**
- Create: `README.md` (deploy notes)

- [ ] **Step 1: Production build**

Run: `bun run build`
Expected: `dist/` contains `index.html`, `sitemap-index.xml`, `robots.txt`, hashed assets. Open `dist/index.html` via `bun run preview` and click through all sections + filters.

- [ ] **Step 2: Lighthouse spot-check (optional but recommended)**

Run preview, open Chrome DevTools → Lighthouse → Mobile. Target: Performance >90, SEO 100, Accessibility >95. Fix obvious flags (missing alt, contrast).

- [ ] **Step 3: README with deploy steps**

`README.md`:
```markdown
# Naswa Wilantama — Portfolio

Astro + Tailwind static site.

## Dev
bun install
bun run dev

## Build
bun run build   # outputs dist/

## Deploy (Cloudflare Pages — local build)
1. bun run build
2. npx wrangler pages deploy dist --project-name naswa-portfolio
   (or drag dist/ into Cloudflare Pages dashboard)

Static output — host-agnostic. Vercel/Netlify also work.
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: build + deploy instructions"
```

- [ ] **Step 5: Deploy (when user is ready)**

Run: `bun run build && npx wrangler pages deploy dist --project-name naswa-portfolio`
Expected: Cloudflare returns a `*.pages.dev` URL. Map custom domain `endabelyu.com` in CF dashboard. (Requires user's Cloudflare auth — pause for user.)

---

## Pending user inputs (don't block build; swap in when provided)
- Real photo → `src/assets/naswa.jpg` (swap About `<img>` to `astro:assets <Image>`)
- Live URLs for featured projects → fill `url` in `src/data/projects.ts`
- Project screenshots → add thumbnails to cards
- Real OG image (1200×630, <300KB) → `public/og-image.png`
- Real experience entries → `src/sections/Experience.astro` (or drop section)
- Optional: CV PDF → `public/cv.pdf` + "Download CV" button in Contact
- Optional: Calendly/cal.com → "Book a call" button in Contact
