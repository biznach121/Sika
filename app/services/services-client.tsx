"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";
import {
  FilterGroup,
  FilterIcon,
  FilterPill,
  FiltersDrawer,
  SearchIcon,
  ToggleChip,
} from "@/components/filters-drawer";
import { useTypewriterPlaceholder } from "@/components/use-typewriter-placeholder";
import { brand } from "@/lib/brand";
import {
  DURATION_BUCKETS,
  SORT_OPTIONS,
  filterAndSortServices,
  type ServiceSortKey,
} from "@/lib/service-filters";

export function ServicesClient({
  services,
  categories,
}: {
  services: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [duration, setDuration] = useState("any");
  const [sort, setSort] = useState<ServiceSortKey>("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchPlaceholder = useTypewriterPlaceholder(brand.search.suggestions, {
    prefix: brand.search.placeholderPrefix,
  });

  const activeFilterCount = selectedCategories.size + (duration !== "any" ? 1 : 0);

  const filtered = useMemo(
    () =>
      filterAndSortServices(services, {
        query,
        categoryIds: selectedCategories,
        durationKey: duration,
        sort,
      }),
    [services, query, selectedCategories, duration, sort],
  );

  const toggleCategory = (id: string) => {
    setSelectedCategories((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearAll = () => {
    setSelectedCategories(new Set());
    setDuration("any");
  };

  return (
    <section>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search services</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#688255]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-12 w-full rounded-full border border-[#422900]/14 bg-[#ebf4e5] pl-12 pr-4 text-sm font-medium text-[#422900] outline-none transition-colors placeholder:text-[#688255] focus:border-[#422900]/40"
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[#422900]/14 bg-[#ebf4e5] px-5 text-sm font-semibold text-[#422900] transition-colors hover:border-[#422900]/40"
            aria-haspopup="dialog"
            aria-expanded={filtersOpen}
          >
            <FilterIcon className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#422900] px-1.5 text-[11px] font-bold text-[#ebf4e5]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active filter chips + count */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <p className="m-0 mr-1 text-sm font-medium text-[#4e3809]/72">
          {filtered.length} service{filtered.length === 1 ? "" : "s"}
        </p>
        {[...selectedCategories].map((id) => {
          const category = categories.find((c) => c.id === id);
          if (!category) return null;
          return (
            <FilterPill key={id} onRemove={() => toggleCategory(id)}>
              {category.name}
            </FilterPill>
          );
        })}
        {duration !== "any" && (
          <FilterPill onRemove={() => setDuration("any")}>
            {DURATION_BUCKETS.find((b) => b.key === duration)?.label}
          </FilterPill>
        )}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-semibold text-[#688255] underline-offset-4 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <StoreProductCard key={service.id} product={service} />
          ))}
        </div>
      ) : (
        <div className="spabox-card grid place-items-center gap-2 p-12 text-center">
          <p className="m-0 font-serif text-2xl font-light text-[#422900]">No services match.</p>
          <p className="m-0 text-sm text-[#4e3809]/72">Try a different search or clear your filters.</p>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#422900] px-5 py-2.5 text-sm font-semibold text-[#ebf4e5] transition-colors hover:bg-[#301e00]"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Filters drawer */}
      <FiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={filtered.length}
        onClear={clearAll}
        hasActiveFilters={activeFilterCount > 0}
      >
        {categories.length > 0 && (
          <FilterGroup title="Category">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <ToggleChip
                  key={category.id}
                  active={selectedCategories.has(category.id)}
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                </ToggleChip>
              ))}
            </div>
          </FilterGroup>
        )}

        <FilterGroup title="Duration">
          <div className="flex flex-wrap gap-2">
            {DURATION_BUCKETS.map((bucket) => (
              <ToggleChip
                key={bucket.key}
                active={duration === bucket.key}
                onClick={() => setDuration(bucket.key)}
              >
                {bucket.label}
              </ToggleChip>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Sort by">
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((option) => (
              <ToggleChip key={option.key} active={sort === option.key} onClick={() => setSort(option.key)}>
                {option.shortLabel}
              </ToggleChip>
            ))}
          </div>
        </FilterGroup>
      </FiltersDrawer>
    </section>
  );
}
