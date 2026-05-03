"use client";

import { useEffect, useState } from "react";

/**
 * Spec detail TOC with scroll-spy. Highlights the H2 currently in view.
 * Direct port of the TOC behaviour from design/spec.html: the heading
 * whose top has scrolled past 140px is the active one.
 */
export function SpecToc({ items }: { items: Array<{ id: string; text: string }> }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

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

  return (
    <aside className="sp-toc">
      <div className="sp-toc-title">On this page</div>
      <ul className="sp-toc-list">
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={activeId === it.id ? "is-active" : ""}>
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
