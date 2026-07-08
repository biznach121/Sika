"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Root error boundary. Next.js calls this whenever a thrown error escapes
 * a Server Component without being caught by a closer `error.tsx`.
 *
 * Wire `reportError` (Sentry, Datadog, etc.) here so production failures
 * surface — silently recovering hides real bugs.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: replace with your error reporter
    // eslint-disable-next-line no-console
    console.error("Storefront error:", error);
  }, [error]);

  return (
    <section className="spabox-page">
      <div className="spabox-shell max-w-[760px] text-center">
        <div className="spabox-hero">
          <p className="spabox-eyebrow">Something broke</p>
          <h1 className="spabox-title mx-auto">That wasn&apos;t supposed to happen.</h1>
          <p className="spabox-lede mx-auto">
            Refresh the page, or head back home. Most of the time the second try
            just works.
          </p>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs font-mono text-[#4e3809]/60">
            Reference: <code className="text-[#422900]">{error.digest}</code>
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="spabox-link-button"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center border border-[#422900]/18 px-7 text-sm font-semibold text-[#422900] transition-colors hover:bg-[#c9d9c0]"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
