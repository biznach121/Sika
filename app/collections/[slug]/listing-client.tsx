"use client";

import type { Product } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";

/**
 * Client island for the collection listing. Receives server-fetched
 * products as props (serializable) and owns the `renderCard` function
 * (which can't cross the server/client boundary).
 */
export function ListingClient({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="spabox-card p-10 text-center text-[15px] font-semibold text-[#4e3809]/70">
        No products in this collection yet.
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
