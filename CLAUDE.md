# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Remaining Work

See `PLAN.md` for full detail. Short list:

- **Services copy** — review and tighten (next up)
- **Work card descriptions** — too generic, need specificity
- **Pricing** — confirm or change tiers/prices before locking
- **SEO** — page `<title>`, `<meta description>`, OG tags (needs copy locked first)
- **Favicon** — needs asset from Romain (SVG or high-res PNG)
- **OG image** — 1200×630, designed or generated

## Completed in Last Session (2026-05-01)

- Hero subtitle (`hero.title`) updated in `en.json` + `fr.json` — "Custom Shopify development: themes built from Figma files, apps the Shopify doesn't have, integrations that actually work."
- About body (`about.body`) rewritten in `en.json` + `fr.json` — personal story (Cal State LB → Le Wagon → Field Office → independent), includes AI/speed/platform-replacement angle
- Resume page added: `components/Resume.jsx` + `app/[locale]/resume/page.tsx`
- Nav routing: `config/routes.js` (RESUME_ROUTE), `config/navigation-config.js` (resume item with `isPage: true`)
- `DesktopNavigation.jsx` + `MobileMenu.jsx` — conditionally render next-intl `<Link>` for `isPage` items, `<a>` for anchors
- `styles/globals.css` — `@media print` block added at end (hides header/footer/`[data-no-print]`, resets margins)

---

## About This Project

Portfolio and business site for **Romain Pena** — a frontend developer based in Montreal,
specializing in Shopify custom development, design implementation, and web experiences.

**Site:** [romainpena.com](https://romainpena.com)
**Model:** Monthly retainer

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
- Framer Motion — used selectively (not for the marquee)
- GSAP — used for entrance animations
- next-intl — FR/EN i18n with locale routing
- next-themes for dark/light mode
- shadcn/ui (new-york style, zinc base, Lucide icons)
- Cloudinary — all production images served via Cloudinary CDN

### Page structure (`app/[locale]/page.tsx`)

One scrollable page with anchor navigation (`#work`, `#services`, `#pricing`, `#contact`).
Sections in order:

1. `MainHero` — headline + two-column vertical marquee (Cloudinary gallery images)
2. `About` — text section with scroll reveal (moved up, directly after hero)
3. `Work` — project grid with Cloudinary cover images
4. `Services` — 2-column grid
5. `Steps` — 3-step process
6. `PricingTable` — two retainer tiers
7. `Contact` — email link only, no form
8. `BackToTopButton` — floating scroll progress indicator

### Layout (`app/layout.tsx`)

Wraps content with `ThemeProvider`, `LenisProvider`, sticky `Menu`, and `Footer`.
Inter font via `next/font/google` (`--font-inter`).

### Component organization

- `components/menu/` — `index.jsx` (Menu), `DesktopNavigation.jsx`, `MobileMenu.jsx`, theme toggle
- `components/snippets/` — Reusable blocks:
  - `ImagePlaceholder.jsx` — `bg-accent` placeholder, fills parent, used when no Cloudinary image
  - `PillCta.jsx` — pill-shaped CTA button with optional icon; renders `<button onClick>` when no `href`, `<a>` when `href` provided
  - `LinkCta.jsx` — underline text link CTA, supports `uppercase` prop
  - `LanguageSwitcher.jsx` — FR/EN flag toggle (🇫🇷 / 🇺🇸), active flag at full opacity
  - `GreetingRotator.jsx` — GSAP cycling greeting animation (Hi → Bonjour → Hola → …), used in MainHero
  - `Steps.jsx`, `BackToTopButton.jsx`, `SectionHeader.jsx`
  - `TextReveal.jsx`, `TextAnimation1.jsx`, `ScrambleTextAnimation1.jsx`
  - `ComparisonTable.jsx`, `NavigationMenu.jsx`
- `components/ui/` — shadcn/ui primitives
- `components/Footer/` — Footer with nav
- Top-level components: `MainHero.jsx`, `About.jsx`, `Work.jsx`, `Services.jsx`, `PricingTable.jsx`, `Contact.jsx`, `Resume.jsx`
- `hooks/` — `split-text.ts`, `use-text-reveal.ts`

### Pages

- `app/[locale]/page.tsx` — main single-page site
- `app/[locale]/resume/page.tsx` — styled resume with print-to-PDF download
- `app/[locale]/work/[slug]/page.tsx` — case study pages

### Nav routing

- Anchor items (`#work`, `#services`, etc.) → `<a href>` in `DesktopNavigation` + `MobileMenu`
- Page items (e.g. `/resume`) → next-intl `<Link href>` — locale prefix injected automatically
- Use `isPage: true` flag in `navigation-config.js` to control which renderer is used

### Config

- `config/routes.js` — Single source of truth for anchor hrefs AND page routes (e.g. `RESUME_ROUTE`)
- `config/navigation-config.js` — Nav items for desktop + mobile
- `config/projects.ts` — Project data (slug, client, type, description, url, image)
- `config/projects.md` — Full copy reference for all projects

### Cloudinary

- `lib/cloudinary.ts` — server-only, all Cloudinary API calls
- `lib/cloudinary-url.ts` — `cldImage(path, width?)` URL builder
- Folder structure in Cloudinary: `Projects/<slug>/cover/` and `Projects/<slug>/gallery/`
- `getAllGalleryImages()` — single API call, fetches all `Projects/*/gallery/*`, used for hero marquee
- `getProjectImages()` — per-slug cover fetch, used for work grid thumbnails
- `getProjectCover(slug)` — single cover for case study page hero
- `getProjectGallery(slug)` — gallery images for case study page
- All calls cached via `unstable_cache` (1h revalidation)
- In development: all Cloudinary functions return `[]` / `{}` — use `ImagePlaceholder` as fallback

### Marquee (MainHero)

- Two CSS-animated columns: `.marquee-col-up` and `.marquee-col-down` (defined in `globals.css`)
- Pure CSS `animation: linear infinite` — no Framer Motion, no JS reset, no jump
- Images from `getAllGalleryImages()`, split 50/50 into left and right columns
- Aspect ratio: `aspect-[3/4]` (portrait, matches gallery image dimensions ~800×1100)
- In dev: renders `<ImagePlaceholder />` per slot (5 per column)

### Styling

- Tailwind CSS v4 with CSS variables in `styles/globals.css`
- Custom typography: `.h1`–`.h6`, `.text-overline` in `@layer components`
- `--muted` = accent green (Shopify green `#96BF48`), **not a neutral**
- Light theme: off-white (`#FAFAF8`) background, near-black (`#111111`) text
- Dark theme: `#0D131F` background, cyan (`#5FD9D9`) replaces green as muted
- `bg-accent` = light gray in light mode, dark blue-gray in dark mode — use for placeholders and subtle fills
- Green/cyan used subtly — tags, borders, hover states, accents only

### Mixed JS/TS

- `.tsx` — `app/` files, `lib/`, `components/ui/`
- `.jsx` — all other components
- New page-level files → `.tsx`, new components → `.jsx`

---

## "use client" Rules

Push as deep as possible. Add only when a component needs:

- `useState` / `useEffect`
- Event listeners
- Browser APIs
- GSAP / Framer Motion imperative hooks

Current client components: `Menu`, `MobileMenu`, `DesktopNavigation`, `LanguageSwitcher`,
`Footer`, `PricingTable`, `ComparisonTable`, `TextReveal`, `TextAnimation1`,
`ScrambleTextAnimation1`, `Steps`, `BackToTopButton`, `MainHero`, `About`, `Work`, `Services`, `Contact`, `GreetingRotator`, `Resume`, `config/theme-provider.jsx`.

### i18n (next-intl)

All sections are fully wired to `messages/en.json` and `messages/fr.json` via `useTranslations`. There are no hardcoded strings in any section component. Use `t.raw('key')` to retrieve raw array values (e.g. pricing feature lists). The name "Romain Pena Ruiz" in MainHero is intentionally hardcoded — it's a proper name.

---

## Design Principles

- Clean, minimal, let the work speak
- No buzzwords ("passionate", "innovative", "results-driven")
- No aggressive CTAs or urgency tactics
- First person throughout
- Confident but human — personal site, not a marketing page
- Typography and whitespace carry the design

## Design Context

### Users

Two audiences:

- **Shopify brand founders** — evaluating a specialist retainer. Skeptical, time-poor, want proof.
- **E-commerce agencies** — subcontracting Shopify work; need confidence in technical depth.

Most arrive via referral. The site's job is **validation**, not persuasion.

### Brand Personality

**Calm · Premium · Human**

Trusted senior colleague energy: approachable but clearly expert.

**Emotional goal:** "This guy clearly knows his stuff."

### Design Rules

1. **Credibility over persuasion** — show, don't sell
2. **Whitespace is voice** — generous spacing signals selectivity
3. **Typography does the work** — hierarchy through weight/scale before color
4. **Calm interactions** — smooth and inevitable, never eager; no bounce
5. **Human, not corporate** — first person always, no jargon

## Brand

- Logo: "RomainPena" — "Romain" medium weight, "Pena" in green lighter weight
- Navbar: "RomainPena.dev" — "RomainPena" medium weight, ".dev" in green lighter weight
- Font: **Inter** only (`--font-inter`)

---

## What Romain Does NOT Do

- Build Shopify stores from scratch for new merchants
- Run marketing campaigns or paid ads
- Design (he implements designs, doesn't create them)
- Shopify setup for clients with no existing Shopify knowledge

---

## Key Libraries

### Lenis — Smooth Scrolling

- Initialized once at root level
- Do NOT use native `scroll-behavior: smooth` alongside Lenis — they conflict

### GSAP

- Use `useGSAP()` hook from `@gsap/react` — never raw `useEffect` for animations
- Register plugins at file top: `gsap.registerPlugin(ScrollTrigger)`
- Scope all selectors to a `ref`

### Search before creating infrastructure files

Before creating any infrastructure file (middleware, proxy, provider, routing config):
search the project root for existing equivalents — Next.js conventions change and a file
may already exist under a different name.

**Why:** Created `middleware.ts` without knowing `proxy.ts` already existed. Caused a runtime conflict.

### Always use existing snippet components

When adding any interactive element (button, link, CTA), check `components/snippets/` first and use the existing component. Never inline a raw `<a>` or `<button>` when `LinkCta`, `PillCta`, or another snippet already covers the pattern. If no component fits, ask before creating a new one.

**Why:** Used a raw `<a>` tag instead of `LinkCta` on the 404 page — inconsistent with the design system.
