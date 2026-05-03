# ASTM A453 — Bolting with High-Temperature Strength for Turbine and Pressure Service

> **At a glance:** A453 is the spec for high-temperature bolting that retains strength where A193 B16 falls off — typically 900°F to 1300°F service. The dominant grade is **Grade 660**, which is the A286 superalloy (iron-nickel-chromium with titanium and aluminum for precipitation hardening). Steam turbine bolting, aerospace engine hardware, hot-end industrial gas turbine fasteners all live in this spec. It's a step up in both capability and cost from A193 B16.

**Category:** Bolt Specification · High-Temperature
**Common grades stocked:** 660
**Typical pairing:** A453 Grade 660 nuts, high-temperature washers (typically matching grade)
**Industries:** Aerospace, power generation (steam and gas turbines), high-temperature process

---

## Scope

ASTM A453 covers bolting materials with high-temperature mechanical properties for use in pressure vessels, valves, flanges, and fittings operating at elevated temperatures. It specifies chemistry, heat treatment, mechanical properties, and (critically) guaranteed strength and stress-rupture performance at specified high service temperatures.

A453 fills the gap between A193 (reliable to about 1000–1100°F) and more specialized nickel-based superalloy specifications. Its dominant grade, 660, is the standardized callout for A286 superalloy fasteners.

## Grades

| Class | UNS | Common name | Service temperature ceiling |
|---|---|---|---|
| **Grade 660 Class A** | S66286 | A286 (solution treated + aged, higher aging temp) | ~1200°F |
| **Grade 660 Class B** | S66286 | A286 (lower aging temperature, higher strength) | ~1100°F |
| Grade 651 Class A | S63198 | 19-9DL | ~1200°F |
| Grade 651 Class B | S63198 | 19-9DL | ~1200°F |
| Grade 662 Class A | S66220 | Higher-Ni austenitic | ~1200°F |
| Grade 662 Class B | S66220 | — | — |
| Grade 665 Class A | S66545 | — | — |
| Grade 665 Class B | S66545 | — | — |

Grade 660 (A286) is by far the most-stocked and most-specified member of this family. The other grades are either obsolete or serve niche applications in specialized turbine and chemical processing.

## A286 — the material behind Grade 660

A286 (UNS S66286) is an iron-based superalloy:

- **Chemistry:** ~25% Ni, ~15% Cr, ~1.3% Mo, ~2% Ti, ~0.3% Al, remainder Fe
- **Structure:** Austenitic (FCC) at all temperatures — does not transform to ferrite or martensite
- **Hardening mechanism:** Precipitation of gamma-prime (γ', Ni₃(Ti,Al)) phase during aging heat treatment
- **Heat treat:** Solution treat at 1800°F, quench, age at 1325°F for 16 hours

Compared to 17-4 PH (steel-based precipitation-hardening stainless) or the nickel-based Inconels:

- Strength is lower than Inconel 718 but higher than 17-4 PH at elevated temperatures
- Cost is roughly between 17-4 PH and Inconel 718
- Corrosion resistance is excellent up to 1200°F
- Machinability is moderate — similar to austenitic stainless but more abrasive

## Mechanical properties — Grade 660 Class A

At room temperature (after standard solution + age):

| Property | Typical value |
|---|---|
| Tensile strength (min) | 130 ksi |
| Yield strength 0.2% offset (min) | 85 ksi |
| Elongation (min) | 15% |
| Reduction of area (min) | 18% |
| Hardness | 248–341 HBW |

At elevated temperatures, strength retention is the defining feature:

| Temperature | Typical tensile | Typical yield |
|---|---|---|
| 1000°F | ~125 ksi | ~75 ksi |
| 1100°F | ~115 ksi | ~70 ksi |
| 1200°F | ~105 ksi | ~65 ksi |

These values are retained values — not creep-rupture allowables. For long-term service design, use A453's creep-rupture data at the specified design temperature and duration.

## Class A vs Class B

Both classes use A286 chemistry but differ in heat treatment:

- **Class A:** Higher aging temperature produces slightly lower strength but better long-term stability at elevated temperatures. Preferred for continuous high-temperature service.
- **Class B:** Lower aging temperature produces higher room-temperature strength but less stability in long-term elevated-temperature service.

Class A is the standard for most new A286 fastener applications. Class B appears on legacy drawings.

## Applications

### Power generation
- Steam turbine bolting (casings, stop valves, reheat valves)
- Industrial gas turbine combustor and hot-section hardware
- High-pressure flange bolting in modern steam cycles
- Boiler feedwater pump and valve fasteners

### Aerospace
- Hot-section engine fasteners (compressor, combustor, high-pressure turbine hardware)
- Exhaust system fasteners
- Aerospace fluid system high-temperature bolting

### Petrochemical
- Cracker furnace hardware
- High-temperature reactor bolting
- Specialty high-pressure equipment

## Service considerations

- **Galling.** A286 is an austenitic superalloy and is prone to galling on threads, especially under the high axial loads common in high-temperature assembly. Anti-seize lubricant is standard practice; nickel-based or molybdenum disulfide compounds both work.
- **Thermal expansion.** A286 expands slightly less than stainless but more than carbon steel. Consider thermal differential between A286 bolting and mating carbon-steel flanges in cyclic service.
- **Welding.** A286 is weldable but tricky — age-hardening response requires post-weld solution treatment and re-aging to restore strength.
- **Galvanic behavior.** A286 is cathodic to carbon steel; in wet low-temperature service (rare for A286 applications), can accelerate corrosion of mating carbon steel parts.

## Documentation requirements

Because A453 bolting is used in high-consequence service, the documentation requirements are rigorous:

- Full mill certification with heat number traceability
- Chemistry (all specified elements)
- Mechanical properties at room temperature
- Hardness
- Heat-treatment records (solution treatment time/temp, aging time/temp)
- Non-destructive testing results (magnetic particle for surface defects — though A286 is paramagnetic and requires alternative MPI procedures, or dye penetrant inspection)
- Third-party testing where specified

For aerospace work, AS9102 First Article Inspection applies to new part numbers. Nadcap accreditation of the manufacturing facility is common requirement on aerospace primes' drawings.

## Related specifications

- **AMS 5732 / 5737** — Aerospace specification for A286 bar and forgings (frequently cross-referenced with A453 Grade 660)
- **A193 B16** — Lower-temperature alternative
- **Inconel 718 (AMS 5663, 5662)** — Higher-performance nickel superalloy alternative
- **A540** — Alloy-steel special-application bolting (lower temperature but heavier duty)
- **AMS 5731** — A286 bar annealed (alternative specification)

## Documentation

California Fastener A453 Grade 660 orders ship with full mill certificates showing class, heat number, complete chemistry, solution treatment and aging heat treatment records, and mechanical properties. Aerospace orders include AS9102 First Article Inspection documentation on request. DFARS 252.225-7009 specialty metals compliance statements are provided when the application requires US-source documentation.
