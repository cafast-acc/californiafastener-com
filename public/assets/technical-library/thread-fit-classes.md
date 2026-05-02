# Thread Fit Classes — Choosing Between 1A/1B, 2A/2B, and 3A/3B

> **At a glance:** Thread fit class describes how tightly or loosely the male and female threads mate. 2A/2B is the commercial default — every off-the-shelf bolt and nut is this class. 3A/3B is precision — tighter clearance for critical applications. 1A/1B is loose — agricultural or field-assembly tolerance. The letters indicate external (A) or internal (B). For 90% of specifying decisions, the right answer is 2A/2B. The other 10% are worth understanding because getting this wrong means either a connection that loosens in service or a bolt that won't fit at all.

**Category:** Thread Reference
**Applies to:** All threaded fasteners specified under B1.1 (inch) or B1.13M (metric)
**Industries:** All

---

## Scope

This reference explains the thread fit class system defined in ASME B1.1 for inch threads and the equivalent tolerance classes in ASME B1.13M / ISO 965 for metric. It covers when each fit class is appropriate, the practical consequences of each choice, and how coatings interact with fit.

## Inch thread fit classes — B1.1

Inch threads are classified into three pairs based on clearance between external and internal threads:

| Class | External / Internal | Clearance | Typical use |
|---|---|---|---|
| **1A / 1B** | Large | Loose | Agricultural, dirt-tolerant, emergency field assembly |
| **2A / 2B** | Moderate | Standard commercial | Default for almost everything |
| **3A / 3B** | Small | Precision | Critical structural, aerospace, vibration-prone |

The letter indicates thread type:
- **A** = external (bolt, stud, screw)
- **B** = internal (nut, tapped hole)

Fit classes are independent — a 2A bolt can mate with a 2B nut (the standard pair) or with a 3B nut (tighter than standard). The combination you specify determines the assembled fit.

## Class 1A / 1B — loose fit

Class 1A/1B allowances are large enough that threads can engage even with modest dirt, rust, damage, or burrs. Applications:

- Agricultural equipment operating in dusty and muddy conditions
- Emergency and field-assembly hardware
- Consumable or disposable hardware
- Rare in industrial or construction use

**Class 1A is rare in commercial fastener supply.** Most suppliers don't stock 1A as a regular grade — if you need it, specify explicitly.

## Class 2A / 2B — standard commercial

The default fit for nearly all commercial fasteners. If a drawing doesn't specify a fit class, 2A/2B is assumed.

- Every hex bolt, cap screw, and nut in standard commercial supply
- Virtually every structural bolt (F3125 specifies 2A by default)
- Anchor bolts
- Machine screws
- General mechanical assembly

The key features of 2A/2B:

- **Allowance** (minimum clearance): 2A external threads are slightly smaller than basic, so there's guaranteed clearance on the pitch diameter
- **Tolerance:** manufacturing variation is permitted around the allowance
- **Practical result:** bolts and nuts of the same size and pitch will assemble reliably without binding, across normal production variations

Unless a specific design consideration demands tighter fit, 2A/2B is correct.

## Class 3A / 3B — precision fit

Class 3A/3B eliminates the allowance of class 2A/2B — external threads are allowed to go up to the basic pitch diameter, internal threads down to the basic pitch diameter. The result is near-zero clearance at nominal condition, with tolerance still permitting assembly.

Applications:

- **Aerospace structural fasteners** — where vibration resistance and load-sharing between thread turns matter
- **High-stress cyclic applications** — fatigue-critical assemblies
- **Precision optical and instrument hardware**
- **Military and defense structural hardware**
- **Set screws, locking screws, anti-vibration applications**

Practical consequences of specifying 3A/3B:

- **Higher unit cost** — tighter tolerances require more thread inspection
- **Less tolerance for coating buildup** — plated 3A threads may not fit 3B nuts if coating is heavy
- **Less tolerance for damage** — slight burrs or dings on 3A threads may prevent assembly
- **Stronger resistance to self-loosening** — tighter fit means less axial play

Don't specify 3A/3B "just to be safe" — the added cost and assembly sensitivity are not worth it unless the design genuinely benefits.

## Metric equivalents — B1.13M / ISO 965

Metric threads use a different notation but similar concept:

| Inch | Metric | Fit character |
|---|---|---|
| 1A / 1B | 8g / 8H | Loose |
| **2A / 2B** | **6g / 6H** | Standard commercial |
| 3A / 3B | 4g6g / 5H6H or 4h / 5H | Precision |

Metric tolerance is described by a grade number (3–9) plus position letter (e/f/g/h for external, G/H for internal). Grade indicates tolerance tightness (smaller number = tighter); position indicates allowance (h = zero allowance, g = small allowance, etc.).

**6g / 6H** is the metric commercial default — equivalent in concept to inch 2A/2B.

For precision metric threads, common combinations are 4g6g (external) with 5H6H (internal), or 4h (external) with 5H (internal). The complex notation exists because metric allows separate tolerances on major and pitch diameters.

## Coatings and fit class

This is where fit-class decisions get real-world. Coatings add material to threads:

### Standard fit (2A/2B or 6g/6H)

- **Plain (uncoated):** fits cleanly
- **Zinc electroplate light (Fe/Zn 3-8):** fits acceptably in most cases; heavier electroplate (Fe/Zn 12, 25) may tighten the fit to marginal
- **Hot-dip galvanizing:** does NOT fit standard 2B. Mating nuts must be overtapped per F2329
- **Mechanical galvanizing:** same as HDG; nuts require overtap for Class 40+ thickness
- **Zinc-flake coatings:** usually fit standard without modification

### Precision fit (3A/3B or tighter metric)

- **Plain only.** Any significant coating will interfere with the tight clearance.
- **Light plating with careful tolerance:** possible; proceed with gauge verification
- **HDG on 3A threads:** not recommended

### Practical rule

When coating is specified, stick with 2A/2B fit and let the coating/overtap allowances handle the dimensional interaction. Specify 3A/3B only on plain or lightly-coated precision hardware.

## Gauging

Thread fit is verified with go/no-go thread gauges:

- **Go gauge:** should thread freely the full length of the thread
- **No-go gauge:** should not thread more than 2-3 turns before binding

Both external threads (verified with ring gauges) and internal threads (verified with plug gauges) are checked.

Thread gauges are manufactured to specific fit classes — a 3A/3B gauge set has tighter tolerances than a 2A/2B set. Use the gauge set matching the specified fit class.

## Common field issues

- **Specifying 3A/3B for coated fasteners.** Cost is higher and assembly often fails. Use 2A/2B for coated hardware.
- **Assuming all 2A/2B fasteners fit any 2B nut.** The fit class only guarantees fit within the class's clearance range. Coating, damage, and dirt all reduce effective clearance.
- **Specifying fit class that suppliers don't stock.** 3A/3B bolts are not universally available — especially in larger sizes, weathering steel, or coated finishes. Confirm availability before specifying.
- **Confusing fit class with grade/strength.** Fit class (2A/3A) and strength class (Grade 5, Grade 8, A325, A490) are independent. A 3A bolt is not stronger than a 2A bolt — it has tighter thread dimensions.

## Common applications by fit class

| Fit Class | Example Applications |
|---|---|
| 1A / 1B | Agricultural U-bolts, emergency hardware, some construction accessories |
| **2A / 2B** | **Structural bolts (F3125), anchor bolts (F1554), general fasteners, machine screws** |
| 3A / 3B | Aerospace structural, critical military hardware, precision optical mounts, some set screws |

## Related specifications

- **B1.1** — Unified inch screw threads (fit class definitions for inch)
- **B1.13M** — Metric screw threads (fit class definitions for metric)
- **B1.2** — Gauges and gauging for Unified inch threads
- **B1.16M** — Gauges for metric threads
- **F2329 / F1941** — Coating specs with overtap requirements for fit compensation

## Documentation

California Fastener stocks commercial-class 2A/2B fasteners across the full product range. Class 3A/3B precision fasteners and specialty fits are available on special order with gauge inspection documentation.
