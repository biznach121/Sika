import Image from "next/image";

interface SpaBoxLogoProps {
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
}

// Wordmark mode (default): one asset, rendered white on the dark hero
// (tone=light) and black-silhouette on the cream header (tone=dark).
const LOGO_URL =
  "https://res.cloudinary.com/dzykdnbvb/raw/upload/v1783470803/stage4/spa_mssika/logo.svg";

// Real-logo mode: the factory flips REAL_LOGO=true for vendors whose logo cuts
// out cleanly (floating mark on a plain background). White version over the
// dark hero (also hides any edge fringe); colour version on the cream header
// (a light fringe is invisible on cream). See make_real_logos.py.
const REAL_LOGO = false;
const LOGO_WHITE = "";
const LOGO_COLOR = "";

export function SpaBoxLogo({ className = "", compact = false, tone = "light" }: SpaBoxLogoProps) {
  const sizeClass = compact ? "h-[60px] w-[172px]" : "h-[96px] w-[260px]";

  if (REAL_LOGO) {
    const src = tone === "light" ? LOGO_WHITE : LOGO_COLOR;
    return (
      <span className={["relative inline-block", sizeClass, className].join(" ")} aria-label="Lashes by Sika - Cluster lash sets, priced right">
        <Image
          src={src}
          alt="Lashes by Sika - Cluster lash sets, priced right"
          fill
          sizes={compact ? "172px" : "260px"}
          className="object-contain object-left"
          priority
          unoptimized
        />
      </span>
    );
  }

  return (
    <span className={["relative inline-block", sizeClass, className].join(" ")} aria-label="Lashes by Sika - Cluster lash sets, priced right">
      <Image
        src={LOGO_URL}
        alt="Lashes by Sika - Cluster lash sets, priced right"
        fill
        sizes={compact ? "172px" : "260px"}
        className={["object-contain", tone === "dark" ? "brightness-0 opacity-80" : ""].join(" ")}
        priority
        unoptimized
      />
    </span>
  );
}
