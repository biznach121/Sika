import type { Metadata } from "next";
import { getServerClient, tags, type Category, type Product } from "@/lib/sdk-server";
import { ShopClient } from "@/app/shop/shop-client";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Products — ${brand.name}`,
  description: `Shop live beauty products from ${brand.name}.`,
};

export const revalidate = 3600;

async function getProductsData(): Promise<{ products: Product[]; categories: Category[] }> {
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
  const products = productsRes.ok
    ? productsRes.value.items.filter((product) => product.type === "product")
    : [];
  const categoryIds = new Set(products.map((product) => product.category_id).filter(Boolean));
  const categories = categoriesRes.ok
    ? categoriesRes.value.filter((category) => categoryIds.has(category.id))
    : [];
  return { products, categories };
}

export default async function ProductsPage() {
  const { products, categories } = await getProductsData();

  return (
    <main className="spabox-page">
      <div className="spabox-shell max-w-[1320px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Products</p>
          <h1 className="spabox-title">Beauty products.</h1>
          <p className="spabox-lede">
            Browse the live product shelf without services mixed into the list.
          </p>
        </header>
        <ShopClient
          title="Products"
          searchPlaceholder="Search products..."
          products={products}
          categories={categories}
        />
      </div>
    </main>
  );
}
