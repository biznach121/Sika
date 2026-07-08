# Demo mode

This storefront ships a **self-contained demo** so a prospective merchant can
see a fully-stocked site — products, services, the booking widget, search, the
product sheet, and the cart — **before** any Cimplify business is linked.

When demo mode is on, every catalogue/cart/business request (server-rendered
*and* in-browser) is answered by an in-process **seeded mock** — the same
`@cimplify/sdk/mock` the SDK is tested against, so responses match the live API
contract exactly. No keys, no backend, nothing to provision.

## Turn it on / off

One environment variable:

```bash
NEXT_PUBLIC_DEMO_MODE=1   # demo: built-in seeded catalogue
NEXT_PUBLIC_DEMO_MODE=0   # live: real Cimplify business (needs a key)
```

It's a `NEXT_PUBLIC_` flag, so it's inlined at build time — **flipping it
requires a redeploy.**

## Going live (client signs on)

1. Get the client's **public key** (`cpk_live_*`) from the Cimplify desk →
   Developers tab.
2. In your host's env vars (e.g. Vercel → Settings → Environment Variables, all
   environments):
   - `NEXT_PUBLIC_DEMO_MODE = 0`
   - `NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY = cpk_live_…`
3. **Redeploy.**

That's it. The catalogue now reads from the client's real business; the demo
mock is never imported on the hot path. Nothing else changes — no code edits.

## What the demo seeds

- **16 bookable services** (Serene Spa seed) across categories `massage`,
  `facial`, `nails`, `hair`, `wellness` — each with real durations for the
  booking widget.
- **6 take-home beauty products** (category `beauty-products`) so `/products`
  and the home "quality products" carousel are populated.
- **A "Most Booked" collection**, a business profile (GHS currency), and
  locations — so prices and the studio info render correctly.

Edit the product list in [`lib/demo/mock-app.ts`](lib/demo/mock-app.ts).

## How it's wired

| Piece | File | Role |
|---|---|---|
| Flag | `lib/demo-mode.ts` | `isDemoMode()` reads `NEXT_PUBLIC_DEMO_MODE` |
| Seeded mock | `lib/demo/mock-app.ts` | one shared, pre-seeded mock app per process |
| Server reads | `lib/sdk-server.ts` | `getServerClient()` → mock in demo, real SDK otherwise |
| Browser reads | `app/api/v1/[...path]/route.ts` | proxies `/api/v1/*` to the mock |
| Routing | `next.config.ts` | live mode proxies `/api/v1/*` to the real API; demo mode lets the route handler serve it |

Pages import `getServerClient` from `@/lib/sdk-server` (not
`@cimplify/sdk/server`) — that's the only seam.

## Caveats

- **Cart state is in-memory.** On serverless (Vercel/CF) it can reset on a cold
  start. Fine for a demo — the catalogue is deterministic; only an in-progress
  cart could blip.
- **Payments don't settle** in demo — checkout is for show. Real payment runs
  once the client's live business is linked.
