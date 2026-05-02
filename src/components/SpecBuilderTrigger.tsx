"use client";

import { useEffect, useState } from "react";

/**
 * Step-1 spec-builder modal teaser. Real flow lives at /spec-builder; this is the
 * inline preview the homepage opens. Backdrop + ESC close, locks body scroll while open.
 *
 * Mirrors the markup from design/homepage.html lines 1198–1221.
 */
export function SpecBuilderTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        style={{ border: "none", cursor: "pointer", fontFamily: "inherit" }}
      >
        {children}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Material Spec Builder"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(29,29,31,0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              background: "var(--bg)",
              borderRadius: "24px",
              maxWidth: "640px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              padding: "48px",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "var(--bg-alt)",
                border: "none",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                fontSize: "16px",
                cursor: "pointer",
                color: "var(--mid)",
              }}
            >
              ✕
            </button>
            <div style={{ color: "var(--purple-dark)", fontSize: "14px", fontWeight: 500, marginBottom: "10px" }}>
              Material Spec Builder
            </div>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "10px",
              }}
            >
              What are you fastening?
            </h2>
            <p style={{ color: "var(--mid)", fontSize: "17px", marginBottom: "28px", letterSpacing: "-0.01em" }}>
              Step 1 of 4 — we&apos;ll use this to narrow down the grades that fit your application.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "28px" }}>
              <SpecOption title="Steel-to-steel" desc="Beam, column, moment frame" />
              <SpecOption title="Anchor to concrete" desc="Foundation, baseplate" highlighted />
              <SpecOption title="Pressure flange" desc="Piping, vessel, boiler" />
              <SpecOption title="Custom / other" desc="Machined part, bespoke" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "24px",
                borderTop: "1px solid var(--rule-soft)",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "24px", height: "4px", background: "var(--purple)", borderRadius: "2px" }} />
                <div style={{ width: "24px", height: "4px", background: "var(--rule-soft)", borderRadius: "2px" }} />
                <div style={{ width: "24px", height: "4px", background: "var(--rule-soft)", borderRadius: "2px" }} />
                <div style={{ width: "24px", height: "4px", background: "var(--rule-soft)", borderRadius: "2px" }} />
              </div>
              <a href="/spec-builder" className="cf-pill cf-pill--purple">
                Continue ›
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SpecOption({ title, desc, highlighted = false }: { title: string; desc: string; highlighted?: boolean }) {
  return (
    <button
      type="button"
      className="spec-opt"
      style={{
        textAlign: "left",
        padding: "18px",
        border: highlighted ? "1px solid var(--purple)" : "1px solid var(--rule-soft)",
        borderRadius: "14px",
        background: highlighted ? "rgba(140,82,255,0.04)" : "white",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          fontSize: "15px",
          fontWeight: 500,
          marginBottom: "4px",
          color: highlighted ? "var(--purple-dark)" : undefined,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "13px", color: "var(--mid)" }}>{desc}</div>
    </button>
  );
}
