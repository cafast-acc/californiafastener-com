#!/usr/bin/env python3
"""
Convert a Squarespace/WordPress WXR export into Sanity-ready NDJSON.

Usage:
  python3 scripts/wxr_to_ndjson.py content/blog-source/Blogs.xml > content/blog-source/wxr-posts.ndjson

This is the authoritative migration source (supersedes the per-.docx pipeline):
every published post's title, slug, body, author, real publish date, category,
and featured-image URL come straight from the export.

Each output line carries everything scripts/import-wxr.mjs needs, EXCEPT the
two things that must be resolved against the live dataset — the author/category
references and the uploaded cover-image asset. We emit `categorySource` (the raw
Squarespace category) and `coverImageUrl` (CDN URL) for the importer to resolve.

Body HTML -> Portable Text, matching the blockContent schema:
  styles    : p->normal, h2->h2, h3->h3, h4->h3, blockquote->blockquote
  lists      : ul->bullet, ol->number
  decorators : strong, em  (u/underline dropped — not in schema)
  annotations: a -> link {href, newTab}
Pure standard library (xml.etree + html.parser).
"""
import sys, re, html
from html.parser import HTMLParser
from xml.etree import ElementTree as ET

NS = {
    "wp": "http://wordpress.org/export/1.2/",
    "content": "http://purl.org/rss/1.0/modules/content/",
    "dc": "http://purl.org/dc/elements/1.1/",
    "excerpt": "http://wordpress.org/export/1.2/excerpt/",
}

# Squarespace category -> existing Sanity category title.
CATEGORY_MAP = {
    "Specifications & Standards": "Spec & Compliance",
    "Materials": "Materials & Grades",
    "CNC Machining": "CNC Machining",
    "Industries & Applications": "Industry",
    "Industry News": "Industry Insights",
}
DEFAULT_CATEGORY_TITLE = "Spec & Compliance"

_key_n = 0
def key():
    global _key_n
    _key_n += 1
    return f"k{_key_n}"

BLOCK_STYLE = {"p": "normal", "h1": "h2", "h2": "h2", "h3": "h3", "h4": "h3",
               "h5": "h3", "h6": "h3", "blockquote": "blockquote"}


class PortableTextBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = []
        self.cur = None            # current block dict
        self.decorators = []        # active strong/em
        self.links = []             # active link markDef _keys
        self.pending_markdefs = {}  # _key -> markDef (for current block)
        self.list_stack = []        # 'bullet' / 'number'
        self.in_li = False

    # --- block helpers ---
    def _flush(self):
        if self.cur and self.cur["children"]:
            # drop a block that is only whitespace
            if any(c["text"].strip() for c in self.cur["children"]):
                # trim leading/trailing whitespace-only edges
                self.blocks.append(self.cur)
        self.cur = None

    def _start_block(self, style, list_item=None):
        self._flush()
        b = {"_type": "block", "_key": key(), "style": style,
             "markDefs": [], "children": []}
        if list_item:
            b["listItem"] = list_item
            b["level"] = max(1, len(self.list_stack))
        self.cur = b

    def _ensure_block(self):
        if self.cur is None:
            self._start_block("normal")

    def _add_text(self, text):
        if not text:
            return
        self._ensure_block()
        marks = list(self.decorators) + list(self.links)
        ch = self.cur["children"]
        # merge with previous span if identical marks
        if ch and ch[-1].get("marks", []) == marks:
            ch[-1]["text"] += text
        else:
            ch.append({"_type": "span", "_key": key(), "text": text, "marks": marks})

    # --- parser callbacks ---
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("ul", "ol"):
            self.list_stack.append("number" if tag == "ol" else "bullet")
        elif tag == "li":
            self.in_li = True
            self._start_block("normal", list_item=(self.list_stack[-1] if self.list_stack else "bullet"))
        elif tag in BLOCK_STYLE:
            # nested block inside an <li> (rare) -> keep appending to the li
            if not self.in_li:
                self._start_block(BLOCK_STYLE[tag])
        elif tag in ("strong", "b"):
            self.decorators.append("strong")
        elif tag in ("em", "i"):
            self.decorators.append("em")
        elif tag == "a":
            href = (a.get("href") or "").strip()
            k = key()
            self.pending_markdefs[k] = {
                "_type": "link", "_key": k, "href": href,
                "newTab": bool(re.match(r"https?://", href)),
            }
            self.links.append(k)
        elif tag == "br":
            self._add_text("\n")
        # span, div, u, etc. -> transparent (text flows through)

    def handle_endtag(self, tag):
        if tag in ("ul", "ol"):
            if self.list_stack:
                self.list_stack.pop()
        elif tag == "li":
            self.in_li = False
            self._flush()
        elif tag in BLOCK_STYLE:
            if not self.in_li:
                self._flush()
        elif tag in ("strong", "b"):
            if "strong" in self.decorators:
                self.decorators.reverse(); self.decorators.remove("strong"); self.decorators.reverse()
        elif tag in ("em", "i"):
            if "em" in self.decorators:
                self.decorators.reverse(); self.decorators.remove("em"); self.decorators.reverse()
        elif tag == "a":
            if self.links:
                k = self.links.pop()
                md = self.pending_markdefs.pop(k, None)
                # attach the markDef to whatever block is open / was just written
                if md and self.cur is not None:
                    self.cur["markDefs"].append(md)
                elif md and self.blocks:
                    self.blocks[-1]["markDefs"].append(md)

    def handle_data(self, data):
        # collapse runs of whitespace (newlines in source are layout, not content),
        # but keep explicit "\n" we inserted for <br> intact by handling separately.
        text = re.sub(r"[ \t\r\f\v]+", " ", data.replace("\xa0", " "))
        text = re.sub(r"\n+", " ", text)
        self._add_text(text)

    def finish(self):
        self._flush()
        # tidy: strip leading/trailing whitespace on each block's edge spans
        for b in self.blocks:
            ch = b["children"]
            if ch:
                ch[0]["text"] = ch[0]["text"].lstrip()
                ch[-1]["text"] = ch[-1]["text"].rstrip()
            b["children"] = [c for c in ch if c["text"]]
            # markDefs actually referenced
            used = {m for c in b["children"] for m in c.get("marks", [])}
            b["markDefs"] = [m for m in b["markDefs"] if m["_key"] in used]
        self.blocks = [b for b in self.blocks if b["children"]]
        return self.blocks


def html_to_blocks(src):
    p = PortableTextBuilder()
    p.feed(src)
    return p.finish()


def plain(blocks):
    return " ".join(c["text"] for b in blocks for c in b["children"])


def to_iso(dt):
    # "2024-09-23 22:13:50" -> "2024-09-23T22:13:50Z"
    dt = (dt or "").strip()
    if not dt or dt.startswith("0000"):
        return None
    return dt.replace(" ", "T") + "Z"


def main(argv):
    if not argv:
        print("usage: wxr_to_ndjson.py Blogs.xml", file=sys.stderr)
        return 1
    ch = ET.parse(argv[0]).getroot().find("channel")

    # attachment id -> url
    att = {}
    for it in ch.findall("item"):
        if it.findtext("wp:post_type", default="", namespaces=NS) == "attachment":
            pid = it.findtext("wp:post_id", default="", namespaces=NS)
            url = it.findtext("wp:attachment_url", default="", namespaces=NS)
            if pid and url:
                att[pid] = url

    count = 0
    for it in ch.findall("item"):
        if it.findtext("wp:post_type", default="", namespaces=NS) != "post":
            continue
        if it.findtext("wp:status", default="", namespaces=NS) != "publish":
            continue
        title = html.unescape((it.findtext("title") or "").strip())
        if not title:
            continue
        slug = (it.findtext("wp:post_name", default="", namespaces=NS) or "").strip()
        body_html = it.findtext("content:encoded", default="", namespaces=NS) or ""
        blocks = html_to_blocks(body_html)

        # category (first <category domain="category">)
        cat_src = None
        for c in it.findall("category"):
            if c.get("domain") == "category" and (c.text or "").strip():
                cat_src = (c.text or "").strip(); break
        cat_title = CATEGORY_MAP.get(cat_src, DEFAULT_CATEGORY_TITLE)

        # cover image via _thumbnail_id
        thumb = None
        for pm in it.findall("wp:postmeta", NS):
            if pm.findtext("wp:meta_key", default="", namespaces=NS) == "_thumbnail_id":
                thumb = pm.findtext("wp:meta_value", default="", namespaces=NS)
        cover_url = att.get(thumb) if thumb else None
        if not cover_url:
            m = re.search(r'<img[^>]+src="([^"]+)"', body_html)
            cover_url = m.group(1) if m else None

        gmt = to_iso(it.findtext("wp:post_date_gmt", default="", namespaces=NS))
        local = to_iso(it.findtext("wp:post_date", default="", namespaces=NS))
        published = gmt or local

        # excerpt: first normal paragraph of reasonable length
        excerpt = ""
        for b in blocks:
            if b.get("style") == "normal":
                t = " ".join(c["text"] for c in b["children"]).strip()
                if len(t) > 60:
                    excerpt = t; break
        if not excerpt:
            excerpt = plain(blocks)[:200]
        excerpt = excerpt[:277].rstrip()
        if len(excerpt) == 277:
            excerpt += "…"

        words = len(plain(blocks).split())
        reading = max(1, round(words / 200))

        rec = {
            "title": title,
            "slug": slug,
            "excerpt": excerpt,
            "readingMinutes": reading,
            "body": blocks,
            "categorySource": cat_src,
            "categoryTitle": cat_title,
            "coverImageUrl": cover_url,
            "publishedAt": published,
            "author": html.unescape((it.findtext("dc:creator", default="", namespaces=NS) or "").strip()),
        }
        print(__import__("json").dumps(rec, ensure_ascii=False))
        count += 1
    print(f"converted {count} posts", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
