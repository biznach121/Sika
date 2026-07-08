"use client";

import Link from "next/link";
import { useCimplifySession } from "@cimplify/sdk/react";

const HERO_TEXT_LINK =
  "relative inline-flex h-9 items-center text-[11px] font-semibold uppercase text-white/82 transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:text-white hover:after:scale-x-100";

export function HeroAuthLink() {
  const { session, loading } = useCimplifySession();

  if (loading) {
    return <span className="h-9 w-12" aria-hidden />;
  }

  return (
    <Link href={session ? "/account" : "/login"} className={HERO_TEXT_LINK}>
      {session ? "Account" : "Login"}
    </Link>
  );
}
