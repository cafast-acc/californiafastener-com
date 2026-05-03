# ASME B1.1 — Unified Inch Screw Threads (UN and UNR Thread Form)

> **At a glance:** B1.1 is the foundation standard for US inch-series threads. Every hex bolt, cap screw, stud, and anchor bolt in the American inch system traces its thread dimensions back here. The spec defines the thread profile geometry, the standard pitch series (UNC coarse, UNF fine, UNEF extra fine), and the fit classes (1A/1B, 2A/2B, 3A/3B) that determine how loose or tight the mating threads are. If you've ever read a callout like "1/2-13 UNC-2A," every part of that designation is defined by B1.1.

**Category:** Thread Standard
**Applies to:** All inch-series threaded fasteners (bolts, studs, nuts, tapped holes)
**Industries:** Every industry using US customary threaded fasteners

---

## Scope

ASME B1.1 specifies the thread form, pitch series, basic sizes, tolerances, and designations for Unified inch screw threads. It is the primary thread dimensional standard for US customary fasteners and mates cleanly with the thread systems defined by ISO for inch compatibility.

B1.1 covers:

- **Thread form geometry** — the 60° profile with specified flat or radius at crest and root
- **Thread series** — UNC, UNF, UNEF, and the constant-pitch UN series
- **Fit classes** — 1A/1B (loose), 2A/2B (standard), 3A/3B (precision)
- **Basic dimensions and allowances** for every standard combination

## Thread designation — how to read it

A standard callout:

**1/2-13 UNC-2A**

- **1/2** — nominal diameter (0.500")
- **13** — threads per inch (TPI)
- **UNC** — Unified National Coarse pitch series
- **2A** — fit class (2 = standard, A = external thread)

For internal threads (tapped holes, nuts), the "A" becomes "B":

**1/2-13 UNC-2B**

Same thread, same size, mating internal.

## Thread series

The pitch series determines how many threads per inch go on a given diameter:

| Series | Name | Use |
|---|---|---|
| **UNC** | Unified National Coarse | Default for most commercial and structural bolts; easier assembly, more tolerant of damage |
| **UNF** | Unified National Fine | Automotive, aerospace, precision applications; higher tensile area, less self-loosening |
| **UNEF** | Unified National Extra Fine | Thin-wall tubing, precision instruments, specialty hardware |
| **UN** | Unified National (constant pitch) | Fixed TPI (4, 6, 8, 12, 16, 20, 28, 32) across diameter ranges; structural and large-diameter use |
| **UNR** | UN with rounded root | Same as UN but with mandatory rounded thread root for improved fatigue life |
| **UNJ** | Controlled-radius root | Aerospace-specific; tighter root radius spec for maximum fatigue resistance |

The "R" or "J" suffix indicates enhanced root geometry. UNR and UNJ threads have the same pitch diameter and major diameter as UN threads of the same nominal size, so they remain interchangeable with standard UN nuts and tapped holes — the improvement is in fatigue performance, not dimensional fit.

### Common standard pitches

| Diameter | UNC (coarse) | UNF (fine) | UNEF (extra fine) |
|---|---|---|---|
| 1/4" | 20 | 28 | 32 |
| 5/16" | 18 | 24 | 32 |
| 3/8" | 16 | 24 | 32 |
| 7/16" | 14 | 20 | 28 |
| 1/2" | 13 | 20 | 28 |
| 9/16" | 12 | 18 | 24 |
| 5/8" | 11 | 18 | 24 |
| 3/4" | 10 | 16 | 20 |
| 7/8" | 9 | 14 | 20 |
| 1" | 8 | 12 | 20 |
| 1-1/8" | 7 | 12 | 18 |
| 1-1/4" | 7 | 12 | 18 |
| 1-1/2" | 6 | 12 | 18 |
| 1-3/4" | 5 | — (UN-12) | — |
| 2" | 4-1/2 | — (UN-12) | — |

Above 1", UNF is often replaced by the UN-12 constant-pitch series. Above 2", UNC is replaced by UN-8 and UN-6 pitches.

## Thread form geometry

The Unified thread profile is a 60° included angle with flats or radii at the crests and roots:

- **Thread angle (included):** 60°
- **Crest and root flats:** equal to 1/8 × pitch (UN form)
- **Crest radius (UNR):** maximum 0.108 × pitch; minimum per spec
- **Root radius (UNJ):** 0.150 × pitch minimum (tighter than UNR)

The rounded root versions (UNR, UNJ) improve fatigue strength by eliminating the stress concentration at a sharp-cornered root.

## Fit classes

The "fit" of a thread pair describes how much clearance exists between external and internal threads. B1.1 defines three classes:

| Class | Name | Typical use |
|---|---|---|
| **1A / 1B** | Loose | Agricultural, field assembly, damaged-thread tolerance |
| **2A / 2B** | Standard commercial | The default for nearly everything |
| **3A / 3B** | Precision | Aerospace, critical assembly, high-vibration |

**Class 2A/2B** is the default commercial fit — it's what you get on any standard hex bolt and matching nut unless specified otherwise. It provides enough clearance for reliable assembly across normal manufacturing tolerances, plating, and slight thread damage.

**Class 3A/3B** is specified when tighter control is required — critical structural, aerospace, or vibration-exposed assemblies. The tighter clearance reduces bolt self-loosening under load but makes assembly more sensitive to dirt, plating thickness, and slight thread damage.

**Class 1A/1B** is a loose fit used mostly in agricultural and field applications where rust, dirt, or damaged threads need to still assemble. Rare in industrial practice.

See the separate Thread Fit Class Reference for a deeper treatment.

## Coatings and thread fit

Coatings add material to thread surfaces. The effect on thread fit:

- **Plain (uncoated):** standard fit applies
- **Light zinc electroplate (Fe/Zn 5-8):** usually fits standard class 2A/2B without modification
- **Hot-dip galvanize:** adds 30–50+ μm; requires oversize tap on mating nuts (per F2329 overtap allowances)
- **Zinc-flake coatings:** thin but measurable; generally fits class 2A/2B

The rule: when bolt is coated and nut must be threaded onto it, confirm the coating is accommodated by the nut's thread fit (either through overtap or by the coating thickness being small enough not to interfere).

## Pitch diameter — the real fit dimension

Thread fit is defined by pitch diameter (PD), not major or minor diameter. PD is the theoretical diameter at which the thread thickness equals the space between threads — it's the dimension where external and internal threads actually contact. Gauging and measurement focus on PD:

- Go gauges verify the thread has correct minimum material (not too small for external, not too large for internal)
- No-go gauges verify thread has correct maximum material (not too large for external, not too small for internal)

Go / no-go thread gauges are the standard verification tool. Three-wire measurement and thread micrometers are precision lab methods.

## Applications

- Every inch-series threaded fastener produced in the US
- Every tapped hole specified on US-customary drawings
- Most legacy industrial, construction, and military hardware
- Automotive aftermarket and OEM (in applications still using inch)

## Related specifications

- **B1.13M** — Metric thread counterpart
- **B1.20.1** — NPT pipe threads (tapered, distinct profile)
- **B1.2** — Gauges and gauging for Unified inch threads
- **B1.3** — Screw thread gauging systems for acceptability
- **B1.16M** — Unified miniature screw threads

## Documentation

California Fastener stocks fasteners manufactured to B1.1 thread requirements in all standard pitches and fit classes. Thread gauging documentation is available on request, including go/no-go verification and pitch diameter measurements for precision applications.
