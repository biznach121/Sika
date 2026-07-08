"use client";

import type { Product } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";

/**
 * Client island for the category listing. Receives server-fetched products
 * as props (serializable) and owns the `renderCard` function.
 */
export function ListingClient({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="spabox-card p-10 text-center text-[15px] font-semibold text-[#4e3809]/70">
        No products in this category yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <StoreProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
