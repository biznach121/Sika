"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const highlights = [
  {
    label: "Lashes",
    href: "/services",
    image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780683826/hypyfgenkouympcgvexi.jpg",
    alt: "Close-up lash beauty treatment",
  },
  {
    label: "Pedicure",
    href: "/services",
    image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780683449/hzac8bb7wgpx2n0lahad.jpg",
    alt: "Pedicure spa care",
  },
  {
    label: "Massage",
    href: "/categories/massage",
    image: "https://static-tmp.cimplify.io/seed/services/swedish-massage-60.jpg",
    alt: "Relaxing massage therapy",
  },
  {
    label: "Manicure",
    href: "/services",
    image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780683450/d6qkoq7uzw1xdclrlpkb.jpg",
    alt: "Detailed manicure and nail care",
  },
  {
    label: "Brows",
    href: "/services",
    image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780683450/qrnxmq7a4k6hqutqivfi.jpg",
    alt: "Brow grooming treatment",
  },
  {
    label: "Waxing",
    href: "/services",
    image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780683646/tkcieiku8dp4qbmriwvy.jpg",
    alt: "Waxing beauty treatment",
  },
  {
    label: "Piercing",
    href: "/services",
    image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780683449/jmjdbjirlzmylxymnbbm.jpg",
    alt: "Piercing styling detail",
  },
  {
    label: "Facials",
    href: "/categories/facial",
    image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780683825/sdssypcxmpybmgthvoww.jpg",
    alt: "Calm facial treatment",
  },
];

export function ServiceHighlights() {
  const listRef = useRef<HTMLDivElement>(null);

  function scrollHighlights(direction: "previous" | "next") {
    listRef.current?.scrollBy({
      left: direction === "previous" ? -520 : 520,
      behavior: "smooth",
    });
  }

  return (
    <section className="bg-[#c9d9c0] px-4 py-14 text-[#422900] sm:px-8">
      <div className="mx-auto max-w-[1340px]">
        <h2 className="m-0 mb-10 text-center font-serif text-[42px] font-light leading-[0.92] tracking-normal text-[#422900] sm:text-[58px] lg:text-[72px]">
          Book any of our services
        </h2>
        <div className="relative">
          <button
            type="button"
            aria-label="Previous services"
            onClick={() => scrollHighlights("previous")}
            className="absolute left-0 top-[82px] z-10 flex h-11 w-11 -translate-x-2 items-center justify-center rounded-full bg-[#422900] text-[#ebf4e5] shadow-[0_12px_32px_rgba(66, 41, 0,0.18)] transition-transform hover:scale-105 sm:-translate-x-1/2"
          >
            <ArrowIcon direction="previous" />
          </button>

          <div
            ref={listRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-10 pb-2 sm:gap-10 sm:px-14"
          >
            {highlights.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="service-highlight group grid min-w-[172px] snap-center justify-items-center gap-5 text-center sm:min-w-[208px]"
              >
                <span className="service-highlight-frame relative flex h-[172px] w-[172px] items-center justify-center rounded-full p-[9px] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03] sm:h-[208px] sm:w-[208px]">
                  <span className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-[#ebf4e5] p-[7px] shadow-[inset_0_0_0_1px_rgba(66, 41, 0,0.1)]">
                    <span className="relative block h-full w-full overflow-hidden rounded-full bg-[#bfcfb1]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 640px) 208px, 172px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.24))]" />
                    </span>
                  </span>
                </span>
                <span className="text-[18px] font-semibold leading-none text-[#422900]/86 sm:text-[20px]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next services"
            onClick={() => scrollHighlights("next")}
            className="absolute right-0 top-[82px] z-10 flex h-11 w-11 translate-x-2 items-center justify-center rounded-full bg-[#422900] text-[#ebf4e5] shadow-[0_12px_32px_rgba(66, 41, 0,0.18)] transition-transform hover:scale-105 sm:translate-x-1/2"
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-5 w-5 ${direction === "previous" ? "rotate-180" : ""}`}
    >
      <path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
