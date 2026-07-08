"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Hover mega-menu for header nav links (Products / Services). The trigger
 * stays a real link; hovering (or keyboard-focusing) reveals a panel with a
 * few catalogue items — image, name, price/duration — plus a "view all" row.
 * Items are fetched server-side in app/layout.tsx and passed down; which
 * links get a menu is configured in `brand.header.menus`.
 */

export interface NavMenuItem {
  name: string;
  href: string;
  image: string | null;
  meta: string;
}

export interface NavMenu {
  href: string;
  eyebrow: string;
  viewAllLabel: string;
  items: NavMenuItem[];
}

export function NavDropdown({
  menu,
  children,
  tone = "dark",
  align = "center",
}: {
  menu: NavMenu;
  children: React.ReactNode;
  /** "light" for triggers on dark imagery (the home hero nav). */
  tone?: "dark" | "light";
  /** "left" anchors the panel to the trigger's left edge (near-edge navs). */
  align?: "center" | "left";
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small close delay so the pointer can travel trigger → panel.
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 170);
  };
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  return (
    <div
      className="relative flex items-center gap-1"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocusCapture={openNow}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closeSoon();
        }
      }}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={`pointer-events-none h-3 w-3 transition-transform duration-300 ${
          tone === "light" ? "text-white/70" : "text-[#688255]"
        } ${open ? "rotate-180" : ""}`}
      >
        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div
        aria-hidden={!open}
        className={`absolute top-full z-40 mt-4 w-[440px] rounded-[26px] border border-[#422900]/10 bg-[#ebf4e5]/96 p-3 text-left normal-case shadow-[0_30px_80px_rgba(66, 41, 0,0.24)] backdrop-blur-xl transition-all duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] ${
          align === "left" ? "left-0 origin-top-left" : "left-1/2 origin-top -translate-x-1/2"
        } ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.97] opacity-0"
        }`}
      >
        <p className="m-0 px-3 pb-2 pt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#688255]">
          {menu.eyebrow}
        </p>

        <div className="flex flex-col">
          {menu.items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-4 rounded-[20px] px-3 py-2.5 transition-all duration-300 hover:bg-[#422900]/[0.06] ${
                open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${60 * i + 50}ms` : "0ms" }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="h-[84px] w-[84px] shrink-0 rounded-[18px] object-cover shadow-[0_10px_26px_rgba(66, 41, 0,0.16)] ring-1 ring-[#422900]/10 transition-transform duration-300 group-hover:scale-[1.05]"
                />
              ) : (
                <span className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-[18px] bg-[#c9d9c0] text-2xl">
                  ✦
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-[#422900]">
                  {item.name}
                </span>
                <span className="mt-1 block text-[13px] font-medium text-[#688255]">
                  {item.meta}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="-translate-x-1 text-sm text-[#422900] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-3 my-2 border-t border-[#422900]/10" />
        <Link
          href={menu.href}
          onClick={() => setOpen(false)}
          className="group flex items-center justify-between rounded-[16px] px-3.5 py-2.5 text-sm font-semibold text-[#422900] transition-colors hover:bg-[#422900] hover:text-[#ebf4e5]"
        >
          {menu.viewAllLabel}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
