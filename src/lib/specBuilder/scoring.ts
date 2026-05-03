/* Spec Builder — scoring engine.
   Direct port of the original scoring from design/spec-builder-app.js.
   Pure function — given a material and the user's selections, returns
   a score (or -1 to disqualify). Higher = better match. */

import type { Material } from "./data";
import type { Application, Constraint, Environment, StrengthLevel } from "./options";

export type SelectionState = {
  app: Application | null;
  env: Environment[];
  strength: StrengthLevel;
  constraints: Constraint[];
};

export function scoreMatch(mat: Material, state: SelectionState): number {
  let score = 0;
  const { app, env: envs, strength: str, constraints: cons } = state;

  if (app && mat.apps.indexOf(app) >= 0) score += 30;
  else if (app === "unsure") score += 10;

  if (envs.length > 0) {
    const matched = envs.filter((e) => mat.envs.indexOf(e) >= 0);
    if (matched.length === 0) return -1;
    score += matched.length * 20;
  }

  if (mat.strengths.indexOf(str) >= 0) score += 25;

  if (cons.indexOf("stainless") >= 0 && !mat.isStainless && mat.id !== "titanium") return -1;
  if (cons.indexOf("no-carbon") >= 0 && (mat.isCarbonSteel || mat.isAlloySteel)) return -1;
  if (cons.indexOf("dfars") >= 0 && !mat.dfars) return -1;

  const isSpecialty = mat.isNickelAlloy || mat.id === "titanium" || mat.id === "17-4" || mat.id === "a286";
  if (cons.indexOf("specialty") >= 0 && isSpecialty) score += 15;
  if (cons.indexOf("dfars") >= 0 && mat.dfars) score += 10;
  if (cons.indexOf("budget") >= 0) {
    if (mat.isCarbonSteel) score += 15;
    else if (mat.isAlloySteel) score += 10;
  }
  if (cons.indexOf("none") >= 0) score += 5;

  const catMap: Record<string, Application[]> = {
    "Structural Bolt": ["structural", "infrastructure"],
    "High-Strength Structural": ["structural", "infrastructure"],
    "Anchor Bolts": ["anchor"],
    "High-Temp Alloy": ["pressure", "piping"],
    "Carbon Steel": ["machinery", "industrial"],
  };
  const catApps = catMap[mat.category];
  if (app && catApps && catApps.indexOf(app) >= 0) score += 15;

  if (mat.inStock) score += 1;
  if (!mat.custom) score += 1;
  if (mat.legacySpec) score -= 15;

  return score;
}

/** Returns the application-specific "why" copy for this material, or the default. */
export function getWhy(mat: Material, app: Application | null): string {
  if (app && mat.why[app]) return mat.why[app] as string;
  return mat.why.default;
}

export type ScoredMaterial = Material & { score: number };

/** Score every material, drop disqualifications, sort high-to-low. */
export function rankMaterials(
  materials: Material[],
  state: SelectionState
): ScoredMaterial[] {
  return materials
    .map((m) => ({ ...m, score: scoreMatch(m, state) }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);
}

/** Tokenizes a state value (e.g. "outdoor + corrosive") for human display. */
export function titleCase(s: string): string {
  return (s || "")
    .split(/[\s,+]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" + ");
}
