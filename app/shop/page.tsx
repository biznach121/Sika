import type { Metadata } from "next";
import { getServerClient, tags } from "@/lib/sdk-server";
import { ShopClient } from "./shop-client";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Shop — ${brand.name}`,
  description: brand.description,
};

export const revalidate = 3600;

async function getShopData() {
  const client = getServerClient();
  const [p, c] = await Promise.all([
    client.catalogue.getProducts(
      { limit: 50 },
      { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
    ),
    client.catalogue.getCategories({
      cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
    }),
  ]);
  return {
    products: p.ok ? p.value.items : [],
    categories: c.ok ? c.value : [],
  };
}

export default async function ShopPage() {
  const { products, categories } = await getShopData();
  return (
    <main className="spabox-page">
      <div className="spabox-shell max-w-[1320px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Shop</p>
          <h1 className="spabox-title">Beauty products and services.</h1>
          <p className="spabox-lede">
            Browse the {brand.shortName} menu, bookable services, and beauty products in one place.
          </p>
        </header>
        <ShopClient products={products} categories={categories} />
      </div>
    </main>
  );
}
