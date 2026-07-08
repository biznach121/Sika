"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "./nav-link";
import { NavDropdown, type NavMenu } from "./nav-dropdown";
import { CartPill, CartPillSkeleton } from "./cart-pill";
import { MobileNav } from "./mobile-nav";
import { AccountPill } from "./account-pill";
import { SpaBoxLogo } from "./spa-box-logo";
import { brand } from "@/lib/brand";

/**
 * Server-rendered header chrome. Brand mark + nav layout streams from the
 * cache; the active-link styling and live cart count are dynamic islands
 * mounted in their own Suspense boundaries so the chrome never blocks.
 */
export function Header({ menus = [] }: { menus?: NavMenu[] }) {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <header
      data-site-header
      className="sticky top-0 z-30 flex items-center justify-between border-b border-[#422900]/10 bg-[#ebf4e5]/92 px-5 py-3 backdrop-blur-md sm:px-8"
    >
      <Link href="/" className="text-foreground">
        <SpaBoxLogo compact tone="dark" className="h-[52px] w-[150px]" />
      </Link>
      <div className="flex items-center gap-3 sm:gap-6">
        <nav className="hidden sm:flex items-center gap-6">
          {brand.header.nav.map((link) => {
            const item = (
              <Suspense fallback={<NavLinkFallback>{link.label}</NavLinkFallback>}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </Suspense>
            );
            const menu = menus.find((m) => m.href === link.href);
            return menu ? (
              <NavDropdown key={link.href} menu={menu}>
                {item}
              </NavDropdown>
            ) : (
              <span key={link.href} className="flex items-center">
                {item}
              </span>
            );
          })}
        </nav>
        <AccountPill />
        <Suspense fallback={<CartPillSkeleton />}>
          <CartPill />
        </Suspense>
        <div className="sm:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function NavLinkFallback({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[13px] font-medium tracking-wide text-muted-foreground">
      {children}
    </span>
  );
}
