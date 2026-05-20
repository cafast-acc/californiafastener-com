import "server-only";
import { unstable_cache } from "next/cache";

const API_TOKEN = process.env.WHATCONVERTS_API_TOKEN;
const API_SECRET = process.env.WHATCONVERTS_API_SECRET;
const BASE_URL = "https://app.whatconverts.com/api/v1";

export function isWhatConvertsConfigured(): boolean {
  return Boolean(API_TOKEN && API_SECRET);
}

export type Lead = {
  id: number | string;
  createdAt: string;
  name: string;
  email: string | null;
  phone: string | null;
  type: string;
  source: string;
  campaign: string;
  url: string | null;
};

export type WhatConvertsSnapshot = {
  configured: boolean;
  recentLeads: Lead[];
  leadsLast7Days: number;
  leadsLast30Days: number;
  generatedAt: string;
};

const EMPTY_SNAPSHOT: WhatConvertsSnapshot = {
  configured: false,
  recentLeads: [],
  leadsLast7Days: 0,
  leadsLast30Days: 0,
  generatedAt: new Date(0).toISOString(),
};

type RawLead = {
  lead_id?: number | string;
  date_created?: string;
  lead_type?: string;
  contact_name?: string;
  contact_first_name?: string;
  contact_last_name?: string;
  contact_email_address?: string;
  contact_phone_number?: string;
  lead_source?: string;
  lead_campaign?: string;
  landing_url?: string;
  form_url?: string;
};

type RawListResponse = {
  leads?: RawLead[];
  total_records?: number;
  total_pages?: number;
};

function authHeader(): string {
  const creds = `${API_TOKEN}:${API_SECRET}`;
  return `Basic ${Buffer.from(creds).toString("base64")}`;
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function normalizeLead(raw: RawLead): Lead {
  const name =
    raw.contact_name ||
    [raw.contact_first_name, raw.contact_last_name].filter(Boolean).join(" ").trim() ||
    "—";
  return {
    id: raw.lead_id ?? "—",
    createdAt: raw.date_created ?? "",
    name,
    email: raw.contact_email_address ?? null,
    phone: raw.contact_phone_number ?? null,
    type: raw.lead_type ?? "—",
    source: raw.lead_source ?? "—",
    campaign: raw.lead_campaign ?? "—",
    url: raw.landing_url ?? raw.form_url ?? null,
  };
}

async function fetchLeads(params: Record<string, string | number>): Promise<RawListResponse> {
  const qs = new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>((acc, [k, v]) => {
      acc[k] = String(v);
      return acc;
    }, {}),
  );
  const res = await fetch(`${BASE_URL}/leads?${qs.toString()}`, {
    method: "GET",
    headers: {
      Authorization: authHeader(),
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`WhatConverts ${res.status}: ${await res.text().catch(() => "")}`);
  }
  return (await res.json()) as RawListResponse;
}

async function fetchSnapshot(): Promise<WhatConvertsSnapshot> {
  if (!isWhatConvertsConfigured()) return EMPTY_SNAPSHOT;

  const now = new Date();
  const sevenAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [recent, week, month] = await Promise.all([
    fetchLeads({ page_size: 10, page_number: 1 }),
    fetchLeads({
      page_size: 1,
      page_number: 1,
      start_date: formatDate(sevenAgo),
      end_date: formatDate(now),
    }),
    fetchLeads({
      page_size: 1,
      page_number: 1,
      start_date: formatDate(thirtyAgo),
      end_date: formatDate(now),
    }),
  ]);

  return {
    configured: true,
    recentLeads: (recent.leads ?? []).map(normalizeLead),
    leadsLast7Days: week.total_records ?? 0,
    leadsLast30Days: month.total_records ?? 0,
    generatedAt: new Date().toISOString(),
  };
}

export const getWhatConvertsSnapshot = unstable_cache(
  fetchSnapshot,
  ["admin:whatconverts:snapshot:v1"],
  { revalidate: 600, tags: ["admin:whatconverts"] },
);
