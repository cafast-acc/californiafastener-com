import "server-only";
import { unstable_cache } from "next/cache";
import type { DateRange } from "./dateRange";

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
  range: DateRange;
  recentLeads: Lead[];
  leadsInRange: number;
  generatedAt: string;
};

export type LeadsSearchResult = {
  configured: boolean;
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
  generatedAt: string;
};

const EMPTY_SNAPSHOT = (range: DateRange): WhatConvertsSnapshot => ({
  configured: false,
  range,
  recentLeads: [],
  leadsInRange: 0,
  generatedAt: new Date(0).toISOString(),
});

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

async function fetchSnapshot(range: DateRange): Promise<WhatConvertsSnapshot> {
  if (!isWhatConvertsConfigured()) return EMPTY_SNAPSHOT(range);

  const [recent, inRange] = await Promise.all([
    fetchLeads({ page_size: 10, page_number: 1 }),
    fetchLeads({
      page_size: 1,
      page_number: 1,
      start_date: range.startDate,
      end_date: range.endDate,
    }),
  ]);

  return {
    configured: true,
    range,
    recentLeads: (recent.leads ?? []).map(normalizeLead),
    leadsInRange: inRange.total_records ?? 0,
    generatedAt: new Date().toISOString(),
  };
}

export const getWhatConvertsSnapshot = unstable_cache(
  fetchSnapshot,
  ["admin:whatconverts:snapshot:v2"],
  { revalidate: 600, tags: ["admin:whatconverts"] },
);

export type LeadsSearchParams = {
  range: DateRange;
  type?: string;
  source?: string;
  search?: string;
  page?: number;
  pageSize?: number;
};

async function fetchSearchLeads(params: LeadsSearchParams): Promise<LeadsSearchResult> {
  if (!isWhatConvertsConfigured()) {
    return {
      configured: false,
      leads: [],
      total: 0,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 25,
      generatedAt: new Date(0).toISOString(),
    };
  }
  const pageSize = params.pageSize ?? 25;
  const page = Math.max(1, params.page ?? 1);
  const apiParams: Record<string, string | number> = {
    page_size: pageSize,
    page_number: page,
    start_date: params.range.startDate,
    end_date: params.range.endDate,
  };
  if (params.type) apiParams.lead_type = params.type;
  if (params.source) apiParams.lead_source = params.source;
  // The WhatConverts API exposes a free-text `quick_search` param; we pass it
  // when set and let the API match across name / email / phone.
  if (params.search) apiParams.quick_search = params.search;

  const raw = await fetchLeads(apiParams);
  return {
    configured: true,
    leads: (raw.leads ?? []).map(normalizeLead),
    total: raw.total_records ?? 0,
    page,
    pageSize,
    generatedAt: new Date().toISOString(),
  };
}

// Cache keyed by all params; 5-minute revalidate (more granular than dashboard).
export const searchLeads = unstable_cache(
  fetchSearchLeads,
  ["admin:whatconverts:search:v1"],
  { revalidate: 300, tags: ["admin:whatconverts"] },
);
