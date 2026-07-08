import type { BrandPolicySection } from "@/lib/brand";

interface PolicyShape {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  sections: BrandPolicySection[];
}

/**
 * Shared layout for shipping / returns / accessibility / terms / privacy.
 * Reads a `{ eyebrow, title, lastUpdated, sections[] }` block from brand.
 */
export function PolicyPage({ policy }: { policy: PolicyShape }) {
  return (
    <article className="spabox-page">
      <div className="spabox-shell max-w-[980px]">
        <header className="spabox-hero">
          <p className="spabox-eyebrow">{policy.eyebrow}</p>
          <h1 className="spabox-title">{policy.title}</h1>
          {policy.lastUpdated && (
            <p className="spabox-lede text-[15px]">Last updated: {policy.lastUpdated}</p>
          )}
        </header>
        <section className="mt-8 grid gap-5">
          {policy.sections.map((s) => (
            <div key={s.heading} className="spabox-card p-6 sm:p-8">
              <h2 className="m-0 font-serif text-[30px] font-light leading-none text-[#422900]">
                {s.heading}
              </h2>
              {typeof s.body === "string" ? (
                <p className="m-0 mt-4 text-[16px] font-medium leading-relaxed text-[#4e3809]/82">
                  {s.body}
                </p>
              ) : (
                <>
                  <p className="m-0 mt-4 text-[16px] font-medium leading-relaxed text-[#4e3809]/82">
                    {s.body.intro}
                  </p>
                  <ul className="mt-4 space-y-2 pl-5 text-[16px] font-medium leading-relaxed text-[#4e3809]/82">
                    {s.body.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </section>
      </div>
    </article>
  );
}
