import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "./search-client";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Search — ${brand.name}`,
  description: `Search ${brand.name} — products, collections, categories.`,
};

export default function SearchPage() {
  return (
    <article className="spabox-page">
      <div className="spabox-shell">
        <header className="spabox-hero">
          <p className="spabox-eyebrow">Search</p>
          <h1 className="spabox-title">Find anything.</h1>
          <p className="spabox-lede">Search products, treatments, categories, and collections.</p>
        </header>
        <div className="spabox-card mt-8 p-5 sm:p-7">
          <Suspense fallback={<SearchSkeleton />}>
            <SearchClient />
          </Suspense>
        </div>
      </div>
    </article>
  );
}

function SearchSkeleton() {
  return (
    <div>
      <div className="h-12 w-full max-w-xl bg-muted rounded animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-muted rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
