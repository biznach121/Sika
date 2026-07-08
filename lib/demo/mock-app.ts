import "server-only";
import { createMockApp, makeSeedContext } from "@cimplify/sdk/mock";
import { availabilityForRange, slotsForDay } from "./scheduling";

/**
 * Seeded in-process mock backend for DEMO_MODE.
 *
 * Built on the `services` seed (Serene Spa — 16 bookable treatments + bundles)
 * and augmented with take-home beauty products so the /products page and the
 * home "quality products" carousel are populated too. This is the exact mock
 * the SDK is tested against, so every response matches the live API contract —
 * the storefront's SDK calls (server reads AND browser cart/search/product
 * sheet) work without a single component change.
 *
 * A single instance is shared (via globalThis) between the API route handler
 * (browser traffic) and the server client (SSR reads) so cart state is
 * consistent within a running instance. Note: state lives in memory, so on
 * serverless it resets on cold start — fine for a demo, since the catalogue is
 * deterministic and only an in-progress cart could reset.
 */

// The route handler and the server client only ever call `.fetch`, so the
// shared instance is exposed as that minimal surface — it lets build() wrap
// the mock with demo-scheduling overrides (see below).
type MockApp = {
  fetch(request: Request): Promise<Response>;
};

// Brand-consistent take-home products (images reused from lib/brand.ts).
const IMG = "https://res.cloudinary.com/dcc5ggnkc/image/upload";
const DEMO_PRODUCTS: {
  name: string;
  slug: string;
  price: string;
  image: string;
  description: string;
}[] = [
  {
    name: "Glossy Lip Gloss",
    slug: "glossy-lip-gloss",
    price: "95.00",
    image: `${IMG}/v1780684208/yce8my8rr0sa8qhtdo8w.jpg`,
    description: "High-shine, non-sticky lip gloss for an everyday glow.",
  },
  {
    name: "Two-Shade Gloss Set",
    slug: "two-shade-gloss-set",
    price: "170.00",
    image: `${IMG}/v1780684208/yce8my8rr0sa8qhtdo8w.jpg`,
    description: "A pair of complementary gloss shades, day to night.",
  },
  {
    name: "Mint Beauty Oil",
    slug: "mint-beauty-oil",
    price: "140.00",
    image: `${IMG}/v1780684207/a4dggpe8escdshffq9z4.jpg`,
    description: "Cooling mint body oil that absorbs without the grease.",
  },
  {
    name: "Brush Essentials",
    slug: "brush-essentials",
    price: "220.00",
    image: `${IMG}/v1780684208/h9irccy3f3qmnevjttlx.jpg`,
    description: "Core makeup brush set — face, eyes, and blend.",
  },
  {
    name: "Smooth Foundation",
    slug: "smooth-foundation",
    price: "185.00",
    image: `${IMG}/v1780684208/thekm5rhhjz0wiyxmdr8.jpg`,
    description: "Soft-matte, buildable base in a comfortable wear.",
  },
  {
    name: "Niacinamide Serum",
    slug: "niacinamide-serum",
    price: "160.00",
    image: `${IMG}/v1780684207/a4dggpe8escdshffq9z4.jpg`,
    description: "Lightweight serum to even tone and calm the skin.",
  },
];

function build(): MockApp {
  const { app, deps } = createMockApp({ seed: "services" });

  // Layer physical products onto the spa-services seed.
  const ctx = makeSeedContext(deps.registry);
  const beauty = ctx.category({
    name: "Beauty Products",
    slug: "beauty-products",
    description: "Take-home beauty essentials, hand-picked by our therapists.",
  });
  for (const p of DEMO_PRODUCTS) {
    ctx.product({
      name: p.name,
      slug: p.slug,
      price: p.price,
      productType: "product",
      category: beauty,
      image: p.image,
      description: p.description,
    });
  }

  // Bookable services are exposed in the catalogue as products (`prod_<slug>`)
  // and the booking widget passes that product id to the scheduler — but the
  // mock keys its schedulable service entities as `svc_<slug>`, linked only by
  // slug. Alias every service under its product id so `getAvailableSlots`,
  // `checkSlotAvailability`, etc. resolve from the id the widget actually sends.
  const services = deps.registry as {
    services?: {
      list(): { id: string; [k: string]: unknown }[];
      get(id: string): unknown;
      put(id: string, value: unknown): void;
    };
  };
  const serviceStore = services.services;
  if (serviceStore) {
    for (const svc of serviceStore.list()) {
      const productId = `prod_${svc.id.replace(/^svc_/, "")}`;
      if (!serviceStore.get(productId)) {
        serviceStore.put(productId, { ...svc, id: productId });
      }
    }
  }

  const durationOf = (serviceId: string): number => {
    const svc = serviceStore?.get(serviceId) as { duration_minutes?: number } | undefined;
    return svc?.duration_minutes ?? 60;
  };

  // Cart lines come back with add-on entries keyed `option_id`, but the SDK's
  // cart hooks read `option.id` (React keys + lookups), which triggers
  // missing-key warnings in the cart drawer. Alias it on every cart response.
  const aliasAddOnIds = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(aliasAddOnIds);
      return;
    }
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    if (Array.isArray(record.add_on_options)) {
      for (const opt of record.add_on_options) {
        if (opt && typeof opt === "object" && opt.id == null && opt.option_id != null) {
          opt.id = opt.option_id;
        }
      }
    }
    for (const value of Object.values(record)) aliasAddOnIds(value);
  };

  // The stock mock ignores the requested date when listing slots and returns
  // the wrong shape for the day-availability range — so the booking widget
  // showed "No available slots" almost everywhere. Answer both scheduling
  // reads with lib/demo/scheduling.ts instead; everything else passes through.
  return {
    async fetch(request: Request) {
      const url = new URL(request.url);
      if (request.method === "GET") {
        const serviceId = url.searchParams.get("service_id") ?? "";
        if (url.pathname.endsWith("/scheduling/availability")) {
          return Response.json({
            service_id: serviceId,
            availability: availabilityForRange(
              serviceId,
              url.searchParams.get("start_date"),
              url.searchParams.get("end_date"),
              durationOf(serviceId),
            ),
          });
        }
        if (url.pathname.endsWith("/scheduling/slots")) {
          return Response.json(
            slotsForDay(serviceId, url.searchParams.get("date"), durationOf(serviceId)),
          );
        }
      }

      const response = await app.fetch(request);
      if (
        url.pathname.includes("/cart") &&
        (response.headers.get("content-type") ?? "").includes("json")
      ) {
        const body = await response.json();
        aliasAddOnIds(body);
        const headers = new Headers(response.headers);
        headers.delete("content-length");
        return new Response(JSON.stringify(body), { status: response.status, headers });
      }
      return response;
    },
  };
}

// Persist across module reloads / HMR so the route handler and the server
// client share one seeded instance (and one cart store) per running process.
const GLOBAL_KEY = "__thespabox_demo_mock_app__";

export function getMockApp(): MockApp {
  const store = globalThis as Record<string, unknown>;
  if (!store[GLOBAL_KEY]) {
    store[GLOBAL_KEY] = build();
  }
  return store[GLOBAL_KEY] as MockApp;
}
