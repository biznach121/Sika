import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServerClient,
  tags,
  type Category,
  type Product,
} from "@/lib/sdk-server";
import { ListingClient } from "./listing-client";
import { brand } from "@/lib/brand";

// See app/products/[slug]/page.tsx for the rationale on generateStaticParams.
export async function generateStaticParams() {
  const r = await getServerClient().catalogue.getCategories();
  if (!r.ok || r.value.length === 0) {
    return [{ slug: "__placeholder__" }];
  }
  return r.value.map((c) => ({ slug: c.slug ?? c.id }));
}

export const revalidate = 3600;

interface CategoryData {
  category: Category;
  products: Product[];
}

type CategoryResult =
  | { ok: true; data: CategoryData }
  | { ok: false; code: string };

async function getCategory(slug: string): Promise<CategoryResult> {
  const client = getServerClient();
  const catRes = await client.catalogue.getCategoryBySlug(slug, {
    cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
  });
  if (!catRes.ok) return { ok: false, code: catRes.error.code };

  const r = await client.catalogue.getCategoryProducts(catRes.value.id, undefined, {
    cacheOptions: {
      revalidate: 3600,
      tags: [
        tags.category(catRes.value.id),
        tags.categoryProducts(catRes.value.id),
      ],
    },
  });
  const products = r.ok
    ? ((r.value as { items?: Product[] }).items ?? (r.value as Product[]))
    : [];
  return { ok: true, data: { category: catRes.value, products } };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCategory(slug);
  if (!result.ok) return {};
  const data = result.data;
  return {
    title: `${data.category.name} — ${brand.name}`,
    description: data.category.description ?? undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getCategory(slug);
  if (!result.ok) {
    if (result.code === "NOT_FOUND") notFound();
    return <CategorySkeleton />;
  }
  const { category, products } = result.data;
  return (
    <section className="spabox-page">
      <div className="spabox-shell max-w-[1320px]">
        <header className="spabox-hero mb-8 text-center">
          <p className="spabox-eyebrow">Category</p>
          <h1 className="spabox-title mx-auto">{category.name}</h1>
          {category.description && (
            <p className="spabox-lede mx-auto">
              {category.description}
            </p>
          )}
          <p className="mt-4 text-sm font-semibold text-[#688255]">
            {products.length} item{products.length === 1 ? "" : "s"}
          </p>
        </header>
        <ListingClient products={products} />
        {products.length === 0 && (
          <p className="text-center mt-8">
            <Link href="/" className="font-semibold text-[#422900]">
              Back home
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

function CategorySkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-12">
      <header className="mb-8 text-center">
        <div className="mx-auto h-3 w-20 bg-muted rounded mb-2 animate-pulse" />
        <div className="mx-auto h-10 w-64 bg-muted rounded mb-2 animate-pulse" />
        <div className="mx-auto h-4 w-80 bg-muted rounded animate-pulse" />
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />
        ))}
      </div>
    </section>
  );
}
