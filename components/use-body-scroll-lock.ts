"use client";

import { useEffect } from "react";

let lockCount = 0;

/**
 * Ref-counted body scroll lock via a data attribute (styled in globals.css).
 *
 * Deliberately NOT `document.body.style.overflow`: the SDK's cart drawer
 * saves and restores that inline style around its own open/close. If one of
 * our overlays set it too, the drawer could snapshot `"hidden"` while our
 * overlay was open and restore it after everything closed — leaving the page
 * permanently unscrollable (e.g. add to cart from the product modal, then
 * navigate back). Two independent mechanisms can't clobber each other.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockCount += 1;
    document.body.setAttribute("data-scroll-locked", "");
    return () => {
      lockCount -= 1;
      if (lockCount <= 0) {
        lockCount = 0;
        document.body.removeAttribute("data-scroll-locked");
      }
    };
  }, [active]);
}
