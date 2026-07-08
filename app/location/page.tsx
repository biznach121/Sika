import type { Metadata } from "next";
import { brand } from "@/lib/brand";

// Exact pin when the brand provides one; otherwise a name+city search works
// for any business without coordinates.
const mapsQuery = encodeURIComponent(`${brand.name} ${brand.contact.city} Ghana`);
const mapsUrl =
  brand.contact.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const mapsEmbed =
  brand.contact.mapsEmbed ?? `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`;

export const metadata: Metadata = {
  title: `Location — ${brand.name}`,
  description: `Find ${brand.name} in ${brand.contact.city}.`,
};

export default function LocationPage() {
  return (
    <main className="bg-[#e0e9da] text-[#422900]">
      <section className="mx-auto grid min-h-[calc(100svh-120px)] max-w-6xl gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-20">
        <div>
          <p className="m-0 mb-4 text-[12px] font-semibold uppercase text-[#688255]">
            Visit us
          </p>
          <h1 className="m-0 font-serif text-[48px] font-light leading-[0.88] tracking-normal sm:text-[76px] lg:text-[92px]">
            {brand.name},
            <br />
            {brand.contact.city}
          </h1>
          <p className="mt-6 max-w-[420px] text-[16px] font-medium leading-[1.4] text-[#4e3809]/80 sm:mt-7 sm:text-[18px]">
            {brand.microTag}. Tap below to open the shop location in Google Maps.
          </p>

          <div className="mt-9 grid gap-3 text-[17px] font-semibold text-[#422900]/82">
            <a href={`tel:${brand.contact.phoneTel}`} className="transition-colors hover:text-[#688255]">
              Call {brand.contact.phone}
            </a>
            {brand.contact.textPhone ? (
              <a
                href={`sms:${brand.contact.textPhoneTel ?? brand.contact.phoneTel}`}
                className="transition-colors hover:text-[#688255]"
              >
                Text {brand.contact.textPhone}
              </a>
            ) : null}
            <p className="m-0">{brand.contact.city}, Ghana</p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex h-14 items-center justify-center bg-[#422900] px-7 text-[13px] font-semibold uppercase text-[#ebf4e5] transition-transform hover:scale-105"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#422900]/12 bg-[#c9d9c0] shadow-[0_26px_80px_rgba(66, 41, 0,0.12)] sm:rounded-[28px]">
          <iframe
            title={`${brand.name} location map`}
            src={mapsEmbed}
            className="h-[360px] w-full border-0 sm:h-[560px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
