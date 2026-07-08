import Link from "next/link";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="spabox-page">
      <div className="spabox-shell max-w-[760px] text-center">
        <div className="spabox-hero">
          <p className="spabox-eyebrow">Confirmed</p>
          <h1 className="spabox-title mx-auto">Thank you.</h1>
          <p className="spabox-lede mx-auto">
            Your order or booking has been confirmed. Reference:{" "}
            <code className="font-mono text-[#422900]">{id}</code>
          </p>
        </div>
        <p className="mt-8">
          <Link href="/" className="spabox-link-button">
            Continue shopping
          </Link>
        </p>
      </div>
    </section>
  );
}
