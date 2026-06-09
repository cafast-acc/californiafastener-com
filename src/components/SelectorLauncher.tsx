"use client";

import { useEffect, useState, type ReactNode } from "react";
import "@/styles/cf-hollo-bolt-selector.css";
import { HolloBoltSelector } from "@/components/HolloBoltSelector";

/**
 * Renders a trigger (styled by the passed `className`, e.g. a `cf-pill` or the
 * `hb-selector-cta` card) that opens the Hollo-Bolt Selector in an overlay
 * pop-up instead of navigating to the standalone /hollo-bolt-selector page.
 */
export function SelectorLauncher({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open && (
        <div
          className="hb-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Hollo-Bolt Selector"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="hb-modal">
            <button
              type="button"
              className="hb-modal-close"
              aria-label="Close selector"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <div className="hb-modal-body">
              <HolloBoltSelector />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
