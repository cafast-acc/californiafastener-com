"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[admin error boundary]", error);
  }, [error]);

  return (
    <section className="cf-admin-section">
      <header className="cf-admin-section__head">
        <h1 className="cf-t-h3">Something went wrong</h1>
        <p className="cf-t-small">
          One of the admin widgets failed to load. The error has been logged.
        </p>
      </header>
      <button
        type="button"
        className="cf-admin-btn cf-admin-btn--primary"
        onClick={reset}
      >
        Try again
      </button>
    </section>
  );
}
