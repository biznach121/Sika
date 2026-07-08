"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AvailableSlot, Category, Product } from "@cimplify/sdk";
import { useCart, DateSlotPicker } from "@cimplify/sdk/react";
import { brand } from "@/lib/brand";
import {
  FilterGroup,
  FilterIcon,
  FilterPill,
  FiltersDrawer,
  SearchIcon,
  ToggleChip,
} from "@/components/filters-drawer";
import { useTypewriterPlaceholder } from "@/components/use-typewriter-placeholder";
import {
  DURATION_BUCKETS,
  SORT_OPTIONS,
  filterAndSortServices,
  type ServiceSortKey,
} from "@/lib/service-filters";

/**
 * Booking flow:
 *   1. Search / filter the treatment list (left rail) and pick one — drives
 *      the SDK availability fetch.
 *   2. SDK <DateSlotPicker> handles date + slot selection, fetching real
 *      availability via `useServiceAvailability` against the configured
 *      backend (mock in dev, Cimplify scheduling API in prod).
 *   3. Add to cart with the chosen slot as a cart-item note;
 *      Cimplify Checkout finalises the booking.
 */
export function BookClient({
  treatments,
  categories = [],
}: {
  treatments: Product[];
  categories?: Category[];
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedTreatment, setSelectedTreatment] = useState<Product | undefined>(treatments[0]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
      filterAndSortServices(treatments, {
        query,
        categoryIds: selectedCategories,
        durationKey: duration,
        sort,
      }),
    [treatments, query, selectedCategories, duration, sort],
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

  async function confirm() {
    if (!selectedTreatment || !selectedSlot) return;
    setSubmitting(true);
    try {
      const slotLabel = new Date(selectedSlot.start_time).toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      await addItem(selectedTreatment, 1, {
        specialInstructions: `Booked for ${slotLabel}`,
      });
      router.push("/checkout");
    } catch {
      setSubmitting(false);
    }
  }

  if (treatments.length === 0) {
    return (
      <p className="text-muted-foreground">
        No bookable treatments yet. Add a Service-type product to your catalogue first.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
      {/* Treatments — searchable + filterable */}
      <div className="spabox-card flex flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="spabox-eyebrow m-0">Treatment</p>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#422900]/14 bg-[#ebf4e5] px-4 text-sm font-semibold text-[#422900] transition-colors hover:border-[#422900]/40"
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

        <label className="relative mb-3 block">
          <span className="sr-only">Search treatments</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#688255]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-full border border-[#422900]/14 bg-[#ebf4e5] pl-12 pr-4 text-sm font-medium text-[#422900] outline-none transition-colors placeholder:text-[#688255] focus:border-[#422900]/40"
          />
        </label>

        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
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
          </div>
        )}

        <p className="mb-2 text-xs font-medium text-[#4e3809]/68">
          {filtered.length} treatment{filtered.length === 1 ? "" : "s"}
        </p>

        {/* Scrollable list so it never runs off the page (scrollbar hidden) */}
        <div className="no-scrollbar max-h-[420px] space-y-2 overflow-y-auto lg:max-h-[560px]">
          {filtered.length === 0 ? (
            <div className="rounded-[18px] border border-dashed border-[#422900]/20 p-6 text-center">
              <p className="m-0 text-sm font-medium text-[#4e3809]/72">No treatments match.</p>
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setQuery("");
                }}
                className="mt-2 text-sm font-semibold text-[#688255] underline-offset-4 hover:underline"
              >
                Reset
              </button>
            </div>
          ) : (
            filtered.map((treatment) => {
              const active = selectedTreatment?.id === treatment.id;
              return (
                <button
                  key={treatment.id}
                  type="button"
                  onClick={() => {
                    setSelectedTreatment(treatment);
                    setSelectedSlot(null);
                  }}
                  className={[
                    "w-full rounded-[18px] border p-4 text-left transition-colors",
                    active
                      ? "border-[#422900] bg-[#422900] text-[#ebf4e5]"
                      : "border-[#422900]/12 bg-[#ebf4e5]/68 text-[#422900] hover:border-[#422900]/35",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate text-sm font-semibold">{treatment.name}</p>
                      <p className={`m-0 mt-0.5 text-xs ${active ? "text-[#ebf4e5]/72" : "text-[#4e3809]/68"}`}>
                        {treatment.duration_minutes ? `${treatment.duration_minutes} min · ` : ""}
                        {brand.currency} {treatment.default_price}
                      </p>
                    </div>
                    {active && (
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ebf4e5] text-xs text-[#422900]">
                        ✓
                      </span>
                    )}
                    {treatment.image_url && (
                      <img
                        src={treatment.image_url}
                        alt=""
                        loading="lazy"
                        className="h-16 w-16 shrink-0 rounded-[14px] object-cover"
                      />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Date + slots — SDK <DateSlotPicker> fetches real availability */}
      <div className="spabox-card p-4 sm:p-6">
        {selectedTreatment ? (
          <DateSlotPicker
            serviceId={selectedTreatment.id}
            selectedSlot={selectedSlot}
            onSlotSelect={(slot) => setSelectedSlot(slot)}
            daysToShow={5}
            schedulingMode={selectedTreatment.scheduling_mode}
            durationUnit={selectedTreatment.duration_unit}
            durationValue={selectedTreatment.duration_value}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Pick a treatment to see availability.</p>
        )}

        <button
          type="button"
          onClick={confirm}
          disabled={!selectedTreatment || !selectedSlot || submitting}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#422900] px-5 py-3 text-sm font-semibold text-[#ebf4e5] transition-colors hover:bg-[#301e00] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
            ? "Confirming…"
            : selectedSlot
              ? `Book ${selectedTreatment?.name} at ${new Date(selectedSlot.start_time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`
              : "Pick a slot to book"}
        </button>
      </div>

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
    </div>
  );
}
