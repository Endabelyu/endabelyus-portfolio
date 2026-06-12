# Deploy — Cloudflare Pages

Canonical domain: **www.endabelyu.com** (apex `endabelyu.com` should 301-redirect to www).

## Option A — CLI (wrangler)

One-time:
```bash
bunx wrangler login          # opens browser, authorize Cloudflare
```

Every deploy:
```bash
bun run build
bunx wrangler pages deploy dist --project-name naswa-portfolio
```
First run creates the Pages project and returns a `*.pages.dev` URL.

## Option B — Dashboard (no CLI)

1. `bun run build`
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Upload assets
3. Drag the `dist/` folder. Name it `naswa-portfolio`.

## Custom domain + www redirect (do once, in dashboard)

1. Pages project → Custom domains → add **www.endabelyu.com**.
2. Add **endabelyu.com** too.
3. Make apex redirect to www: Cloudflare dashboard → your domain → Rules → Redirect Rules → Create:
   - When: Hostname equals `endabelyu.com`
   - Then: Static redirect to `https://www.endabelyu.com/$1`, status 301, preserve path/query.
   This keeps one canonical URL (matches the site's `<link rel="canonical">`).

## After first deploy — SEO bootstrap

1. Google Search Console → add property `https://www.endabelyu.com` → verify (DNS TXT).
2. Submit sitemap: `https://www.endabelyu.com/sitemap-index.xml`.
3. URL Inspection → Request Indexing for the homepage.
4. Validate: paste URL into LinkedIn Post Inspector (check OG card) + Google Rich Results Test (check JSON-LD).
5. Add `www.endabelyu.com` to GitHub profile (Website field + profile README) and LinkedIn Featured.

## Pre-deploy checklist

- [ ] `bun run build` passes clean
- [ ] Replace `public/og-image.png` with real 1200×630 (<300KB) when ready
- [ ] Replace `public/naswa-placeholder.jpg` with real photo when ready
- [ ] (optional) add CV PDF to `public/cv.pdf` + button in Contact
- [ ] Private project screenshots (Order Lens, iropin) added when available
