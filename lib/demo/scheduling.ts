import "server-only";

/**
 * Deterministic demo scheduling for DEMO_MODE.
 *
 * The SDK's stock mock ignores the requested date (8 hourly slots starting
 * 24h from "now"), so every other day in the booking widget showed
 * "No available slots". This generator answers per-date instead, with a
 * realistic pattern a prospect can actually click through:
 *
 *   - open Mon–Sat, 09:00–17:00, hourly start times
 *   - closed Sundays
 *   - roughly one weekday in eleven reads as fully booked
 *   - a few individual times per day are already "taken"
 *
 * Everything is hash-based on (service, date), never random — the same
 * calendar renders on every visit, SSR matches the browser, and it behaves
 * identically for every business this template is reskinned for.
 */

const OPEN_HOUR = 9; // first bookable start
const LAST_HOUR = 17; // last bookable start
const CLOSED_WEEKDAY = 0; // Sunday
const MAX_RANGE_DAYS = 31;

export interface DemoSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
  duration_minutes: number;
}

export interface DemoDayAvailability {
  date: string;
  slots: DemoSlot[];
  has_availability: boolean;
}

function hash(value: string): number {
  let h = 7;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function isFullyBooked(date: string): boolean {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return true;
  if (parsed.getUTCDay() === CLOSED_WEEKDAY) return true;
  return hash(date) % 11 === 0;
}

export function slotsForDay(
  serviceId: string,
  date: string | null,
  durationMinutes = 60,
): DemoSlot[] {
  if (!date || isFullyBooked(date)) return [];
  const slots: DemoSlot[] = [];
  for (let hour = OPEN_HOUR; hour <= LAST_HOUR; hour++) {
    if (hash(`${serviceId}|${date}|${hour}`) % 5 === 0) continue; // already taken
    const start = new Date(`${date}T${String(hour).padStart(2, "0")}:00:00Z`);
    slots.push({
      start_time: start.toISOString(),
      end_time: new Date(start.getTime() + durationMinutes * 60_000).toISOString(),
      is_available: true,
      duration_minutes: durationMinutes,
    });
  }
  return slots;
}

export function availabilityForRange(
  serviceId: string,
  startDate: string | null,
  endDate: string | null,
  durationMinutes = 60,
): DemoDayAvailability[] {
  if (!startDate) return [];
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate ?? startDate}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];

  const days: DemoDayAvailability[] = [];
  for (
    let cursor = new Date(start);
    cursor <= end && days.length < MAX_RANGE_DAYS;
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  ) {
    const date = cursor.toISOString().slice(0, 10);
    const slots = slotsForDay(serviceId, date, durationMinutes);
    days.push({ date, slots, has_availability: slots.length > 0 });
  }
  return days;
}
