"use client";

import { useCartDrawer } from "@cimplify/sdk/react";
import { useCartCount } from "@/lib/cart";

export function HeroCartButton() {
  const { count } = useCartCount();
  const { open } = useCartDrawer();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="grid h-9 w-9 place-items-center text-white/82 transition-colors hover:text-white"
    >
      <span className="relative block h-5 w-5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M6.5 8.5h11l-1 9h-9z" />
          <path d="M9 8.5a3 3 0 0 1 6 0" />
        </svg>
        {count > 0 ? (
          <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-white px-1 text-[10px] font-semibold leading-none text-[#4d321e]">
            {count}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export function HeroCartButtonSkeleton() {
  return (
    <span
      aria-hidden
      className="block h-9 w-9"
    />
  );
}
