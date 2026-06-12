# Spec Desain — Portofolio Naswa Wilantama (Tema Baymax)

**Tanggal:** 2026-06-12
**Status:** Draft — menunggu review user

---

## 1. Ringkasan

Web portofolio personal untuk **Naswa Wilantama** (handle: Endabelyu), seorang **Fullstack Developer**. Single-page scroll, static, SEO-friendly. Tema visual **Baymax** (Big Hero 6): putih dominan, aksen merah, mata robot ikonik — tapi diterjemahkan jadi desain **professional & welcoming**, bukan fan-page.

**Prinsip inti (dari UI/UX):** Baymax hidup di **maskot + sentuhan visual**, BUKAN di bentuk layout. Layout tetap tegas & editorial (ala referensi Han Nguyen). Copy = **suara personal Naswa**, bukan cosplay slogan film.

---

## 2. Keputusan Terkunci

| Aspek | Keputusan | Catatan |
|---|---|---|
| Positioning | **Fullstack Developer** | AI = growth area, ditulis "sedang mendalami AI engineering". Tidak overclaim. |
| Domain | **endabelyu.com** (root) | Canonical. Subdomain (kalau ada) 301 redirect ke root. |
| Bahasa | **English** (primary) | Market utama OVERSEAS/international (remote recruiter & klien). Lokasi tetap "Indonesia" (sinyal remote + timezone). Versi ID bisa nyusul. |
| Target audiens | **International + non-teknis friendly** | Bukan cuma dev. HR/recruiter & CEO/klien luar yang BUKAN teknis harus paham nilai kamu. Pakai progressive disclosure (lihat bagian 6). |
| Services section | **Disembunyikan (v1)** | Fokus showcase untuk recruiter. Bisa diaktifkan kalau menerima freelance. |
| Foto About | **Kotak sudut-lembut** (radius-md) | Lebih premium/tegas. Bukan bulat penuh. |
| Dark mode | **Skip v1** | Baymax karakter putih; dark melawan identitas. |
| Tone copy | **Personal, hangat, professional** | Baymax = visual only. Minimal/no slogan film. Maks 1 nod halus (footer). |
| Stack | **Astro + Tailwind** | Static, zero-JS default, island JS hanya untuk mata Baymax + filter projects. |
| Package manager | **bun (dev)** | `bun install` / `bun run dev`. Sesuai preferensi. |
| Deploy | **Cloudflare Pages + build lokal** | Build lokal `bun run build` → push `dist/` (CF cuma serve statis, aman dari isu bun-di-CI). Alternatif CI: npm. Vercel/Netlify juga jalan kalau perlu. |

---

## 3. Design System

### Warna

```
/* Base — putih dominan (~90% layar) */
--bg:              #FFFFFF
--surface:         #F7F8FA   /* card, section selang-seling, input */
--surface-sunken:  #F0F2F5   /* code block, footer */

/* Text */
--text-primary:    #14161A   /* bukan #000, biar ga keras */
--text-secondary:  #5B6470
--text-tertiary:   #9AA3AF   /* placeholder, nomor section */

/* Border */
--border:          #E4E7EC
--border-strong:   #CDD2DA

/* Aksen merah Baymax — HARD CAP 2-5% pemakaian */
--accent:          #E1241B   /* CTA, link aktif, heart-chip, angka penting */
--accent-hover:    #C51A12
--accent-pressed:  #A6140D
--accent-soft:     #FDEBEA   /* bg badge merah muda */

/* Functional */
--success:         #16A34A
--success-soft:    #E7F6EC
--focus-ring:      #E1241B   /* opacity 40% saat dipakai */
```

**Rasio pemakaian (hukum 60-30-10 dimodifikasi):**
- ~90% putih/surface (background, ruang kosong)
- ~8% hitam/abu (teks & garis)
- ~2-5% merah — **HARD CAP**. Merah hanya: 1 CTA utama per layar, link/elemen aktif, mata/heart-chip Baymax, angka statistik yang ditonjolkan. Ragu = jangan kasih merah.

### Tipografi

```
Display: "Fraunces", Georgia, serif   (heading & angka besar) — weight 600, font-optical-sizing: auto
Body:    "Inter", system-ui, sans-serif (body, UI, label)

                  mobile      desktop     weight / notes
h1 (hero):        40px/1.05   72px/1.02   Fraunces 600, tracking -0.02em
h2 (section):     30px/1.1    48px/1.05   Fraunces 600, tracking -0.01em
h3 (card title):  20px/1.2    24px/1.25   Fraunces 600
h4 (sub):         17px/1.3    18px/1.35   Inter 600
body-lg (intro):  18px/1.6    20px/1.6    Inter 400
body (default):   16px/1.65   16px/1.65   Inter 400
caption:          13px/1.4    14px/1.4    Inter 500, text-secondary
overline (no.):   12px/1.2    12px/1.2    Inter 600, tracking 0.12em, UPPERCASE
```

**Aturan:** Fraunces HANYA heading & angka hero/statistik. Sisanya Inter. Jangan campur dua serif. Self-host font (jangan @import render-blocking); `font-display: swap` + preload font utama.

### Spacing & Radius

```
--radius-xs:   4px    /* badge, tag, chip */
--radius-sm:   8px    /* button, input */
--radius-md:   12px   /* card, image container */
--radius-lg:   16px   /* modal, panel besar — batas atas */
--radius-full: 9999px /* HANYA avatar & elemen Baymax (mata, dot) */

Spacing scale (basis 4px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
- Padding card: 24px (mobile) / 32px (desktop)
- Gap antar section: 96px (mobile) / 128px (desktop)
- Max content width: 1200px, gutter 24px
```

**Aturan emas anti-childish:** makin besar elemen, makin kecil rasio kebulatan. Card maks 12px, tombol 8px. Yang boleh `full` cuma avatar & maskot Baymax.

---

## 4. Penerapan Tema Baymax (tanpa childish)

Prinsip: **Baymax sebagai "presence" minimal, bukan dekorasi maksimal.**

- **Mata (signature):** dua lingkaran hitam solid disambung garis horizontal tipis (`#14161A`, stroke ~3px). Aset paling kuat & aman. Dipakai di: favicon, logo/wordmark (titik di huruf, atau mata berdiri sendiri), loading state (berkedip), section divider halus.
- **Bentuk gembung:** JANGAN di layout. Salurkan ke SATU maskot ilustrasi flat di hero — Baymax distilasi: badan putih (`--surface` + border tipis), mata signature, heart-chip merah kecil di dada (satu-satunya merah di maskot). Flat, geometris, 2-3 warna max. Bukan render 3D / kartun detail.
- **Mata ikut kursor di hero:** worth it dengan rem. Pupil gerak halus & TERBATAS (max 3-4px dari center, easing/lerp). Mati otomatis di `prefers-reduced-motion` & mobile (ganti: lirik halus tiap beberapa detik atau diam). Hanya di hero.

---

## 5. Struktur Section (single-page scroll, bernomor)

```
00  Hero
01  About
02  Skills
03  Projects
04  Experience
05  Contact
(Services — disembunyikan v1)
```

- **00 — Hero:** Heading Fraunces gede kiri (nama + "Fullstack Developer"), subcopy + 1 CTA merah ("Lihat Proyek") di kiri; maskot Baymax flat di kanan dengan mata ikut kursor + heart-chip merah. Wordmark outline "PORTFOLIO" berulang tipis sebagai watermark latar. Satu-satunya layar dengan maskot full.
- **01 — About:** Dua kolom — foto Naswa (radius-md, kotak sudut-lembut) + paragraf intro Fraunces body-lg. Bio personal: journey fullstack + minat AI engineering (jujur, "sedang mendalami"). Sebut MyCuci & Online Optic sebagai bukti.
- **02 — Skills:** Grid ikon software (React, TS, Hono, PostgreSQL, Docker, dll). Ikon monokrom default, grayscale-to-color saat hover. TANPA progress bar persen. Kategori: Frontend / Backend / Database / Infra / (AI — sebagai "sedang dipelajari").
- **03 — Projects (2-tier):** **Featured (5)** = kartu besar (radius-md, border tipis, hover `translateY(-4px)` + shadow lembut): thumbnail, judul Fraunces, 1 baris outcome plain-English, stack tags (chip radius-xs), link demo + badge status (Live / In rollout). Heart-chip merah kecil = penanda featured. Di bawahnya **All Projects** = grid kompak (arsip), 1 baris + tag tiap project, link. Lihat bagian 6 untuk daftar final.
- **04 — Experience:** Timeline vertikal, tahun di kiri (text-tertiary, Fraunces), role+deskripsi kanan, garis penghubung dengan node titik (motif mata Baymax di node). [ASUMSI: butuh data pengalaman dari user — bisa placeholder dulu.]
- **05 — Contact:** Bukan form panjang — CTA besar + ikon kontak (WhatsApp prominent karena Indonesia, GitHub, LinkedIn, Email). Footer dengan mata Baymax + copyright.

---

## 6. Copy (draft — English, perlu konfirmasi user)

**Prinsip: Progressive disclosure — business value di atas, technical detail di bawah.**
Tiga audiens, satu halaman:
- **HR/recruiter (non-tech):** baca baris atas — outcome & clarity, no jargon.
- **CEO/klien (non-tech):** baca problem→result, plain English.
- **Tech lead/dev:** baca tech stack tags & Skills section — detail teknis tersedia, ga nyumpel di muka.

Aturan: Hero, About, deskripsi Project = **bahasa hasil** (plain English, outcome-focused). Tech stack = **tag kecil** di bawah tiap project. Skills section = boleh teknis penuh (jatahnya dev).

### Hero
- Greeting: "Hi, I'm Naswa Wilantama."
- Role: "Fullstack Developer · based in Indonesia, working worldwide"
- Tagline (outcome, bukan stack): "I help turn ideas into web apps people actually use — from interface to deployment."
- CTA: `View Work` (primary) · `Get in Touch` (secondary)

### About (warm-personal, business-readable)
> Hi, I'm Naswa — some people call me Endabelyu. I'm a fullstack developer who builds web products end to end: clean interfaces, solid backends, and making sure everything runs reliably in production. To me, good software isn't just code that works — it's code that's easy to maintain and a product that genuinely helps people.
>
> I started on the frontend, then grew into backend, databases, and infrastructure — so I can take a product from idea to shipped. Lately I've been **exploring AI engineering** (LLMs, RAG, automation) to see how these tools can make products more useful.

> Catatan: bahasa "what I do FOR you", bukan "what tools I use". Jargon disimpan buat Skills section.

### Skills (kategori — ruang teknis, dev-focused)
- **Frontend:** React · TypeScript · Next.js · Tailwind · shadcn/ui
- **Backend:** Hono · REST API · JWT Auth
- **Database:** PostgreSQL · Prisma · Drizzle
- **Infra/DevOps:** Docker · VPS · Nginx · MinIO
- **Exploring:** Python · LLM APIs (Anthropic) · LangChain · RAG · MCP

### Projects — struktur 2-tier (Featured + All Projects)

Best practice (referensi): **3-5 featured**, sisanya arsip grid. Featured = kartu besar (thumbnail, problem→result plain English, tech tags, link demo). Prioritas: **live/dipakai** > impressive-tapi-ga-bisa-diklik.

**FEATURED (5) — semua real-world (dipakai/rollout):**

1. **Order Lens Management** — ✅ dipakai — *"A complete lens-ordering system for optical shops — track orders, customers, and vendors in one dashboard."* `React Router · TypeScript · shadcn`
2. **Personal Finance Tracker (Mili)** — ✅ dipakai — *"Take control of your money — track income, set budgets, and see where it all goes."* `React Router v7 · Better Auth · TypeScript` (+ FinanceAI CLI)
3. **Quadrant Calm** — ✅ dipakai — *"Turn a messy to-do list into clear priorities, with a built-in Pomodoro timer and focus mode."* `Vite · React · shadcn` (+ Spotify integration)
4. **Bunga Nona** — ✅ dipakai — *"A warm online storefront for a florist — browse the catalog, explore custom blooms, and order with ease."* `React Router · Radix UI · TypeScript`
5. **iropin Member Management** — 🟡 dalam sosialisasi — *"Helps an organization manage its members end to end — running on the edge for speed and scale."* `React Router v7 · Cloudflare Workers · TypeScript`

→ Range: optik · finance · produktivitas · e-commerce · member mgmt. Jujur (status ditandai), demoable.

**ALL PROJECTS (arsip lengkap — termasuk 5 featured di atas). Filterable.**

Filter UX (opsi C — by type + domain label): chip di atas grid → `All · Management Systems · Websites & Storefronts · Apps · APIs & Automation`. Klik = filter client-side (Astro + 1 island JS kecil). Tiap kartu juga punya **label domain kecil** (Optical, Laundry, Florist, dll) → info industri tetap kelihatan walau filter by type.

Mapping filter (4 bucket):
- **Management Systems** (sistem operasional internal: POS, inventory, admin, member): OMS · Vinara · Optik Talenta · Order Lens · Laundry POS · iropin
- **Websites & Storefronts** (web publik & toko: marketing, catalog, e-commerce): MyCuci · Bunga Nona · Online Optic Store
- **Apps** (produk konsumen standalone): Quadrant Calm · Mili
- **APIs & Automation** (backend, integrasi, bot): WA GSheet API · WABot

Catatan akurasi: Online Optic Store = e-commerce beneran (cart+checkout) → Storefronts. Bunga Nona = catalog florist, order via WhatsApp (bukan checkout) → Storefronts. SvelteKit di-defer (user update via CV nanti).

Daftar isi tiap kartu arsip (1 baris + tag + label domain):
- **OMS / OmniOptic** — sistem manajemen optik komersial (PRD + proposal, multi-cabang, BPJS, RBAC). [Writeup lebih kaya — bukti komersial. Bisa di-upgrade jadi case study.]
- **Online Optic Store (Lumen Vision)** — toko online optik, monorepo, dokumen SOC2/ISO27001.
- **Vinara** — POS optik enterprise (patient, inventory multi-cabang, BPJS), deployed VPS.
- **Laundry POS** — POS + accounting enterprise (COA, multi-tenant, MFA, AWS). 🔨 development.
- **MyCuci Laundry** — company profile bilingual (EN/ID), SEO. Remix · Netlify.
- **Optik Talenta** — sistem optik (be + fe).
- **WA GSheet API** — API integrasi WhatsApp ↔ Google Sheets, OpenAPI-documented. Hono.
- **WABot** — WhatsApp bot + Google Sheets automation. Hono.

[Perlu dari user: live URL tiap featured (untuk tombol demo), screenshot tiap project (thumbnail).]

### Contact
- Heading: "Let's Connect"
- Ajakan (personal, no movie slogan): "Got a project in mind or just want to chat? I'd love to hear from you."
- Channel utama: **Email** (endabelyuproject@gmail.com) · **GitHub** (Endabelyu) · **LinkedIn** (naswa-wilantama)
- Tambahan disaranin overseas: **Download CV** (PDF) · **Book a call** (Calendly/cal.com)
- Opsional kecil: X/Twitter (kalau aktif) · WhatsApp (jangan utama untuk overseas)
- Footer (1 nod Baymax halus, opsional): "Built with care by Naswa Wilantama © 2026."

---

## 7. SEO (dari marketing agent)

**Goal realistis:** menang di pencarian nama sendiri + tampil profesional pas di-share (LinkedIn). BUKAN perang keyword generik. **Market overseas** → meta English, sinyal "remote/worldwide".

- **Title:** `Naswa Wilantama — Fullstack Developer`
- **Meta description:** `Naswa Wilantama (Endabelyu) — Fullstack Developer based in Indonesia, available for remote work worldwide. Building modern web apps with React, TypeScript, Hono, and PostgreSQL.`
- **Open Graph + Twitter Card:** lengkap. **og:image 1200×630, <300KB** (penting buat preview LinkedIn). Isi: nama besar, role + "Available worldwide / remote", endabelyu.com, opsional avatar + logo stack. **`og:locale` = `en_US`**.
- **JSON-LD `Person`** dengan `sameAs` → GitHub & LinkedIn (loop dua arah). Tambah `"address": {"addressCountry": "ID"}` + pertimbangkan menandai ketersediaan remote di deskripsi.
- **Technical:** `site: 'https://endabelyu.com'` di astro.config, `@astrojs/sitemap`, robots.txt, canonical, **`<html lang="en">`**, 1× H1 (= nama), H2 per section, alt text semua gambar, foto WebP/AVIF + dimensi eksplisit (cegah CLS), Core Web Vitals.
- **Distribusi:** Google Search Console + request indexing, link porto dari GitHub profile README & LinkedIn Featured (English), validasi via LinkedIn Post Inspector + Rich Results Test. Untuk remote: pastikan LinkedIn profil English & "Open to work (Remote)".

---

## 8. Tiga Pantangan (anti-amatir)

1. **Merah liar / banyak warna.** >1 aksen atau merah di mana-mana = amatir. 1 CTA merah per layar. Skill icon monokrom.
2. **Baymax terlalu literal + rounded everywhere.** Maskot kartun full-detail, bubble di mana-mana, font bulat (Comic Sans/Baloo/Quicksand) = mainan. Maskot distilasi-flat + layout tegas + Fraunces.
3. **Motion berlebihan / efek murahan.** Mata melotot kasar, bounce lebay, gradient warna-warni, glow neon, shadow tebal. Motion halus & bertujuan. Honor `prefers-reduced-motion`.

---

## 9. Yang Masih Perlu dari User

1. ~~Email kontak~~ ✅ endabelyuproject@gmail.com
2. **Vinara = project AI?** (folder `agents/`) — kalau ya & jalan, upgrade positioning ke "Fullstack + AI Engineer".
3. **Per project:** mana yang punya **live URL**, mana **client vs personal** (recruiter prioritasin yang demoable).
4. **Data Experience** — untuk timeline (atau skip section ini kalau belum ada).
5. **Aset:** file foto Naswa (untuk About), screenshot tiap project (untuk thumbnail).
6. **Socmed tambahan:** punya Calendly/cal.com? mau bikin? · X/Twitter aktif? · CV PDF udah ada atau perlu dibikin?

---

## 10. Open Questions / Deferred

- Versi bahasa Inggris (kalau incar remote) — defer.
- Section Services (kalau menerima freelance) — defer, mudah diaktifkan.
- Dark mode "Baymax low-battery" easter egg — defer.
- Project AI/RAG (RAG untuk MyCuci / AI search Online Optic) — roadmap, untuk upgrade ke "Fullstack + AI Engineer".
