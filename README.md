# thespabox2

A Cimplify storefront scaffolded from the **bakery** template — Next.js 16 (App Router), React 19, Tailwind v4. Warm food-styled palette, Playfair Display + Inter typography, designed for bakeries, pâtisseries, and food businesses.

For a different industry, scaffold with `--template`:

```bash
cimplify init my-store --template retail   # electronics / consumer goods
cimplify init my-store --template bakery   # default — food / pâtisserie
```

## Run

```bash
bun install
bun dev
```

Two things start in parallel:

- `cimplify-mock` — the Cimplify mock API on `http://127.0.0.1:8787` (Akua's Bakery seeded by default).
- `next dev` — this storefront on `http://localhost:3000`.

Open the storefront in your browser. Edit `app/page.tsx` to start customising. The SDK ships full pages (`<CataloguePage>`, `<ProductPage>`, `<CartPage>`, `<CheckoutPage>`) and layouts (`<DefaultProductLayout>`, `<FoodProductLayout>`, etc.) that you can swap in.

## Structure

```
app/
  layout.tsx              # root layout, fonts, providers, header/footer/modal
  page.tsx                # home
  shop/page.tsx           # full catalogue (SDK <CataloguePage/>)
  collections/[slug]/     # collection landing
  categories/[slug]/      # category landing
  cart/page.tsx           # SDK <CartPage/>
  checkout/page.tsx       # SDK <CheckoutPage/>
  orders/[id]/page.tsx    # post-checkout thank-you
  globals.css             # Tailwind import + theme tokens
components/
  providers.tsx           # CimplifyProvider client wrapper
  header.tsx, footer.tsx, hero.tsx
  store-product-card.tsx  # SDK <ProductCard/> wired to URL-driven modal
  product-modal.tsx       # ?product=<slug> deep-linkable modal
  collection-strip.tsx    # horizontal product strip
  category-grid.tsx       # SDK <CategoryGrid/> with router navigation
lib/
  cart.ts                 # useCartCount() for the header pill
```

## Switch seed

```bash
cimplify-mock --seed restaurant   # Mama's Kitchen
cimplify-mock --seed retail       # Currents Electronics
cimplify-mock --seed services     # Serene Spa
cimplify-mock --seed grocery      # FreshMart
```

## Go live

```diff
# .env.local
- NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY=mock-dev
+ NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY=<your tenant key>
```

Deploy with `cimplify deploy --prod` after linking the project. See [`cimplify` CLI docs](https://www.cimplify.dev/docs/cli). `next.config.ts` already whitelists the SDK image hosts under `images.remotePatterns`.
