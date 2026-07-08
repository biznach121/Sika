"use client";

import { useCartDrawer } from "@cimplify/sdk/react";
import { useCartCount } from "@/lib/cart";

/**
 * Cart pill — dynamic island. Reads the live cart count via the SDK and
 * opens the side cart drawer on click (instead of navigating to /cart).
 * Wrap in `<Suspense fallback={<CartPillSkeleton/>}>` so the cached
 * header chrome streams without blocking on the cart fetch.
 */
export function CartPill() {
  const { count } = useCartCount();
  const { open } = useCartDrawer();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative grid h-11 w-10 place-items-center text-[#422900] transition-transform hover:scale-105"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-6 w-6"
      >
        <path d="M6.5 8.5h11l-1 9h-9z" />
        <path d="M9 8.5a3 3 0 0 1 6 0" />
      </svg>
      <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full border border-[#422900]/55 bg-[#ebf4e5] px-1 text-[10px] font-bold leading-none text-[#422900]">
        {count}
      </span>
    </button>
  );
}

export function CartPillSkeleton() {
  return (
    <span
      aria-hidden
      className="inline-flex h-11 w-10 items-center justify-center text-[#422900]"
    />
  );
}
