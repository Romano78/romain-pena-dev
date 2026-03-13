# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## About This Project
Portfolio and business site for **Romain Pena** — a Shopify developer
based in Montreal specializing in custom features, design implementation,
and integrations for e-commerce brands.

**Site:** [romainpena.dev](https://romainpena-dev-arev.vercel.app/)
**Positioning:** "I build what your Shopify store can't do out of the box"
**Model:** Monthly retainer (€900 Growth / €1,500 Partner)

---

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

To add shadcn/ui components:
```bash
npx shadcn@latest add <component-name>
```

---

## Architecture

Single-page portfolio site built with:
- Next.js 15 + React 19 + TypeScript + Tailwind CSS v4
- Framer Motion for animations
- next-themes for dark/light mode
- shadcn/ui (new-york style, zinc base, Lucide icons)
- react-tooltip for tooltips in ComparisonTable
- split-type for text splitting in animation hooks

### Page structure (`app/page.tsx`)
One scrollable page with anchor navigation (`#work`, `#services`,
`#pricing`, `#contact`). Sections in order:
1. `MainHero` — hero with profile image
2. "A bit about me" — `TextReveal` scroll animation
3. "What I do" — `Services` (2-column grid)
4. "Selected Work" — `ProjectCard` (3 case studies)
5. "How I Work" — `Steps` (3-step process with animated counters)
6. "Prices" — `PricingTable` (Monthly/Yearly toggle + expandable `ComparisonTable`)
7. Contact — email link + HTML form (no backend — `preventDefault()` only)
8. `BackToTopButton` — floating scroll progress indicator

### Layout (`app/layout.tsx`)
Wraps content with `ThemeProvider`, sticky `Menu`, and `Footer`.
Inter font via `next/font/google` (`--font-inter`).

### Component organization
- `components/menu/` — Desktop nav, mobile menu, theme toggle
- `components/snippets/` — Reusable blocks: `TextReveal`, `TextAnimation1`,
  `ScrambleTextAnimation1`, `SectionHeader`, `ProjectCard`, `Steps`,
  `BackToTopButton`, `ComparisonTable`, `NavigationMenu`,
  `ParallaxImage` *(exists, not used in page.tsx)*,
  `Media` *(exists, not used in page.tsx)*
- `components/ui/` — shadcn/ui primitives
- `components/Footer/` — Footer with nav
- Top-level: `MainHero.jsx`, `Services.jsx`, `PricingTable.jsx`
- `hooks/` — `split-text.ts`, `use-text-reveal.ts` (used by text animation components)

### Config
- `config/routes.js` — Single source of truth for anchor hrefs
- `config/navigation-config.js` — Nav items for desktop + mobile
- `config/cubic-beziers.js` — Shared Framer Motion easing curves
- `config/theme-provider.jsx` — next-themes wrapper

### Styling
- Tailwind CSS v4 with CSS variables in `styles/globals.css`
- Custom typography: `.h1`–`.h6`, `.text-overline` in `@layer components`
- `--muted` = accent green (Shopify green `#96BF48`), not a neutral
- Light theme: off-white (`#FAFAF8`) background, near-black (`#111111`) text
- Dark theme: `#0D131F` background, cyan (`#5FD9D9`) replaces green as muted
- Green/cyan used subtly — tags, borders, hover states, accents only

### Mixed JS/TS
- `.tsx` — `app/layout.tsx`, `app/page.tsx`, `lib/utils.ts`, `components/ui/`
- `.jsx` — all other components
- New page-level files → `.tsx`, new components → `.jsx`

---

## "use client" Rules
Push it as deep as possible. Most components are static —
only add "use client" when a component needs:
- useState / useEffect
- Event listeners (onClick, onChange)
- Browser APIs
- Framer Motion animations (if using useAnimation/useInView)

Current client components: `Menu`, `Footer`, `PricingTable` (billing toggle),
`ComparisonTable`, `TextReveal`, `TextAnimation1`, `ScrambleTextAnimation1`,
`Steps`, `BackToTopButton`, `config/theme-provider.jsx`.
Everything else stays as a Server Component.

---

## Design Principles
- Clean, minimal, let the work speak
- No buzzwords ("passionate", "innovative", "results-driven")
- No aggressive CTAs or urgency tactics
- First person throughout
- Confident but human — this is a personal site, not a marketing page
- Typography and whitespace carry the design

## Brand
- Logo: "RomainPena" — "Romain" in medium weight, "Pena" in green, lighter weight
- Navbar: "RomainPena.dev" — "RomainPena" medium weight, ".dev" in green lighter weight
- Font: **Inter** (from `next/font/google`, variable `--font-inter`)

---

## Content Reference

### One-liner
"I build what your Shopify store can't do out of the box."

### Services
1. Design Implementation — Figma → Shopify, pixel-perfect,
   custom sections, Liquid, theme dev
2. Features & Integrations — custom features, Klaviyo,
   API integrations, app config

### Case Studies
1. Major Gaming Brand — full storefront, custom components,
   pre-Dawn framework, pixel-perfect from design files
2. Licensed Merch Brand — Klaviyo, Google Tags, custom cart,
   custom fulfillment app, API endpoints
3. Pet Commerce Brand — custom product sync app,
   internal system → Shopify daily automation

### Pricing
- Growth: €900/month — 12h, design implementation,
  features, fixes, 48h response, monthly call
- Partner: €1,500/month — 20h, everything in Growth,
  custom features & integrations, priority, weekly call, Slack

---

## What Romain Does NOT Do
- Build Shopify stores from scratch for new merchants
- Run marketing campaigns or paid ads
- Design (he implements designs, doesn't create them)
- Shopify setup for clients with no Shopify knowledge

## Key Libraries

### Lenis — Smooth Scrolling
Docs: https://github.com/darkroomengineering/lenis/blob/main/README.md

- Lenis is initialized once at the root level in `app/layout.tsx` 
  or a dedicated `LenisProvider` component
- Always use "use client" for the Lenis wrapper
- Integrate with Framer Motion via lenis.on('scroll', ...) 
  to sync scroll progress
- Do NOT use both Lenis and native CSS scroll-behavior: smooth — 
  they conflict

### GSAP
Docs: https://gsap.com/docs/v3/

- Use `useGSAP()` hook (from @gsap/react) instead of useEffect 
  for all GSAP animations — it handles cleanup automatically
- Register plugins at the top of the file: 
  gsap.registerPlugin(ScrollTrigger)
- Always use `scrollerProxy` to make ScrollTrigger work with Lenis:
  ScrollTrigger.scrollerProxy for Lenis compatibility
- Scope all GSAP selectors to a ref to avoid targeting 
  wrong elements across components

### Search before creating infrastructure files
 - Always search for existing equivalents before creating new config/infrastructure files

 - Before creating any infrastructure file (middleware, proxy, provider, config), search the project root for existing files that could serve the same purpose — including framework convention aliases.

**Why:** Created `middleware.ts` without knowing `proxy.ts` already existed and did the same thing. Next.js migrated from `middleware.ts` → `proxy.ts` convention. This caused a conflict and a runtime error.

**How to apply:** Before creating files like middleware, proxies, providers, or routing config — run a broad search (Glob `*.ts` at root, or Grep for the relevant import/pattern) to confirm nothing equivalent already exists under a different name.

  