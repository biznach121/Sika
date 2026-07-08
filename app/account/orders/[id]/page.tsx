import { notFound } from "next/navigation";
import { AccountSignedOutPrompt, toAccountOrderView } from "@cimplify/sdk/react";
import type { EnrichedOrder } from "@cimplify/sdk";
import { brand } from "@/lib/brand";
import { apiFetch, serverAccessToken, serverSession } from "@/lib/cimplify-server";
import { OrderDetail } from "@/components/order-detail";

const CLIENT_ID = process.env.NEXT_PUBLIC_CIMPLIFY_CLIENT_ID ?? "";
const REDIRECT_URI = process.env.CIMPLIFY_REDIRECT_URI ?? "";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await serverSession();
  if (!session) {
    return (
      <main className="spabox-page">
        <div className="spabox-shell max-w-[860px]">
          <AccountSignedOutPrompt
            clientId={CLIENT_ID}
            redirectUri={REDIRECT_URI}
            eyebrow={brand.account.loginEyebrow}
            title={brand.account.loginTitle}
            description={brand.account.loginSubtitle}
          />
        </div>
      </main>
    );
  }

  const bearer = await serverAccessToken();
  const order = await apiFetch<EnrichedOrder>(`/api/v1/orders/${encodeURIComponent(id)}`, {
    bearer,
  });
  if (!order) notFound();

  return (
    <main className="spabox-page">
      <div className="spabox-shell max-w-[1120px]">
        <header className="spabox-hero mb-8">
          <p className="spabox-eyebrow">Booking details</p>
          <h1 className="spabox-title">Your SpaBox order.</h1>
          <p className="spabox-lede">
            Review appointment notes, items, payment, and confirmation details.
          </p>
        </header>
        <OrderDetail {...toAccountOrderView(order)} />
      </div>
    </main>
  );
}
