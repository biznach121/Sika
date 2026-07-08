import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getServerClient, tags, type Category, type Product } from "@/lib/sdk-server";
import { ServicesClient } from "./services-client";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Services — ${brand.name}`,
  description: `Browse and book live services from ${brand.name}.`,
};

export const revalidate = 3600;

async function getServicesData(): Promise<{ services: Product[]; categories: Category[] }> {
  const client = getServerClient();
  const [productsRes, categoriesRes] = await Promise.all([
    client.catalogue.getProducts(
      { limit: 100 },
      { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
    ),
    client.catalogue.getCategories({
      cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
    }),
  ]);
  const services = productsRes.ok
    ? productsRes.value.items.filter((product) => product.type === "service")
    : [];
  // Only surface categories that actually contain services.
  const serviceCategoryIds = new Set(
    services.map((service) => service.category_id).filter(Boolean),
  );
  const categories = categoriesRes.ok
    ? categoriesRes.value.filter((category) => serviceCategoryIds.has(category.id))
    : [];
  return { services, categories };
}

export default async function ServicesPage() {
  const { services, categories } = await getServicesData();

  return (
    <article className="spabox-page">
      <div className="spabox-shell max-w-[1320px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Services</p>
          <h1 className="spabox-title">Browse our treatments.</h1>
          <p className="spabox-lede">
            Search the full menu, filter by category and duration, then{" "}
            <Link href="/book" className="font-semibold text-[#422900] underline-offset-4 hover:underline">
              book a time
            </Link>
            .
          </p>
        </header>

        <Suspense fallback={<ServicesSkeleton />}>
          <ServicesClient services={services} categories={categories} />
        </Suspense>
      </div>
    </article>
  );
}

function ServicesSkeleton() {
  return (
    <div>
      <div className="mb-6 flex gap-3">
        <div className="h-12 flex-1 animate-pulse rounded-full bg-muted" />
        <div className="h-12 w-28 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[1.05] animate-pulse rounded-[24px] bg-muted" />
        ))}
      </div>
    </div>
  );
}
