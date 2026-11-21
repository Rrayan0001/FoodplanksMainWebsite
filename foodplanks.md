# Food Planks — Data Pack

Data pack for rebuilding the **Rua (Yelahanka)** website design for a different restaurant: **Food Planks, Yelahanka New Town, Bengaluru**.
Compiled 2026-11-21 from public listings (sources in section 9). Same structure as the Rua data pack.

---

## 0. Instructions for the build agent (read first)

1. **Carry over the Rua design and component structure unchanged** (section 1). Replace *all content* with the Food Planks data below.
2. **Do not reuse any Rua facts, copy, coordinates, links or images.** Rua and Food Planks are different restaurants about 10 km apart. Do not use `hero.jpg`, `curry.jpg`, `tandoor.jpg`, `indian-table.jpg`, `table.jpg`, `evening.jpg`, or the Rua logo/emblem/doodle for Food Planks.
3. **Do not use the Roman "RUA — Cucina del Fuoco" design brief at all.** It is a fictional brief. Its copy, prices (€), chef, rating and palette (white/campari red) do not apply.
4. **Do not invent anything.** No dish names beyond section 4, no prices, no ratings, no reviews, no awards, no founding year, no owner/chef names. Same rule the Rua site follows ("no invented reviews/prices").
5. **Anything marked `TODO-OWNER`** is unknown. Render a graceful fallback (given in each case) or hide the element. Never fill it with a guess. Keep all such values in one config file (equivalent of `src/lib/restaurant.ts`) so the owner can fix them in one place.
6. Brand name is exactly **Food Planks** (two words, plural "Planks").

---

## 1. Design carry-over (from the live Rua site; unchanged)

- Stack: Next.js App Router. Fonts: Cormorant Garamond (display) + DM Sans (body) via Next Font.
- Tokens: forest `#183d32`, forest-dark `#102d25`, cream `#f5f1e8`, peach `#edb58f`, rust `#ab4d2c`, ink `#203d32`, muted `#6b746b`.
- Layout: `.wrap` max 1320px, 128px margins; `.section-space` 120px; buttons min-height 55px.
- Keyframes: rise-in, hero-zoom, rotate-stamp, nav-in. Breakpoints 1600 / 1100 / 760 / 480. `prefers-reduced-motion` respected everywhere.
- Page structure (keep all 13 blocks): skip link, welcome splash (sessionStorage key must be renamed, e.g. `foodplanks-welcome-seen`), sticky header with reading progress, hero, motion ribbon, story, flavours tabs, interlude, moments gallery with lightbox, visit, mobile action bar, footer, `/credits`, custom 404.
- Splash doodle, stamp doodle and logo are Rua artwork. **Replace** with a text wordmark "Food Planks" in Cormorant Garamond until the owner supplies a logo (`TODO-OWNER: logo`). Keep the splash and stamp animation, using the wordmark or a simple neutral shape.

---

## 2. Restaurant facts (config values)

| Field | Value | Source / confidence |
|---|---|---|
| Name | Food Planks (listed on JustDial as "Food Planks Taste Of The Town") | all sources |
| Locality / city | Yelahanka New Town (Allalasandra Main Road), Bengaluru, Karnataka | all sources |
| Street address | 60, Allalasandra Main Road, Ambedkar Colony, Yelahanka New Town, Bengaluru (opposite Royal Orchid Resort) | EazyDiner, Facebook. High |
| Pincode | **Conflict**: 560065 (Facebook) vs 560064 (JustDial). Do not display a pincode until confirmed. | `TODO-OWNER` |
| Coordinates | 13.0877931° N, 77.5903605° E | EazyDiner map. Medium (confirm pin) |
| Directions URL | `https://www.google.com/maps/dir/?api=1&destination=13.0877931,77.5903605` | derived |
| Phone (primary) | +91 99011 58899 (`tel:+919901158899`) | Zomato, X post |
| Phone (secondary) | +91 99011 78899 (`tel:+919901178899`) | Facebook, JustDial data |
| Email | foodplanks@gmail.com | Facebook page (page looks stale, "Opening soon", 0 reviews). Low, confirm |
| Website (existing) | foodplanks.com | named on Facebook; **not opened or verified** |
| Facebook | https://www.facebook.com/Foodplanksblr/ | found in search |
| X (Twitter) | https://x.com/FoodPlanksOffl | found in search |
| Instagram | not found | `TODO-OWNER` |
| Cuisine | North Indian, Continental, Chinese, Salad, Seafood, Fast Food, Biryani, Beverages | EazyDiner, Zomato. High |
| Veg / non-veg | Both served | EazyDiner. High |
| Amenities | Alcohol served; smoking area; outdoor seating; valet parking; kids allowed; parking available; no buffet; no live music | EazyDiner. Medium |
| Extra (single source) | Hut-style / wooden-themed decor; string lights, floral arrangements, murals; indoor + outdoor seating; playground area; private events and birthday parties | tribe.best profile (self-authored) and one review. Medium-low, owner to confirm |
| Signature items (single source) | tandoori chicken, kebabs, chicken wings | tribe.best only. **Do not present as menu items**; use only as owner-approved "known for" text |

### 2.1 Conflicts the owner must settle (with the build default)

| Item | What sources say | Build default until resolved |
|---|---|---|
| Opening hours | EazyDiner: daily 12:00 PM – 11:59 PM. Zomato: 11:30 AM – 11:30 PM. JustDial: closing shown as 10:30–11:00 PM. | Show "Open daily · confirm hours when calling or booking". No times. |
| Cost for two | EazyDiner ₹2,000; Zomato ₹1,250; JustDial ₹1,250–1,300 | Do not display a price anywhere. |
| Rating | EazyDiner/Google 4.4 (~2K ratings); JustDial ~4.2–4.3 | Do not display, unless the owner approves a single sourced figure. |
| Pincode | 560065 vs 560064 | Omit. |

---

## 3. Links and CTAs

| Purpose | URL | Note |
|---|---|---|
| Menu | https://www.zomato.com/bangalore/food-planks-1-sahakara-nagar-bangalore/menu | Zomato menu page (found in search) |
| Zomato listing | https://www.zomato.com/bangalore/food-planks-1-sahakara-nagar-bangalore | |
| EazyDiner listing | https://www.eazydiner.com/bengaluru/food-planks-sahakara-nagar-north-bengaluru-691095 | has "Book Now" |
| EazyDiner menu (images only) | https://www.eazydiner.com/bengaluru/food-planks-sahakara-nagar-north-bengaluru-691095/menu | |
| Booking | **No Zomato booking URL found.** Use `tel:+919901158899` as the primary "table" CTA; EazyDiner listing as secondary only if the owner agrees. | `TODO-OWNER` |
| Directions | see section 2 | |

CTA mapping from Rua: "A table for you / Find your table / Find a table" → call or EazyDiner. "Explore the full menu" → Zomato menu. Mobile action bar: Menu, Directions, Call.

---

## 4. Content map: section by section

All copy below is **draft** built only from the facts above. Owner approves before launch. Tone: warm, short sentences, like Rua. Avoid hype words.

1. **Skip link** — unchanged.
2. **Welcome splash** — wordmark "Food Planks", sub "YELAHANKA", tagline "Gather round. Stay a while.", loader "SETTING YOUR TABLE".
3. **Header** — brand "Food Planks" + "YELAHANKA". Nav: Our story → #story, The flavours → #flavours, The moments → #moments, Find us → #visit. Right CTA: "A table for you" → call/booking. Mobile drawer eyebrow "MAKE YOURSELF AT HOME"; note "Yelahanka New Town, Bengaluru".
4. **Hero** — eyebrow "A WOODEN-THEMED ESCAPE IN YELAHANKA". H1 "Gather round." / "Stay a while." Sub: "A cosy, wood-and-lights restaurant with a menu for the whole table." CTAs "Find your table", "A taste of Food Planks". Scroll cue "GOOD THINGS AWAIT". Footer row "YELAHANKA NEW TOWN, BENGALURU — 13.0878° N · 77.5904° E". Stamp text "FAMILY · FRIENDS · FOOD ·". Hero image: `TODO-OWNER` (fallback: forest-green solid with grain, or the licensed EazyDiner placeholder in section 6).
5. **Motion ribbon** — "MULTI-CUISINE TABLE", "INDOOR & OUTDOOR SEATING", "YELAHANKA NEW TOWN", "FAMILIES WELCOME".
6. **Story (#story)** — eyebrow "THE FOOD PLANKS FEELING". H2 "Wood, warmth and room for everyone." Para 1: "Food Planks is a wooden-themed restaurant in Yelahanka New Town, with string lights, flowers and murals, and seats both indoors and out." Para 2: "The menu moves between North Indian, Continental and Chinese, with seafood, biryani and salads too. Come with family, friends or a crowd; celebrations are welcome." (celebrations = owner-confirm). Link "Meet us at Food Planks" → #visit.
7. **Flavours (#flavours)** — *Recommended change:* Rua's tabs were Whole table / Vegetarian / Non-vegetarian with a veg/non-veg dot per card. Food Planks facts do not support per-card veg/non-veg claims. Use cuisine tabs instead: "The whole table" / "North Indian" / "Continental & Chinese". Three editorial cards, **no dishes, no prices**:
   - "North Indian, the heart of it." — "Warm spices, rich gravies and breads for sharing."
   - "Continental & Chinese, for variety." — "Something different for every plate on the table."
   - "Seafood, biryani and more." — "A long menu, so everyone finds something."
   Footer: "A little cuisine inspiration. Discover current dishes and prices in the full menu." + "Explore the full menu" → Zomato menu. Card images `TODO-OWNER`.
8. **Interlude** — "Room for one more plate." / "A MOOD WORTH MAKING TIME FOR". Image `TODO-OWNER` (evening/ambience photo).
9. **Moments (#moments)** — captions: "Under the lights", "Indoors or out", "Celebrations, big and small". Three photos `TODO-OWNER` (decor, outdoor seating, group/party). Controls and lightbox unchanged. Bottom line "GOOD FOOD IS A REASON. GOOD COMPANY IS THE OCCASION."
10. **Visit (#visit)** — "WE'LL SAVE YOU A SEAT", H2 "Let's make a little time.", button "Plan your visit" → call/booking. Info card "FIND YOUR WAY": MapPin "60, Allalasandra Main Road, Ambedkar Colony, Yelahanka New Town, Bengaluru"; Clock "Open daily · confirm hours when booking"; Phone (both numbers); "Get directions" → section 2 URL; coordinates "13.0878° N / 77.5904° E". Optional amenity row (owner chooses which to show): Outdoor seating · Parking · Kids welcome. Smoking area and alcohol: show only if owner wants (family-oriented positioning).
11. **Mobile actions** — Menu (→ Zomato menu), Directions, Call.
12. **Footer** — wordmark, "Come hungry. Leave a little happier." (generic, reusable), links Our story / The menu ↗ / Find us. Bottom bar: © 2026 Food Planks, Yelahanka · Sources & image credits. Social links: Facebook, X only.
13. **/credits** — restaurant info compiled from EazyDiner, Zomato, JustDial, tribe.best and the restaurant's Facebook/X pages (accessed 2026-11-21). State plainly: no invented reviews or prices; photos are placeholders pending owner-supplied images. **/404** — "This table is somewhere else."

SEO: title "Food Planks — Multi-cuisine restaurant in Yelahanka New Town, Bengaluru". Description: "Wooden-themed, family-friendly multi-cuisine restaurant in Yelahanka New Town. North Indian, Continental, Chinese, seafood and more." No structured-data rating or price range until resolved.

---

## 5. Cuisine facts allowed in copy

North Indian · Continental · Chinese · Salad · Seafood · Fast food · Biryani · Beverages. Veg and non-veg. That is the whole verified list. Dishes mentioned by reviewers (paneer tikka, mushroom pizza, cold coffee, tomato basil soup, crispy corn) are **not** verified menu items. Do not use them in copy.

---

## 6. Image inventory

| Slot | Status |
|---|---|
| hero.jpg / hero-mobile.jpg | `TODO-OWNER` |
| story photos (2) | `TODO-OWNER` |
| flavour card images (3) | `TODO-OWNER` |
| interlude | `TODO-OWNER` |
| gallery (3) | `TODO-OWNER` |
| logo / emblem | `TODO-OWNER` |
| og-image | `TODO-OWNER` |

Placeholder-only candidates (EazyDiner CDN; **reuse rights unverified**, credit "via EazyDiner, not independently authenticated", as the Rua credits page does):
- https://dt4l9bx31tioh.cloudfront.net/eazymedia/restaurant/691095/restaurant020231009060526.jpg
- https://dt4l9bx31tioh.cloudfront.net/eazymedia/restaurant/691095/restaurant120231009060526.jpg
- https://dt4l9bx31tioh.cloudfront.net/eazymedia/restaurant/691095/restaurant220231009060526.jpg

---

## 7. Content gaps (equivalent of CONTENT-GAPS.md)

Owner must supply: confirmed hours · confirmed pincode and map pin · actual menu items and prices (EazyDiner publishes the menu only as images, 19 food pages + 1 beverage page; text was not extractable) · photos and logo · Instagram handle · booking method · confirmation of the single-source claims (wooden theme details, playground, private events, signature items) · verified email · privacy/terms text · whether to show alcohol and smoking-area info.

---

## 8. Features to carry over unchanged

Responsive cinematic hero · sticky nav with reading progress · accessible mobile drawer with focus management · keyboard-operable tabs · native-dialog gallery with swipe, pagination, arrows, Escape · IntersectionObserver reveals · motion ribbon with pause · welcome splash (first visit) · reduced-motion support · SEO metadata, OG/Twitter cards · Playwright specs (update strings and selectors to Food Planks copy).

---

## 9. Sources (accessed 2026-11-21)

- EazyDiner overview, menu and reviews: https://www.eazydiner.com/bengaluru/food-planks-sahakara-nagar-north-bengaluru-691095
- Zomato listing and menu: https://www.zomato.com/bangalore/food-planks-1-sahakara-nagar-bangalore
- JustDial listings (older pages, dated): Food Planks Taste Of The Town, Yelahanka
- tribe.best profile: https://tribe.best/p/food-planks/themed-restaurant-experience
- Facebook: https://www.facebook.com/Foodplanksblr/ · X: https://x.com/FoodPlanksOffl
- Not opened or verified: foodplanks.com, Instagram, Google Maps listing.