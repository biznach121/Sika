import type { Metadata } from "next";
import { Suspense } from "react";
import { getServerClient, tags, type Category, type Product } from "@/lib/sdk-server";
import { BookClient } from "./book-client";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Book a treatment — ${brand.name}`,
  description: "Pick a treatment, pick a slot, you're booked.",
};

export const revalidate = 3600;

async function getBookingData(): Promise<{ treatments: Product[]; categories: Category[] }> {
  const client = getServerClient();
  const [productsRes, categoriesRes] = await Promise.all([
    client.catalogue.getProducts(
      { limit: 50 },
      { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
    ),
    client.catalogue.getCategories({
      cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
    }),
  ]);
  // Booking flow only handles service-typed products.
  const treatments = productsRes.ok
    ? productsRes.value.items.filter((p) => p.type === "service")
    : [];
  const serviceCategoryIds = new Set(treatments.map((t) => t.category_id).filter(Boolean));
  const categories = categoriesRes.ok
    ? categoriesRes.value.filter((c) => serviceCategoryIds.has(c.id))
    : [];
  return { treatments, categories };
}

export default async function BookPage() {
  const { treatments, categories } = await getBookingData();
  return (
    <article className="spabox-page">
      <div className="spabox-shell max-w-[1120px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Book a service</p>
          <h1 className="spabox-title">
            Pick a treatment.
            <br />
            Pick a slot.
          </h1>
          <p className="spabox-lede">
            Choose a service, select an available time, and continue to checkout to confirm your appointment.
          </p>
        </header>

        <Suspense fallback={<BookSkeleton />}>
          <BookClient treatments={treatments} categories={categories} />
        </Suspense>
      </div>
    </article>
  );
}

function BookSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-2xl animate-pulse" />
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="h-5 w-40 bg-muted rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
