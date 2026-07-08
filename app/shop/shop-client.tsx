"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@cimplify/sdk";
import { brand } from "@/lib/brand";
import { StoreProductCard } from "@/components/store-product-card";

type SortKey = "newest" | "price-asc" | "price-desc" | "name-asc";

export function ShopClient({
  products,
  categories,
  title = `${brand.shortName} menu`,
  searchPlaceholder = "Search...",
}: {
  products: Product[];
  categories: Category[];
  title?: string;
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCategory = categories.find((category) => category.id === categoryId);
  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query);
    const next = products.filter((product) => {
      const matchesCategory = categoryId === "all" || product.category_id === categoryId;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      return normalize([product.name, product.slug, product.description].filter(Boolean).join(" ")).includes(
        normalizedQuery,
      );
    });

    return next.sort((a, b) => {
      if (sort === "price-asc") return Number(a.default_price) - Number(b.default_price);
      if (sort === "price-desc") return Number(b.default_price) - Number(a.default_price);
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [categoryId, products, query, sort]);

  return (
    <section className="spabox-shop-catalogue">
      <div className="mb-5 grid gap-4">
        <div>
          <h2 className="m-0 font-serif text-[38px] font-light leading-[0.9] tracking-normal text-[#422900] sm:text-[44px]">
            {title}
          </h2>
          <p className="m-0 mt-1 text-sm font-medium text-[#4e3809]/72">
            {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        <label className="relative block">
          <span className="sr-only">Search products and services</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#422900]/58"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-12 w-full rounded-2xl border-0 bg-[#f5feeb]/90 pl-11 pr-4 text-sm font-medium text-[#422900] shadow-[0_10px_28px_rgba(66, 41, 0,0.06)] outline-none placeholder:text-[#4e3809]/48 focus:ring-2 focus:ring-[#422900]/14"
          />
        </label>

        <div className="flex items-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#422900] px-4 text-sm font-bold text-[#ebf4e5]"
          >
            <SlidersIcon />
            Filters
            {activeCategory ? <span className="opacity-70">· {activeCategory.name}</span> : null}
          </button>
          <label className="min-w-0 flex-1">
            <span className="sr-only">Sort products</span>
            <SortSelect value={sort} onChange={setSort} />
          </label>
        </div>

        <div className="hidden items-center justify-between gap-4 sm:flex">
          <CategoryTabs
            categories={categories}
            selectedId={categoryId}
            onSelect={setCategoryId}
          />
          <div className="w-[180px]">
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <StoreProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] bg-[#ebf4e5]/70 px-6 py-16 text-center shadow-[0_18px_54px_rgba(66, 41, 0,0.06)]">
          <p className="m-0 text-lg font-semibold text-[#422900]">No products found</p>
          <p className="m-0 mt-2 text-sm font-medium text-[#4e3809]/62">
            Try a different search or filter.
          </p>
        </div>
      )}

      {filtersOpen ? (
        <FilterDrawer
          categories={categories}
          selectedId={categoryId}
          onSelect={setCategoryId}
          onClose={() => setFiltersOpen(false)}
        />
      ) : null}
    </section>
  );
}

function CategoryTabs({
  categories,
  selectedId,
  onSelect,
}: {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto">
      <CategoryButton active={selectedId === "all"} onClick={() => onSelect("all")}>
        All
      </CategoryButton>
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          active={selectedId === category.id}
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </CategoryButton>
      ))}
    </div>
  );
}

function CategoryButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-10 shrink-0 rounded-full px-4 text-sm font-bold transition-colors",
        active
          ? "bg-[#422900] text-[#ebf4e5]"
          : "bg-[#ebf4e5]/78 text-[#4e3809]/72 hover:bg-[#ebf4e5]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as SortKey)}
      className="h-11 w-full rounded-2xl border-0 bg-[#f5feeb]/90 px-4 text-sm font-bold text-[#422900] shadow-[0_10px_28px_rgba(66, 41, 0,0.06)] outline-none focus:ring-2 focus:ring-[#422900]/14"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A-Z</option>
    </select>
  );
}

function FilterDrawer({
  categories,
  selectedId,
  onSelect,
  onClose,
}: {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  function choose(id: string) {
    onSelect(id);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[260] sm:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-[#422900]/32 backdrop-blur-sm"
      />
      <aside className="absolute inset-x-0 bottom-0 rounded-t-[30px] bg-[#ebf4e5] px-5 pb-6 pt-5 text-[#422900] shadow-[0_-24px_72px_rgba(66, 41, 0,0.2)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-[#688255]">Filters</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="grid h-10 w-10 place-items-center rounded-full text-[#422900] hover:bg-[#c9d9c0]"
          >
            <span aria-hidden className="text-2xl leading-none">×</span>
          </button>
        </div>
        <div className="grid gap-2">
          <CategoryDrawerButton active={selectedId === "all"} onClick={() => choose("all")}>
            All
          </CategoryDrawerButton>
          {categories.map((category) => (
            <CategoryDrawerButton
              key={category.id}
              active={selectedId === category.id}
              onClick={() => choose(category.id)}
            >
              {category.name}
            </CategoryDrawerButton>
          ))}
        </div>
      </aside>
    </div>
  );
}

function CategoryDrawerButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex min-h-12 items-center justify-between rounded-2xl px-4 text-left text-sm font-bold transition-colors",
        active ? "bg-[#422900] text-[#ebf4e5]" : "bg-[#f5feeb]/86 text-[#422900]",
      ].join(" ")}
    >
      <span>{children}</span>
      {active ? <span aria-hidden>✓</span> : null}
    </button>
  );
}

function SlidersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M4 7h10" />
      <path d="M18 7h2" />
      <path d="M4 17h3" />
      <path d="M11 17h9" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </svg>
  );
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
