"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  pageSize: number;
  total: number;
};

export function Pagination({ page, pageSize, total }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function urlFor(p: number): string {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete("page");
    else next.set("page", String(p));
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  if (totalPages <= 1) return null;

  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);

  return (
    <nav className="cf-admin-pagination" aria-label="Leads pagination">
      <Link
        href={urlFor(prev)}
        aria-disabled={page === 1}
        className={`cf-admin-btn cf-admin-btn--ghost cf-admin-btn--small${page === 1 ? " is-disabled" : ""}`}
      >
        ← Prev
      </Link>
      <span className="cf-t-small">
        Page {page} of {totalPages} · {total.toLocaleString("en-US")} total
      </span>
      <Link
        href={urlFor(next)}
        aria-disabled={page === totalPages}
        className={`cf-admin-btn cf-admin-btn--ghost cf-admin-btn--small${page === totalPages ? " is-disabled" : ""}`}
      >
        Next →
      </Link>
    </nav>
  );
}
