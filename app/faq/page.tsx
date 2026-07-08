import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `FAQ — ${brand.name}`,
  description: "Booking, services, beauty products, location, and payments — answers to the questions we hear most often.",
};

export default function FaqPage() {
  const f = brand.faq;
  return (
    <article className="spabox-page">
      <div className="spabox-shell">
        <header className="spabox-hero">
          <p className="spabox-eyebrow">{f.eyebrow}</p>
          <h1 className="spabox-title">{f.title}</h1>
          <p className="spabox-lede">
            Booking, services, products, location, and payments in one calm place.
          </p>
        </header>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {f.sections.map((section) => (
          <section key={section.title} className="spabox-card p-6 sm:p-7">
            <h2 className="m-0 mb-6 font-serif text-[32px] font-light leading-none text-[#422900]">
              {section.title}
            </h2>
            <dl className="space-y-6">
              {section.items.map((item) => (
                <div key={item.q}>
                  <dt className="mb-2 font-semibold text-[#422900]">{item.q}</dt>
                  <dd className="m-0 text-[15px] font-medium leading-relaxed text-[#4e3809]/76">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
        <p className="mt-8 border-t border-[#422900]/12 pt-7 text-[15px] font-medium text-[#4e3809]/76">
          {f.contactPrompt}{" "}
          <a href={`mailto:${f.contactEmail}`} className="font-semibold text-[#422900] hover:underline">
            {f.contactEmail}
          </a>
        </p>
      </div>
    </article>
  );
}
