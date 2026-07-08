import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `About — ${brand.name}`,
  description: brand.description,
};

export default function AboutPage() {
  const a = brand.about;
  const titleParts = a.title.split("\n");
  return (
    <article className="spabox-page">
      <div className="spabox-shell">
        <header className="spabox-hero">
          <p className="spabox-eyebrow">{a.eyebrow}</p>
          <h1 className="spabox-title">
            {titleParts.map((line, i) => (
              <span key={line}>
                {line}
                {i < titleParts.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="spabox-lede">{a.paragraphs[0]}</p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="spabox-card p-6 sm:p-8">
            {a.paragraphs.slice(1).map((p) => (
              <p key={p} className="m-0 mb-5 text-[17px] font-medium leading-relaxed text-[#4e3809]/82 last:mb-0">
                {p}
              </p>
            ))}
          </div>
          <div className="grid gap-5">
            {a.sections.map((s) => (
              <section key={s.heading} className="spabox-card p-6 sm:p-8">
                <h2 className="m-0 font-serif text-[34px] font-light leading-none text-[#422900]">
                  {s.heading}
                </h2>
                <p className="m-0 mt-4 text-[16px] font-medium leading-relaxed text-[#4e3809]/82">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
