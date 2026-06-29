"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { LAST_PAGE_KEY } from "@/lib/sourcePage";

/**
 * Records the most recent non-/quote path into sessionStorage so the /quote
 * form can tag which page a visitor came from. Mounted once in the root layout;
 * renders nothing. Skips /quote itself so landing there doesn't overwrite the
 * originating page.
 */
export function RouteTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname || pathname === "/quote") return;
    try {
      sessionStorage.setItem(LAST_PAGE_KEY, pathname);
    } catch {
      // sessionStorage unavailable (private mode quota, etc.) — ignore.
    }
  }, [pathname]);
  return null;
}
