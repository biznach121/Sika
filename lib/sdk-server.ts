import "server-only";
import { cache } from "react";
import { createCimplifyClient, type CimplifyClient } from "@cimplify/sdk";
import { getServerClient as sdkGetServerClient } from "@cimplify/sdk/server";
import { isDemoMode } from "./demo-mode";
import { getMockApp } from "./demo/mock-app";

/**
 * Drop-in replacement for `@cimplify/sdk/server`. Re-exports everything
 * (`tags`, `revalidate*`, types …) unchanged and overrides `getServerClient`
 * so that in DEMO_MODE all server reads are answered by the in-process seeded
 * mock instead of the (unlinked) live API. Import from here instead of
 * `@cimplify/sdk/server` in any page that reads catalogue/business data.
 *
 * Going live: set NEXT_PUBLIC_DEMO_MODE=0 — this transparently falls back to
 * the real `getServerClient()` against the client's key. No page changes.
 */
export * from "@cimplify/sdk/server";

type ServerClientOptions = Parameters<typeof sdkGetServerClient>[0];

// Wrapped in React `cache()` to preserve the per-request memoization the real
// `getServerClient()` provides.
export const getServerClient = cache(
  (opts: ServerClientOptions = {}): CimplifyClient => {
    if (!isDemoMode()) {
      return sdkGetServerClient(opts);
    }
    const app = getMockApp();
    const mockFetch: typeof fetch = (input, init) => {
      const request =
        input instanceof Request ? input : new Request(input, init);
      return app.fetch(request);
    };
    return createCimplifyClient({
      baseUrl: "http://demo.local",
      publicKey: "mock-dev",
      suppressPublicKeyWarning: true,
      fetch: mockFetch,
    });
  },
);
