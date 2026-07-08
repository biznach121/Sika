/**
 * Ambient types for `@cimplify/sdk/mock` — the package ships this subpath as
 * runtime-only (empty .d.ts), so we declare the minimal surface DEMO_MODE uses.
 * See lib/demo/mock-app.ts.
 */
declare module "@cimplify/sdk/mock" {
  interface MockHonoApp {
    fetch(request: Request): Promise<Response>;
  }

  interface MockDeps {
    registry: unknown;
    defaultBusinessId: string;
    [key: string]: unknown;
  }

  export function createMockApp(options?: {
    seed?: string;
    cors?: string | string[] | false;
    [key: string]: unknown;
  }): {
    app: MockHonoApp;
    deps: MockDeps;
    request(path: string, init?: RequestInit): Promise<Response>;
  };

  interface SeedEntity {
    id: string;
    slug: string;
    [key: string]: unknown;
  }

  export function makeSeedContext(registry: unknown): {
    registry: unknown;
    business(input: Record<string, unknown>): Record<string, unknown>;
    category(input: {
      name: string;
      slug?: string;
      description?: string;
      [key: string]: unknown;
    }): SeedEntity;
    collection(input: Record<string, unknown>): SeedEntity;
    product(input: {
      name: string;
      slug?: string;
      price?: string | number;
      productType?: string;
      category?: SeedEntity | string;
      collection?: SeedEntity | string;
      image?: string;
      description?: string;
      [key: string]: unknown;
    }): SeedEntity;
  };
}
