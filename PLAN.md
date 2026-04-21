# Site Redesign Plan

**Status:** In planning — awaiting final answers before implementation begins
**Branch:** impeccable-audit

---

## Open Questions (must resolve before build)

1. **Font** — Almost certainly the lack of a display/editorial font. Both other projects built by Romain use a second typeface: Philippe Tullio uses Alfa Slab One (display) + Space Grotesk (meta), LinkpeakHQ uses Fraunces (display). The portfolio only has Inter — it reads flat. **Pending confirmation from Romain on which display font to add and where.**
2. **Philippe Tullio (brother's project)** — Film director portfolio. Cinematic, dark, video-heavy. Built by Romain. Add to work grid? **Awaiting confirmation from Romain. If yes: need a screenshot/image.**
3. **Pricing** — show numbers (and confirm: €900/€1,500 or €1,200/€2,000?) or remove pricing section and redirect to contact?
4. **Work layout** — choose one:
   - a) Keep 2-col grid, improve card design
   - b) First project as full-width hero card, rest in 2-col below
   - c) Alternating asymmetric layout

---

## Confirmed Changes

### 1. Hero — Remove image, go typographic
- Remove the `<Image>` column entirely
- Full-width editorial headline layout
- Keep entrance animation (fade + slide)
- Availability badge stays
- No placeholder or fallback image

### 2. Positioning — Broaden beyond Shopify-only
- Shift framing from "Shopify developer" to "Frontend developer, Shopify specialist" or similar
- Update: metadata title, hero headline, About paragraph, Services copy
- This lets non-Shopify projects (brother's project, future work) be included naturally

### 3. About section — Remove TextReveal inconsistency
- The word-by-word opacity reveal animation only exists in this section
- Remove TextReveal, replace with a standard block fade-in (consistent with every other section)
- The copy itself stays the same

### 4. Contact — Email only, no form
- Remove the contact form entirely
- Keep the email link, styled prominently
- Keep availability context line
- Simple, direct — no dead form endpoint

### 5. Work section — TBD (pending layout choice above)
- 6 projects total: Atari, TOGETHXR, and-OR Collective, Animo etc, Jayson Home, CCollections
- Brother's project potentially added (TBD)
- Real screenshots exist for all 6 (in /public/)

### 6. Pricing — Simplify
- Remove unused fullFeatureList comparison table data
- Two clean cards only
- Confirm prices before updating copy
- Decide whether to show prices or remove section entirely

### 7. Animations — Normalize across sections
- Only About currently uses TextReveal
- All other sections use block fade-in via useScrollReveal
- After removing TextReveal from About: all sections will be consistent

---

## Other Projects (Context)

These are projects Romain built outside the 6 Shopify client projects. They inform positioning and may be added to the portfolio.

### Philippe Tullio — Film Director Portfolio
- **Repo:** /Users/romainpenaruiz/Desktop/Freelance/PhilippeTullio/ph_tullio
- **What it is:** Portfolio site for Romain's brother, a film director. Cinematic, dark aesthetic. Uses Alfa Slab One + Inter + Space Grotesk, Cloudinary for assets, GSAP + Framer Motion, next-intl (FR/EN).
- **Status:** Live on Vercel.
- **Portfolio angle:** Shows Romain can build beyond Shopify — immersive, cinematic, high-end web experiences.
- **Action needed:** Confirm whether to add to work grid.

### LinkpeakHQ — Custom Link-in-Bio Service
- **Repo:** /Users/romainpenaruiz/Desktop/Freelance/LinkpeakHQ/linkpeakhq-site
- **What it is:** Marketing site for a done-for-you service building custom branded link-in-bio pages on the creator's own domain. Built by Romain. Uses DM Sans + Fraunces, clean minimal aesthetic.
- **The adult creator angle:** The service was inspired by / targets adult content creators. This should NOT be mentioned on the portfolio.
- **Portfolio angle:** Can be described simply as "custom link-in-bio service" or "creator web presence tool." Shows product/service thinking beyond client work.
- **Action needed:** Confirm whether to add to work grid and how to describe it.

---

## Projects Reference

See `config/projects.md` for full project details and copy.
See `config/projects.ts` for the live data feeding the work section.

**Current projects (6):** (Shopify client work — other projects listed below in Other Projects section)
| # | Client | Type | Image |
|---|--------|------|-------|
| 1 | Atari | Full Storefront Build | atari_safari.png |
| 2 | TOGETHXR | Design Implementation | together-sfari.png |
| 3 | and-OR Collective | Design Implementation | andor_safari.png |
| 4 | Animo etc | Custom App & Backend | animo_safari.png |
| 5 | Jayson Home | Retainer & Redesign | jaysonhome_safari.png |
| 6 | CCollections | Design Implementation | cc_safari.png |

---

## What NOT to do
- Do not add features beyond what is listed above
- Do not refactor components that are not being changed
- Do not add a second font without explicit instruction on which font
- Do not change prices without explicit confirmation from Romain
- Do not keep the contact form or add a new one
