"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  type: string;
  source: string;
  search: string;
};

const TYPE_OPTIONS = [
  { value: "", label: "All types" },
  { value: "Phone Call", label: "Calls" },
  { value: "Web Form", label: "Forms" },
  { value: "Chat", label: "Chat" },
  { value: "Other", label: "Other" },
];

export function LeadsFilters({ type, source, search }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [draftType, setDraftType] = useState(type);
  const [draftSource, setDraftSource] = useState(source);
  const [draftSearch, setDraftSearch] = useState(search);

  function apply(e?: React.FormEvent) {
    e?.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (draftType) next.set("type", draftType);
    else next.delete("type");
    if (draftSource) next.set("source", draftSource);
    else next.delete("source");
    if (draftSearch) next.set("q", draftSearch);
    else next.delete("q");
    next.delete("page");
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname));
  }

  function clear() {
    setDraftType("");
    setDraftSource("");
    setDraftSearch("");
    const next = new URLSearchParams(searchParams);
    next.delete("type");
    next.delete("source");
    next.delete("q");
    next.delete("page");
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname));
  }

  return (
    <form className="cf-admin-filters" onSubmit={apply}>
      <label className="cf-admin-filters__field">
        <span>Search</span>
        <input
          type="search"
          value={draftSearch}
          onChange={(e) => setDraftSearch(e.target.value)}
          placeholder="Name, email, phone"
        />
      </label>
      <label className="cf-admin-filters__field">
        <span>Type</span>
        <select value={draftType} onChange={(e) => setDraftType(e.target.value)}>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <label className="cf-admin-filters__field">
        <span>Source</span>
        <input
          type="text"
          value={draftSource}
          onChange={(e) => setDraftSource(e.target.value)}
          placeholder="organic, paid…"
        />
      </label>
      <div className="cf-admin-filters__actions">
        <button type="submit" className="cf-admin-btn cf-admin-btn--primary cf-admin-btn--small">
          Apply
        </button>
        <button
          type="button"
          className="cf-admin-btn cf-admin-btn--ghost cf-admin-btn--small"
          onClick={clear}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
