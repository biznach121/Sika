"use client";

import Image from "next/image";
import Link from "next/link";
import { formatMoney, PRODUCT_TYPE, type Product } from "@cimplify/sdk";

interface Props {
  product: Product;
}

export function StoreProductCard({ product }: Props) {
  const slug = product.slug || product.id;
  const href = `?product=${encodeURIComponent(slug)}`;
  const image = product.image_url || product.images?.[0];
  const isService = product.type === PRODUCT_TYPE.Service;
  const description = stripHtml(product.description ?? "");
  const duration = product.duration_minutes
    ? `${product.duration_minutes} min`
    : product.duration_value && product.duration_unit
      ? `${product.duration_value} ${product.duration_unit}`
      : null;

  return (
    <article className="group relative h-full overflow-hidden rounded-[24px] border border-[#422900]/10 bg-[#ebf4e5] shadow-[0_18px_54px_rgba(66, 41, 0,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(66, 41, 0,0.14)] sm:rounded-[30px]">
      <Link href={href} scroll={false} prefetch={false} className="block h-full">
        <div className="relative aspect-[1.22] overflow-hidden bg-[#c9d9c0] sm:aspect-[1.05]">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
              className="object-cover transition duration-700 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,#ebf4e5,#c9d9c0_52%,#abc09e)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(66, 41, 0,0.02),rgba(66, 41, 0,0.28))]" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#ebf4e5]/92 px-3 py-1 text-[11px] font-bold uppercase text-[#422900] shadow-[0_8px_24px_rgba(66, 41, 0,0.12)]">
              {isService ? "Service" : "Product"}
            </span>
            {duration ? (
              <span className="rounded-full bg-[#422900]/82 px-3 py-1 text-[11px] font-bold uppercase text-[#ebf4e5]">
                {duration}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid min-h-[190px] content-between gap-5 p-5 sm:min-h-[230px] sm:gap-6 sm:p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="m-0 max-w-[260px] font-serif text-[38px] font-light leading-[0.88] tracking-normal text-[#422900] sm:text-[34px]">
                {product.name}
              </h2>
              <p className="m-0 shrink-0 pt-1 font-serif text-[22px] font-light leading-none text-[#688255] sm:text-[24px]">
                {formatMoney(product.default_price)}
              </p>
            </div>
            {description ? (
              <p className="mt-4 line-clamp-spabox text-[14px] font-medium leading-[1.45] text-[#4e3809]/72">
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[#422900]/10 pt-4">
            <span className="text-[12px] font-bold uppercase text-[#688255]">
              {isService ? "View service" : "View details"}
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#422900] text-[#ebf4e5] transition duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function ArrowIcon() {
  return (
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
      <path d="M5 12h13" />
      <path d="m12 6 6 6-6 6" />
    </svg>
  );
}
