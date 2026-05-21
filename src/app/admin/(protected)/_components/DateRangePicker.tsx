"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";

const PRESETS = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
] as const;

type Props = {
  preset: string;
  startDate: string;
  endDate: string;
};

export function DateRangePicker({ preset, startDate, endDate }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [customStart, setCustomStart] = useState(startDate);
  const [customEnd, setCustomEnd] = useState(endDate);
  const isCustom = preset === "custom";

  function buildUrl(next: URLSearchParams): string {
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  function selectPreset(value: string) {
    const next = new URLSearchParams(searchParams);
    next.set("range", value);
    next.delete("start");
    next.delete("end");
    next.delete("page");
    startTransition(() => router.replace(buildUrl(next), { scroll: false }));
  }

  function applyCustom() {
    if (!customStart || !customEnd || customStart > customEnd) return;
    const next = new URLSearchParams(searchParams);
    next.set("range", "custom");
    next.set("start", customStart);
    next.set("end", customEnd);
    next.delete("page");
    startTransition(() => router.replace(buildUrl(next), { scroll: false }));
  }

  return (
    <div className="cf-admin-range">
      <div className="cf-admin-range__presets" role="tablist">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            type="button"
            role="tab"
            aria-selected={preset === p.value}
            className={`cf-admin-range__btn${preset === p.value ? " is-active" : ""}`}
            onClick={() => selectPreset(p.value)}
          >
            {p.label}
          </button>
        ))}
        <div className="cf-admin-range__custom">
          <input
            type="date"
            value={customStart}
            onChange={(e) => setCustomStart(e.target.value)}
            aria-label="Range start"
          />
          <span>→</span>
          <input
            type="date"
            value={customEnd}
            onChange={(e) => setCustomEnd(e.target.value)}
            aria-label="Range end"
          />
          <button
            type="button"
            className={`cf-admin-range__btn${isCustom ? " is-active" : ""}`}
            onClick={applyCustom}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
