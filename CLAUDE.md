# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

---

## Operating Principles

Read these four first. Each exists because it was violated and cost real time.

1. **Cite evidence before diagnosing.** Before claiming anything is missing, broken, or needs fixing, read the actual file and name the `file:line` that proves it. A glance is not evidence. "It looks like X is missing" is banned: either you read it and can cite it, or you say "I need to check first."
2. **Reuse before creating.** Check what already exists (files under non-obvious names, snippet components) before creating or claiming something is absent. Details in "Reuse Before Creating" below.
3. **Clarify, get approval, then code.** Never write or modify code without explicit go-ahead. Details below.
4. **Stay in scope.** Do exactly what was asked, nothing adjacent, even if it seems helpful. When unsure, ask.

---

## HARD RULE: Never Code Without Explicit Approval

**DO NOT write or modify code unless user explicitly says "go ahead", "implement", "do it", or similar approval.**

Even if:
- A plan has been approved
- The task seems clear
- You think you understand the requirements

**Always ask first:**
- Which sections / files are affected?
- Mobile only, desktop only, or both?
- Which breakpoints?
- Any exceptions or edge cases?
- Confirm scope before touching a single line

**Consequences:** If you violate this, you waste the user's time reverting changes and rebuilding trust.

**Example violations to NEVER repeat:**
- Modifying Work.jsx animations without asking if desktop changes were wanted
- Assuming site-wide changes when user may have wanted mobile-only
- Coding after plan approval without confirming implementation details

This is non-negotiable. Clarify → Get approval → Code.

---

## Reuse Before Creating

One principle, learned three times the hard way: **check what already exists before you create something new or claim something is absent.** When you diagnose, cite the `file:line` you actually read.

- **Metadata lives in `app/[locale]/layout.tsx`** (full title / description / OG / canonical / hreflang), not the root `app/layout.tsx` (icons only). Read both before claiming SEO or metadata is missing.
  - *Violated: claimed all SEO was missing after reading only the root layout. It was already complete.*
- **Infrastructure files may exist under non-obvious names.** Search the project root before creating any middleware / proxy / provider / routing file.
  - *Violated: created `middleware.ts` while `proxy.ts` already existed. Runtime conflict.*
- **Interactive elements already have snippet components.** Check `components/snippets/` (`LinkCta`, `PillCta`, etc.) before inlining a raw `<a>` or `<button>`. If nothing fits, ask before creating.
  - *Violated: raw `<a>` on the 404 page broke design consistency.*

---

## HARD RULE: Dev Server Management

**DO NOT create or start a dev server for testing.**

- Only use `npm run build` to verify compilation
- If a dev server is already running, use it for manual testing via browser
- Never spawn `npm run dev` or similar
- Do not leave processes running after testing

**Why:** Prevents orphaned processes and port conflicts.

This is non-negotiable.

---

## Roadmap — Future Iterations

- **Services copy** — review and tighten
- **Work card descriptions** — too generic, need specificity
- **Pricing** — confirm or change tiers/prices before locking

> SEO metadata (title, description, OG, canonical, hreflang) is DONE — see `app/[locale]/layout.tsx`. Remaining SEO work is indexing and backlinks, not code.
> Session-by-session change logs live in `git log`, not here. Do not add "Completed in X session" sections.

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
- next-themes (dark mode only, locked)
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

- `components/menu/` — `index.jsx` (Menu), `DesktopNavigation.jsx`, `MobileMenu.jsx`
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
- Dark theme only: `#0D131F` background, `#FAFAF8` text
- Accent color: cyan (`#5FD9D9`) — used subtly in tags, borders, hover states, accents
- `bg-accent` = dark blue-gray — use for placeholders and subtle fills

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

> The "check before you create" rules (infrastructure files, snippet components) now live in **Reuse Before Creating** near the top of this file.
