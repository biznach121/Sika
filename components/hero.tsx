import Link from "next/link";
import { Suspense } from "react";
import { HeroAuthLink } from "./hero-auth-link";
import { HeroCartButton, HeroCartButtonSkeleton } from "./hero-cart-button";
import { NavDropdown, type NavMenu } from "./nav-dropdown";
import { SpaBoxLogo } from "./spa-box-logo";

const HERO_TEXT_LINK =
  "relative inline-flex h-9 items-center text-[11px] font-semibold uppercase text-white/82 transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:text-white hover:after:scale-x-100";

interface HeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  videoUrl?: string;
  videoUrls?: string[];
  nav: { label: string; href: string }[];
  menus?: NavMenu[];
  phone: string;
  phoneTel: string;
}

export function Hero({
  badge,
  title,
  primaryCtaLabel,
  primaryCtaHref,
  videoUrl,
  videoUrls,
  nav,
  menus = [],
  phone,
  phoneTel,
}: HeroProps) {
  const titleLines = title.split("\n").filter(Boolean);
  const scriptLine = titleLines[titleLines.length - 1] ?? "";
  const headlineLines = titleLines.slice(0, -1);
  const heroVideos = videoUrls?.filter(Boolean) ?? (videoUrl ? [videoUrl] : []);

  return (
    <section className="spa-video-hero relative isolate h-[95svh] min-h-[620px] overflow-hidden rounded-b-[28px] bg-[#524400] text-white lg:rounded-b-[36px]">
      {heroVideos.length > 0 ? (
        <div className="absolute inset-0 -z-20">
          {heroVideos.map((url, index) => (
            <video
              key={url}
              className={`hero-video-layer absolute inset-0 h-full w-full object-cover ${heroVideos.length === 1 ? "is-single" : ""}`}
              src={url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              style={
                {
                  "--hero-video-delay": `-${index * 8}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 -z-20 bg-[#604c00]" />
      )}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(53, 41, 0,0.58),rgba(75, 51, 0,0.22)_43%,rgba(55, 44, 0,0.34)),linear-gradient(0deg,rgba(28, 23, 0,0.18),rgba(28, 23, 0,0.08))]" />

      <div className="relative z-10 flex h-full flex-col px-5 py-5 sm:px-8 md:px-10 lg:px-14">
        <div className="flex flex-col items-center gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-5">
          <nav className="hidden items-center gap-7 pt-4 text-[12px] font-medium uppercase text-white/70 lg:flex">
            {nav.map((link) => {
              const item = (
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              );
              const menu = menus.find((m) => m.href === link.href);
              return menu ? (
                <NavDropdown key={link.href} menu={menu} tone="light" align="left">
                  {item}
                </NavDropdown>
              ) : (
                <span key={link.href} className="flex items-center">
                  {item}
                </span>
              );
            })}
          </nav>

          <Link href="/" className="justify-self-center text-white/90 transition-colors hover:text-white">
            <SpaBoxLogo compact className="h-[62px] w-[158px] sm:h-[74px] sm:w-[206px]" />
          </Link>

          <div className="flex min-w-0 shrink-0 flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 sm:gap-x-5 lg:justify-end lg:gap-x-7 lg:pt-2">
            <a
              href={`tel:${phoneTel}`}
              className="hidden font-serif text-[22px] font-light leading-none text-white/82 xl:block"
            >
              {phone}
            </a>
            <Link
              href={primaryCtaHref}
              className={HERO_TEXT_LINK}
            >
              {primaryCtaLabel}
            </Link>
            <Suspense fallback={<span className="h-9 w-12" aria-hidden />}>
              <HeroAuthLink />
            </Suspense>
            <Suspense fallback={<HeroCartButtonSkeleton />}>
              <HeroCartButton />
            </Suspense>
          </div>
        </div>

        <div className="relative mt-auto pb-16 pt-14 sm:pb-24 md:pb-28 lg:pb-32">
          {badge && (
            <span className="mb-5 inline-block text-[11px] font-medium uppercase text-white/68 md:hidden">
              {badge}
            </span>
          )}
          <h1 className="m-0 max-w-[980px] font-serif text-[39px] font-light leading-[0.98] text-white sm:text-[58px] md:text-[76px] lg:text-[88px] xl:text-[98px]">
            {headlineLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                <span
                  className="hero-type-line"
                  style={
                    {
                      "--type-delay": `${index * 1.45}s`,
                      "--type-duration": `${1.25 + line.length * 0.035}s`,
                      "--type-steps": line.length,
                      "--type-width": `${line.length + 1}ch`,
                    } as React.CSSProperties
                  }
                >
                  {line}
                </span>
              </span>
            ))}
            {scriptLine && (
              <span className="hero-script-line mt-3 block max-w-[720px] text-balance font-serif text-[24px] font-semibold italic leading-[1.1] text-white sm:text-[34px] md:text-[44px] lg:text-[50px]">
                {scriptLine}
              </span>
            )}
          </h1>

        </div>
      </div>
    </section>
  );
}
