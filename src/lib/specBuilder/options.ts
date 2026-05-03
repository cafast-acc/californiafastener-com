/* Spec Builder — option lists (4 stages of choices).
   Direct port of the constants from design/spec-builder-app.js. */

export type Application =
  | "structural"
  | "pressure"
  | "anchor"
  | "piping"
  | "industrial"
  | "machinery"
  | "custom"
  | "electrical"
  | "chemical"
  | "infrastructure"
  | "marine"
  | "unsure";

export type Environment =
  | "standard"
  | "outdoor"
  | "corrosive"
  | "marine"
  | "hightemp"
  | "highpressure";

export type StrengthLevel = "standard" | "high" | "ultra";

export type Constraint =
  | "none"
  | "stainless"
  | "dfars"
  | "no-carbon"
  | "specialty"
  | "budget";

export type Option<V extends string> = { v: V; t: string; d: string };

export const APPS: Option<Application>[] = [
  { v: "structural", t: "Structural steel", d: "Steel-to-steel connections, beams, columns, frames" },
  { v: "pressure", t: "Pressure vessel / flange", d: "Flanged joints, pressure vessels, valves, piping" },
  { v: "anchor", t: "Anchor to concrete", d: "Columns, equipment bases, foundations" },
  { v: "piping", t: "Piping system", d: "Pipe flanges, clamps, supports, connections" },
  { v: "industrial", t: "General industrial", d: "Manufacturing, equipment, general applications" },
  { v: "machinery", t: "Machinery / equipment", d: "Automotive, rotating equipment, precision assemblies" },
  { v: "custom", t: "Custom / machined", d: "Per-print parts, custom configurations, CNC" },
  { v: "electrical", t: "Electrical / power", d: "Busbar, switchgear, grounding, power assemblies" },
  { v: "unsure", t: "Not sure yet", d: "Show options based on the other answers" },
];

export const ENVS: Option<Environment>[] = [
  { v: "standard", t: "Standard / indoor", d: "Dry, controlled environment, no special exposure" },
  { v: "outdoor", t: "Outdoor / weathering", d: "Rain, humidity, temperature swings" },
  { v: "corrosive", t: "Corrosive chemicals", d: "Acids, solvents, aggressive media" },
  { v: "marine", t: "Saltwater / marine", d: "Seawater, offshore, coastal, submerged" },
  { v: "hightemp", t: "High temperature", d: "Operating above 300°F in service" },
  { v: "highpressure", t: "High pressure", d: "Pressure vessels, steam, hydraulics" },
];

export type StrengthOption = { v: StrengthLevel; t: string; r: string; d: string };

export const STRENGTHS: StrengthOption[] = [
  { v: "standard", t: "Standard", r: "Up to 90 ksi", d: "A307, SAE Gr 2, F1554 Gr 36" },
  { v: "high", t: "High", r: "120–150 ksi", d: "A193 B7, A325, SAE Gr 8" },
  { v: "ultra", t: "Ultra-high", r: "150+ ksi", d: "A490, A354 BD, Monel K500" },
];

export const CONSTRAINTS: Option<Constraint>[] = [
  { v: "none", t: "No preference", d: "Show the best option regardless of type or origin" },
  { v: "stainless", t: "Must be stainless", d: "Hygiene, appearance, or mild corrosion resistance" },
  { v: "dfars", t: "DFARS / domestic", d: "Government, defense, federal — US-made material" },
  { v: "no-carbon", t: "No carbon steel", d: "Contamination or corrosion rules out carbon / alloy steel" },
  { v: "specialty", t: "Specialty alloy OK", d: "Monel, Inconel, Hastelloy, titanium acceptable" },
  { v: "budget", t: "Cost-sensitive", d: "Prioritize economical options that still meet reqs" },
];

export type Stage = 1 | 2 | 3 | 4 | "r";

export const STAGE_META: Array<{ n: Stage; label: string }> = [
  { n: 1, label: "Application" },
  { n: 2, label: "Environment" },
  { n: 3, label: "Strength" },
  { n: 4, label: "Requirements" },
  { n: "r", label: "Results" },
];
