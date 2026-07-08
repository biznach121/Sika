"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ProductSheet, useProduct, useCart } from "@cimplify/sdk/react";
import { useBodyScrollLock } from "@/components/use-body-scroll-lock";
import { withDefaultVariant } from "@/lib/cart-options";

/**
 * URL-driven product modal. Reads `?product=<slug>` and renders the SDK's
 * `<ProductSheet/>` — vertical layout with image-on-top, then header, then
 * the variant/add-on/composite/bundle customizer. Closing the modal clears
 * the search param. Deep-linkable and survives reloads.
 */
export function ProductModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slug = searchParams?.get("product") ?? null;

  const { product } = useProduct(slug ?? "", { enabled: Boolean(slug) });
  const { addItem } = useCart();

  useBodyScrollLock(Boolean(slug));

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!slug) return null;

  function close() {
    const next = new URLSearchParams(searchParams?.toString() ?? "");
    next.delete("product");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={close}
      className="fixed inset-0 z-[320] flex items-end justify-center bg-[#422900]/52 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="no-scrollbar spabox-product-modal relative max-h-[92svh] w-full overflow-y-auto rounded-t-[30px] bg-[#ebf4e5] text-[#422900] shadow-[0_28px_90px_rgba(66, 41, 0,0.28)] sm:max-w-[560px] sm:rounded-[30px]"
      >
        <button
          onClick={close}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#422900]/12 bg-[#ebf4e5]/92 text-[#422900] shadow-[0_10px_28px_rgba(66, 41, 0,0.12)] transition-colors hover:bg-[#c9d9c0]"
        >
          ✕
        </button>
        {product ? (
          <ProductSheet
            product={product}
            onClose={close}
            onAddToCart={async (p, qty, options) => {
              await addItem(p, qty, withDefaultVariant(p, options));
              close();
            }}
            renderImage={({ src, alt, className }) => (
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={900}
                className={className}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                priority
                unoptimized
              />
            )}
            classNames={{
              root: "p-5 sm:p-7 gap-5",
              image: "overflow-hidden -mx-5 sm:-mx-7 -mt-5 sm:-mt-7 mb-1 max-h-[330px] bg-[#c9d9c0]",
              header: "flex items-start justify-between gap-4",
              name: "font-serif text-[34px] leading-[0.9] font-light m-0 text-[#422900]",
              price: "shrink-0 text-lg font-bold text-[#688255]",
              description: "text-[15px] font-medium text-[#4e3809]/72 leading-relaxed",
              customizer: "pt-2",
            }}
          />
        ) : (
          <div className="p-8 text-center text-muted-foreground">Loading…</div>
        )}
      </div>
    </div>
  );
}
