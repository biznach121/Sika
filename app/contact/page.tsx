import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Contact — ${brand.name}`,
  description: brand.contactPage.body,
};

export default function ContactPage() {
  const c = brand.contactPage;
  return (
    <article className="spabox-page">
      <div className="spabox-shell">
        <header className="spabox-hero">
          <p className="spabox-eyebrow">{c.eyebrow}</p>
          <h1 className="spabox-title">{c.title}</h1>
          <p className="spabox-lede">{c.body}</p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-start">
          <div className="spabox-card p-5 sm:p-7">
            <ContactForm reasons={c.reasons} />
          </div>
          <aside className="grid gap-5">
            <div className="spabox-card p-6 sm:p-8">
              <p className="spabox-eyebrow">Direct lines</p>
              <ul className="m-0 list-none space-y-4 p-0">
                {c.directLines.map((line) => (
                  <li key={line.label}>
                    <p className="m-0 text-[12px] font-semibold uppercase text-[#688255]">
                      {line.label}
                    </p>
                    <a
                      href={line.href}
                      className="text-[18px] font-semibold text-[#422900] transition-colors hover:text-[#688255]"
                    >
                      {line.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="spabox-card p-6 sm:p-8">
              <p className="spabox-eyebrow">Visit</p>
              <p className="m-0 text-[22px] font-semibold text-[#422900]">{brand.contact.address}</p>
              <p className="mt-2 text-[14px] font-medium text-[#4e3809]/72">{brand.contact.hours}</p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
