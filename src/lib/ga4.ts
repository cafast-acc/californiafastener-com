import "server-only";
import { unstable_cache } from "next/cache";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const SERVICE_ACCOUNT_JSON = process.env.GA4_SERVICE_ACCOUNT_JSON;

export function isGa4Configured(): boolean {
  return Boolean(PROPERTY_ID && SERVICE_ACCOUNT_JSON);
}

type ServiceAccountCreds = {
  client_email: string;
  private_key: string;
};

let cachedClient: BetaAnalyticsDataClient | null = null;
function getClient(): BetaAnalyticsDataClient {
  if (cachedClient) return cachedClient;
  if (!SERVICE_ACCOUNT_JSON) {
    throw new Error("GA4_SERVICE_ACCOUNT_JSON not set");
  }
  const creds = JSON.parse(SERVICE_ACCOUNT_JSON) as ServiceAccountCreds;
  cachedClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key.replace(/\\n/g, "\n"),
    },
  });
  return cachedClient;
}

function propertyName(): string {
  if (!PROPERTY_ID) throw new Error("GA4_PROPERTY_ID not set");
  return `properties/${PROPERTY_ID}`;
}

export type DailySessions = { date: string; sessions: number };
export type SourceRow = { source: string; sessions: number };

export type Ga4Snapshot = {
  configured: boolean;
  sessionsToday: number;
  sessionsLast7Days: number;
  sessionsLast30Days: number;
  dailySessions: DailySessions[];
  topSources: SourceRow[];
  generatedAt: string;
};

const EMPTY_SNAPSHOT: Ga4Snapshot = {
  configured: false,
  sessionsToday: 0,
  sessionsLast7Days: 0,
  sessionsLast30Days: 0,
  dailySessions: [],
  topSources: [],
  generatedAt: new Date(0).toISOString(),
};

async function getSessionsCount(
  startDate: string,
  endDate: string,
): Promise<number> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate, endDate }],
    metrics: [{ name: "sessions" }],
  });
  const value = response.rows?.[0]?.metricValues?.[0]?.value;
  return value ? Number(value) : 0;
}

async function getDailySessions(days: number): Promise<DailySessions[]> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
  });
  return (response.rows ?? []).map((row) => {
    const raw = row.dimensionValues?.[0]?.value ?? "";
    return {
      date: raw.length === 8 ? `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}` : raw,
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    };
  });
}

async function getTopSources(days: number, limit = 5): Promise<SourceRow[]> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit,
  });
  return (response.rows ?? []).map((row) => ({
    source: row.dimensionValues?.[0]?.value ?? "(unknown)",
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

async function fetchSnapshot(): Promise<Ga4Snapshot> {
  if (!isGa4Configured()) return EMPTY_SNAPSHOT;
  const [today, last7, last30, daily, sources] = await Promise.all([
    getSessionsCount("today", "today"),
    getSessionsCount("7daysAgo", "today"),
    getSessionsCount("30daysAgo", "today"),
    getDailySessions(30),
    getTopSources(30, 6),
  ]);
  return {
    configured: true,
    sessionsToday: today,
    sessionsLast7Days: last7,
    sessionsLast30Days: last30,
    dailySessions: daily,
    topSources: sources,
    generatedAt: new Date().toISOString(),
  };
}

// 10-minute server-side cache so each dashboard render doesn't re-hit GA4.
export const getGa4Snapshot = unstable_cache(
  fetchSnapshot,
  ["admin:ga4:snapshot:v1"],
  { revalidate: 600, tags: ["admin:ga4"] },
);
