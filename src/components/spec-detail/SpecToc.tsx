"use client";

import { useEffect, useState } from "react";

/**
 * Spec detail TOC with scroll-spy. Highlights the H2 currently in view.
 * Direct port of the TOC behaviour from design/spec.html: the heading
 * whose top has scrolled past 140px is the active one.
 *
 * On tablet and phone (≤1024px) the TOC collapses behind a tap-to-expand
 * summary. The collapsed state is governed by `data-collapsed` on the aside;
 * cf-spec-detail.css forces the list visible on desktop regardless.
 */
export function SpecToc({ items }: { items: Array<{ id: string; text: string }> }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const update = () => {
      let active: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < 140) active = it.id;
        else break;
      }
      setActiveId(active);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  if (items.length === 0) return null;

  const activeText = items.find((i) => i.id === activeId)?.text ?? items[0].text;

  return (
    <aside className="sp-toc" data-collapsed={collapsed}>
      <button
        type="button"
        className="sp-toc-summary"
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((v) => !v)}
      >
        <span className="sp-toc-title">On this page</span>
        <span className="sp-toc-active-label">{activeText}</span>
      </button>
      <ul className="sp-toc-list">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={activeId === it.id ? "is-active" : ""}
              onClick={() => setCollapsed(true)}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
