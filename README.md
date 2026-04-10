# Karim Abboud — Portfolio

A performance-first, responsive portfolio site built with **Next.js 14**, **TypeScript**, **React Three Fiber**, **GSAP**, and **Tailwind CSS**.

---

## Features

- **3D Hero Scene** — Distorted icosahedron + particle field via React Three Fiber, lazy-loaded with WebGL detection fallback (static SVG)
- **GSAP Animations** — Timeline-based entrance animations, scroll-triggered reveals, hover micro-interactions — all using `useGSAP` with proper React cleanup
- **Reduced Motion / Low-Power Mode** — Respects `prefers-reduced-motion` and includes a manual toggle in the navbar
- **Semantic CV** — Full CV rendered as semantic HTML (screen-reader accessible, printable via `Ctrl+P`)
- **Project Showcase** — Filterable grid with category pills; detail pages with case studies
- **Hostivite Case Study** — Anonymized write-up with demo mode for private data (no source code exposed)
- **Caesar Cipher Demo** — Interactive, client-side-only cipher visualization for the Cryptography project
- **Contact Form** — Works with a serverless endpoint or falls back to `mailto:`
- **Privacy-Friendly Analytics** — Plausible (opt-in), cookie consent banner
- **SEO** — OpenGraph, Twitter cards, structured data, SSG for all project pages
- **CI** — GitHub Actions: typecheck, lint, test on every PR

---

## Tech Stack & Justification

| Library | Why |
|---------|-----|
| **Next.js 14 (App Router)** | SSR/SSG for SEO, file-based routing, excellent Vercel deployment story, React Server Components for performance |
| **TypeScript** | Type safety across data models and components |
| **Tailwind CSS v3** | Utility-first — fast iteration, zero dead CSS with purge, consistent design tokens via CSS variables. Chosen over CSS Modules (more verbose) and Styled Components (runtime cost) |
| **GSAP** | Timeline control, ScrollTrigger, framework-agnostic, outperforms CSS animations for complex sequences |
| **React Three Fiber + drei** | Declarative Three.js in React with automatic disposal, suspense, and performance hooks |
| **Plausible** | Privacy-friendly, cookie-free analytics — no GDPR headaches |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm (or pnpm/yarn)

### Setup

```bash
# Clone and enter the project
cd portfolio

# Copy env file
cp .env.example .env.local

# Install dependencies
npm install

# Download Geist font (required)
# Get GeistVF.woff2 and GeistMonoVF.woff2 from:
# https://github.com/vercel/geist-font/releases
# Place them in src/fonts/

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_DEMO_MODE` | Set to `"true"` to show Hostivite anonymized demo data | No |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | URL for serverless contact form handler | No (falls back to mailto) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Your Plausible domain for analytics | No |
| `NEXT_PUBLIC_SITE_URL` | Production URL for OG meta tags | No |

### Hostivite Demo Mode

To view the anonymized Hostivite demo data locally:

```bash
# In .env.local
NEXT_PUBLIC_DEMO_MODE=true
```

This shows sample event data on the Hostivite project detail page. **Never deploy with demo mode enabled** — the Vercel environment should leave this unset or `false`.

---

## Scripts

```bash
npm run dev          # Start dev server (hot reload)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run test         # Jest tests
npm run test:ci      # Jest with coverage
npm run check        # All checks: typecheck + lint + test
```

---

## Deployment (Vercel)

1. Push the `portfolio/` directory to a GitHub repo (or use the monorepo root)
2. Import in [Vercel](https://vercel.com/new)
3. Set **Root Directory** to `portfolio` if using a monorepo
4. Set **Framework Preset** to Next.js
5. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` = your production URL
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = your domain (optional)
   - Leave `NEXT_PUBLIC_DEMO_MODE` unset (defaults to false)
6. Deploy

Vercel auto-builds on push to `main`.

---

## Project Structure

```
portfolio/
├── .github/
│   ├── copilot-instructions.md   # Copilot guidance for this repo
│   └── workflows/ci.yml          # GitHub Actions CI
├── public/                        # Static assets (CV PDF, favicon, OG image)
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (fonts, nav, footer, providers)
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # CSS variables, Tailwind layers, print styles
│   │   ├── about/page.tsx        # CV page
│   │   ├── projects/
│   │   │   ├── page.tsx          # Project grid page
│   │   │   └── [slug]/page.tsx   # Project detail (SSG)
│   │   └── contact/page.tsx      # Contact form
│   ├── components/
│   │   ├── layout/               # Navbar, Footer
│   │   ├── providers/            # MotionProvider (reduced motion, WebGL detection)
│   │   ├── sections/             # HeroSection, ProjectsPreview
│   │   ├── three/                # HeroScene, HeroFallback, HeroCanvas
│   │   ├── projects/             # ProjectCard, ProjectGrid, ProjectDetailContent
│   │   ├── cv/                   # CVContent
│   │   ├── contact/              # ContactForm
│   │   ├── demos/                # CaesarCipherDemo
│   │   ├── Analytics.tsx
│   │   └── CookieConsent.tsx
│   ├── data/
│   │   └── projects.ts           # Project data (descriptions, tech, links)
│   ├── fonts/                    # Geist font files (.woff2)
│   └── __tests__/                # Jest tests
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── jest.config.js
└── package.json
```

---

## Performance Checklist

### Animation Performance

- [ ] All animations use `transform` and `opacity` only — never `width`, `height`, `top`, `left`
- [ ] GSAP tweens use `autoAlpha` (triggers `visibility: hidden` at 0)
- [ ] Three.js scene is lazy-loaded via `next/dynamic` with `ssr: false`
- [ ] `will-change: transform` is applied only to actively animated elements
- [ ] `useGSAP` hook provides automatic cleanup on unmount
- [ ] ScrollTrigger instances are scoped and auto-reverted

### Debugging Jittery Animations

1. **Chrome DevTools → Performance tab**: Record a session, look for frames exceeding 16.6ms
2. **Rendering tab → "Frame Rendering Stats"**: Enable FPS meter overlay
3. **Check for layout thrashing**: Search for forced reflow in Performance flame chart — any "Layout" events during animation are a red flag
4. **Three.js stats**: Temporarily add `<Stats />` from `@react-three/drei` inside the Canvas
5. **Disable heavy scenes**: Toggle Low Power mode in the navbar to isolate whether Three.js is the bottleneck
6. **Check GPU**: In DevTools → `chrome://gpu` — verify hardware acceleration is enabled
7. **Mobile testing**: Use Chrome DevTools CPU throttling (4x slowdown) to simulate mid-range devices

### Lighthouse Targets

| Metric | Desktop Target | Mobile Note |
|--------|---------------|-------------|
| Performance | >= 90 | May be lower with 3D scene; fallback kicks in on low-end |
| Accessibility | >= 90 | All interactive elements keyboard-accessible |
| Best Practices | >= 90 | Security headers configured in next.config.js |
| SEO | >= 90 | OG tags, semantic HTML, structured data |

---

## Assets To Add

Before going live, add these files:

1. **`src/fonts/GeistVF.woff2`** — [Download from Vercel](https://github.com/vercel/geist-font/releases)
2. **`src/fonts/GeistMonoVF.woff2`** — Same source
3. **`public/karim-abboud-cv.pdf`** — Your CV as PDF
4. **`public/og-image.png`** — 1200x630 OpenGraph image
5. **`public/favicon.ico`** — Favicon

---

## License

Private. All rights reserved.
