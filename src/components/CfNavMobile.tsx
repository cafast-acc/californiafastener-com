"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CF_NAV_FLAT_LINKS, CF_NAV_SECTIONS, type CfNavSection } from "./cfNavSections";

type Props = {
  variant?: "light" | "dark";
};

export function CfNavMobile({ variant = "light" }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<CfNavSection["id"] | null>(null);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerId = useId();

  // Close on route change.
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  // Body scroll lock + escape-to-close.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("cf-no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("cf-no-scroll");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus the close button when drawer opens.
  useEffect(() => {
    if (!open) return;
    const close = drawerRef.current?.querySelector<HTMLElement>(
      ".cf-nav-drawer-close"
    );
    close?.focus();
  }, [open]);

  const drawerCls =
    "cf-nav-drawer" + (variant === "dark" ? " cf-nav-drawer--dark" : "");

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="cf-nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="cf-nav-toggle-bars" aria-hidden="true">
          <span />
        </span>
      </button>
      <div
        className="cf-nav-drawer-backdrop"
        data-open={open}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        id={drawerId}
        className={drawerCls}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="cf-nav-drawer-head">
          <span className="cf-footer-brand">
            <span className="cf-nav-logo-mark" />
            California Fastener
          </span>
          <button
            type="button"
            className="cf-nav-drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="cf-nav-drawer-body">
          {CF_NAV_SECTIONS.map((section) => {
            const isOpen = expanded === section.id;
            return (
              <div key={section.id} className="cf-nav-drawer-section">
                <button
                  type="button"
                  className="cf-nav-drawer-summary"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : section.id)}
                >
                  {section.label}
                </button>
                {isOpen && (
                  <div>
                    {section.groups.map((group, gi) => (
                      <ul
                        key={gi}
                        className="cf-nav-drawer-list"
                        aria-label={group.heading ?? section.label}
                      >
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href}>
                              {item.label}
                              {item.sub ? (
                                <span className="cf-nav-drawer-sub">
                                  {item.sub}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                    {section.footer && (
                      <ul className="cf-nav-drawer-list">
                        {section.footer.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href}>{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {CF_NAV_FLAT_LINKS.map((item) => (
            <div key={item.href} className="cf-nav-drawer-section">
              <Link href={item.href} className="cf-nav-drawer-row">
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="cf-nav-drawer-foot">
          <Link href="/quote" className="cf-pill cf-pill--blue">
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
