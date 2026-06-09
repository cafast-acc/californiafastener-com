"use client";

import { useCallback, useEffect, useState } from "react";
import "@/styles/cf-hollo-bolt-selector.css";
import { HolloBoltSelector } from "@/components/HolloBoltSelector";

/**
 * Opens the Hollo-Bolt Selector in a full-screen overlay instead of navigating
 * to /hollo-bolt-selector. Renders either a pill <button> (text trigger) or a
 * clickable card (role="button") depending on `as`, then mounts the selector
 * inside a dialog when opened.
 */
export function HolloBoltSelectorTrigger({
  className,
  children,
  as = "button",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "button" | "card";
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const openModal = () => setOpen(true);

  return (
    <>
      {as === "card" ? (
        <div
          className={className}
          role="button"
          tabIndex={0}
          onClick={openModal}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openModal();
            }
          }}
        >
          {children}
        </div>
      ) : (
        <button type="button" className={className} onClick={openModal}>
          {children}
        </button>
      )}

      {open && (
        <div className="hbs-modal" role="dialog" aria-modal="true" aria-label="Hollo-Bolt Selector">
          <button
            type="button"
            className="hbs-modal-close"
            onClick={close}
            aria-label="Close selector"
          >
            ×
          </button>
          <div className="hbs-modal-scroll">
            <HolloBoltSelector />
          </div>
        </div>
      )}
    </>
  );
}
