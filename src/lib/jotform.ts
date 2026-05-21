import "server-only";
import { unstable_cache } from "next/cache";
import type { DateRange } from "./dateRange";

const API_KEY = process.env.JOTFORM_API_KEY;
const BASE_URL = "https://api.jotform.com";

export function isJotformConfigured(): boolean {
  return Boolean(API_KEY);
}

export type FormCounts = {
  id: string;
  title: string;
  today: number;
  inRange: number;
};

export type JotformSnapshot = {
  configured: boolean;
  range: DateRange;
  forms: FormCounts[];
  totalToday: number;
  totalInRange: number;
  generatedAt: string;
};

const EMPTY_SNAPSHOT = (range: DateRange): JotformSnapshot => ({
  configured: false,
  range,
  forms: [],
  totalToday: 0,
  totalInRange: 0,
  generatedAt: new Date(0).toISOString(),
});

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

function formatJotformDate(d: Date): string {
  return d.toISOString().slice(0, 19).replace("T", " ");
}

async function fetchSnapshot(range: DateRange): Promise<JotformSnapshot> {
  if (!isJotformConfigured()) return EMPTY_SNAPSHOT(range);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const rangeStart = new Date(`${range.startDate}T00:00:00Z`);
  const rangeEnd = new Date(`${range.endDate}T23:59:59Z`);

  const [formsResp, submissionsResp] = await Promise.all([
    jotformFetch<RawListResponse<RawForm>>("/user/forms", { limit: "100" }),
    jotformFetch<RawListResponse<RawSubmission>>("/user/submissions", {
      limit: "1000",
      filter: JSON.stringify({ "created_at:gt": formatJotformDate(rangeStart) }),
    }),
  ]);

  const formMap = new Map<string, FormCounts>();
  for (const f of formsResp.content ?? []) {
    if (!f.id) continue;
    formMap.set(f.id, {
      id: f.id,
      title: f.title || `Form ${f.id}`,
      today: 0,
      inRange: 0,
    });
  }

  let totalToday = 0;
  let totalInRange = 0;

  for (const s of submissionsResp.content ?? []) {
    if (!s.created_at || !s.form_id) continue;
    const created = new Date(s.created_at);
    if (Number.isNaN(created.getTime())) continue;
    if (created > rangeEnd) continue;

    const entry =
      formMap.get(s.form_id) ??
      formMap.set(s.form_id, {
        id: s.form_id,
        title: `Form ${s.form_id}`,
        today: 0,
        inRange: 0,
      }).get(s.form_id)!;

    entry.inRange += 1;
    totalInRange += 1;
    if (created >= startOfToday) {
      entry.today += 1;
      totalToday += 1;
    }
  }

  const forms = Array.from(formMap.values())
    .filter((f) => f.inRange > 0)
    .sort((a, b) => b.inRange - a.inRange);

  return {
    configured: true,
    range,
    forms,
    totalToday,
    totalInRange,
    generatedAt: new Date().toISOString(),
  };
}

export const getJotformSnapshot = unstable_cache(
  fetchSnapshot,
  ["admin:jotform:snapshot:v2"],
  { revalidate: 600, tags: ["admin:jotform"] },
);
