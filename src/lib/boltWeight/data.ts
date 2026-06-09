/* Bolt Weight Calculator — data tables + calculation logic.

   Direct, verbatim port of the constants and math from the design prototype
   (design_handoff_bolt_weight_calculator/bolt-weight-calculator.html). The
   formulas and dimensional lookup tables are authoritative engineering data —
   do NOT re-derive them. Densities are in lb/in³; metric dimension tables are
   converted to inches (cv = 1/25.4) before use. Results carry a ±5–10%
   tolerance (manufacturing variance, thread form, chamfers, coatings). */

export type UnitSystem = "imperial" | "metric";

export type FastenerTypeId =
  | "hex"
  | "hvyhex"
  | "shcs"
  | "rod"
  | "nut"
  | "hvynut"
  | "washer"
  | "sqwash";

export type FastenerType = {
  id: FastenerTypeId;
  label: string;
  desc: string;
  heavy?: boolean;
};

export type MaterialGroup =
  | "Steel"
  | "Stainless"
  | "Nickel Alloy"
  | "Light Metal"
  | "Copper Alloy"
  | "Exotic"
  | "Polymer";

// ═══ MATERIALS — { density (lb/in³), group }. Dropdown shows g/cm³ = density × 27.68. ═══
export const MATERIALS: Record<string, { density: number; group: MaterialGroup }> = {
  "Alloy / Carbon Steel": { density: 0.2836, group: "Steel" },
  "304 / 316 Stainless": { density: 0.289, group: "Stainless" },
  "17-4 PH Stainless": { density: 0.282, group: "Stainless" },
  A286: { density: 0.286, group: "Stainless" },
  AL6XN: { density: 0.291, group: "Stainless" },
  "Nitronic 50/60": { density: 0.285, group: "Stainless" },
  "Duplex 2205": { density: 0.278, group: "Stainless" },
  "Alloy 330": { density: 0.289, group: "Nickel Alloy" },
  "Inconel 625": { density: 0.305, group: "Nickel Alloy" },
  "Inconel 718": { density: 0.296, group: "Nickel Alloy" },
  "Hastelloy C276": { density: 0.321, group: "Nickel Alloy" },
  "Monel 400": { density: 0.319, group: "Nickel Alloy" },
  "Monel K500": { density: 0.306, group: "Nickel Alloy" },
  "Nickel 200": { density: 0.3216, group: "Nickel Alloy" },
  Waspaloy: { density: 0.298, group: "Nickel Alloy" },
  "MP35N / Naval Brass": { density: 0.304, group: "Nickel Alloy" },
  "Aluminum 2024 / 7075": { density: 0.101, group: "Light Metal" },
  "Titanium Gr2": { density: 0.163, group: "Light Metal" },
  "Titanium Gr5": { density: 0.16, group: "Light Metal" },
  "Silicon Bronze": { density: 0.308, group: "Copper Alloy" },
  Molybdenum: { density: 0.369, group: "Exotic" },
  Tantalum: { density: 0.6, group: "Exotic" },
  Tungsten: { density: 0.697, group: "Exotic" },
  Zirconium: { density: 0.235, group: "Exotic" },
  PEEK: { density: 0.047, group: "Polymer" },
  PTFE: { density: 0.078, group: "Polymer" },
};

// Preserve the optgroup order as authored (object iteration order is fine for
// string keys, but we pin it explicitly so the dropdown grouping never drifts).
export const MATERIAL_GROUP_ORDER: MaterialGroup[] = [
  "Steel",
  "Stainless",
  "Nickel Alloy",
  "Light Metal",
  "Copper Alloy",
  "Exotic",
  "Polymer",
];

// ═══ DIMENSION TABLES ═══
// Hex / heavy hex: [nominalDia, flatToFlat, hexThk, pitchDia]
export const IMP_HEX: Record<string, number[]> = {
  "1/4": [0.25, 0.4375, 0.1719, 0.2175], "5/16": [0.3125, 0.5, 0.2188, 0.2764], "3/8": [0.375, 0.5625, 0.25, 0.3344], "7/16": [0.4375, 0.625, 0.2969, 0.3911], "1/2": [0.5, 0.75, 0.3281, 0.45], "5/8": [0.625, 0.9375, 0.4219, 0.566], "3/4": [0.75, 1.125, 0.5, 0.685], "7/8": [0.875, 1.3125, 0.5781, 0.8028], "1": [1, 1.5, 0.6563, 0.9188], "1-1/8": [1.125, 1.6875, 0.75, 1.0322], "1-1/4": [1.25, 1.875, 0.8125, 1.1572], "1-3/8": [1.375, 2.0625, 0.875, 1.2667], "1-1/2": [1.5, 2.25, 0.9375, 1.3917], "1-3/4": [1.75, 2.625, 1.0625, 1.6201], "2": [2, 3, 1.1875, 1.8557], "2-1/4": [2.25, 3.375, 1.3125, 2.0843], "2-1/2": [2.5, 3.75, 1.4375, 2.3376], "2-3/4": [2.75, 4.125, 1.5625, 2.5627], "3": [3, 4.5, 1.6875, 2.7877], "3-1/2": [3.5, 5.25, 1.9375, 3.2377], "4": [4, 6, 2.1875, 3.6877],
};
export const IMP_HVY: Record<string, number[]> = {
  "1/2": [0.5, 0.875, 0.3281, 0.45], "5/8": [0.625, 1.0625, 0.4219, 0.566], "3/4": [0.75, 1.25, 0.5, 0.685], "7/8": [0.875, 1.4375, 0.5781, 0.8028], "1": [1, 1.625, 0.6563, 0.9188], "1-1/8": [1.125, 1.8125, 0.75, 1.0322], "1-1/4": [1.25, 2, 0.8125, 1.1572], "1-3/8": [1.375, 2.1875, 0.875, 1.2667], "1-1/2": [1.5, 2.375, 0.9375, 1.3917], "1-3/4": [1.75, 2.75, 1.0625, 1.6201], "2": [2, 3.125, 1.1875, 1.8557], "2-1/4": [2.25, 3.5, 1.3125, 2.0843], "2-1/2": [2.5, 3.875, 1.4375, 2.3376], "2-3/4": [2.75, 4.25, 1.5625, 2.5627], "3": [3, 4.625, 1.6875, 2.7877],
};
// SHCS: [nominalDia, socketDia, headDia, headHt, socketDepth, pitchDia]
export const IMP_SHCS: Record<string, number[]> = {
  "1/4": [0.25, 0.1875, 0.375, 0.25, 0.125, 0.2175], "5/16": [0.3125, 0.25, 0.469, 0.313, 0.156, 0.2764], "3/8": [0.375, 0.3125, 0.563, 0.375, 0.188, 0.3344], "7/16": [0.4375, 0.3438, 0.656, 0.438, 0.219, 0.3911], "1/2": [0.5, 0.375, 0.75, 0.5, 0.25, 0.45], "5/8": [0.625, 0.5, 0.938, 0.625, 0.313, 0.566], "3/4": [0.75, 0.625, 1.125, 0.75, 0.375, 0.685], "7/8": [0.875, 0.75, 1.313, 0.875, 0.438, 0.8028], "1": [1, 0.75, 1.5, 1, 0.5, 0.9188], "1-1/4": [1.25, 1, 1.875, 1.25, 0.625, 1.1572], "1-1/2": [1.5, 1.25, 2.25, 1.5, 0.75, 1.3917], "2": [2, 1.5, 3, 2, 1, 1.8557],
};
// Washer: [holeID, OD, thickness]
export const IMP_WSH: Record<string, number[]> = {
  "1/4": [0.281, 0.625, 0.065], "5/16": [0.344, 0.688, 0.065], "3/8": [0.406, 0.812, 0.065], "7/16": [0.469, 0.922, 0.065], "1/2": [0.531, 1.062, 0.097], "9/16": [0.594, 1.156, 0.097], "5/8": [0.656, 1.312, 0.097], "3/4": [0.812, 1.469, 0.122], "7/8": [0.938, 1.75, 0.134], "1": [1.062, 2, 0.134], "1-1/8": [1.25, 2.25, 0.134], "1-1/4": [1.375, 2.5, 0.165], "1-3/8": [1.5, 2.75, 0.165], "1-1/2": [1.625, 3, 0.165], "1-3/4": [1.875, 3.5, 0.18], "2": [2.125, 4, 0.18], "2-1/4": [2.375, 4.5, 0.22], "2-1/2": [2.625, 5, 0.238], "2-3/4": [2.875, 5.5, 0.259], "3": [3.125, 6, 0.284],
};
// Square plate washer: [holeID, side, thickness]
export const IMP_SQW: Record<string, number[]> = {
  "1/2": [0.5625, 2, 0.125], "5/8": [0.6875, 2.25, 0.15625], "3/4": [0.8125, 2.5, 0.1875], "7/8": [0.9375, 2.75, 0.1875], "1": [1.0625, 3, 0.1875], "1-1/8": [1.1875, 3.25, 0.25], "1-1/4": [1.3125, 3.5, 0.25], "1-3/8": [1.4375, 3.75, 0.25], "1-1/2": [1.5625, 4, 0.3125], "1-3/4": [1.8125, 4.5, 0.3125], "2": [2.0625, 5, 0.375], "2-1/4": [2.3125, 5.5, 0.375], "2-1/2": [2.5625, 6, 0.375],
};

export const MET_HEX: Record<string, number[]> = {
  M6: [6, 10, 4, 5.35], M8: [8, 13, 5.3, 7.19], M10: [10, 16, 6.4, 8.83], M12: [12, 18, 7.5, 10.65], M16: [16, 24, 10, 14.7], M20: [20, 30, 12.5, 18.38], M22: [22, 34, 14, 20.38], M24: [24, 36, 15, 22.05], M27: [27, 41, 17, 24.98], M30: [30, 46, 18.7, 27.73], M36: [36, 55, 22.5, 33.4], M42: [42, 65, 26, 39.08], M48: [48, 75, 30, 44.75],
};
export const MET_HVY: Record<string, number[]> = {
  M12: [12, 22, 7.5, 10.65], M16: [16, 27, 10, 14.7], M20: [20, 34, 12.5, 18.38], M22: [22, 36, 14, 20.38], M24: [24, 41, 15, 22.05], M27: [27, 46, 17, 24.98], M30: [30, 50, 18.7, 27.73], M36: [36, 60, 22.5, 33.4],
};
export const MET_SHCS: Record<string, number[]> = {
  M6: [6, 5, 10, 6, 3, 5.35], M8: [8, 6, 13, 8, 4, 7.19], M10: [10, 8, 16, 10, 5, 8.83], M12: [12, 10, 18, 12, 6, 10.65], M16: [16, 14, 24, 16, 8, 14.7], M20: [20, 17, 30, 20, 10, 18.38], M24: [24, 19, 36, 24, 12, 22.05], M30: [30, 22, 45, 30, 15.5, 27.73], M36: [36, 27, 54, 36, 19, 33.4],
};
export const MET_WSH: Record<string, number[]> = {
  M6: [6.4, 12, 1.6], M8: [8.4, 16, 1.6], M10: [10.5, 20, 2], M12: [13, 24, 2.5], M16: [17, 30, 3], M20: [21, 37, 3], M22: [23, 39, 3], M24: [25, 44, 4], M27: [28, 50, 4], M30: [31, 56, 4], M36: [37, 66, 5],
};
export const MET_SQW: Record<string, number[]> = {
  M12: [14, 50, 4], M16: [18, 55, 5], M20: [22, 65, 5], M22: [24, 70, 6], M24: [26, 75, 6], M27: [30, 85, 8], M30: [33, 90, 8], M36: [39, 110, 10],
};

// ═══ SIZE-ORDER ARRAYS — JS reorders integer-like object keys, so do not rely
//     on Object.keys for display order. These pin the dropdown order. ═══
export const ORD_IMP_HEX = ["1/4", "5/16", "3/8", "7/16", "1/2", "5/8", "3/4", "7/8", "1", "1-1/8", "1-1/4", "1-3/8", "1-1/2", "1-3/4", "2", "2-1/4", "2-1/2", "2-3/4", "3", "3-1/2", "4"];
export const ORD_IMP_HVY = ["1/2", "5/8", "3/4", "7/8", "1", "1-1/8", "1-1/4", "1-3/8", "1-1/2", "1-3/4", "2", "2-1/4", "2-1/2", "2-3/4", "3"];
export const ORD_IMP_SHCS = ["1/4", "5/16", "3/8", "7/16", "1/2", "5/8", "3/4", "7/8", "1", "1-1/4", "1-1/2", "2"];
export const ORD_IMP_WSH = ["1/4", "5/16", "3/8", "7/16", "1/2", "9/16", "5/8", "3/4", "7/8", "1", "1-1/8", "1-1/4", "1-3/8", "1-1/2", "1-3/4", "2", "2-1/4", "2-1/2", "2-3/4", "3"];
export const ORD_IMP_SQW = ["1/2", "5/8", "3/4", "7/8", "1", "1-1/8", "1-1/4", "1-3/8", "1-1/2", "1-3/4", "2", "2-1/4", "2-1/2"];
export const ORD_MET_HEX = ["M6", "M8", "M10", "M12", "M16", "M20", "M22", "M24", "M27", "M30", "M36", "M42", "M48"];
export const ORD_MET_HVY = ["M12", "M16", "M20", "M22", "M24", "M27", "M30", "M36"];
export const ORD_MET_SHCS = ["M6", "M8", "M10", "M12", "M16", "M20", "M24", "M30", "M36"];
export const ORD_MET_WSH = ["M6", "M8", "M10", "M12", "M16", "M20", "M22", "M24", "M27", "M30", "M36"];
export const ORD_MET_SQW = ["M12", "M16", "M20", "M22", "M24", "M27", "M30", "M36"];

// ═══ FASTENER TYPES (display order) ═══
export const TYPES: FastenerType[] = [
  { id: "hex", label: "Hex Bolt", desc: "Standard hex head cap screws and hex bolts" },
  { id: "hvyhex", label: "Heavy Hex Bolt", desc: "A325, A490, structural heavy hex bolts", heavy: true },
  { id: "shcs", label: "Socket Head Cap Screw", desc: "Allen-drive socket head cap screws" },
  { id: "rod", label: "Threaded Rod / Stud", desc: "Fully threaded rod, studs, and B7 studs" },
  { id: "nut", label: "Hex Nut", desc: "Finished hex nuts, jam nuts" },
  { id: "hvynut", label: "Heavy Hex Nut", desc: "A194 2H, DH, structural heavy hex nuts", heavy: true },
  { id: "washer", label: "Flat Washer", desc: "F436, SAE, USS flat washers" },
  { id: "sqwash", label: "Square Plate Washer", desc: "Steel and GR.50 plate washers" },
];

const PI = Math.PI;
const hexA = (f: number) => (Math.sqrt(3) / 2) * f * f;

// ═══ STATE ═══
export type CalcState = {
  tid: FastenerTypeId;
  sys: UnitSystem;
  sk: string;
  mat: string;
  len: number;
  tlen: number;
  qty: number;
  sqlen: number;
  sqwid: number;
  sqthk: number;
};

export const INITIAL_STATE: CalcState = {
  tid: "hex",
  sys: "imperial",
  sk: "1/2",
  mat: "Alloy / Carbon Steel",
  len: 3,
  tlen: 1.5,
  qty: 100,
  sqlen: 3,
  sqwid: 3,
  sqthk: 0.1875,
};

// Default length / thread / plate dimensions per unit system.
export const SYSTEM_DEFAULTS: Record<UnitSystem, { len: number; tlen: number; sqlen: number; sqwid: number; sqthk: number }> = {
  imperial: { len: 3, tlen: 1.5, sqlen: 3, sqwid: 3, sqthk: 0.1875 },
  metric: { len: 80, tlen: 40, sqlen: 75, sqwid: 75, sqthk: 5 },
};

// ═══ HELPERS ═══
export function getSizes(tid: FastenerTypeId, sys: UnitSystem): string[] {
  const m = sys === "metric";
  if (tid === "hex" || tid === "rod" || tid === "nut") return m ? ORD_MET_HEX : ORD_IMP_HEX;
  if (tid === "hvyhex" || tid === "hvynut") return m ? ORD_MET_HVY : ORD_IMP_HVY;
  if (tid === "shcs") return m ? ORD_MET_SHCS : ORD_IMP_SHCS;
  if (tid === "washer") return m ? ORD_MET_WSH : ORD_IMP_WSH;
  if (tid === "sqwash") return m ? ORD_MET_SQW : ORD_IMP_SQW;
  return [];
}

export function needsLen(t: FastenerTypeId): boolean {
  return ["hex", "hvyhex", "shcs", "rod"].includes(t);
}
export function needsThread(t: FastenerTypeId): boolean {
  return ["hex", "hvyhex"].includes(t);
}

// Default size: index 3 (or last available) — a sensible mid-range size.
export function defaultSize(tid: FastenerTypeId, sys: UnitSystem): string {
  const sizes = getSizes(tid, sys);
  return sizes[Math.min(3, sizes.length - 1)] || sizes[0];
}

export type CalcResult = {
  eL: number; // lb each
  eO: number; // oz each
  eG: number; // g each
  eK: number; // kg each
  tL: number; // lot lb
  tK: number; // lot kg
};

// ═══ CALC — volume × density. Returns null when the size isn't valid. ═══
export function calc(state: CalcState): CalcResult | null {
  const { tid, sys, sk, mat, len, tlen, qty } = state;
  const d = MATERIALS[mat]?.density;
  if (!d) return null;
  const m = sys === "metric";
  const cv = m ? 1 / 25.4 : 1;
  let v = 0;
  if (tid === "hex" || tid === "hvyhex") {
    const t = m ? (tid === "hvyhex" ? MET_HVY : MET_HEX) : tid === "hvyhex" ? IMP_HVY : IMP_HEX;
    const dm = t[sk];
    if (!dm) return null;
    const [n, f, h, p] = dm.map((x) => x * cv);
    const L = len * cv;
    const Lt = tlen * cv;
    v = hexA(f) * h + (PI / 4) * n * n * Math.max(0, L - Lt) + (PI / 4) * p * p * Math.min(Lt, L);
  } else if (tid === "shcs") {
    const t = m ? MET_SHCS : IMP_SHCS;
    const dm = t[sk];
    if (!dm) return null;
    const [, hd, hdia, hht, sd, p] = dm.map((x) => x * cv);
    const L = len * cv;
    v = (PI / 4) * hdia * hdia * hht - (PI / 4) * hd * hd * sd + (PI / 4) * p * p * L;
  } else if (tid === "rod") {
    const t = m ? MET_HEX : IMP_HEX;
    const dm = t[sk];
    if (!dm) return null;
    const [, , , p] = dm.map((x) => x * cv);
    v = (PI / 4) * p * p * len * cv;
  } else if (tid === "nut" || tid === "hvynut") {
    const t = m ? (tid === "hvynut" ? MET_HVY : MET_HEX) : tid === "hvynut" ? IMP_HVY : IMP_HEX;
    const dm = t[sk];
    if (!dm) return null;
    const [n, f, h] = dm.map((x) => x * cv);
    const nh = h * 0.875;
    v = hexA(f) * nh - (PI / 4) * n * n * nh;
  } else if (tid === "washer") {
    const t = m ? MET_WSH : IMP_WSH;
    const dm = t[sk];
    if (!dm) return null;
    const [id, od, th] = dm.map((x) => x * cv);
    v = (PI / 4) * (od * od - id * id) * th;
  } else if (tid === "sqwash") {
    const t = m ? MET_SQW : IMP_SQW;
    const dm = t[sk];
    if (!dm) return null;
    const hd = dm[0] * cv;
    const pl = state.sqlen * cv;
    const pw = state.sqwid * cv;
    const pt = state.sqthk * cv;
    v = pl * pw * pt - (PI / 4) * hd * hd * pt;
  }
  const w = v * d;
  return { eL: w, eO: w * 16, eG: w * 453.592, eK: w * 0.453592, tL: w * qty, tK: w * 0.453592 * qty };
}

// ═══ DIMENSIONS USED — rows for the "Dimensions used" card. ═══
export function getDims(state: CalcState): { rows: [string, number][]; u: "in" | "mm" } {
  const { tid, sys, sk } = state;
  const m = sys === "metric";
  const u: "in" | "mm" = m ? "mm" : "in";
  let rows: [string, number][] = [];
  if (["hex", "hvyhex", "nut", "hvynut"].includes(tid)) {
    const t = m ? (tid.includes("hvy") ? MET_HVY : MET_HEX) : tid.includes("hvy") ? IMP_HVY : IMP_HEX;
    const d = t[sk];
    if (d) rows = [["Nominal Dia", d[0]], ["Flat-to-Flat", d[1]], ["Hex Thk", d[2]], ["Pitch Dia", d[3]]];
  } else if (tid === "shcs") {
    const t = m ? MET_SHCS : IMP_SHCS;
    const d = t[sk];
    if (d) rows = [["Nominal Dia", d[0]], ["Head Dia", d[2]], ["Head Ht", d[3]], ["Pitch Dia", d[5]]];
  } else if (tid === "washer") {
    const t = m ? MET_WSH : IMP_WSH;
    const d = t[sk];
    if (d) rows = [["Hole ID", d[0]], ["OD", d[1]], ["Thickness", d[2]]];
  } else if (tid === "sqwash") {
    const t = m ? MET_SQW : IMP_SQW;
    const d = t[sk];
    if (d) rows = [["Hole ID", d[0]], ["Length", state.sqlen], ["Width", state.sqwid], ["Thickness", state.sqthk]];
  } else if (tid === "rod") {
    const t = m ? MET_HEX : IMP_HEX;
    const d = t[sk];
    if (d) rows = [["Nominal Dia", d[0]], ["Pitch Dia", d[3]]];
  }
  return { rows, u };
}
