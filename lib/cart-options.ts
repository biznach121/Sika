import type { Product } from "@cimplify/sdk";
import type { AddToCartOptions, CartVariantSelection } from "@cimplify/sdk/react";

type ProductWithVariants = Product & {
  variants?: Array<{
    id: string;
    is_default?: boolean;
    name?: string | null;
    price_adjustment?: CartVariantSelection["price_adjustment"];
  }>;
};

export function withDefaultVariant(
  product: ProductWithVariants,
  options: AddToCartOptions = {},
): AddToCartOptions {
  if (options.variantId) return options;

  const variant = product.variants?.find((item) => item.is_default) ?? product.variants?.[0];
  if (!variant) return options;

  const cartVariant: CartVariantSelection = {
    id: variant.id,
    name: variant.name || "Default",
    price_adjustment: variant.price_adjustment,
  };

  return {
    ...options,
    variantId: variant.id,
    variant: cartVariant,
  };
}
