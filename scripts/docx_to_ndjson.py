#!/usr/bin/env python3
"""
Convert California Fastener blog .docx files into Sanity-ready NDJSON.

Usage:
  python3 scripts/docx_to_ndjson.py content/blog-source/*.docx > content/blog-source/posts.ndjson

Each output line is one JSON object shaped for the `post` schema, EXCEPT for the
two references that can only be resolved against the live dataset — `author` and
`category` — and `publishedAt`. Those are filled in by scripts/import-blog.mjs at
write time. We emit `categoryKeyword` (anchor|materials|spec|...) instead of a
category _ref so the Node importer can map it to whatever category docs actually
exist in the dataset.

Pure standard library (zipfile + regex) so it runs anywhere with no install.

Handled conversions:
  * Inline bold / italic  -> strong / em decorators
  * Hyperlinks            -> link annotations (resolved via document.xml.rels)
  * Real Word tables      -> bullet list ("**col0** — col1. col2. (col3)")
  * "Heading 3 as body"   -> docs that style every paragraph H3 get H3 demoted
                             to body text; only H1/H2 stay headings
  * SEO scaffolding lines  ("Primary Keyword:", "SEO Intent:", ...) -> dropped
  * Roman-numeral heading prefixes ("I. Introduction") -> stripped
"""
import sys, re, html, json, zipfile, os

# --- per-file metadata the docs don't carry themselves -----------------------
# Keyed by a substring of the filename. `title` overrides when the doc has no
# usable in-body title; `category` is a keyword the Node importer maps to a real
# category doc; `oldSlug` triggers a 301 from the retired Squarespace URL.
OVERRIDES = {
    "anchor-bolts-steel": {
        "title": "Anchor Bolts in Steel Fabrication and Structural Connections",
        "category": "anchor",
    },
    "a193-b5": {"category": "materials"},
    "a193-b8": {"category": "materials"},
    "a193-guide": {"category": "spec", "oldSlug": "guide-to-astm-a193-fasteners"},
    "a194-nuts": {"category": "spec", "oldSlug": "the-essential-guide-to-astm-a194-nuts-l6hkp"},
    # Batch 2 — title set here because the doc carries its title as plain body
    # text (no Heading style) for the importer to pick up.
    "prologis": {
        "title": "Anchoring Growth: How Fasteners Power Prologis-Scale Warehouse Expansion",
        "category": "industry",
    },
    "custom-fasteners": {"category": "cnc"},
    "corrosion": {"category": "materials"},
}
DEFAULT_CATEGORY = "spec"

SEO_PREFIXES = (
    "primary keyword", "secondary keywords", "secondary keyword", "seo intent",
    "seo phrases", "seo phrase", "meta description", "meta title", "url slug",
    "keyword:", "target keyword", "(alt for", "alt for a/b",
)

_key_counter = 0
def key():
    global _key_counter
    _key_counter += 1
    return f"k{_key_counter}"

def unesc(s):
    return html.unescape(s)

def load_rels(z):
    rels = {}
    try:
        data = z.read("word/_rels/document.xml.rels").decode("utf-8", "replace")
    except KeyError:
        return rels
    for m in re.finditer(r'<Relationship\b[^>]*?Id="([^"]+)"[^>]*?Target="([^"]+)"[^>]*?>', data):
        rels[m.group(1)] = m.group(2)
    return rels

def run_to_span(run_xml, link_mark=None):
    rpr = re.search(r"<w:rPr>(.*?)</w:rPr>", run_xml, re.S)
    rpr = rpr.group(1) if rpr else ""
    marks = []
    if re.search(r"<w:b/>|<w:b ", rpr):
        marks.append("strong")
    if re.search(r"<w:i/>|<w:i ", rpr):
        marks.append("em")
    if link_mark:
        marks.append(link_mark)
    text = unesc("".join(re.findall(r"<w:t(?:\s[^>]*)?>(.*?)</w:t>", run_xml, re.S)))
    if not text:
        return None
    return {"_type": "span", "_key": key(), "text": text, "marks": marks}

def paragraph_spans(p_xml, rels):
    """Return (spans, markDefs) preserving bold/italic/links in document order."""
    spans, markdefs = [], []
    token = re.compile(r"<w:hyperlink\b[^>]*>.*?</w:hyperlink>|<w:r\b[^>]*>.*?</w:r>", re.S)
    for m in token.finditer(p_xml):
        chunk = m.group(0)
        if chunk.startswith("<w:hyperlink"):
            rid = re.search(r'r:id="([^"]+)"', chunk)
            href = rels.get(rid.group(1)) if rid else None
            link_key = None
            if href:
                link_key = key()
                markdefs.append({"_type": "link", "_key": link_key, "href": href})
            for r in re.finditer(r"<w:r\b[^>]*>.*?</w:r>", chunk, re.S):
                sp = run_to_span(r.group(0), link_key)
                if sp:
                    spans.append(sp)
        else:
            sp = run_to_span(chunk)
            if sp:
                spans.append(sp)
    return spans, markdefs

def block(style, spans, markdefs=None, list_item=None):
    b = {"_type": "block", "_key": key(), "style": style,
         "markDefs": markdefs or [], "children": spans or []}
    if list_item:
        b["listItem"] = list_item
        b["level"] = 1
    return b

def plain(spans):
    return "".join(s["text"] for s in spans)

ROMAN = re.compile(r"^[IVXLC]+\.\s+")

def iter_body(doc):
    """Yield ('p', xml) and ('tbl', xml) in document order."""
    for m in re.finditer(r"<w:tbl>.*?</w:tbl>|<w:p\b.*?</w:p>", doc, re.S):
        chunk = m.group(0)
        yield ("tbl" if chunk.startswith("<w:tbl>") else "p", chunk)

def para_style(p_xml):
    m = re.search(r'<w:pStyle w:val="([^"]+)"', p_xml)
    return m.group(1) if m else "Normal"

def is_list_para(p_xml):
    return bool(re.search(r"<w:numPr\b", p_xml))

def is_seo(text):
    tl = text.lower().strip()
    return any(tl.startswith(p) for p in SEO_PREFIXES)

def table_to_blocks(tbl_xml):
    rows = re.findall(r"<w:tr\b.*?</w:tr>", tbl_xml, re.S)
    parsed = []
    for r in rows:
        cells = re.findall(r"<w:tc\b.*?</w:tc>", r, re.S)
        vals = []
        for c in cells:
            txt = unesc("".join(re.findall(r"<w:t(?:\s[^>]*)?>(.*?)</w:t>", c, re.S))).strip()
            vals.append(txt)
        if any(vals):
            parsed.append(vals)
    if not parsed:
        return []
    blocks = []
    # First row is the header; render each data row as a bullet.
    for row in parsed[1:]:
        row = [c for c in row]
        if not any(row):
            continue
        head = row[0]
        rest = [c for c in row[1:] if c]
        text = f"{head}" + (" — " + ". ".join(rest) if rest else "")
        spans = []
        if head:
            spans.append({"_type": "span", "_key": key(), "text": head, "marks": ["strong"]})
            tail = (" — " + ". ".join(rest)) if rest else ""
            if tail:
                spans.append({"_type": "span", "_key": key(), "text": tail, "marks": []})
        else:
            spans.append({"_type": "span", "_key": key(), "text": text, "marks": []})
        blocks.append(block("normal", spans, list_item="bullet"))
    return blocks

def convert(path):
    z = zipfile.ZipFile(path)
    rels = load_rels(z)
    doc = z.read("word/document.xml").decode("utf-8", "replace")
    fname = os.path.basename(path)
    ov = {}
    for keysub, val in OVERRIDES.items():
        if keysub in fname:
            ov = val
            break

    # First pass: collect paragraphs to decide if H3 is used as body text.
    paras = [(s, is_list_para(x), x) for kind, x in iter_body(doc) if kind == "p"
             for s in [para_style(x)]]
    n_h3 = sum(1 for s, _, _ in paras if s == "Heading3")
    n_norm = sum(1 for s, lst, _ in paras if s == "Normal" and not lst)
    h3_as_body = n_h3 > n_norm  # whole-doc body styled as Heading 3

    title = ov.get("title")
    blocks = []
    prev_colon = False
    for kind, xml in iter_body(doc):
        if kind == "tbl":
            blocks.extend(table_to_blocks(xml))
            prev_colon = False
            continue
        style = para_style(xml)
        lst = is_list_para(xml)
        spans, markdefs = paragraph_spans(xml, rels)
        text = plain(spans).strip()
        if not text:
            continue
        if is_seo(text):
            continue
        # Capture title from the first H1/H2 if not overridden.
        if title is None and style in ("Heading1", "Heading2"):
            title = ROMAN.sub("", text).strip()
            continue
        # Decide block style.
        if style == "Heading1":
            kind_style = "h2"
        elif style == "Heading2":
            kind_style = "h2"
        elif style == "Heading3":
            kind_style = "normal" if h3_as_body else "h3"
        else:
            kind_style = "normal"
        list_item = "bullet" if lst else None
        # In H3-as-body docs there are no real lists; treat short "Label: value"
        # lines that follow a colon lead-in as bullets so spec lists read right.
        if h3_as_body and not list_item and kind_style == "normal":
            if prev_colon and len(text) < 160:
                list_item = "bullet"
        # Strip roman-numeral prefixes from headings ("I. Introduction").
        if kind_style in ("h2", "h3") and spans and ROMAN.match(spans[0]["text"]):
            spans[0]["text"] = ROMAN.sub("", spans[0]["text"])
        blocks.append(block(kind_style, spans, markdefs, list_item))
        prev_colon = text.rstrip().endswith(":")

    # If the title was supplied via OVERRIDES but the doc also repeats it
    # verbatim as the first body block, drop the duplicate so the rendered post
    # doesn't show the title twice.
    if title and blocks and plain(blocks[0]["children"]).strip().lower() == title.strip().lower():
        blocks.pop(0)

    if not title:
        # Last resort: derive from filename.
        title = re.sub(r"^[0-9a-f]+-", "", os.path.splitext(fname)[0]).replace("_", " ")

    # Excerpt: first substantial body paragraph.
    # First substantial block in reading order (paragraph or intro bullet),
    # skipping pull-quotes and FAQ Q/A lines which make poor index deks.
    excerpt = ""
    for b in blocks:
        if b.get("style") not in ("normal",):
            continue
        t = plain(b["children"]).strip()
        if len(t) <= 60 or t[0] in "“‘\"'" or re.match(r"^(Q:|A:)", t):
            continue
        excerpt = t
        break
    if not excerpt:
        for b in blocks:
            t = plain(b["children"]).strip()
            if t:
                excerpt = t
                break
    excerpt = excerpt[:277].rstrip()
    if len(excerpt) == 277:
        excerpt += "…"

    words = sum(len(plain(b["children"]).split()) for b in blocks)
    reading = max(1, round(words / 200))

    slug = slugify(title)
    rec = {
        "title": title,
        "slug": slug,
        "excerpt": excerpt,
        "readingMinutes": reading,
        "body": blocks,
        "categoryKeyword": ov.get("category", DEFAULT_CATEGORY),
        "sourceFile": fname,
    }
    if ov.get("oldSlug"):
        rec["oldSlug"] = ov["oldSlug"]
    return rec

def slugify(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s[:96].rstrip("-")

def main(argv):
    if not argv:
        print("usage: docx_to_ndjson.py <file.docx> [...]", file=sys.stderr)
        return 1
    for path in argv:
        rec = convert(path)
        print(json.dumps(rec, ensure_ascii=False))
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
