import "server-only";
import { getServerClient, tags } from "@/lib/sdk-server";
import { brand } from "@/lib/brand";
import type { NavMenu } from "@/components/nav-dropdown";

/**
 * Data for the header/hero hover mega-menus: the first three catalogue items
 * of each type configured in `brand.header.menus`, linked to open the product
 * modal on the list page. Shared by app/layout.tsx (site header) and
 * app/page.tsx (the home hero renders its own nav). The catalogue read is
 * ISR-cached, so calling this from both costs one fetch.
 */
export async function getNavMenus(): Promise<NavMenu[]> {
  const result = await getServerClient().catalogue.getProducts(
    { limit: 50 },
    { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
  );
  const catalogue = result.ok ? result.value.items : [];
  return brand.header.menus
    .map((menu) => ({
      href: menu.href,
      eyebrow: menu.eyebrow,
      viewAllLabel: menu.viewAllLabel,
      items: catalogue
        .filter((p) => p.type === menu.type)
        .slice(0, 3)
        .map((p) => ({
          name: p.name,
          href: `${menu.href}?product=${p.slug}`,
          image: p.image_url ?? null,
          meta: [
            `${brand.currency} ${p.default_price}`,
            p.duration_minutes ? `${p.duration_minutes} min` : null,
          ]
            .filter(Boolean)
            .join(" · "),
        })),
    }))
    .filter((menu) => menu.items.length > 0);
}
