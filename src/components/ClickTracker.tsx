"use client";

import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Fires GTM dataLayer events for phone (tel:) and email (mailto:) link clicks.
 * A single delegated listener on the document covers every such link across the
 * site, so individual anchors don't each need an onClick. Mounted once in the
 * root layout; renders nothing.
 *
 * Events (wire up matching Custom Event triggers in GTM):
 *   phone_click  → { phone_number, link_url }
 *   email_click  → { email_address, link_url }
 */
export function ClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.(
        "a[href^='tel:'], a[href^='mailto:']"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        sendGTMEvent({
          event: "phone_click",
          phone_number: href.slice("tel:".length),
          link_url: href,
        });
      } else if (href.startsWith("mailto:")) {
        sendGTMEvent({
          event: "email_click",
          // Drop the mailto: scheme and any ?subject=… query for a clean address.
          email_address: href.slice("mailto:".length).split("?")[0],
          link_url: href,
        });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
