/* Spec Library — markdown renderer + spec parser.
   Direct port of the hand-rolled renderer and parseSpec function from
   design/spec.html. Kept hand-rolled (not unified/remark) because the
   spec extraction logic — pulling the "At a glance" pull-out, the meta
   sidebar, the related-specs panel out of the body — is purpose-built
   to this file format and would be messy to layer on top of a generic
   markdown library. */

import { LIB_SPECS, type Spec } from "./data";

// ── Cross-reference resolver ───────────────────────────────────
// Given a code mention like "A194" or "F593" or "ASTM F3125", find the
// matching spec entry. Used by the body-text linker below.
const SPEC_BY_FILE = new Map<string, Spec>(LIB_SPECS.map((s) => [s.file, s]));

function normalizeCode(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\s‑–—-]/g, "")
    .replace(/\.md$/, "");
}

export function resolveCrossLink(text: string): Spec | null {
  const t = normalizeCode(text);
  if (!t) return null;
  for (const s of LIB_SPECS) {
    const code = normalizeCode(s.code);
    if (code === t || code.endsWith(t) || code.includes(t)) return s;
  }
  return null;
}

// ── Inline markdown helpers ────────────────────────────────────
function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string): string {
  s = escHtml(s);
  // Code spans
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Bold
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic — avoid matching inside ** and at the start of bullet lines
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  // Links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}

// ── Block renderer ─────────────────────────────────────────────
export function renderMarkdown(md: string): string {
  md = md.replace(/\r\n/g, "\n");
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H1 — drop on the floor here; parseSpec picks it up separately
    if (/^# /.test(line)) {
      i++;
      continue;
    }
    // H2 with anchor for the TOC
    if (/^## /.test(line)) {
      const title = line.replace(/^## /, "").trim();
      const slug = title
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-|-$/g, "");
      out.push(`<h2 id="${slug}">${inline(title)}</h2>`);
      i++;
      continue;
    }
    // H3
    if (/^### /.test(line)) {
      const title = line.replace(/^### /, "").trim();
      out.push(`<h3>${inline(title)}</h3>`);
      i++;
      continue;
    }
    // HR
    if (/^---+\s*$/.test(line)) {
      out.push("<hr />");
      i++;
      continue;
    }
    // Blockquote (recursive)
    if (/^> /.test(line)) {
      const bq: string[] = [];
      while (i < lines.length && /^> ?/.test(lines[i])) {
        bq.push(lines[i].replace(/^> ?/, ""));
        i++;
      }
      out.push("<blockquote>" + renderMarkdown(bq.join("\n")) + "</blockquote>");
      continue;
    }
    // Pipe table — header row, separator row, then body rows
    if (
      /^\|.*\|\s*$/.test(line) &&
      i + 1 < lines.length &&
      /^\|[\s\-|:]+\|\s*$/.test(lines[i + 1])
    ) {
      const header = lines[i]
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        rows.push(
          lines[i]
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim())
        );
        i++;
      }
      let html = '<div class="sp-body-table-wrap"><table><thead><tr>';
      html += header.map((h) => `<th>${inline(h)}</th>`).join("");
      html += "</tr></thead><tbody>";
      for (const r of rows) {
        html += "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
      }
      html += "</tbody></table></div>";
      out.push(html);
      continue;
    }
    // UL / OL
    if (/^[-*] /.test(line) || /^\d+\. /.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const tag = ordered ? "ol" : "ul";
      const items: string[] = [];
      while (
        i < lines.length &&
        (ordered ? /^\d+\. /.test(lines[i]) : /^[-*] /.test(lines[i]))
      ) {
        let item = lines[i].replace(ordered ? /^\d+\. / : /^[-*] /, "");
        i++;
        // Multi-line continuation (indented)
        while (i < lines.length && /^ {2,}/.test(lines[i])) {
          item += " " + lines[i].trim();
          i++;
        }
        items.push(`<li>${inline(item)}</li>`);
      }
      out.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }
    // Fenced code block (rare in our specs but cheap to support)
    if (/^```/.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // consume closing fence
      out.push(`<pre><code>${escHtml(buf.join("\n"))}</code></pre>`);
      continue;
    }
    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }
    // Paragraph — gather until blank or block-level marker
    const para = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^[#>\-*|]|^\d+\. /.test(lines[i]) &&
      !/^---+/.test(lines[i]) &&
      !/^```/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }

  return out.join("\n");
}

// ── Spec parser ────────────────────────────────────────────────
export type ParsedSpec = {
  h1: string;
  glance: string;
  meta: Record<string, string>;
  bodyHtml: string;
  related: Array<{ code: string; desc: string; file: string }>;
  toc: Array<{ id: string; text: string }>;
};

const META_KEYS = [
  "Category",
  "Common grades stocked",
  "Common groups stocked",
  "Common classes stocked",
  "Typical pairing",
  "Industries",
  "Applies to",
  "Typical base fasteners",
] as const;

const META_RE = /^\*\*(.+?):\*\*\s*(.+)$/;

/** Parse a spec markdown file into the structured pieces used by the page. */
export function parseSpec(md: string, currentFile: string): ParsedSpec {
  md = md.replace(/\r\n/g, "\n");
  const lines = md.split("\n");

  // H1
  const h1Line = lines.find((l) => /^# /.test(l));
  const h1 = h1Line ? h1Line.replace(/^# /, "").trim() : "";

  // "At a glance" blockquote at top
  let glance = "";
  const glanceStart = lines.findIndex((l) => /^> \*\*At a glance/i.test(l));
  if (glanceStart >= 0) {
    const buf: string[] = [];
    let j = glanceStart;
    while (j < lines.length && /^> ?/.test(lines[j])) {
      buf.push(lines[j].replace(/^> ?/, ""));
      j++;
    }
    glance = inline(
      buf
        .join(" ")
        .replace(/\*\*At a glance:\*\*\s*/i, "")
        .trim()
    );
  }

  // Meta lines
  const meta: Record<string, string> = {};
  for (const l of lines) {
    const m = l.match(META_RE);
    if (m && (META_KEYS as readonly string[]).includes(m[1])) {
      meta[m[1]] = m[2];
    }
  }

  // Build the body markdown by stripping H1, top blockquote, meta lines, first ---
  const bodyLines: string[] = [];
  let skipTopBlockquote = glanceStart >= 0;
  let skippedFirstHr = false;
  for (let k = 0; k < lines.length; k++) {
    const l = lines[k];
    if (/^# /.test(l)) continue;
    if (skipTopBlockquote && /^> ?/.test(l)) continue;
    if (skipTopBlockquote && !/^> ?/.test(l) && l.trim() !== "") skipTopBlockquote = false;
    const mm = l.match(META_RE);
    if (mm && (META_KEYS as readonly string[]).includes(mm[1])) continue;
    if (!skippedFirstHr && /^---+\s*$/.test(l)) {
      skippedFirstHr = true;
      continue;
    }
    bodyLines.push(l);
  }
  let bodyHtml = renderMarkdown(bodyLines.join("\n").trim());

  // Cross-reference auto-linking — convert spec codes in the body to
  // links to the matching spec page. Skips matches already inside an
  // anchor or attribute. Doesn't link the page back to itself.
  bodyHtml = bodyHtml.replace(
    /(?<!["=>/])\b(ASTM\s+[AFB]\d+[A-Z]?|SAE\s+J\d+|ASME\s+B1\.\d+(?:\.\d+)?M?)\b/g,
    (match) => {
      const target = resolveCrossLink(match);
      if (target && target.file !== currentFile) {
        return `<a href="/spec-library/${target.file}">${match}</a>`;
      }
      return match;
    }
  );

  // Related-specs panel from "## Related specifications" or "## Related" block
  const related: ParsedSpec["related"] = [];
  const relIdx = lines.findIndex((l) => /^##\s+Related/i.test(l));
  if (relIdx >= 0) {
    for (let k = relIdx + 1; k < lines.length; k++) {
      if (/^##\s/.test(lines[k])) break;
      const m = lines[k].match(/\*\*([^*]+)\*\*\s*[—\-]\s*(.+)/);
      if (m) {
        const resolved = resolveCrossLink(m[1]);
        if (resolved) {
          related.push({
            code: m[1].trim(),
            desc: inline(
              m[2]
                .trim()
                .replace(/\(.*?\)/g, "")
                .trim()
            ),
            file: resolved.file,
          });
        }
      }
    }
  }

  // Build TOC from rendered H2s
  const toc: ParsedSpec["toc"] = [];
  const tocRe = /<h2 id="([^"]+)">([^<]+)<\/h2>/g;
  let tm: RegExpExecArray | null;
  while ((tm = tocRe.exec(bodyHtml)) !== null) {
    toc.push({ id: tm[1], text: tm[2] });
  }

  return { h1, glance, meta, bodyHtml, related, toc };
}

/** Helper to look up a spec entry by file slug (used by the route). */
export function getSpecBySlug(slug: string): Spec | undefined {
  return SPEC_BY_FILE.get(slug);
}
