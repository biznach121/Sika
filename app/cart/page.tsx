"use client";

import { useRouter } from "next/navigation";
import { CartPage as SdkCartPage } from "@cimplify/sdk/react";

export default function CartPage() {
  const router = useRouter();
  return (
    <main className="spabox-page">
      <div className="spabox-shell max-w-[1120px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Cart</p>
          <h1 className="spabox-title">Your selections.</h1>
          <p className="spabox-lede">Review services and products before checkout.</p>
        </header>
        <SdkCartPage onCheckout={() => router.push("/checkout")} />
      </div>
    </main>
  );
}
