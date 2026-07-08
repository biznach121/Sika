"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";

/**
 * Media carousel — the vendor's own TikTok clips. Shows ~3 tall cards at a
 * time; the arrows slide the track by one card (scroll-snap), so the next
 * clip appears on the right. Cards are portrait (clips are vertical) and
 * large. The "Follow" button is a pill linking to the vendor's social.
 */
export function MediaGallery() {
  const items = brand.media.images;
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-media-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth / 3;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#e0e9da] px-4 pb-24 pt-14 text-[#422900] sm:px-8">
      <svg
        className="pointer-events-none absolute -left-16 -top-36 z-0 h-96 w-[520px] text-[#808769]/28"
        viewBox="0 0 520 380"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M38 7C143 151 256 184 375 111C474 50 529 133 451 213C331 336 157 260 89 153C33 65 75 -2 186 41C287 80 285 174 184 180C74 187 6 103 38 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="m-0 font-serif text-[64px] font-light leading-[0.9] tracking-normal sm:text-[88px] lg:text-[104px]">
            {brand.media.title}
          </h2>

          <div className="flex items-center gap-3">
            <Link
              href={brand.media.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-[#422900] pl-7 pr-6 text-[14px] font-semibold uppercase tracking-[0.12em] text-[#ebf4e5] shadow-[0_14px_34px_rgba(66, 41, 0,0.22)] transition-transform duration-300 hover:scale-[1.04]"
            >
              {brand.media.ctaLabel}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ebf4e5]/18 transition-transform duration-300 group-hover:translate-x-0.5">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            {items.length > 3 && (
              <div className="hidden items-center gap-2 sm:flex">
                <CarouselButton dir={-1} disabled={atStart} onClick={() => scrollByCard(-1)} />
                <CarouselButton dir={1} disabled={atEnd} onClick={() => scrollByCard(1)} />
              </div>
            )}
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1"
        >
          {items.map((image) => {
            const isVideo = image.src.endsWith(".mp4");
            return (
              <div
                key={image.src}
                data-media-card
                className="relative aspect-[3/4] w-[80%] shrink-0 snap-start overflow-hidden rounded-[26px] bg-[#c9d9c0] shadow-[0_20px_54px_rgba(66, 41, 0,0.16)] sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]"
              >
                {isVideo ? (
                  <video
                    src={image.src}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: image.position }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={image.alt}
                  />
                ) : (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 80vw"
                    className="object-cover"
                    style={{ objectPosition: image.position }}
                    unoptimized
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  dir,
  disabled,
  onClick,
}: {
  dir: 1 | -1;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "Next" : "Previous"}
      className="grid h-14 w-14 place-items-center rounded-full border border-[#422900]/18 bg-[#ebf4e5] text-[#422900] transition-all duration-300 hover:border-[#422900] hover:bg-[#422900] hover:text-[#ebf4e5] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#422900]/18 disabled:hover:bg-[#ebf4e5] disabled:hover:text-[#422900]"
    >
      <svg viewBox="0 0 24 24" fill="none" className={`h-5 w-5 ${dir === -1 ? "rotate-180" : ""}`} aria-hidden="true">
        <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
