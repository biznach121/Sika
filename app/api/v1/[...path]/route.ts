import { isDemoMode } from "@/lib/demo-mode";
import { getMockApp } from "@/lib/demo/mock-app";

/**
 * DEMO_MODE backend. Forwards every `/api/v1/*` browser request (catalogue,
 * cart, search, business, scheduling …) to the in-process seeded mock, so the
 * client SDK gets contract-correct responses with no linked business.
 *
 * In live mode this route is never reached: next.config.ts proxies `/api/v1/*`
 * to the real storefront API as a `beforeFiles` rewrite, which is evaluated
 * before route handlers. The 404 guard below is just belt-and-suspenders.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function handler(request: Request): Promise<Response> | Response {
  if (!isDemoMode()) {
    return new Response(
      JSON.stringify({ error: "demo mode disabled" }),
      { status: 404, headers: { "content-type": "application/json" } },
    );
  }
  return getMockApp().fetch(request);
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
  handler as HEAD,
};
