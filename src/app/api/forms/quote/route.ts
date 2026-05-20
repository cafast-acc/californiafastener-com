import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ─── Form configuration ─────────────────────────────────────────────
// Default form is the one already used by the spec-builder QuoteModal
// (see src/components/spec-builder/QuoteModal.tsx for the documented
// QID map). Override with JOTFORM_QUOTE_FORM_ID once a richer Jotform
// is built for the full wizard payload — and update FIELD_MAP below to
// match the new form's question IDs.
const DEFAULT_FORM_ID = "260995842557069";

// QID mapping for the *current* form. When the dedicated quote form
// is created in Jotform, replace these with the new QIDs (visible in
// each Jotform field's "Show Properties" → "Field Details").
const QID = {
  name: "16",
  email: "3",
  company: "4",
  phone: "5",
  textarea: "6",
} as const;

const REQUIRED = ["name", "email"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type QuotePayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  role?: string;
  product?: string;
  grade?: string;
  finish?: string;
  diameter?: string;
  length?: string;
  qty?: number | string;
  neededBy?: string;
  shipTo?: string;
  certs?: string[];
  fileNames?: string[];
  notes?: string;
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parsePayload(raw: unknown): { ok: true; data: QuotePayload } | { ok: false; error: string } {
  if (!isPlainObject(raw)) return { ok: false, error: "invalid_body" };

  const data: QuotePayload = {
    name: String(raw.name ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    company: raw.company ? String(raw.company).trim() : undefined,
    phone: raw.phone ? String(raw.phone).trim() : undefined,
    role: raw.role ? String(raw.role).trim() : undefined,
    product: raw.product ? String(raw.product) : undefined,
    grade: raw.grade ? String(raw.grade) : undefined,
    finish: raw.finish ? String(raw.finish) : undefined,
    diameter: raw.diameter ? String(raw.diameter) : undefined,
    length: raw.length ? String(raw.length) : undefined,
    qty: typeof raw.qty === "number" || typeof raw.qty === "string" ? raw.qty : undefined,
    neededBy: raw.neededBy ? String(raw.neededBy) : undefined,
    shipTo: raw.shipTo ? String(raw.shipTo) : undefined,
    certs: Array.isArray(raw.certs) ? raw.certs.map(String) : undefined,
    fileNames: Array.isArray(raw.fileNames) ? raw.fileNames.map(String) : undefined,
    notes: raw.notes ? String(raw.notes) : undefined,
  };

  for (const key of REQUIRED) {
    if (!data[key]) return { ok: false, error: `missing_${key}` };
  }
  if (!EMAIL_RE.test(data.email)) return { ok: false, error: "invalid_email" };

  return { ok: true, data };
}

function buildTextareaBody(d: QuotePayload): string {
  const lines: string[] = [];
  if (d.product) lines.push(`Product: ${d.product}`);
  if (d.grade) lines.push(`Grade: ${d.grade}`);
  if (d.finish) lines.push(`Finish: ${d.finish}`);
  if (d.diameter) lines.push(`Diameter: ${d.diameter}`);
  if (d.length) lines.push(`Length: ${d.length}`);
  if (d.qty !== undefined && d.qty !== "") lines.push(`Quantity: ${d.qty}`);
  if (d.neededBy) lines.push(`Needed by: ${d.neededBy}`);
  if (d.shipTo) lines.push(`Ship to: ${d.shipTo}`);
  if (d.role) lines.push(`Role: ${d.role}`);
  if (d.certs && d.certs.length) lines.push(`Certifications: ${d.certs.join(", ")}`);
  if (d.fileNames && d.fileNames.length) {
    lines.push(`Files attached (please send separately): ${d.fileNames.join(", ")}`);
  }
  if (d.notes) {
    lines.push("", "Notes:", d.notes);
  }
  return lines.join("\n");
}

async function submitToJotform(formId: string, apiKey: string, d: QuotePayload) {
  const body = new URLSearchParams();
  body.append(`submission[${QID.name}]`, d.name);
  body.append(`submission[${QID.email}]`, d.email);
  if (d.company) body.append(`submission[${QID.company}]`, d.company);
  if (d.phone) body.append(`submission[${QID.phone}]`, d.phone);
  body.append(`submission[${QID.textarea}]`, buildTextareaBody(d));

  const url = `https://api.jotform.com/form/${encodeURIComponent(formId)}/submissions?apiKey=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const text = await res.text();
  if (!res.ok) {
    return { ok: false as const, status: res.status, body: text };
  }
  let submissionId: string | null = null;
  try {
    const parsed = JSON.parse(text) as { content?: { submissionID?: string } };
    submissionId = parsed.content?.submissionID ?? null;
  } catch {
    /* response was not JSON — accept success but report no id */
  }
  return { ok: true as const, submissionId };
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = parsePayload(raw);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const apiKey = process.env.JOTFORM_API_KEY;
  const formId = process.env.JOTFORM_QUOTE_FORM_ID || DEFAULT_FORM_ID;

  if (!apiKey) {
    // Dev / pre-wire-up: skip the network call so the wizard's UX still works.
    console.warn(
      "[api/forms/quote] JOTFORM_API_KEY not set — accepting submission in deferred mode.",
    );
    return NextResponse.json({ ok: true, submissionId: null, formId, deferred: true });
  }

  try {
    const result = await submitToJotform(formId, apiKey, parsed.data);
    if (!result.ok) {
      console.error(
        `[api/forms/quote] Jotform rejected submission (${result.status}): ${result.body.slice(0, 300)}`,
      );
      return NextResponse.json(
        { ok: false, error: "jotform_rejected" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, submissionId: result.submissionId, formId });
  } catch (err) {
    console.error("[api/forms/quote] unexpected error", err);
    return NextResponse.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
