/**
 * Demo mode — ship a fully-populated storefront with NO linked Cimplify
 * business. When `NEXT_PUBLIC_DEMO_MODE=1`, catalogue/cart/business reads are
 * served by an in-process seeded mock (the same `@cimplify/sdk/mock` the SDK is
 * tested against), so a prospect can browse products, services, the booking
 * widget, and the cart before they sign on.
 *
 * Going live is a two-line switch (see DEMO.md):
 *   1. Set `NEXT_PUBLIC_DEMO_MODE=0` (or remove it).
 *   2. Set `NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY` to the client's `cpk_live_*` key.
 *
 * `NEXT_PUBLIC_` so the flag is readable in both Server Components and client
 * islands (it's inlined at build time — flipping it requires a redeploy).
 */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "1";
}
