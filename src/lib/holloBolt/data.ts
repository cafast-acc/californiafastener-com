/* Lindapter Hollo-Bolt catalog — sourced from the US Imperial Catalog (Apr 2026,
   pp. 51–67). All SWL values use FOS 5:1. SKUs follow Lindapter's coding:
     LHB[size code][head]#[len][finish]
   e.g. LHBM12HEX#2ZN = 1/2" hex head, medium grip, zinc plated + JS500. */

export type HeadType = "HEX" | "CSK" | "FF";
export type Size = "5/16" | "3/8" | "1/2" | "5/8" | "3/4";
export type Finish = "ZN" | "HDG" | "SP" | "ST";

export type Product = {
  head: HeadType;
  size: Size;
  len: 1 | 2 | 3;
  gripMin: number;
  gripMax: number;
  gripDisp: string;
  tensile: number;
  shear: number;
  torque: number;
  hcf: boolean;
  outerMin: number;
  lengthIn: string;
};

export const FINISH_AVAIL: Record<HeadType, Record<Finish, boolean>> = {
  HEX: { ZN: true, HDG: true, SP: true, ST: true },
  CSK: { ZN: true, HDG: false, SP: true, ST: true },
  FF: { ZN: true, HDG: false, SP: true, ST: true },
};

export const FINISH_LABELS: Record<Finish, string> = {
  ZN: "Zinc Plated + JS500",
  HDG: "Hot Dip Galvanized",
  SP: "Sheraplex",
  ST: "Stainless Steel 316",
};

export const HEAD_LABELS: Record<HeadType, string> = {
  HEX: "Hex",
  CSK: "Countersunk",
  FF: "Flush Fit",
};

export const SIZE_CODE: Record<Size, string> = {
  "5/16": "M08",
  "3/8": "M10",
  "1/2": "M12",
  "5/8": "M16",
  "3/4": "M20",
};

export const HEAD_SIZE_AVAIL: Record<HeadType, Size[]> = {
  HEX: ["5/16", "3/8", "1/2", "5/8", "3/4"],
  CSK: ["5/16", "3/8", "1/2", "5/8"],
  FF: ["5/16", "3/8", "1/2"],
};

export const PRODUCTS: Product[] = [
  // HEX 5/16"
  { head: "HEX", size: "5/16", len: 1, gripMin: 0.125, gripMax: 0.875, gripDisp: '1/8" – 7/8"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0, lengthIn: '1 3/4"' },
  { head: "HEX", size: "5/16", len: 2, gripMin: 0.875, gripMax: 1.625, gripDisp: '7/8" – 1 5/8"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0, lengthIn: '2 9/16"' },
  { head: "HEX", size: "5/16", len: 3, gripMin: 1.625, gripMax: 2.375, gripDisp: '1 5/8" – 2 3/8"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0, lengthIn: '3 3/8"' },
  // HEX 3/8"
  { head: "HEX", size: "3/8", len: 1, gripMin: 0.125, gripMax: 0.875, gripDisp: '1/8" – 7/8"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0, lengthIn: '2"' },
  { head: "HEX", size: "3/8", len: 2, gripMin: 0.875, gripMax: 1.625, gripDisp: '7/8" – 1 5/8"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0, lengthIn: '2 1/2"' },
  { head: "HEX", size: "3/8", len: 3, gripMin: 1.625, gripMax: 2.375, gripDisp: '1 5/8" – 2 3/8"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0, lengthIn: '3 5/16"' },
  // HEX 1/2"
  { head: "HEX", size: "1/2", len: 1, gripMin: 0.125, gripMax: 1.0, gripDisp: '1/8" – 1"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0, lengthIn: '2 1/8"' },
  { head: "HEX", size: "1/2", len: 2, gripMin: 1.0, gripMax: 1.8125, gripDisp: '1" – 1 13/16"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0, lengthIn: '2 7/8"' },
  { head: "HEX", size: "1/2", len: 3, gripMin: 1.8125, gripMax: 2.75, gripDisp: '1 13/16" – 2 3/4"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0, lengthIn: '3 3/4"' },
  // HEX 5/8" HCF
  { head: "HEX", size: "5/8", len: 1, gripMin: 0.5, gripMax: 1.125, gripDisp: '1/2" – 1 1/8"', tensile: 4720, shear: 6744, torque: 140, hcf: true, outerMin: 0.3125, lengthIn: '2 5/8"' },
  { head: "HEX", size: "5/8", len: 2, gripMin: 1.125, gripMax: 2.0, gripDisp: '1 1/8" – 2"', tensile: 4720, shear: 6744, torque: 140, hcf: true, outerMin: 0.3125, lengthIn: '3 5/8"' },
  { head: "HEX", size: "5/8", len: 3, gripMin: 2.0, gripMax: 2.8125, gripDisp: '2" – 2 13/16"', tensile: 4720, shear: 6744, torque: 140, hcf: true, outerMin: 0.3125, lengthIn: '4 7/16"' },
  // HEX 3/4" HCF
  { head: "HEX", size: "3/4", len: 1, gripMin: 0.5, gripMax: 1.3125, gripDisp: '1/2" – 1 5/16"', tensile: 7868, shear: 8992, torque: 221, hcf: true, outerMin: 0.3125, lengthIn: '3 1/8"' },
  { head: "HEX", size: "3/4", len: 2, gripMin: 1.3125, gripMax: 2.375, gripDisp: '1 5/16" – 2 3/8"', tensile: 7868, shear: 8992, torque: 221, hcf: true, outerMin: 0.3125, lengthIn: '4 5/16"' },
  { head: "HEX", size: "3/4", len: 3, gripMin: 2.375, gripMax: 3.375, gripDisp: '2 3/8" – 3 3/8"', tensile: 7868, shear: 8992, torque: 221, hcf: true, outerMin: 0.3125, lengthIn: '5 1/2"' },

  // CSK 5/16"
  { head: "CSK", size: "5/16", len: 1, gripMin: 0.125, gripMax: 0.875, gripDisp: '1/8" – 7/8"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0, lengthIn: '1 3/4"' },
  { head: "CSK", size: "5/16", len: 2, gripMin: 0.875, gripMax: 1.625, gripDisp: '7/8" – 1 5/8"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0, lengthIn: '2 9/16"' },
  { head: "CSK", size: "5/16", len: 3, gripMin: 1.625, gripMax: 2.375, gripDisp: '1 5/8" – 2 3/8"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0, lengthIn: '3 3/8"' },
  // CSK 3/8"
  { head: "CSK", size: "3/8", len: 1, gripMin: 0.125, gripMax: 0.875, gripDisp: '1/8" – 7/8"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0, lengthIn: '1 3/4"' },
  { head: "CSK", size: "3/8", len: 2, gripMin: 0.875, gripMax: 1.625, gripDisp: '7/8" – 1 5/8"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0, lengthIn: '2 1/2"' },
  { head: "CSK", size: "3/8", len: 3, gripMin: 1.625, gripMax: 2.375, gripDisp: '1 5/8" – 2 3/8"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0, lengthIn: '3 5/16"' },
  // CSK 1/2"
  { head: "CSK", size: "1/2", len: 1, gripMin: 0.125, gripMax: 1.0, gripDisp: '1/8" – 1"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0, lengthIn: '1 7/8"' },
  { head: "CSK", size: "1/2", len: 2, gripMin: 1.0, gripMax: 1.8125, gripDisp: '1" – 1 13/16"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0, lengthIn: '2 7/8"' },
  { head: "CSK", size: "1/2", len: 3, gripMin: 1.8125, gripMax: 2.75, gripDisp: '1 13/16" – 2 3/4"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0, lengthIn: '3 11/16"' },
  // CSK 5/8" HCF
  { head: "CSK", size: "5/8", len: 1, gripMin: 0.5, gripMax: 1.125, gripDisp: '1/2" – 1 1/8"', tensile: 4720, shear: 6744, torque: 140, hcf: true, outerMin: 0.3125, lengthIn: '2 7/16"' },
  { head: "CSK", size: "5/8", len: 2, gripMin: 1.125, gripMax: 2.0, gripDisp: '1 1/8" – 2"', tensile: 4720, shear: 6744, torque: 140, hcf: true, outerMin: 0.3125, lengthIn: '3 5/8"' },
  { head: "CSK", size: "5/8", len: 3, gripMin: 2.0, gripMax: 2.8125, gripDisp: '2" – 2 13/16"', tensile: 4720, shear: 6744, torque: 140, hcf: true, outerMin: 0.3125, lengthIn: '4 7/16"' },

  // FF 5/16"
  { head: "FF", size: "5/16", len: 1, gripMin: 0.375, gripMax: 1.0625, gripDisp: '3/8" – 1 1/16"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0.3125, lengthIn: '2"' },
  { head: "FF", size: "5/16", len: 2, gripMin: 1.0625, gripMax: 1.75, gripDisp: '1 1/16" – 1 3/4"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0.3125, lengthIn: '2 3/4"' },
  { head: "FF", size: "5/16", len: 3, gripMin: 1.75, gripMax: 2.5, gripDisp: '1 3/4" – 2 1/2"', tensile: 899, shear: 1124, torque: 17, hcf: false, outerMin: 0.3125, lengthIn: '3 9/16"' },
  // FF 3/8"
  { head: "FF", size: "3/8", len: 1, gripMin: 0.5, gripMax: 1.0625, gripDisp: '1/2" – 1 1/16"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0.375, lengthIn: '2"' },
  { head: "FF", size: "3/8", len: 2, gripMin: 1.0625, gripMax: 1.75, gripDisp: '1 1/16" – 1 3/4"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0.375, lengthIn: '2 3/4"' },
  { head: "FF", size: "3/8", len: 3, gripMin: 1.75, gripMax: 2.5, gripDisp: '1 3/4" – 2 1/2"', tensile: 1910, shear: 2248, torque: 33, hcf: false, outerMin: 0.375, lengthIn: '3 9/16"' },
  // FF 1/2"
  { head: "FF", size: "1/2", len: 1, gripMin: 0.5, gripMax: 1.1875, gripDisp: '1/2" – 1 3/16"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0.375, lengthIn: '2 3/16"' },
  { head: "FF", size: "1/2", len: 2, gripMin: 1.1875, gripMax: 2.03125, gripDisp: '1 3/16" – 2 1/32"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0.375, lengthIn: '3 1/8"' },
  { head: "FF", size: "1/2", len: 3, gripMin: 2.03125, gripMax: 2.875, gripDisp: '2 1/32" – 2 7/8"', tensile: 2360, shear: 3372, torque: 59, hcf: false, outerMin: 0.375, lengthIn: '4"' },
];

export function buildSku(p: Product, finish: Finish): string {
  return `LHB${SIZE_CODE[p.size]}${p.head}#${p.len}${finish}`;
}

export function inchToFraction(decimal: number): string {
  const whole = Math.floor(decimal);
  const frac = decimal - whole;
  const sixteenths = Math.round(frac * 16);
  if (sixteenths === 0) return `${whole}"`;
  if (sixteenths === 16) return `${whole + 1}"`;
  let n = sixteenths;
  let d = 16;
  const g = gcd(n, d);
  n = n / g;
  d = d / g;
  return whole > 0 ? `${whole} ${n}/${d}"` : `${n}/${d}"`;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
