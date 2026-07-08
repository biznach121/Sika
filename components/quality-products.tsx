"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatMoney, type Product as CatalogueProduct } from "@cimplify/sdk";
import { useCart, useCartDrawer } from "@cimplify/sdk/react";
import { brand } from "@/lib/brand";
import { QualityVines } from "@/components/home-vines";
import { withDefaultVariant } from "@/lib/cart-options";

export function QualityProducts({
  catalogueProducts = [],
}: {
  catalogueProducts?: CatalogueProduct[];
}) {
  const products = useMemo(
    () => catalogueProducts.filter((product) => product.type === "product"),
    [catalogueProducts],
  );
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const sectionRef = useRef<HTMLElement>(null);

  // Start the gated vine growth when the section scrolls into view
  // (same .is-visible convention as the wellness manifesto).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const visible = useMemo(() => {
    if (products.length === 0) return [];
    if (products.length === 1) return [products[0]];
    return [products[index], products[(index + 1) % products.length]];
  }, [index, products]);

  if (products.length === 0) return null;

  const goPrevious = () => {
    setDirection("previous");
    setIndex((current) => (current - 1 + products.length) % products.length);
  };

  const goNext = () => {
    setDirection("next");
    setIndex((current) => (current + 1) % products.length);
  };

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-[#e0e9da] px-4 pb-20 pt-12 text-[#422900] sm:px-8 lg:pb-28">
      <QualityVines />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="flex items-start justify-center">
          <h2 className="m-0 max-w-[820px] text-center font-serif text-[54px] font-light leading-[0.82] tracking-normal sm:text-[96px] lg:text-[112px]">
            {brand.qualityProducts.title}
          </h2>
        </div>

        <div
          key={`${index}-${direction}`}
          className={`product-carousel-track product-carousel-track-${direction} mx-auto mt-10 grid max-w-[980px] gap-8 sm:mt-14 lg:grid-cols-2 lg:items-end lg:gap-10`}
        >
          {visible.map((product, position) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              position={position}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <CarouselButton
            label="Previous product"
            onClick={goPrevious}
            direction="previous"
            disabled={products.length < 2}
          />
          <span className="text-[13px] font-semibold text-[#422900]/70">
            {index + 1} / {products.length}
          </span>
          <CarouselButton
            label="Next product"
            onClick={goNext}
            direction="next"
            disabled={products.length < 2}
          />
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  position,
}: {
  product: CatalogueProduct;
  position: number;
}) {
  const isOlive = position % 2 === 1;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const { open } = useCartDrawer();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  const displayPrice = formatMoney(product.default_price);
  const description = stripHtml(product.description ?? "");
  const image = product.image_url || product.images?.[0];
  const subtitle = description || "Live catalogue product";

  const handleBuy = async () => {
    if (isAdding) return;
    setIsAdding(true);
    setError(false);
    try {
      await addItem(product, 1, withDefaultVariant(product));
      setAdded(true);
      open();
      window.setTimeout(() => setAdded(false), 2200);
    } catch {
      setError(true);
    } finally {
      setIsAdding(false);
    }
  };

  const openDetails = () => {
    const next = new URLSearchParams(searchParams?.toString() ?? "");
    next.set("product", product.slug || product.id);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetails();
        }
      }}
      className={[
        "relative min-h-[560px] cursor-pointer overflow-hidden rounded-[180px] border border-white/25 px-7 pb-8 pt-[82px] shadow-[0_24px_70px_rgba(66, 41, 0,0.08)] transition-transform hover:-translate-y-1 sm:h-[660px] sm:rounded-[240px] sm:px-12 sm:pt-[104px] lg:h-[720px] lg:px-14 lg:pt-[112px]",
        position === 0 ? "lg:translate-y-[-16px]" : "hidden lg:block lg:translate-y-[24px]",
        isOlive ? "bg-[#688255] text-white" : "bg-[#c9d9c0] text-[#422900]",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute inset-3 rounded-[inherit] border",
          isOlive ? "border-white/16" : "border-[#422900]/10",
        ].join(" ")}
      />
      <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0 max-w-[260px]">
          <h3 className="m-0 whitespace-pre-line break-words font-serif text-[28px] font-light leading-[0.92] tracking-normal sm:text-[34px] lg:text-[38px]">
            {product.name}
          </h3>
          <p className="mt-2 text-[14px] font-semibold leading-tight opacity-[0.82] sm:text-[15px]">
            {subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            void handleBuy();
          }}
          disabled={isAdding}
          aria-label={`Add ${product.name} to cart`}
          className={[
            "mt-1 inline-flex h-11 w-14 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold uppercase transition-transform hover:scale-105 sm:mt-3",
            isAdding ? "cursor-not-allowed opacity-60" : "",
            isOlive ? "bg-[#eaf1e6] text-[#557147]" : "bg-[#422900] text-white",
          ].join(" ")}
        >
          {isAdding ? "..." : added ? "In" : "Buy"}
        </button>
      </div>

      <div className="relative z-10 mt-6 max-w-[265px] space-y-3 sm:mt-7">
        <PriceLine price={displayPrice} note="Live catalogue product" />
        {error ? (
          <p className="m-0 text-[12px] font-semibold text-red-950/80">
            Could not add. Try again.
          </p>
        ) : null}
      </div>

      <div
        className={[
          "absolute inset-x-0 bottom-7 mx-auto h-[235px] w-[84%] overflow-hidden rounded-[999px] shadow-[0_18px_44px_rgba(66, 41, 0,0.18)] sm:bottom-9 sm:h-[300px] sm:w-[80%] lg:h-[330px]",
          isOlive ? "bg-[#557147]" : "bg-[#afc7a3]",
        ].join(" ")}
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 44vw, 90vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,#ebf4e5,#c9d9c0_52%,#abc09e)]" />
        )}
      </div>
    </article>
  );
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function PriceLine({
  price,
  compareAt,
  note,
}: {
  price: string;
  compareAt?: string;
  note: string;
}) {
  return (
    <div>
      <p className="m-0 flex flex-wrap items-baseline gap-3 font-serif text-[22px] font-light leading-none tracking-normal sm:text-[24px]">
        <span>{price}</span>
        {compareAt ? (
          <span className="font-sans text-[13px] font-semibold line-through opacity-70">
            {compareAt}
          </span>
        ) : null}
      </p>
      <p className="m-0 mt-1 text-[12px] font-semibold opacity-80 sm:text-[13px]">{note}</p>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  direction,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  direction: "previous" | "next";
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full border border-[#422900]/35 text-[#422900] transition-colors hover:bg-[#422900] hover:text-[#e0e9da] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#422900]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={direction === "previous" ? "h-5 w-5 rotate-180" : "h-5 w-5"}
      >
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </button>
  );
}

