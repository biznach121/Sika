"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { useBodyScrollLock } from "@/components/use-body-scroll-lock";

/**
 * Hamburger button + slide-in drawer for narrow viewports. Header hides
 * its inline nav links below `sm` and renders this in their place; the
 * cart pill stays in the header chrome.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useBodyScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="grid place-items-center w-11 h-11 -mr-2 rounded-md text-foreground hover:bg-muted transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[300] sm:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute inset-0 bg-[#422900]/28 backdrop-blur-sm"
          />
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-[340px] flex-col border-l border-[#422900]/12 bg-[#ebf4e5] text-[#422900] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#422900]/12 px-6 py-5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 -mr-2 place-items-center rounded-md text-[#422900] transition-colors hover:bg-[#c9d9c0]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col gap-1 bg-[#ebf4e5] px-4 py-5">
              {brand.header.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-4 text-base font-semibold text-[#422900] transition-colors hover:bg-[#c9d9c0]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
