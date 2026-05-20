import "server-only";
import { unstable_cache } from "next/cache";

const API_KEY = process.env.JOTFORM_API_KEY;
const BASE_URL = "https://api.jotform.com";

export function isJotformConfigured(): boolean {
  return Boolean(API_KEY);
}

export type FormCounts = {
  id: string;
  title: string;
  today: number;
  week: number;
  month: number;
};

export type JotformSnapshot = {
  configured: boolean;
  forms: FormCounts[];
  totalToday: number;
  totalWeek: number;
  totalMonth: number;
  generatedAt: string;
};

const EMPTY_SNAPSHOT: JotformSnapshot = {
  configured: false,
  forms: [],
  totalToday: 0,
  totalWeek: 0,
  totalMonth: 0,
  generatedAt: new Date(0).toISOString(),
};

type RawForm = { id?: string; title?: string };
type RawSubmission = { id?: string; form_id?: string; created_at?: string };
type RawListResponse<T> = { content?: T[] };

async function jotformFetch<T>(path: string, params: Record<string, string>): Promise<T> {
  if (!API_KEY) throw new Error("JOTFORM_API_KEY not set");
  const qs = new URLSearchParams({ apiKey: API_KEY, ...params });
  const res = await fetch(`${BASE_URL}${path}?${qs.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Jotform ${res.status}: ${await res.text().catch(() => "")}`);
  }
  return (await res.json()) as T;
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 19).replace("T", " ");
}

async function fetchSnapshot(): Promise<JotformSnapshot> {
  if (!isJotformConfigured()) return EMPTY_SNAPSHOT;

  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [formsResp, submissionsResp] = await Promise.all([
    jotformFetch<RawListResponse<RawForm>>("/user/forms", { limit: "100" }),
    jotformFetch<RawListResponse<RawSubmission>>("/user/submissions", {
      limit: "1000",
      filter: JSON.stringify({ "created_at:gt": formatDate(monthAgo) }),
    }),
  ]);

  const formMap = new Map<string, FormCounts>();
  for (const f of formsResp.content ?? []) {
    if (!f.id) continue;
    formMap.set(f.id, {
      id: f.id,
      title: f.title || `Form ${f.id}`,
      today: 0,
      week: 0,
      month: 0,
    });
  }

  let totalToday = 0;
  let totalWeek = 0;
  let totalMonth = 0;

  for (const s of submissionsResp.content ?? []) {
    if (!s.created_at || !s.form_id) continue;
    const created = new Date(s.created_at);
    if (Number.isNaN(created.getTime())) continue;

    const entry =
      formMap.get(s.form_id) ??
      formMap.set(s.form_id, {
        id: s.form_id,
        title: `Form ${s.form_id}`,
        today: 0,
        week: 0,
        month: 0,
      }).get(s.form_id)!;

    entry.month += 1;
    totalMonth += 1;
    if (created >= weekAgo) {
      entry.week += 1;
      totalWeek += 1;
    }
    if (created >= startOfToday) {
      entry.today += 1;
      totalToday += 1;
    }
  }

  const forms = Array.from(formMap.values())
    .filter((f) => f.month > 0)
    .sort((a, b) => b.month - a.month);

  return {
    configured: true,
    forms,
    totalToday,
    totalWeek,
    totalMonth,
    generatedAt: new Date().toISOString(),
  };
}

export const getJotformSnapshot = unstable_cache(
  fetchSnapshot,
  ["admin:jotform:snapshot:v1"],
  { revalidate: 600, tags: ["admin:jotform"] },
);
