/* Spec Library — pure filter function.
   Direct port of design_handoff_spec_library/technical-library-app.js applyFilter. */

import type { SectionId, Spec } from "./data";

export type FilterState = {
  q: string;
  category: SectionId | null;
  industry: Set<string>;
  service: Set<string>;
};

/** Build the lowercased search blob for a spec — code, title, note, grades,
 *  industries, service tags all concatenated. Live-search filters on this. */
export function searchBlob(sp: Spec): string {
  return [
    sp.code,
    sp.title,
    sp.note,
    ...sp.grades,
    ...sp.industries,
    ...sp.service,
  ]
    .join(" ")
    .toLowerCase();
}

export function specMatchesFilter(sp: Spec, state: FilterState, blob: string): boolean {
  const q = state.q.trim().toLowerCase();
  if (state.category && state.category !== sp.section) return false;
  if (q && !blob.includes(q)) return false;
  if (state.industry.size > 0) {
    for (const i of state.industry) {
      if (!sp.industries.includes(i)) return false;
    }
  }
  if (state.service.size > 0) {
    for (const s of state.service) {
      if (!sp.service.includes(s)) return false;
    }
  }
  return true;
}

export function isFilterActive(state: FilterState): boolean {
  return !!(state.category || state.industry.size || state.service.size || state.q.trim());
}
