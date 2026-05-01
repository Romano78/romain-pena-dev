# Site — v1 Remaining Work

**Branch:** impeccable-audit

---

## Remaining Tasks

### 1. Pricing — Needs rethink

Current pricing section doesn't reflect reality. Decide:

- Keep two tiers? If yes, confirm names, prices, and feature list
- Or remove the section entirely and redirect to contact?
- Current: Growth €900/mo · Partner €1,500/mo — confirm or change

### 2. Copy — Improve across the site

- ~~Hero headline~~ — done: "Custom Shopify development: themes built from Figma files, apps the Shopify doesn't have, integrations that actually work." (en + fr)
- ~~About paragraph~~ — done: personal story (Cal State LB → Le Wagon → Field Office → independent) with AI/speed/platform-replacement angle (en + fr)
- **Services copy** — review and tighten ← next up
- Work card descriptions — too generic, need more specificity

### 3. SEO

- Page `<title>` and `<meta description>` for home + each case study
- Open Graph tags (title, description, image)
- Depends on final copy being locked first

### 4. Favicon

- Need asset from Romain (SVG or high-res PNG of logo mark)

### 5. OG Image

- Need a designed OG image (1200×630) or generate one from the site

### 6. Work cards — Text treatment

- Current text is too plain
- Make project metadata (client, type) feel more considered

---

## What's Done (v1 context)

- Hero: two-column vertical marquee with Cloudinary gallery images, CSS infinite scroll
- Hero copy: final subtitle locked in en + fr (2026-05-01)
- Work: grid with real project cards, Cloudinary cover images, case study pages
- Projects: 7 total — Atari, TOGETHXR, and-OR Collective, Animo etc, Jayson Home, CCollections, Philippe Tullio
- About: copy rewritten — personal story + AI/speed angle, locked in en + fr (2026-05-01)
- Contact: email link only, no form
- Pricing: section exists, needs content rework
- Menu: desktop nav + mobile menu + language switcher (FR/EN flags)
- Resume page: `app/[locale]/resume` — styled, matches site design, Download PDF via `window.print()` (2026-05-01)
- Cloudinary: gallery images for marquee, cover images for work cards and case study pages
- Theming: light/dark, Inter only
- Animations: page load, hero text entrance, scroll-reveal consistency across sections

---

## Projects Reference

See `config/projects.md` for full copy.
See `config/projects.ts` for live data.

| #   | Client            | Slug             | Type                  |
| --- | ----------------- | ---------------- | --------------------- |
| 1   | Atari             | atari            | Full Storefront Build |
| 2   | TOGETHXR          | togethxr         | Design Implementation |
| 3   | and-OR Collective | andor-collective | Design Implementation |
| 4   | Animo etc         | animoetc         | Custom App & Backend  |
| 5   | Jayson Home       | jaysonhome       | Retainer & Redesign   |
| 6   | CCollections      | ccollections     | Design Implementation |
| 7   | Philippe Tullio   | philippe-tullio  | Web Experience        |

---

## Constraints

- Do not change prices without explicit confirmation
- Do not add a second font without explicit instruction
- Do not add features beyond what is listed above
