import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export function ServiceBands() {
  return (
    <section className="h-svh bg-[#e0e9da] px-1 pb-1 text-white">
      <div className="mx-auto grid h-full max-w-[1680px] grid-rows-3 overflow-hidden">
        {brand.serviceBands.map((service) => (
          <article
            key={service.title}
            className="group relative min-h-0 overflow-hidden border-t-[18px] border-[#e0e9da] first:border-t-0"
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ objectPosition: service.imagePosition }}
              unoptimized
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43, 24, 0,0.52),rgba(43, 24, 0,0.18)_36%,rgba(43, 24, 0,0.02)_72%)]" />
            <div className="relative z-10 flex h-full flex-col justify-center px-9 py-7 sm:px-16 lg:px-[11%]">
              <h2 className="m-0 font-serif text-[70px] font-light leading-[0.8] tracking-normal text-white sm:text-[92px] lg:text-[112px]">
                {service.title}
              </h2>
              <Link
                href={service.href}
                className="mt-8 inline-flex w-fit items-center gap-5 text-[#3f312b]"
              >
                <ServiceGlyph />
                <span className="inline-flex h-14 items-center bg-[#eaf1e6]/92 px-7 text-[13px] font-semibold uppercase transition-colors group-hover:bg-white sm:h-16 sm:px-9">
                  {service.ctaLabel}
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceGlyph() {
  return (
    <svg
      viewBox="0 0 16 48"
      fill="none"
      aria-hidden="true"
      className="h-12 w-4 text-white"
    >
      <path
        d="M8 0C8 16 5.4 22.4 0 24C5.4 25.6 8 32 8 48C8 32 10.6 25.6 16 24C10.6 22.4 8 16 8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
