import Link from "next/link";
import { SpaBoxLogo } from "./spa-box-logo";
import { brand } from "@/lib/brand";

function handleFromUrl(href: string): string {
  const seg = href.replace(/\/+$/, "").split("/").pop() ?? "";
  return seg.startsWith("@") ? seg : `@${seg}`;
}

export async function Footer() {
  const social = brand.socials[0];
  const serviceLinks = [
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Book", href: "/book" },
    { label: "Location", href: "/location" },
    ...(social ? [{ label: social.label, href: social.href }] : []),
  ];

  return (
    <footer className="bg-[#e0e9da] px-0 pb-0 pt-2 text-[#ebf4e5]">
      <div className="relative isolate min-h-[520px] overflow-hidden rounded-t-[64px] bg-[#688255] px-8 py-16 sm:px-14 lg:px-[9%]">
        <FooterLines />

        <div className="relative z-10 grid min-h-[390px] content-between gap-14">
          <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
            <div>
              <Link href="/" className="block w-fit uppercase leading-none">
                {brand.footer.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.footer.logoUrl}
                    alt={brand.name}
                    className="h-[96px] w-auto max-w-[220px] rounded-[18px] object-contain"
                  />
                ) : (
                  <SpaBoxLogo className="text-[#ebf4e5]/84" />
                )}
              </Link>

              <div className="mt-10 max-w-[310px] space-y-3 text-[17px] font-medium leading-[1.3] text-[#ebf4e5]/78">
                <p className="m-0">{brand.footer.blurb}</p>
                <p className="m-0">Call or text to book your appointment.</p>
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-[1.1fr_0.8fr_0.8fr]">
              <address className="not-italic">
                <p className="m-0 font-serif text-[48px] font-light leading-[0.86] tracking-normal text-[#ebf4e5]/90 sm:text-[64px] lg:text-[76px]">
                  {brand.name},
                  <br />
                  {brand.contact.city}
                </p>
                <Link
                  href="/book"
                  className="mt-8 inline-flex h-14 items-center justify-center bg-[#ebf4e5] px-7 text-[13px] font-semibold uppercase tracking-normal text-[#475f35] transition-transform hover:scale-105"
                >
                  Book now
                </Link>
              </address>

              <div className="grid content-start gap-4">
                <h2 className="m-0 font-sans text-[12px] font-semibold uppercase text-[#ebf4e5]/56">
                  Contact
                </h2>
                <a
                  href={`tel:${brand.contact.phoneTel}`}
                  className="footer-contact-line text-[20px] font-semibold leading-tight text-[#ebf4e5]/88 transition-colors hover:text-white"
                >
                  Call {brand.contact.phone}
                </a>
                {brand.contact.textPhone ? (
                  <a
                    href={`sms:${brand.contact.textPhoneTel ?? brand.contact.phoneTel}`}
                    className="footer-contact-line text-[20px] font-semibold leading-tight text-[#ebf4e5]/88 transition-colors hover:text-white"
                  >
                    Text {brand.contact.textPhone}
                  </a>
                ) : null}
                <p className="footer-contact-line m-0 text-[20px] font-semibold leading-tight text-[#ebf4e5]/88">
                  {brand.contact.city}, Ghana
                </p>
                {social ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-contact-line text-[20px] font-semibold leading-tight text-[#ebf4e5]/88 transition-colors hover:text-white"
                  >
                    {social.label} {handleFromUrl(social.href)}
                  </a>
                ) : null}
              </div>

              <nav className="grid content-start gap-4" aria-label="Footer">
                <h2 className="m-0 font-sans text-[12px] font-semibold uppercase text-[#ebf4e5]/56">
                  Explore
                </h2>
                <div className="grid gap-3 text-[16px] font-medium text-[#ebf4e5]/76">
                  {serviceLinks.map((link) =>
                    link.href.startsWith("http") ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </nav>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#ebf4e5]/18 pt-6 text-[13px] font-medium text-[#ebf4e5]/58 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0">
              &copy; {new Date().getFullYear()} {brand.name}. {brand.microTag.toLowerCase().replace(/^./, (c) => c.toUpperCase())}.
            </p>
            <div className="flex gap-5">
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLines() {
  return (
    <svg
      className="footer-lines pointer-events-none absolute inset-0 z-0 h-full w-full text-[#ebf4e5]/22"
      viewBox="0 0 1440 520"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M-104 244C177 327 447 316 635 248C809 185 693 72 523 158C356 243 500 386 761 437C1034 491 1319 433 1513 292"
        stroke="currentColor"
        strokeWidth="1.4"
        pathLength="1"
      />
      <path
        d="M932 431C1110 335 1269 308 1519 327"
        stroke="currentColor"
        strokeWidth="1.4"
        pathLength="1"
      />
    </svg>
  );
}
