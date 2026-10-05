# 🇧🇩 Bangladesh Digital National Portal — Next Generation

A complete, production-ready, modern, ultra-premium digital government portal for Bangladesh. Built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, and Bootstrap Icons.

> **Disclaimer**: This is an independent digital government portal concept. For official government information, please visit [bangladesh.gov.bd](https://bangladesh.gov.bd/).

---

## ✨ Features

- **Bilingual (Bangla + English)** with one-tap toggle and persistent preference
- **AI Assistant** (সেবা সহকারী) — client-side smart response grounded in verified Bangladesh government data
- **Universal search** across 9 entity types (services, organizations, ministries, districts, upazilas, forms, notices, jobs, links)
- **Real seed data**: 8 divisions, 64 districts, 39 ministries, 39 organizations, 19 services, 15 emergency numbers, 12 forms, 6 notices, 5 recruitments, 14 government links
- **Premium Bangladeshi visual identity**: deep green primary, off-white background, red accents, refined dark mode
- **Bootstrap Icons** throughout (`react-bootstrap-icons`)
- **Mobile-first responsive design** with bottom navigation
- **Dark mode** with `next-themes`
- **Persistent favorites** with Zustand
- **Source transparency** badges on every record
- **Accessibility**: ARIA labels, semantic HTML, visible focus states, reduced motion support
- **Framer Motion** subtle animations
- **Fully static** — no backend required, deploys to any static host

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) — static export mode |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Icons | Bootstrap Icons via `react-bootstrap-icons` |
| State | Zustand (client) + TanStack Query (server) |
| Animation | Framer Motion |
| Build | `npm run build` → produces `out/` directory |
| Deployment | Cloudflare Pages (static) |

## 📦 Project Structure

```
.
├── .github/workflows/deploy.yml     # GitHub Actions → Cloudflare Pages auto-deploy
├── .npmrc                           # npm config (legacy-peer-deps for compatibility)
├── public/
│   ├── _headers                      # Cloudflare security & cache headers
│   ├── _redirects                    # Cloudflare SPA fallback
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Main view router
│   │   └── globals.css
│   ├── components/
│   │   ├── icon.tsx                  # Bootstrap Icons wrapper
│   │   ├── site-header.tsx site-footer.tsx mobile-nav.tsx
│   │   ├── hero-search.tsx
│   │   ├── service-card.tsx organization-card.tsx ministry-card.tsx
│   │   ├── section-header.tsx
│   │   ├── theme-provider.tsx app-providers.tsx
│   │   ├── ui/                       # shadcn/ui components
│   │   └── views/                    # 17 view components
│   ├── hooks/                        # use-toast, use-mobile
│   ├── lib/
│   │   ├── bd/
│   │   │   ├── client-data.ts        # Client-side data accessor (synchronous, no API)
│   │   │   ├── static-data.ts        # Bundled real Bangladesh government data
│   │   │   └── types.ts              # TypeScript type definitions
│   │   ├── i18n.ts                   # Bangla + English strings
│   │   └── utils.ts
│   └── stores/                       # Zustand stores
│       ├── use-language.ts use-view.ts use-favorites.ts use-search.ts
├── next.config.ts                    # output: 'export' → produces out/
├── package.json                      # npm scripts
└── wrangler.toml                     # Cloudflare config (optional)
```

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 20+
- npm 10+

### Install & Run

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start dev server
npm run dev
# → http://localhost:3000
```

### Build for Production (Static Export)

```bash
# Build command — produces static HTML in out/ directory
npm run build

# Output directory: out/
# This is what gets deployed to Cloudflare Pages
```

The build produces a fully static site in the `out/` directory. No server, no database, no API routes — everything is bundled into static HTML, CSS, and JavaScript.

## ☁️ Deploy to Cloudflare Pages

This project is configured for **static deployment** to Cloudflare Pages.

### Build Configuration

| Setting | Value |
|---------|-------|
| **Framework preset** | None (or Next.js) |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | (leave empty) |
| **Node version** | 20 |

### Method 1 — Cloudflare Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Bangladesh Digital National Portal"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/bangladesh-digital-portal.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
   - Select your GitHub repository
   - **Project name**: `bangladesh-digital-portal`
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Environment variables**:
     - `NODE_VERSION` = `20`
     - `NEXT_PUBLIC_SITE_URL` = `https://bangladesh-digital-portal.pages.dev` (replace with your project name)
   - Click **Save and Deploy**

3. **Wait for deployment** — first build takes ~2-3 minutes

4. **Your site is live** at `https://bangladesh-digital-portal.pages.dev`

5. **Add custom domain** (optional): Pages → Custom domains → Set up a custom domain

### Method 2 — GitHub Actions (Automated)

The included `.github/workflows/deploy.yml` automatically builds and deploys on every push to `main`.

**Setup**:
1. In Cloudflare Dashboard → **My Profile** → **API Tokens** → **Create Token**
   - Use the "Edit Cloudflare Workers" template, or create custom with **Cloudflare Pages → Edit** permission
   - Copy the token
2. Get your **Account ID** from the dashboard sidebar
3. In your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
   - `CLOUDFLARE_API_TOKEN` = your API token
   - `CLOUDFLARE_ACCOUNT_ID` = your account ID
4. Push to `main` — GitHub Actions will auto-build and deploy

### Method 3 — Wrangler CLI (Manual)

```bash
# Install wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build
npm run build

# Deploy
wrangler pages deploy out --project-name=bangladesh-digital-portal
```

## 🗄 Data Architecture

This project uses a **fully static data strategy** — no database is needed in production.

### How it works

1. **`src/lib/bd/static-data.ts`** — Contains all real Bangladesh government data bundled directly in the JavaScript (8 divisions, 64 districts, 39 ministries, 39 organizations, 19 services, 15 emergency numbers, etc.)

2. **`src/lib/bd/client-data.ts`** — Synchronous client-side data accessor. All views import data directly from this module — no API calls, no fetch, no async.

3. **`src/lib/bd/types.ts`** — TypeScript type definitions for all entities (replaces Prisma client types).

### Updating the data

To add or modify government data, edit `src/lib/bd/static-data.ts` and redeploy. The changes will be reflected immediately in the deployed site.

## 🤖 AI Assistant (সেবা সহকারী)

The AI Assistant works **fully client-side** — no backend LLM call required.

### How it works

1. **User asks a question** in Bangla or English (e.g., "আমি পাসপোর্ট করতে চাই")
2. **Smart search** retrieves the most relevant records from the bundled Bangladesh government data
3. **Templated answer generation** constructs a grounded response with:
   - The top matching service/organization/ministry
   - Description, fees, processing time (if available)
   - Official link
   - Related items
4. **Source citations** — every answer includes clickable source links
5. **Confidence indicator** — high/medium/low based on retrieval quality

The assistant **never invents government information**. If no verified data is found, it returns a fallback message directing users to the official portal.

## 🌐 Language Support

- Bangla (বাংলা) — default
- English — toggle in header
- All UI strings, services, organizations, ministries, districts, forms, notices, recruitments, and emergency services are bilingual
- Bangla typography uses **Noto Sans Bengali** font

## 📱 Mobile Responsive

- Mobile-first design with bottom navigation bar
- Touch-friendly 44px minimum target sizes
- Custom mobile search sheet
- Responsive grid layouts that adapt from 1 → 2 → 3 → 4 columns
- Sticky header with mobile menu
- Bottom sheet for navigation on small screens

## ♿ Accessibility (WCAG 2.2 AA Target)

- Semantic HTML5 (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`)
- ARIA labels and roles
- Visible focus states
- Reduced motion support via `prefers-reduced-motion`
- Screen reader friendly content
- High contrast color combinations

## 🔒 Privacy

- **No personal data collection** — no analytics, no tracking cookies
- **No login required** for any feature
- **Local-only favorites** — stored in browser localStorage via Zustand persist
- **All data is bundled** — no external API calls in production

## 📊 Statistics

All statistics shown on the homepage are **data-driven** (computed from the bundled dataset), never hardcoded in UI components.

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build static site → `out/` directory |
| `npm run start` | Start production server (for non-static deployment) |
| `npm run lint` | Run ESLint |

## 📝 License

This is a demonstration concept. For official government information, always refer to [bangladesh.gov.bd](https://bangladesh.gov.bd/).

## 🙏 Acknowledgements

- [Bangladesh National Portal](https://bangladesh.gov.bd/) — Source of government information
- [Bootstrap Icons](https://icons.getbootstrap.com/) — Icon library
- [shadcn/ui](https://ui.shadcn.com/) — UI component library
- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animation library

---

**Built with obsessive attention to detail — for the future of Bangladesh's digital government.**
