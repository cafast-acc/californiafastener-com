export const RANGE_PRESETS = ["7d", "30d", "90d", "custom"] as const;
export type RangePreset = (typeof RANGE_PRESETS)[number];

export type DateRange = {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  preset: RangePreset;
};

const ONE_DAY = 24 * 60 * 60 * 1000;

export function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function rangeFromPreset(preset: Exclude<RangePreset, "custom">): DateRange {
  const now = new Date();
  const days = preset === "7d" ? 7 : preset === "30d" ? 30 : 90;
  return {
    startDate: formatDate(new Date(now.getTime() - days * ONE_DAY)),
    endDate: formatDate(now),
    preset,
  };
}

function isIsoDate(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export function parseRange(params: SearchParamsRecord): DateRange {
  const presetRaw = first(params.range);
  const startRaw = first(params.start);
  const endRaw = first(params.end);

  if (isIsoDate(startRaw) && isIsoDate(endRaw) && startRaw <= endRaw) {
    return { startDate: startRaw, endDate: endRaw, preset: "custom" };
  }

  if (
    presetRaw === "7d" ||
    presetRaw === "30d" ||
    presetRaw === "90d"
  ) {
    return rangeFromPreset(presetRaw);
  }

  return rangeFromPreset("30d");
}

function first(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export function rangeLabel(range: DateRange): string {
  if (range.preset === "7d") return "Last 7 days";
  if (range.preset === "30d") return "Last 30 days";
  if (range.preset === "90d") return "Last 90 days";
  return `${range.startDate} → ${range.endDate}`;
}

export function rangeDays(range: DateRange): number {
  const start = new Date(range.startDate).getTime();
  const end = new Date(range.endDate).getTime();
  return Math.max(1, Math.round((end - start) / ONE_DAY));
}
