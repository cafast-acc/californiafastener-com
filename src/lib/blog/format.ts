/** Format a publishedAt ISO string as "May 16, 2026". */
export function formatPublishedAt(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Estimate reading time from a Portable Text array. ~220 wpm. */
export function estimateReadingMinutes(body: unknown): number {
  if (!Array.isArray(body)) return 1;
  let words = 0;
  for (const block of body) {
    const children = (block as { children?: unknown }).children;
    if (!Array.isArray(children)) continue;
    for (const child of children) {
      const text = (child as { text?: unknown }).text;
      if (typeof text === "string") {
        words += text.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return Math.max(1, Math.round(words / 220));
}
