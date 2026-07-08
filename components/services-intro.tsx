import { brand } from "@/lib/brand";

export function ServicesIntro() {
  return (
    <section className="relative isolate overflow-hidden bg-[#e0e9da] px-6 pb-12 pt-8 text-[#422900] sm:px-8">
      <svg
        className="pointer-events-none absolute -right-16 -top-36 z-0 h-72 w-72 text-[#808769]/28"
        viewBox="0 0 320 320"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M307 83C244 31 151 23 93 75C36 126 43 218 105 263C167 309 260 287 300 221C339 155 309 66 240 35"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <h2 className="relative z-10 m-0 text-center font-serif text-[84px] font-light leading-none tracking-normal sm:text-[112px]">
        {brand.servicesIntro.title}
      </h2>
    </section>
  );
}
