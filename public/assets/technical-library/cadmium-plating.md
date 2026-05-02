# Cadmium Plating — QQ-P-416 / AMS-QQ-P-416 (Legacy Reference)

> **At a glance:** Cadmium plating was the premier fastener coating for aerospace and defense for decades. It's thin, dense, highly corrosion-resistant, naturally lubricious, and anti-galling — a combination that's hard to match. But cadmium is toxic: hazardous to workers during plating, hazardous to end-users if the part is worn or damaged, and a major environmental pollutant. The industry has been phasing it out for 20+ years. Old drawings still call for it; new work rarely does. This page exists to explain legacy callouts and point to approved replacements.

**Category:** Coating Specification · Legacy Reference
**Typical base fasteners:** Legacy aerospace and defense hardware
**Industries:** Aerospace (legacy), defense (legacy), government MRO

---

## Scope

Cadmium plating for fasteners has historically been specified by:

- **QQ-P-416F** — US Federal Specification "Plating, Cadmium (Electrodeposited)"
- **AMS-QQ-P-416** — SAE AMS adoption of the federal spec
- **MIL-STD-171** — Finishing of Metal and Wood Surfaces (historical reference)

QQ-P-416 was cancelled as an active federal specification but remains in use on legacy drawings and in MRO/depot repair of in-service aircraft and defense equipment. AMS-QQ-P-416 was the industry adoption of the federal spec and is the reference on many current defense drawings.

## Why cadmium was the gold standard

Cadmium plating combined several hard-to-match properties:

- **Exceptional corrosion resistance** — 200+ hours salt spray for standard coatings; 500+ hours with chromate supplementary treatment
- **Galvanic compatibility with aluminum** — cadmium and aluminum have similar electrode potentials, minimizing galvanic corrosion at dissimilar-metal joints (a critical advantage on aluminum aircraft structure)
- **Natural lubricity** — the cadmium surface is naturally low-friction; K-factors are favorable without added lubricants
- **Anti-galling** — stainless-on-cadmium and titanium-on-cadmium thread pairs resist galling
- **Ductility** — doesn't crack or spall during forming, assembly, or thermal cycling
- **Dimensional precision** — thin coating (5–25 μm) doesn't interfere with precision threads

Across aerospace structural hardware, defense equipment, and precision mechanisms, cadmium plating became the default specification.

## Classes and types per QQ-P-416

QQ-P-416 defines:

**Classes** (thickness):
- Class 1: 0.0005" (13 μm) — standard
- Class 2: 0.0003" (8 μm) — lighter
- Class 3: 0.0002" (5 μm) — very light (precision threads)

**Types** (supplementary treatment):
- Type I: plain / no chromate
- Type II: chromate conversion (clear, yellow, or olive drab)
- Type III: phosphate conversion (paint base)

Type II yellow (iridescent chromate) is what most legacy aerospace drawings specify — the distinctive yellow-gold cadmium-plated fastener appearance.

## Hydrogen embrittlement

Cadmium plating, being electrolytically deposited, carries hydrogen embrittlement risk similar to zinc electroplating. High-strength steels require mandatory hydrogen relief baking:

- ≥ HRC 40: mandatory 375°F bake for 23 hours per QQ-P-416
- HRC 33–40: bake strongly recommended

On aerospace structural bolts (MS21250-series, NAS6700-series, etc.), every cadmium-plated fastener is baked and the bake is documented on the traceability package.

## Why cadmium is being phased out

Cadmium is a known human carcinogen and environmental toxin:

- **Occupational exposure** — cadmium plating workers face elevated risk of lung disease and kidney damage. OSHA permissible exposure limits are stringent; containment and ventilation are expensive.
- **End-user exposure** — worn or damaged cadmium surfaces can release cadmium dust. Handling and machining cadmium-plated parts generates cadmium-contaminated debris.
- **Environmental release** — plating wastewater, air emissions, and disposal of cadmium-plated scrap all release cadmium into water and soil.
- **Regulatory pressure** — EU RoHS, REACH, ELV (automotive), and California Proposition 65 all restrict cadmium. Global automotive has essentially eliminated cadmium; aerospace is in late-stage phase-out for new programs.

The US DoD Qualified Products List (QPL) for cadmium plating has shrunk as shops either consolidate or close. Finding a qualified cadmium plating source for new orders is increasingly difficult and expensive.

## Approved replacements

Modern aerospace and defense programs replace cadmium with:

| Replacement | Best for | Limitations |
|---|---|---|
| **Zinc-nickel (AMS 2417)** | High-strength steel aerospace hardware | Different galvanic behavior; requires engineering assessment for Al-contact |
| **Aluminum IVD (AMS 2429 / 2430)** | Aerospace fasteners | Cost; lower throughput |
| **Zinc-flake coatings (F3019, F1136, F2833)** | Structural and general aerospace | Newer in aerospace; qualification effort |
| **Sermatel / SermaGard (diffusion alloys)** | High-temperature aerospace | Specific-service applications |
| **Modern stainless fasteners** | Many structural applications | Weight; different galvanic behavior |

For any legacy drawing calling out QQ-P-416 cadmium on new production, the engineering question is always: **is the cadmium callout essential, or is a current-spec replacement acceptable?** The answer is engineering-assessment-specific but almost always points to a modern alternative.

## Repair and MRO

For in-service aircraft and equipment that already has cadmium plating from original manufacture, field repair practices vary:

- Touch-up of minor coating damage per QQ-P-416 remains allowed on specific aircraft per MRO procedures
- Replacement of coated hardware with cadmium may require new cadmium-plated parts (the replacement logic preserves galvanic and mechanical consistency with the original assembly)
- Some MRO depots still maintain cadmium plating capability specifically for legacy fleet support

## Applications (historical)

- Aircraft structural fasteners (MS21250, MS21297, NAS6700 series)
- Engine attachment hardware
- Defense vehicle and weapons-system bolts
- Aerospace landing gear hardware
- Legacy marine naval hardware
- Some industrial and agricultural hardware (mostly phased out by 1990s)

## Related specifications

- **AMS-QQ-P-416** — The current AMS adoption of the federal spec
- **AMS 2417** — Zinc-nickel plating (replacement)
- **AMS 2429 / AMS 2430** — Aluminum ion-vapor-deposition (IVD) plating (replacement)
- **F3019, F1136, F2833** — Zinc-flake coatings (replacement)
- **MIL-STD-171** — Finishes historical reference
- **F519** — HE testing method

## Documentation

California Fastener's position on cadmium plating: cadmium-plated hardware is available for legacy defense and aerospace MRO applications through qualified plating sources, but is not a recommended coating for new designs. For any new specification work, we recommend discussion of zinc-nickel, aluminum IVD, or zinc-flake alternatives based on the specific service environment, galvanic compatibility, and HE risk profile of the application.
