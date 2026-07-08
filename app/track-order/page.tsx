import type { Metadata } from "next";
import { TrackOrderForm } from "./track-order-form";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Track an order — ${brand.name}`,
  description: brand.trackOrder.body,
};

export default function TrackOrderPage() {
  const t = brand.trackOrder;
  return (
    <article className="spabox-page">
      <div className="spabox-shell max-w-[820px]">
        <header className="spabox-hero">
          <p className="spabox-eyebrow">{t.eyebrow}</p>
          <h1 className="spabox-title">{t.title}</h1>
          <p className="spabox-lede">{t.body}</p>
        </header>
        <div className="spabox-card mt-8 p-5 sm:p-7">
          <TrackOrderForm />
        </div>
      </div>
    </article>
  );
}
