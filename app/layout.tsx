import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { getServerClient, tags } from "@/lib/sdk-server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContourBackdrop } from "@/components/contour-backdrop";
import { ProductModal } from "@/components/product-modal";
import { CartDrawer } from "@/components/cart-drawer";
import { OrganizationJsonLd } from "@/components/json-ld";
import { Suspense } from "react";
import { brand } from "@/lib/brand";
import { getNavMenus } from "@/lib/nav-menus";
import { getSiteUrl } from "@/lib/site-url";

const inter = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: brand.name,
      template: `%s — ${brand.name}`,
    },
    description: brand.description,
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: brand.locale,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const server = getServerClient();
  const [bizResult, locResult, navMenus] = await Promise.all([
    server.business.getInfo({ cacheOptions: { revalidate: 3600, tags: [tags.business()] } }),
    server.business.getLocations({ cacheOptions: { revalidate: 3600, tags: [tags.locations()] } }),
    getNavMenus(),
  ]);
  const initialBusiness = bizResult.ok ? bizResult.value : null;
  const initialLocations = locResult.ok ? locResult.value : [];

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground font-sans"
      >
        <Suspense fallback={null}>
          <OrganizationJsonLd />
        </Suspense>
        <Providers initialBusiness={initialBusiness} initialLocations={initialLocations}>
          <Header menus={navMenus} />
          <main className="flex-1 pb-12 w-full">
            <ContourBackdrop />
            <Suspense fallback={null}>{children}</Suspense>
          </main>
          <Footer />
          <Suspense fallback={null}>
            <ProductModal />
          </Suspense>
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
