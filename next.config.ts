import type { NextConfig } from "next";

// Same-origin proxy target for the storefront API. An explicit API URL wins;
// otherwise a hosted Cimplify key routes browser cart writes to the same place
// the server catalogue reads come from. Anything else (`mock-dev`, empty)
// falls back to the local `cimplify dev` mock in dev.
const publicKey = process.env.NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY?.trim() ?? "";
const rawConfiguredUrl = (
  process.env.CIMPLIFY_API_URL?.trim() ||
  process.env.NEXT_PUBLIC_CIMPLIFY_API_URL?.trim() ||
  ""
).replace(/\/+$/, "");
// A scheme-less value (e.g. "storefronts.cimplify.io") is a valid host but an
// invalid rewrite `destination` — Next requires `/`, `http://`, or `https://`.
// Default a bare host to https:// so a misconfigured env var can't fail the build.
const configuredStorefrontUrl =
  rawConfiguredUrl && !/^https?:\/\//.test(rawConfiguredUrl) && !rawConfiguredUrl.startsWith("/")
    ? `https://${rawConfiguredUrl}`
    : rawConfiguredUrl;
const keyTargetsHostedCimplify =
  publicKey.startsWith("cpk_live_") || publicKey.startsWith("cpk_test_");
const STOREFRONT_URL =
  configuredStorefrontUrl ||
  (process.env.NODE_ENV === "production" || keyTargetsHostedCimplify
    ? "https://storefronts.cimplify.io"
    : "http://127.0.0.1:8787");

if (STOREFRONT_URL === "http://127.0.0.1:8787") {
  console.warn(
    "[cimplify] next.config resolved the local storefront API URL; production deploys must run with NODE_ENV=production.",
  );
}

// DEMO_MODE serves /api/v1 (and friends) from an in-process seeded mock via
// app/api/v1/[...path]/route.ts — see lib/demo-mode.ts. Skip the proxy so the
// route handler answers. In live mode we proxy same-origin to the real
// storefront API. Proxies run as `beforeFiles` so they win over route handlers.
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "1";

// Cache Components ('use cache' + cacheTag/cacheLife) require Node-specific
// setTimeout atomicity and serialize a postponed state that routinely exceeds
// CF Workers' 128MB zlib limit. We're on Cloudflare Workers via opennext, so
// we stay on Next 16's "Previous Model" — `fetch.next.{revalidate,tags}` via
// the SDK's `cacheOptions`, plus `export const revalidate` per page. See
// https://nextjs.org/docs/app/guides/caching-without-cache-components.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/login", destination: "/account", permanent: false },
      { source: "/signup", destination: "/account", permanent: false },
    ];
  },
  async rewrites() {
    if (DEMO_MODE) return { beforeFiles: [] };
    return {
      beforeFiles: [
        { source: "/api/v1/:path*", destination: `${STOREFRONT_URL}/api/v1/:path*` },
        { source: "/img/:path*", destination: `${STOREFRONT_URL}/img/:path*` },
        { source: "/elements/:path*", destination: `${STOREFRONT_URL}/elements/:path*` },
        { source: "/_mock/:path*", destination: `${STOREFRONT_URL}/_mock/:path*` },
      ],
    };
  },
  images: {
    loader: "custom",
    loaderFile: "./lib/cimplify-loader.ts",
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8787", pathname: "/img/**" },
      { protocol: "http", hostname: "localhost", port: "8787", pathname: "/img/**" },
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/img/**" },
      { protocol: "https", hostname: "loremflickr.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "static-tmp.cimplify.io", pathname: "/**" },
      { protocol: "https", hostname: "storefrontassetscdn.cimplify.io", pathname: "/**" },
      { protocol: "https", hostname: "cdn.cimplify.io", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/cimplify/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/dcc5ggnkc/**" },
    ],
  },
};

export default nextConfig;
