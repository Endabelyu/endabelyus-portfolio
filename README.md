# Naswa Wilantama — Portfolio

Baymax-themed single-page developer portfolio. Astro + Tailwind v4, static, English, overseas/remote focus.

## Dev

```bash
bun install
bun run dev      # http://localhost:4321
```

## Build

```bash
bun run build    # outputs dist/
bun run preview  # serve dist/ locally
```

## Deploy (Cloudflare Pages — local build)

Static output, host-agnostic. Recommended: build locally, deploy `dist/` (avoids bun-in-CI issues).

```bash
bun run build
npx wrangler pages deploy dist --project-name naswa-portfolio
# or drag dist/ into the Cloudflare Pages dashboard
```

Then map the custom domain `endabelyu.com` in the Cloudflare Pages dashboard. Vercel/Netlify also work with the same `dist/`.

## Structure

- `src/styles/global.css` — design tokens (`@theme`), fonts, base styles
- `src/data/` — `projects.ts`, `skills.ts` (content lives here)
- `src/components/` — Head (SEO), Nav, BaymaxEyes, ProjectCard/Row, SectionHeading
- `src/sections/` — Hero, About, Skills, Projects, Experience, Contact
- `src/pages/index.astro` — assembles the page

## Pending (swap real assets in)

- `public/naswa-placeholder.jpg` → real photo (or use `astro:assets` with `src/assets/`)
- `public/og-image.png` → real 1200×630 social card (<300KB)
- Live URLs for featured projects → `url` field in `src/data/projects.ts`
- Real experience entries → `src/sections/Experience.astro`
- Optional: CV PDF (`public/cv.pdf`) + Calendly button in Contact

Design spec & plan: `docs/superpowers/`.
