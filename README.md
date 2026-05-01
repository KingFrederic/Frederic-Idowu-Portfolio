# Frédéric Idowu Oluwasola — Portfolio

**Diplomatic Bilingual Communication Specialist** · Lagos · California · Pan-African

A bilingual editorial-grade portfolio built around the new positioning: serving
high-profile clients, Pan-African and diplomatic organizations, and English
founders transitioning into the francophone market.

## Pages

| Page             | Purpose                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| `index.html`     | Hero, mandate, flagship services teaser, editorial work preview, trusted-by, CTA.      |
| `services.html`  | The Practice — French mastery (flagship), event hosting (flagship), brand, strategy, media, speaking. |
| `work.html`      | The Archive — five mandate dossiers as full editorial spreads (no card grid).          |
| `about.html`     | Bilingual biography, career timeline, linguistic & diplomatic arsenal.                 |
| `speaking.html`  | Bilingual MC, keynote topics, formats, audiences.                                      |
| `contact.html`   | Mandate-typed brief form, direct contact, mandate process.                             |

## Design system (`shared.css`)

Diplomatic, ink-blue + imperial gold + bordeaux palette with parchment ivory text.

Tokens (excerpt):

```css
--ink-900:  #050B1F   /* deep midnight navy — page background */
--ink-950:  #03060F   /* deeper variant for alternating sections */
--ivory:    #F2EBD9   /* parchment text */
--gold:     #C9A84C   /* imperial gold — primary accent */
--bordeaux: #6E1F2C   /* diplomatic red — used sparingly */
```

Typography stack:

- **Bebas Neue** — display capitals
- **Cormorant Garamond** — italic dossier numbering & editorial pull-quotes
- **Playfair Display** — serif headlines & quote blocks
- **Inter** — body & UI

Reusable components:

- `.value-card` / `.value-card.gold-card` / `.value-card.bordeaux-card` — diplomatic cards
- `.service-feature.flagship` — large editorial service cards
- `.dossier-spread` / `.dossier-image-frame` / `.dossier-number` — magazine-style project layout
- `.section-label` — diplomatic chip label with gold rule
- `.bilingual-chip` — EN / FR pairing label
- `.btn-gold` / `.btn-outline-gold` / `.btn-ghost` — diplomatic buttons (with shimmer)
- `.diplomatic-underline` — animated underline draw on reveal
- `.gold-text` / `.ivory-text` / `.outline-display` — text gradient utilities
- `.mesh-bg` — radial diplomatic constellations background

## Motion (`shared.js`)

A single 4 KB vanilla module wired to every page:

- **3-D mouse tilt** — every `[data-tilt]` element responds to perspective rotation on hover.
- **Magnetic buttons** — every `[data-magnet]` element follows the cursor with subtle translation.
- **Scroll reveal** — `.reveal`, `.reveal-left`, `.reveal-right`, `.clip-reveal`, and `.diplomatic-underline` use `IntersectionObserver`.
- **Counter rollup** — `[data-count="N"]` numbers animate to their target on intersect.
- **Float / spin / orbit** — the diplomatic seal SVG (home + services hero) uses `.float-3d`, `.spin-slow`, `.spin-orbit`, `.seal-glow`.
- **Navbar scroll state** — transparent → blurred at `> 80px`.
- **Mobile menu** — ARIA-aware open/close + Escape.
- **Reduced motion** — every animation honours `prefers-reduced-motion`.

## What changed (vs. previous build)

1. **Positioning**: "Visual Design Director · Public Speaker · Corporate Communications Specialist" → **Diplomatic Bilingual Communication Specialist**.
2. **New page**: `services.html` with two flagship services (French Language Mastery and Professional Event Hosting) plus four supporting disciplines.
3. **Work page redesigned**: Netflix-row cards & modal dropped. Replaced with five editorial dossier spreads — full-bleed image, large dossier numerals, side meta panel, achievements, tools.
4. **New aesthetic**: Black + red kit retired. Deep ink-blue + imperial gold + bordeaux. Editorial typography pairing Bebas + Cormorant + Playfair + Inter.
5. **3-D motion layer**: tilt cards, magnetic buttons, animated diplomatic seal, parallax dossier images, gold shimmer, clip-path reveals.
6. **Bilingual signaling**: every page surface carries an EN / FR pairing somewhere (chip, label, copy).
7. **Shared JS**: deduplicated per-page boot scripts into `shared.js`.

## Running locally

It is a static site — no build step. Open any `*.html` in the browser:

```bash
# any tiny static server works
python3 -m http.server 8080
# then open http://localhost:8080/
```

Tailwind is loaded via CDN for quick iteration. For production, swap to a
local Tailwind build (see TODO comment in each `<head>`).

## Accessibility

- All decorative `data-lucide` icons are flagged `aria-hidden="true"` before hydration.
- Mobile menu is a focus-trapped `role="dialog"` with `aria-modal`, `aria-hidden`, Escape, and focus return.
- `:focus-visible` rings honour the gold token, not browser default blue.
- Form fields are labelled, required, and use proper `autocomplete` slots.
- `prefers-reduced-motion` disables animations, tilt, magnet, counters, spins, and shimmers.

## Browser support

Tested against current Chromium, Firefox, and Safari. CSS uses
`backdrop-filter`, `clip-path`, `transform-style: preserve-3d`,
`scroll-behavior`, and `IntersectionObserver` — all available in those
browsers.
