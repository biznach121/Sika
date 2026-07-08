# AGENTS.md — Services / spa / wellness storefront template

If you are an AI agent (Claude, Cursor, Aider, devin, …) working on this storefront, **start here.**

## TL;DR for rebranding

1. **Edit `lib/brand.ts`** — every visible string lives here.
2. **Edit `app/globals.css`** — `@theme { … }` for palette + radius.
3. **Edit `.env.local`** — set `NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY` (the only required var).
## Aesthetic

- **Fraunces serif + Inter** — warm, slightly editorial headings.
- **Sand + sage palette** — warm cream background, deep sage primary.
- **Generous radius**: `1rem` — calm, soft.
- Lower-contrast than retail / fashion.
- Schema.org `@type` is `BeautySalon`.

## Page surface

```
app/
  page.tsx                       Home — hero ("Now booking"), service strips,
                                  category grid, newsletter
  shop/page.tsx                  Treatment menu (SDK <CataloguePage/>)
  search/page.tsx                Search
  collections/[slug]/page.tsx    Collection landing
  categories/[slug]/page.tsx     Category landing (e.g. memberships, packages)

  book/page.tsx                  ⭐ Services-specific: full booking widget
                                  (treatment + 14-day date + 30-min slot grid)
                                  → adds to cart with slot as note → /checkout

  cart/page.tsx, checkout/page.tsx, orders/[id]/page.tsx

  account/page.tsx               <AccountDashboardPage /> (native, Server Component)
  account/orders/page.tsx        <AccountOrdersPage /> (native)
  login/page.tsx, signup/page.tsx  redirects → /account

  contact/page.tsx, track-order/page.tsx (find a booking)

  about/page.tsx, faq/page.tsx
  shipping/page.tsx (what to expect at the studio), returns/page.tsx (cancellations),
  accessibility/page.tsx, terms/page.tsx, privacy/page.tsx

  sitemap-page/page.tsx, sitemap.ts, robots.ts, llms.txt/route.ts, opensearch.xml/route.ts
  error.tsx, not-found.tsx
```

## File ↔ brand-field map

| File | Reads from `brand` |
|---|---|
| `app/layout.tsx` | identity, contact, socials, BeautySalon JSON-LD |
| `app/page.tsx` | `brand.hero` ("Now booking") |
| `app/about/page.tsx` | `brand.about` |
| `app/faq/page.tsx` | `brand.faq` (booking, contraindications, memberships) |
| `app/shipping/page.tsx` | `brand.shipping` (what to expect at the studio) |
| `app/returns/page.tsx` | `brand.returns` (cancellation policy) |
| `app/accessibility/page.tsx` | `brand.accessibility` |
| `app/terms/page.tsx`, `app/privacy/page.tsx` | `brand.terms`, `brand.privacy` |
| `app/contact/page.tsx` | `brand.contactPage`, `brand.contact` |
| `app/track-order/page.tsx` | `brand.trackOrder` ("find a booking") |
| `app/account/*/page.tsx` | `brand.account` (SDK account pages render the UI) |
| `app/book/*` | derives bookable services from product list (`type: "service"`) |
| `app/llms.txt/route.ts` | `brand.llms`, contact, currency |
| `components/header.tsx`, `footer.tsx` | `brand.header`, `brand.footer`, `brand.contact`, `brand.socials` |

## Services-specific notes

- **Bookable services are `type: "service"` products.** The `/book` page filters the product list to type=service and treats them as treatments. Their `duration_minutes` is shown on the chip.
- Cart-item notes carry the booked time slot — checkout sends them through Cimplify's order pipeline. The merchant's downstream system reads the note to schedule the appointment.
- Mock seed: `--seed services` (Serene Spa).

## Known TODOs

- `/book` widget shows every slot as available. For production, wire `useAvailableSlots({ serviceId, date })` from `@cimplify/sdk/react` to filter to genuinely-free windows.
- Contact + newsletter fake submits.

## Customizing SDK components

For anything beyond `lib/brand.ts` + `app/globals.css`, lean on the SDK's prebuilt components rather than reinvent. **Especially for service scheduling, booking widgets, and add-on selectors** — the SDK already gets price math, slot matching, and cart payload contracts right. Default to ejecting and restyling:

```bash
cimplify add cart-drawer
cimplify add product-page
cimplify add booking-card
```

Then edit the local copy. **Don't change the cart payload shape** (`scheduled_start`, `scheduled_end`, `staff_id`, `customer_inputs`, etc.) unless you're also touching the SDK mock + backend lens. Full ejection rules and the customizer contract are in the SDK-level [`AGENTS.md`](../../AGENTS.md) → "Don't reinvent product customization".

## Quick start

```bash
bun install
bun dev
```

Open <http://localhost:3000>.
