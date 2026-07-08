import type { Metadata } from "next";
import Link from "next/link";
import { getServerClient, tags, type Product } from "@/lib/sdk-server";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Sitemap — ${brand.name}`,
  description: "A human-readable index of every page on this site.",
};

export const revalidate = 3600;

interface SitemapData {
  products: { slug: string; name: string }[];
  services: { slug: string; name: string }[];
  categories: { slug: string; name: string }[];
  collections: { slug: string; name: string }[];
}

async function getSitemap(): Promise<SitemapData> {
  const client = getServerClient();
  const [pRes, cRes, colRes] = await Promise.all([
    client.catalogue.getProducts(
      { limit: 500 },
      { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
    ),
    client.catalogue.getCategories({
      cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
    }),
    client.catalogue.getCollections({
      cacheOptions: { revalidate: 3600, tags: [tags.collections()] },
    }),
  ]);
  const catalogueItems = pRes.ok ? pRes.value.items : [];
  return {
    products: catalogueItems
      .filter((p: Product) => p.type === "product")
      .map((p: Product) => ({
        slug: p.slug ?? p.id,
        name: p.name,
      })),
    services: catalogueItems
      .filter((p: Product) => p.type === "service")
      .map((p: Product) => ({
        slug: p.slug ?? p.id,
        name: p.name,
      })),
    categories: (cRes.ok ? cRes.value : []).map((c) => ({ slug: c.slug, name: c.name })),
    collections: (colRes.ok ? colRes.value : []).map((c) => ({ slug: c.slug, name: c.name })),
  };
}

const STATIC_LINKS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Visit",
    links: [
      { href: "/", label: "Home" },
      { href: "/shop", label: "Services & products" },
      { href: "/products", label: "Products" },
      { href: "/services", label: "Services" },
      { href: "/book", label: "Book a service" },
      { href: "/location", label: "Location" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/account", label: "Account" },
      { href: "/account/orders", label: "Orders" },
      { href: "/login", label: "Sign in" },
      { href: "/signup", label: "Create account" },
      { href: "/track-order", label: "Find a booking" },
      { href: "/cart", label: "Cart" },
      { href: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Machine-readable",
    links: [
      { href: "/sitemap.xml", label: "sitemap.xml (search engines)" },
      { href: "/llms.txt", label: "llms.txt (LLM agents)" },
      { href: "/robots.txt", label: "robots.txt" },
      { href: "/opensearch.xml", label: "opensearch.xml (browser search)" },
    ],
  },
];

export default async function SitemapHtmlPage() {
  const { products, services, categories, collections } = await getSitemap();

  return (
    <article className="spabox-page">
      <div className="spabox-shell">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Sitemap</p>
          <h1 className="spabox-title">Every page, in one place.</h1>
          <p className="spabox-lede">
            For search engines, see{" "}
            <Link href="/sitemap.xml" className="font-semibold text-[#422900] hover:underline">
              /sitemap.xml
            </Link>
            . For LLM agents, see{" "}
            <Link href="/llms.txt" className="font-semibold text-[#422900] hover:underline">
              /llms.txt
            </Link>
            .
          </p>
        </header>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STATIC_LINKS.map((s) => (
            <Section key={s.title} title={s.title}>
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-[#422900]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </Section>
          ))}
          {categories.length > 0 && (
            <Section title="Categories">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="transition-colors hover:text-[#422900]">
                    {c.name}
                  </Link>
                </li>
              ))}
            </Section>
          )}
          {collections.length > 0 && (
            <Section title="Collections">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`} className="transition-colors hover:text-[#422900]">
                    {c.name}
                  </Link>
                </li>
              ))}
            </Section>
          )}
          {products.length > 0 && (
            <Section title={`Products (${products.length})`}>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products?product=${encodeURIComponent(p.slug)}`}
                    className="transition-colors hover:text-[#422900]"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </Section>
          )}
          {services.length > 0 && (
            <Section title={`Services (${services.length})`}>
              {services.map((p) => (
                <li key={p.slug}>
                  <Link href="/services" className="transition-colors hover:text-[#422900]">
                    {p.name}
                  </Link>
                </li>
              ))}
            </Section>
          )}
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="spabox-card p-6">
      <p className="mb-4 font-semibold text-[12px] uppercase text-[#688255]">
        {title}
      </p>
      <ul className="m-0 list-none space-y-2 p-0 text-sm font-medium text-[#4e3809]/72">
        {children}
      </ul>
    </div>
  );
}
