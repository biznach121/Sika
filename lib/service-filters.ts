import type { Product } from "@cimplify/sdk";

/** Shared service search/filter/sort logic for /services and /book. */

export type ServiceSortKey =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "name-asc";

export const SORT_OPTIONS: { key: ServiceSortKey; label: string; shortLabel: string }[] = [
  { key: "recommended", label: "Recommended", shortLabel: "Recommended" },
  { key: "price-asc", label: "Price: low to high", shortLabel: "Price ↑" },
  { key: "price-desc", label: "Price: high to low", shortLabel: "Price ↓" },
  { key: "duration-asc", label: "Shortest first", shortLabel: "Shortest" },
  { key: "name-asc", label: "Name: A–Z", shortLabel: "A–Z" },
];

export interface DurationBucket {
  key: string;
  label: string;
  match: (minutes: number | undefined) => boolean;
}

export const DURATION_BUCKETS: DurationBucket[] = [
  { key: "any", label: "Any length", match: () => true },
  { key: "short", label: "Under 60 min", match: (m) => m != null && m < 60 },
  { key: "mid", label: "60–90 min", match: (m) => m != null && m >= 60 && m <= 90 },
  { key: "long", label: "Over 90 min", match: (m) => m != null && m > 90 },
];

export function normalizeText(value: string): string {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]/g, "").trim();
}

export interface ServiceFilterState {
  query: string;
  categoryIds: Set<string>;
  durationKey: string;
  sort: ServiceSortKey;
}

export function filterAndSortServices(
  services: Product[],
  { query, categoryIds, durationKey, sort }: ServiceFilterState,
): Product[] {
  const normalizedQuery = normalizeText(query);
  const bucket = DURATION_BUCKETS.find((b) => b.key === durationKey) ?? DURATION_BUCKETS[0];

  const filtered = services.filter((service) => {
    if (categoryIds.size > 0) {
      if (!service.category_id || !categoryIds.has(service.category_id)) return false;
    }
    if (!bucket.match(service.duration_minutes)) return false;
    if (!normalizedQuery) return true;
    return normalizeText(
      [service.name, service.slug, service.description].filter(Boolean).join(" "),
    ).includes(normalizedQuery);
  });

  return filtered.sort((a, b) => {
    if (sort === "price-asc") return Number(a.default_price) - Number(b.default_price);
    if (sort === "price-desc") return Number(b.default_price) - Number(a.default_price);
    if (sort === "duration-asc")
      return (a.duration_minutes ?? Infinity) - (b.duration_minutes ?? Infinity);
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });
}
