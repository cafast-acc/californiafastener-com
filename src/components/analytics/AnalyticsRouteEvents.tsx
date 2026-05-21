"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function AnalyticsRouteEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const search = searchParams?.toString();
    const page_path = search ? `${pathname}?${search}` : pathname;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtualPageview",
      page_path,
      page_title: typeof document !== "undefined" ? document.title : undefined,
    });
  }, [pathname, searchParams]);

  return null;
}
