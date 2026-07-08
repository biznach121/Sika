"use client";

import { useRouter } from "next/navigation";
import { CheckoutPage as SdkCheckoutPage } from "@cimplify/sdk/react";

export default function CheckoutPage() {
  const router = useRouter();
  return (
    <main className="spabox-page">
      <div className="spabox-shell max-w-[1120px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Checkout</p>
          <h1 className="spabox-title">Complete your order.</h1>
          <p className="spabox-lede">
            Check out with products, services, or both. We will prepare the right order details after payment.
          </p>
        </header>
        <SdkCheckoutPage
          title="Checkout"
          onComplete={(result) => {
            if (result.success && result.order) {
              router.push(`/orders/${result.order.id}`);
            }
          }}
        />
      </div>
    </main>
  );
}
