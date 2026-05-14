import type { PortableTextBlock } from "@portabletext/react";

// ~225 words/min. Counts plain text out of Portable Text spans only — images
// and CTAs don't contribute. Round up; floor at 1 minute.
export function readingTimeMinutes(blocks: PortableTextBlock[] | undefined): number {
  if (!blocks) return 1;
  let words = 0;
  for (const block of blocks) {
    if (!block || block._type !== "block") continue;
    const children = (block as { children?: Array<{ text?: string }> }).children;
    if (!children) continue;
    for (const child of children) {
      if (typeof child.text === "string") {
        words += child.text.trim().split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return Math.max(1, Math.ceil(words / 225));
}
