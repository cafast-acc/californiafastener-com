# ASTM A449 — Hex Cap Screws, Bolts, and Studs, Steel, Heat Treated

> **At a glance:** A449 is the everyday high-strength bolt spec when F3125 structural isn't called for. Strength levels are similar to SAE Grade 5 but across a much wider diameter range (up to 3"), which makes A449 the default for anchor bolts, machinery hardware, and general industrial bolting at sizes larger than structural bolts typically cover. One thing to watch: A449 tensile strength **changes with diameter** — the larger the bolt, the lower the minimum tensile.

**Category:** Bolt Specification
**Grades stocked:** Type 1 · Type 3
**Typical pairing:** A563 Grade A or DH, F436 washers for tensioned use
**Industries:** General industrial, construction, manufacturing, anchor applications

---

## Scope

ASTM A449 covers heat-treated steel bolts, studs, and externally threaded parts in diameters from 1/4" through 3". It is the general-purpose quenched-and-tempered bolt specification — strength levels are comparable to SAE Grade 5 but with ASTM's broader diameter range and ASTM-style documentation and traceability.

A449 is specified when a design needs more strength than A307 but doesn't require the structural-connection controls of F3125 or the pressure/temperature qualifications of A193.

## Types

| Type | Material | Use |
|---|---|---|
| **Type 1** | Medium carbon, Q&T | Standard; interior or protected exterior service |
| **Type 3** | Weathering steel, Q&T | Atmospheric corrosion resistance; matches A588 weathering-steel members |

Type 2 was removed from the spec.

## Mechanical properties — Type 1 (and Type 3)

A449 tensile and yield strength vary by diameter. This is the single most important thing to understand about A449:

| Diameter | Min. Tensile | Min. Yield | Min. Elong. | Min. RA | Max. Hardness |
|---|---|---|---|---|---|
| 1/4" through 1" | 120 ksi | 92 ksi | 14% | 35% | C34 HRC |
| Over 1" through 1-1/2" | 105 ksi | 81 ksi | 14% | 35% | C34 HRC |
| Over 1-1/2" through 3" | 90 ksi | 58 ksi | 14% | 35% | C34 HRC |

In plain language: an A449 bolt ≤1" diameter gets you 120 ksi tensile. Step up to 1-1/8", and it drops to 105 ksi. Step up past 1-1/2", and it drops again to 90 ksi. **Always confirm diameter-specific strength** before using A449 in a load-critical calculation.

This "strength drop" is intentional — larger sections are harder to fully quench through the cross section, so the spec accommodates what can be reliably achieved in heat treatment of thick sections. Specifications that don't drop (like F3125 A325 after 2015) require tighter heat-treat control and narrower acceptable chemistry.

## Chemistry

A449 is medium-carbon steel or medium-carbon alloy steel, Q&T:

- **Carbon:** 0.30–0.52% (narrower for heavier sections)
- **Manganese, phosphorus, sulfur:** commercial limits
- **Alloying:** may include boron, chromium, nickel, molybdenum, or vanadium as needed to develop properties through section
- **Heat treatment:** quenched from above upper critical temperature, then tempered at 800°F minimum

## Recommended nuts and washers

| A449 diameter | Nut | Washer |
|---|---|---|
| Up to 1" (120 ksi class) | A563 Grade DH or A194 2H | F436 (tensioned) or F844 (general) |
| 1-1/8" to 1-1/2" (105 ksi class) | A563 Grade DH or Grade C | F436 (tensioned) or F844 |
| Over 1-1/2" (90 ksi class) | A563 Grade A or C | F844 typically adequate |

## A449 vs neighboring specs

Practical comparisons that come up constantly:

- **A449 vs SAE Grade 5.** Same strength class for diameters up to 1". Grade 5 tops out at 1-1/2"; A449 extends to 3". For smaller inch-series bolts they're interchangeable in most non-structural work.
- **A449 vs F3125 A325.** Both 120 ksi up to 1". For structural-steel connections, AISC and RCSC require F3125, not A449, even though the strength is equivalent. A449 is for non-structural applications.
- **A449 vs F1554 Grade 105.** F1554 Grade 105 is specifically an anchor bolt spec (covers straight, bent, headed, and hooked configurations). A449 is a general bolt spec. For column base plate anchoring, F1554 is the correct callout.
- **A449 vs A354 BC.** A354 BC is 125 ksi all sizes up to 2-1/2", holding strength where A449 drops. Used when A449's diameter-strength drop becomes a design problem.

## Applications

- Non-structural high-strength bolting
- Machinery and equipment assembly
- Anchor bolt applications outside F1554 (for example, when an existing part spec calls for A449)
- General industrial hardware
- Steel-to-steel bolting that is not a structural connection per AISC
- Shackle pins, machine keys, and heavy-duty fasteners

## What A449 is NOT for

- **Structural steel connections** per AISC / RCSC — use F3125
- **Pressure / temperature service** — use A193
- **Anchor bolts for new work** — specify F1554 instead (A449 is acceptable where called out on existing drawings)
- **Cryogenic / low-temperature service** — use A320

## Marking

- Type 1: A449 heads typically carry three radial lines (SAE Grade 5 convention) plus manufacturer's mark. ASTM mark "A449" may also appear.
- Type 3: adds an underline or "3" designator and uses weathering-steel chemistry

## Related specifications

- **F3125** — Structural-bolt alternative for steel construction connections
- **F1554** — Anchor bolts (the correct modern callout for concrete anchorage)
- **A354 BC** — Higher-strength alternative without diameter drop
- **SAE J429 Grade 5** — Small-diameter counterpart
- **A563** — Nuts
- **F436 / F844** — Washers
- **F2329** — Hot-dip galvanizing

## Documentation

California Fastener A449 orders ship with mill certificates showing type, heat number, chemistry, mechanical properties **by diameter**, and hardness test results. When orders span multiple diameters, certs clearly indicate strength class by size to prevent design miscalculation.
