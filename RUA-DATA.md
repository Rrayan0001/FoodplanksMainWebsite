# Rua Restaurant — Data Pack

Data extracted from the live website (Rua — Yelahanka, Bengaluru, running at http://localhost:3001) and from the raw design brief `ruawebsite-brief.md`. Includes: a complete walkthrough of the live site, the raw brief, and the extracted restaurant facts + food plan details.

---

## 1. Live website — Rua (Yelahanka, Bengaluru) — complete walkthrough

The site is a Next.js App Router app. Page structure, top to bottom:

1. **Skip link** — "Skip to content" → `#main`.
2. **Welcome splash (first visit)** — hand-drawn doodle (arch + cloche + steam + sparkle), wordmark "rua", sub "YELAHANKA", tagline "Good food. Great company.", "SETTING YOUR TABLE" loader. Shows once per session (sessionStorage `rua-welcome-seen`), auto-dismisses after ~1.8 s, Escape-to-close, Skip intro button, `?welcome=stay` preview mode.
3. **Header** — sticky. Brand: Rua logo + "YELAHANKA". Desktop nav: "Our story" → #story, "The flavours" → #flavours, "The moments" → #moments, "Find us" → #visit; right side: "A table for you" → Zomato book URL. Reading-progress bar on scroll. Mobile: hamburger opens a full-screen drawer ("MAKE YOURSELF AT HOME" eyebrow, staggered nav links, booking button, note "Yelahanka, Bengaluru · A little escape."). Background goes inert while open.
4. **Hero** (#top, full height) — eyebrow "A LITTLE ESCAPE IN YELAHANKA" (with star), H1 "Good food." / "Great company.", sub "Some places feed you. Some places make you feel at home.", peach CTAs "Find your table" (→ Zomato book) and "A taste of Rua" (→ #flavours), scroll cue "GOOD THINGS AWAIT" (→ #story), footer row "YELAHANKA, BENGALURU — 13.1751° N · 77.5480° E", and a rotating round stamp "COME HUNGRY · LEAVE HAPPY ·" with the Rua doodle. Hero image: hero.jpg (desktop) / hero-mobile.jpg (≤760px).
5. **Motion Ribbon** — ambient marquee words rotating: "NORTH INDIAN SOUL", "A TABLE FOR EVERY STORY", "YELAHANKA, WITH LOVE", "MAKE YOURSELF AT HOME", with a pause button.
6. **Story** (#story, light surface) — two-column: table.jpg + curry.jpg photos ("THE SIMPLE JOY OF COMING TOGETHER" caption, "a little less rush. / a little more Rua." note), then copy: eyebrow "THE RUA FEELING", H2 "Come for the food. Stay for the feeling.", two body paragraphs, "Meet us at Rua" link → #visit, Rua doodle.
7. **Flavours** (#flavours, forest green) — cuisine inspiration tabs: "The whole table" (03) / "Vegetarian" (02) / "Non-vegetarian" (01), with keyboard arrow support. Three dish cards: "Comfort, by the spoonful." (RICH & SOULFUL), "A little fire. A lot of flavour." (BOLD & BEAUTIFULLY SPICED), "Better when shared." (THE INDIAN TABLE), each with a veg/non-veg dot. Footer: "A little cuisine inspiration. Discover current dishes and prices in the full menu." + "Explore the full menu" → Zomato.
8. **Interlude** — full-bleed evening.jpg, "No rush. Just one more bite.", "A MOOD WORTH MAKING TIME FOR".
9. **Moments** (#moments, light surface) — gallery: "Slow afternoons" (table.jpg), "One more helping" (indian-table.jpg), "Evenings that linger" (evening.jpg). Controls: "SWIPE. SLOW DOWN. STAY A WHILE.", pagination dots, prev/next arrows. Lightbox dialog (dynamic): caption, directional swipe, arrows, close. Bottom: "GOOD FOOD IS A REASON. GOOD COMPANY IS THE OCCASION."
10. **Visit** (#visit, forest green) — "WE'LL SAVE YOU A SEAT", H2 "Let's make a little time.", "Plan your visit" → Zomato book ("Table reservations via Zomato"), and the info card: "FIND YOUR WAY TO RUA" — MapPin "Yelahanka, Bengaluru, Karnataka, India", Clock3 "Every day, 11:00 AM – 11:00 PM" ("Listed hours · confirm when booking"), "Get directions" → Google Maps, coordinates "13.1751° N / 77.5480° E".
11. **Mobile actions** — appears when hero passes the header: Menu (→ Zomato menu), Directions (→ maps), Find a table (→ Zomato book).
12. **Footer** — Rua logo + "YELAHANKA", "Come hungry. Leave a little happier.", BACK TO TOP; footer links "GOOD FOOD. GREAT COMPANY." (Our story / The menu ↗ / Find us); bottom bar: © 2026 Rua, Yelahanka · Made for moments that matter. · Sources & image credits.
13. **Extras** — /credits page (restaurant info from EazyDiner, photography credits, "no invented reviews/prices" disclosures) and a custom 404 ("This table is somewhere else.").
14. **Design system** (`src/app/globals.css`) — tokens: forest #183d32 / forest-dark #102d25, cream #f5f1e8, peach #edb58f, rust #ab4d2c, ink #203d32; Cormorant Garamond + DM Sans via Next Font; `.wrap` (max 1320px, 128px margins); buttons min-height 55px; keyframes rise-in / hero-zoom / rotate-stamp / nav-in; breakpoints at 1600 / 1100 / 760 / 480 px; prefers-reduced-motion support everywhere.
15. **Feature set** — responsive cinematic hero, sticky nav, keyboard-operable cuisine tabs, native-dialog gallery with swipe, scroll reveals, hover effects, reduced-motion-safe, header reading progress.

---

## 2. Raw data — `ruawebsite-brief.md`

# RUA — Restaurant Landing Page · Build Brief

> **Deliverable:** one self-contained `index.html` (CSS in `<style>`, JS in `<script>`).
> **Theme:** light, premium fine-dining. **Animation:** rich but intentional.
> This brief contains everything needed to build the page in a single pass — copy, palette, type, layout, animation spec, responsive rules, and acceptance criteria.

---

## 1. Objective

Build a landing page for **RUA**, a small fire-led fine-dining restaurant ("Ruawebsite" project name). Visitor goals in order:

1. Feel the premium atmosphere within 3 seconds (typography + motion carry it).
2. See signature dishes and the tasting menu with prices.
3. Book a table (reservation form) or find hours / address.

Tone of voice: quiet confidence, warm precision. Short sentences. No hype words ("delicious", "amazing", "best"). No emojis anywhere.

---

## 2. Hard constraints

- **Single file:** `index.html` only. All CSS in one `<style>` in `<head>`, all JS in one `<script>` at end of `<body>`.
- **Offline-safe:** no external images, no stock URLs, no hotlinked photos. All visuals are typography + CSS + inline SVG icons. Only external requests allowed: Google Fonts (with system-font fallback if offline).
- **Light theme only.** No dark-mode toggle.
- **Responsive:** must look deliberate at 1440px, 768px, and 390px. No horizontal scroll at any width. Long display words must not overflow small screens.
- **Accessible:** semantic landmarks (`header`, `main`, `section`, `footer`), one `h1`, logical heading order, visible `:focus-visible` states, `prefers-reduced-motion` support, form `<label>`s, color contrast per palette below.
- **No template tells:** no floating blurred navbar, no identical icon-card grid, no gradient text (`background-clip: text` is banned), no `border-left` stripe accents, no eyebrow label above every section, no `01 / 02 / 03` section numbering, no `border + wide soft shadow` combo on one element, no card radius above 16px.

---

## 3. Brand & art direction

**Mood sentence:** "Negroni hour on a Roman terrace — bitter campari red, late golden light spilling across white linen."

**Color strategy:** Restrained-with-commitment. Pure-white architectural surface so the campari red and burnt gold do all the emotional work. One drenched oxblood band (chef quote section) for depth and rhythm.

### 3.1 Palette (OKLCH — use exactly these variables)

```css
:root {
  --bg: oklch(1.0 0 0);               /* pure white page */
  --surface: oklch(0.975 0.008 20);   /* panel / alt section */
  --line: oklch(0.9 0.012 20);        /* hairline rules */
  --ink: oklch(0.24 0.025 20);        /* body text — near-black with red warmth */
  --muted: oklch(0.5 0.03 20);        /* secondary text */
  --primary: oklch(0.55 0.18 20);     /* campari red — CTAs, key accents */
  --primary-deep: oklch(0.38 0.13 15);/* oxblood — drenched quote band, footer text */
  --accent: oklch(0.7 0.14 80);       /* burnt gold — prices, rules, badges */
  --white: oklch(1.0 0 0);
}
```

Rules: body text uses `--ink` on `--bg` (≥7:1). Muted only for secondary text (≥3.5:1). White text on `--primary` fills and on `--primary-deep` fills. Dark `--ink` text on `--accent` fills. Primary chroma stays ≤ 0.23.

### 3.2 Typography (Google Fonts CDN)

- **Display:** `Marcellus` (400 only) — Roman-inscriptional, quiet luxury. H1, H2, dish names, big quote. `letter-spacing: -0.02em`, `text-wrap: balance`, hero via `clamp(3rem, 8vw, 6rem)` (max 96px).
- **Body/UI:** `Jost` (300, 400, 500) — geometric, light, precise. Body 16–18px, `line-height: 1.7`, max measure 65ch. Nav, buttons, labels, form.
- **Accent script (sparingly):** `Italianno` (400) — one handwritten word per section max (e.g. "tonight", "from the fire"). Never body copy.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500&family=Italianno&display=swap" rel="stylesheet">
```

Fallback stacks: `Marcellus, "Times New Roman", serif` · `Jost, "Avenir Next", "Segoe UI", sans-serif`.

### 3.3 Signature devices (what makes it memorable)

1. **Curtain-lift preloader** with counting percent and monogram, then a masked line-by-line hero reveal.
2. **Rotating circular badge** ("WOOD FIRE · SEASONAL · RUA ·") beside the hero, pure CSS rotation.
3. **One drenched oxblood band** (chef quote) interrupting the white page — the single bold color moment.
4. **Tasting-menu tabs** with sliding indicator and crossfading panels.

---

## 4. Copy deck (use verbatim — premium text)

- **Brand:** RUA · sub-line "Cucina del Fuoco" (use under logo in footer/hero meta only).
- **Nav:** Story · Signatures · Menu · Visit + CTA button "Reserve".
- **Hero script word:** "dal fuoco" (small Italianno, gold, above H1).
- **H1 (three masked lines):** `Fire-led cooking,` / `served quietly.` / (third line optional seasonal: `Autumn menu now.`)
- **Hero sub:** "Seven courses from a single oak fire. Twelve seats, one seating rhythm, no noise — just season and smoke."
- **Hero CTAs:** primary "Reserve a table" (→ `#reserve`), ghost "View the menu" (→ `#menu`).
- **Hero meta row:** "Tue – Sun · 18:00 – 23:00" · "Via delle Braci 12, Roma" · "★ 4.9 — 800+ guests".
- **Marquee (repeat):** "Wood fire — Seasonal tasting — Twelve seats — Natural wines — " (separated by ✳ asterisk glyph, not emoji).
- **Story heading:** "A small room around a single fire." / Body: "RUA began with a wood oven and a stubborn idea: that a menu should read like a walk through the market that morning. We cook over oak, plate on linen-white ceramic, and change the menu when the season tells us to. Nothing performs. Everything is meant." / Stats: "12 — seats nightly", "07 — courses", "01 — oak fire".
- **Signatures heading:** "Signatures" + script "tonight" / sub: "Three plates that never leave the menu — everything else follows the market."
  - Dish A: "Cacio e brace" — "Hand-torn tonnarelli, smoked pecorino, cracked pepper, oak-fire butter." — €24.
  - Dish B: "Orata sul fuoco" — "Sea bream over embers, charred lemon, wild fennel, cold-pressed olive oil." — €32.
  - Dish C: "Fico e fumo" — "Roasted figs, smoked honey, bay-leaf gelato, almond crumble." — €14.
- **Menu heading:** "The tasting menu" + script "sette portate" / sub: "Seven courses, one fire. Wine pairing optional."
  - Tabs: Dinner (7 courses — €85 / +€45 pairing) · Lunch (4 courses — €48) · Dessert (3 acts — €22).
  - Dinner items: Sourdough & smoked butter — 8 · Charred leeks, hazelnut — 14 · Tonnarelli, cacio e brace — 24 · Sea bream, fennel — 32 · Oak-aged ribeye, bone marrow — 46 · Figs, smoked honey — 14 · Bay-leaf gelato — 9.
  - Lunch items: Pick any four dinner plates — 48 (list 4 abbreviated rows).
  - Dessert items: Fico e fumo — 14 · Bay-leaf gelato — 9 · Bitter chocolate, campari caramel — 12.
  - Note under menu: "Menus change with the market. Tell us about allergies — the fire adapts."
- **Quote band:** "“We don't decorate plates. We remove until only the season is left.”" — Elena Ruaro, chef & founder.
- **Visit heading:** "Find us, book us." / Address: Via delle Braci 12, 00153 Roma / Hours: Tue–Sun 18:00–23:00, closed Mondays / Contact: ciao@rua-roma.it · +39 06 000 0000.
- **Form:** name, email, date, time select (18:00/19:30/21:00), guests select (1–6; note "7+ call us"), button "Request table". Success message: "Grazie — request received. We confirm within two hours."
- **Footer:** giant wordmark "RUA", columns (Visit / Hours / Follow: Instagram, TikTok), bottom line "© 2026 RUA Roma · Privacy · Cookies", "Back to top ↑".

---

## 5. Section build order (IDs for nav)

1. **Preloader** `#loader` — fixed overlay, brand `R.` monogram + `%` counter, lifts as curtain on `window load` (max 1.6s fallback).
2. **Header** — fixed, transparent → white with hairline border after 24px scroll. Left: `RUA` wordmark (Marcellus, letterspaced). Center links (desktop). Right: Reserve button. Mobile: hamburger → full-screen drawer.
3. **Hero** `#top` — full viewport (`min-height: 100svh`), asymmetric: left-aligned display type occupying ~7 cols, right side rotating badge + reservation card mini-panel (date/guests quick-pick linking to form). Background: white with one large soft radial gold glow + one thin arch outline (CSS) framing the right side. Scroll cue at bottom ("scroll" + animated line).
4. **Marquee strip** — campari-red band, white Marcellus text scrolling infinitely (CSS keyframes, duplicated content, `aria-hidden` on copy).
5. **Story** `#story` — two columns (text + stats panel on `--surface` with gold numerals). Hairline top rule. Reveal on scroll.
6. **Signatures** `#signatures` — three editorial rows (not identical cards): each row = name (Marcellus 2rem) + description + dotted leader + price (gold). Hover: name slides 6px, price turns red. Dividers are hairlines. Stagger reveal.
7. **Menu** `#menu` — tabs (Dinner/Lunch/Dessert) with sliding pill indicator; panels crossfade/slide; each item row = name + dotted leader + price. Footnote + pairing callout box.
8. **Quote band** — drenched `--primary-deep` background, white Marcellus quote, gold attribution. Subtle grain via repeating radial? Keep flat + one large decorative quotation glyph. Parallax-free (transform on scroll is enough).
9. **Visit + Reserve** `#visit` / `#reserve` — split: left info (address/hours/contact stacked with SVG icons), right form card (surface bg, 12px radius, single 8px shadow OR border — never both). Floating labels or top labels; focus ring gold.
10. **Footer** — white, giant outlined "RUA" wordmark (text-stroke ink at low opacity), columns, bottom bar. Back-to-top button.

---

## 6. Animation spec (the "great animation" — implement all)

Easing token: `--ease: cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). Durations: micro 200ms, reveal 900ms, hero 1100ms, curtain 800ms.

1. **Preloader:** counter 0→100 over ~1s; then overlay `translateY(-100%)` with `var(--ease)` 800ms; hero timeline starts on curtain start. Failsafe: force-hide after 2.5s regardless.
2. **Hero entrance (choreographed, runs once):** masked lines — each `.line > span` from `translateY(110%)` → 0, 1100ms expo, stagger 120ms; sub + CTAs fade-rise (24px, 800ms, delay 400ms); badge scales in with 600ms; meta row fades last. Implement with CSS classes added by JS on load (`body.loaded`), transitions only — content visible by default if JS fails.
3. **Rotating badge:** circular SVG text on 140px circle, `animation: spin 18s linear infinite`.
4. **Marquee:** `translateX(0 → -50%)`, 22s linear infinite; pause on hover.
5. **Scroll reveals:** `IntersectionObserver` adds `.in` to `[data-reveal]`; default state is fully visible — the pre-`.in` hidden state is applied via JS only (`js-reveal` class on `<html>`), so no-JS/no-observer still shows content. Hidden state: `opacity 0, translateY(28px), blur(6px)` → visible 900ms expo. Stagger children via inline `--d` custom property delays.
6. **Header behavior:** add `.scrolled` past 24px (bg + border). Hide on scroll down beyond 400px, show on scroll up (transform, 300ms).
7. **Menu tabs:** indicator slides via `transform: translateX` measured from active button; panels: outgoing `opacity 0, translateY(12px)` 200ms, incoming reversed. Update `aria-selected`, keyboard arrows optional but nice.
8. **Buttons:** primary red pill (radius 999px allowed for buttons), hover darkens to oxblood + `translateY(-2px)` + shadow ≤8px blur; ghost button hairline border, hover fills ink with white text. Magnetic effect on hero CTA only (±6px toward cursor, desktop pointer only).
9. **Dish/menu rows:** hover translate + color shift (200ms); price underline draws (scaleX) on hover.
10. **Form:** on submit `preventDefault`, validate natively (`required`), then morph button to "Sending…" → success panel swap with check SVG draw animation.
11. **Back-to-top + smooth scroll:** `scroll-behavior: smooth` (respect reduced motion), back-to-top appears after 600px.
12. **Reduced motion:** `@media (prefers-reduced-motion: reduce)` — kill marquee/spin/magnetic/parallax; reveals become instant opacity crossfade ≤200ms; preloader hides immediately.

---

## 7. Components & states

- **Buttons:** `.btn-primary` (red fill, white text), `.btn-ghost` (1px ink border). Focus-visible: 2px gold outline offset 3px. Disabled: 50% opacity.
- **Nav drawer (mobile ≤860px):** full-screen white overlay, big Marcellus links stagger in, close on link click / Escape.
- **Tabs:** `role="tablist"`, buttons `role="tab"`, panels `role="tabpanel"`.
- **Form fields:** `<label>` per input, `input[type=date]` min = today (set via JS), selects for time/guests, `required` on all. Error: native bubbles + red border via `:invalid`.
- **Z-index scale:** header 50 · drawer 60 · loader 100 · success toast (if any) 70. No 9999.

---

## 8. Responsive spec

- **≥1024px:** hero two-column (type 7fr / side panel 5fr); story two-column; visit split 5/7; signatures full-width rows.
- **661–1023px:** hero stacks (badge inline, smaller), story stacks, visit stacks with form first? No — info first, form second.
- **≤660px:** single column everywhere; H1 `clamp(2.6rem, 13vw, 4rem)`; nav links hidden behind hamburger; marquee slower (30s); stats panel becomes 3-row list; form fields full width; footer wordmark scales with `vw`.
- Grid technique: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for stats/info clusters. No breakpoint should cause overlap or horizontal scroll.

---

## 9. Technical skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RUA — Cucina del Fuoco · Roma</title>
  <meta name="description" content="RUA Roma — seven fire-led courses, twelve seats, one oak fire. Reserve a table.">
  <!-- fonts (see §3.2) -->
  <style> /* tokens, reset, header, hero, sections, animations, responsive, reduced-motion */ </style>
</head>
<body>
  <div id="loader">…</div>
  <header id="site-header">…</header>
  <nav id="drawer">…</nav> <!-- mobile -->
  <main id="top">
    <section class="hero">…</section>
    <div class="marquee">…</div>
    <section id="story">…</section>
    <section id="signatures">…</section>
    <section id="menu">…</section>
    <section class="quote">…</section>
    <section id="visit">… + <form id="reserve">…</form></section>
  </main>
  <footer>…</footer>
  <script> /* loader, header, IO reveals, tabs, drawer, form, back-to-top, magnetic */ </script>
</body>
</html>
```

JS must be vanilla, ~150 lines max, no libraries required. All queries guarded (null-checks). Use `defer`-equivalent placement at body end.

---

## 10. Acceptance checklist (verify before calling it done)

- [ ] One file only; opens via double-click with no build step; fonts degrade gracefully offline.
- [ ] Preloader lifts ≤2.5s; hero lines rise with masks; badge rotates; marquee loops seamlessly.
- [ ] Every section reveals on scroll with stagger; returns pass with `prefers-reduced-motion` (no trapped invisible content).
- [ ] Tabs switch panels with indicator slide; drawer opens/closes; form validates and shows success; back-to-top works.
- [ ] 390px wide: no horizontal scroll, no overflowing headline, tappable targets ≥44px.
- [ ] Contrast: body ink-on-white, white-on-red button, white-on-oxblood quote all pass; focus rings visible.
- [ ] No emojis, no lorem ipsum, no external images, no console errors.

---

*Build it with conviction: white linen, campari red, burnt gold — and motion that feels like a curtain rising, not confetti.*

---

## 3. Extracted restaurant data

### 3.1 Rua — live site (Rua, Yelahanka, Bengaluru; `src/lib/restaurant.ts`)

- Name: **Rua**
- Locality: Yelahanka · City: Bengaluru
- Hours: 11:00 AM – 11:00 PM (daily listed hours)
- Coordinates: 13.1751274° N / 77.5480449° E
- Cuisine: North Indian — vegetarian and non-vegetarian
- Menu URL: https://www.zomato.com/bangalore/rua-yelahanka-bangalore/menu
- Booking URL: https://www.zomato.com/bangalore/rua-yelahanka-bangalore/book
- EazyDiner listing: https://www.eazydiner.com/bengaluru/rua-yelahanka-bangalore-718335
- Directions: https://www.google.com/maps/dir/?api=1&destination=13.1751274,77.5480449
- Footer: © 2026 Rua, Yelahanka
- Footer nav: Our story / The menu (Zomato) / Find us
- Footer tagline: "Made for moments that matter."
- CTA copy (hero): "Find your table", "A taste of Rua"; Visit section: "WE'LL SAVE YOU A SEAT", "Plan your visit", note "Table reservations via Zomato"; Visit card: "FIND YOUR WAY TO RUA", "A little closer to a good time.", "Listed hours · confirm when booking", "Get directions"
- Ribbon words: "NORTH INDIAN SOUL", "A TABLE FOR EVERY STORY", "YELAHANKA, WITH LOVE", "MAKE YOURSELF AT HOME"
- Hero: "Good food." / "Great company." / "Some places feed you. Some places make you feel at home."

### 3.2 Rua — the design-brief restaurant (RUA, Cucina del Fuoco, Roma)

- Brand: **RUA** · sub-line: Cucina del Fuoco
- Address: Via delle Braci 12, 00153 Roma
- Hours: Tue–Sun 18:00–23:00, closed Mondays (confirm when booking)
- Rating: ★ 4.9 — 800+ guests
- Chef & founder: Elena Ruaro
- Stats: 12 seats nightly · 07 courses · 01 oak fire
- Contact: ciao@rua-roma.it · +39 06 000 0000
- Hero meta row: "Tue – Sun · 18:00 – 23:00" · "Via delle Braci 12, Roma" · "★ 4.9 — 800+ guests"
- Story body: "RUA began with a wood oven and a stubborn idea: that a menu should read like a walk through the market that morning. We cook over oak, plate on linen-white ceramic, and change the menu when the season tells us to. Nothing performs. Everything is meant."
- Quote: "We don't decorate plates. We remove until only the season is left." — Elena Ruaro
- Footer: giant wordmark "RUA", columns (Visit / Hours / Follow: Instagram, TikTok), bottom line "© 2026 RUA Roma · Privacy · Cookies", "Back to top ↑"
- Marble marquee: "Wood fire — Seasonal tasting — Twelve seats — Natural wines — "

### 3.3 Food plan details — tasting menu & dishes (from the brief)

- **Tasting menu — dinner:** 7 courses — €85 (+€45 wine pairing)
- **Tasting menu — lunch:** 4 courses — €48
- **Tasting menu — dessert:** 3 acts — €22
- **Menu note:** "Menus change with the market. Tell us about allergies — the fire adapts."
- **Signature dishes:**
  - Cacio e brace — "Hand-torn tonnarelli, smoked pecorino, cracked pepper, oak-fire butter." — €24
  - Orata sul fuoco — "Sea bream over embers, charred lemon, wild fennel, cold-pressed olive oil." — €32
  - Fico e fumo — "Roasted figs, smoked honey, bay-leaf gelato, almond crumble." — €14
- **Dinner items:** Sourdough & smoked butter — 8 · Charred leeks, hazelnut — 14 · Tonnarelli, cacio e brace — 24 · Sea bream, fennel — 32 · Oak-aged ribeye, bone marrow — 46 · Figs, smoked honey — 14 · Bay-leaf gelato — 9
- **Lunch items:** pick any four dinner plates — 48
- **Dessert items:** Fico e fumo — 14 · Bay-leaf gelato — 9 · Bitter chocolate, campari caramel — 12

### 3.4 Cuisine inspiration (live site — editorial cards, prices not asserted)

- **Comfort, by the spoonful.** (RICH & SOULFUL) — "The warmth of Indian spices. The richness of a good curry. A little comfort in every bite." — veg — `/images/curry.jpg`
- **A little fire. A lot of flavour.** (BOLD & BEAUTIFULLY SPICED) — "For the love of bold spices, smoky notes, and that irresistible first bite." — non-veg — `/images/tandoor.jpg`
- **Better when shared.** (THE INDIAN TABLE) — "Warm breads, colourful curries, and a table with room for one more. This is our kind of spread." — veg — `/images/indian-table.jpg`

### 3.5 Design system & visual language (live site)

- **Palette:** forest #183d32, forest-dark #102d25, cream #f5f1e8 (surfaces), peach #edb58f (selection, accents), rust #ab4d2c, ink #203d32, muted #6b746b
- **Typography:** Cormorant Garamond (serif — H1/H2/displays), DM Sans (sans — body/UI); Next Font
- **Layout:** `.wrap` max 1320px, 128px margins, grid-aligned; `.section-space` 120px padding-block; buttons min-height 55px
- **Keyframes:** rise-in, hero-zoom, rotate-stamp, nav-in
- **Breakpoints:** 1600px / 1100px / 760px / 480px; reduced-motion kills all ambient motion

### 3.6 Feature set (live site)

- Responsive cinematic hero (art-directed desktop/mobile images)
- Sticky navigation with reading progress bar
- Accessible mobile menu + drawer with focus management
- Keyboard-operable cuisine filter tabs
- Native-dialog image gallery with touch swipes, pagination, arrows, Escape-to-close
- Scroll reveals (IntersectionObserver)
- Hover effects on stories, dishes, gallery
- Ambient motion ribbon with pause
- Preloader splash (first visit)
- Reduced-motion support
- SEO metadata, OG/Twitter cards, /credits page, custom 404

---

## 4. Supporting repo files

- `RESEARCH.md` — research sources: EazyDiner listing (accessed 17 Sep 2026 — Rua, Yelahanka, North Bengaluru, North Indian, veg+non-veg, hours 11:00–23:00, map destination 13.1751274,77.5480449, approximate spend for two ~₹1,200); Zomato menu/book/listing URLs; DuckDuckGo search; photography credits (hero.jpg, hero-mobile.jpg, table.jpg, evening.jpg, curry.jpg, tandoor.jpg, indian-table.jpg — the last from the EazyDiner CDN, "not independently authenticated").
- `CONTENT-GAPS.md` — gap audit: missing real street address/phone/email, real menu items & prices, social links, map pin confirmation, privacy/terms, etc. (deliberate: the site does not invent facts — see `RESEARCH.md`, `src/app/credits/page.tsx`, and the ambiguity note about `ruabeachcafe`).
- `README.md` — project readme (install, features, checks).
- `tests/` — Playwright specs: experience, mobile-motion, welcome.
- `public/images/` — hero.jpg, hero-mobile.jpg, table.jpg, evening.jpg, curry.jpg, tandoor.jpg, indian-table.jpg, logo.png, logo-solid.png, emblem.png, rua-emblem.svg, favicon.ico, etc. (all illustrative; see RESEARCH.md/CONTENT-GAPS.md).
- `scripts/performance.mjs` — mobile loading lab script (390×844, DPR 3, 1.6 Mbps, 150 ms latency).

---

*Data extracted 2026-11-21 from the live site (localhost:3001) and `ruawebsite-brief.md` in the repo.*
