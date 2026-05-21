import "server-only";
import { unstable_cache } from "next/cache";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { DateRange } from "./dateRange";

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
export type TopPage = {
  path: string;
  title: string;
  pageviews: number;
  sessions: number;
};
export type DeviceRow = { device: string; sessions: number };
export type CountryRow = { country: string; sessions: number };

export type Ga4Snapshot = {
  configured: boolean;
  range: DateRange;
  sessionsToday: number;
  sessionsInRange: number;
  dailySessions: DailySessions[];
  topSources: SourceRow[];
  generatedAt: string;
};

export type Ga4TrafficSnapshot = {
  configured: boolean;
  range: DateRange;
  topPages: TopPage[];
  devices: DeviceRow[];
  countries: CountryRow[];
  generatedAt: string;
};

const EMPTY_SNAPSHOT = (range: DateRange): Ga4Snapshot => ({
  configured: false,
  range,
  sessionsToday: 0,
  sessionsInRange: 0,
  dailySessions: [],
  topSources: [],
  generatedAt: new Date(0).toISOString(),
});

const EMPTY_TRAFFIC = (range: DateRange): Ga4TrafficSnapshot => ({
  configured: false,
  range,
  topPages: [],
  devices: [],
  countries: [],
  generatedAt: new Date(0).toISOString(),
});

async function getSessionsCount(startDate: string, endDate: string): Promise<number> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate, endDate }],
    metrics: [{ name: "sessions" }],
  });
  const value = response.rows?.[0]?.metricValues?.[0]?.value;
  return value ? Number(value) : 0;
}

async function getDailySessions(range: DateRange): Promise<DailySessions[]> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
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

async function getTopSources(range: DateRange, limit = 6): Promise<SourceRow[]> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
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

async function getTopPages(range: DateRange, limit = 50): Promise<TopPage[]> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
    dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
    metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit,
  });
  return (response.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? "",
    title: row.dimensionValues?.[1]?.value ?? "",
    pageviews: Number(row.metricValues?.[0]?.value ?? 0),
    sessions: Number(row.metricValues?.[1]?.value ?? 0),
  }));
}

async function getDeviceBreakdown(range: DateRange): Promise<DeviceRow[]> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });
  return (response.rows ?? []).map((row) => ({
    device: row.dimensionValues?.[0]?.value ?? "(unknown)",
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

async function getCountryBreakdown(range: DateRange, limit = 10): Promise<CountryRow[]> {
  const [response] = await getClient().runReport({
    property: propertyName(),
    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
    dimensions: [{ name: "country" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit,
  });
  return (response.rows ?? []).map((row) => ({
    country: row.dimensionValues?.[0]?.value ?? "(unknown)",
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

async function fetchSnapshot(range: DateRange): Promise<Ga4Snapshot> {
  if (!isGa4Configured()) return EMPTY_SNAPSHOT(range);
  const [today, inRange, daily, sources] = await Promise.all([
    getSessionsCount("today", "today"),
    getSessionsCount(range.startDate, range.endDate),
    getDailySessions(range),
    getTopSources(range, 6),
  ]);
  return {
    configured: true,
    range,
    sessionsToday: today,
    sessionsInRange: inRange,
    dailySessions: daily,
    topSources: sources,
    generatedAt: new Date().toISOString(),
  };
}

async function fetchTrafficSnapshot(range: DateRange): Promise<Ga4TrafficSnapshot> {
  if (!isGa4Configured()) return EMPTY_TRAFFIC(range);
  const [pages, devices, countries] = await Promise.all([
    getTopPages(range, 50),
    getDeviceBreakdown(range),
    getCountryBreakdown(range, 10),
  ]);
  return {
    configured: true,
    range,
    topPages: pages,
    devices,
    countries,
    generatedAt: new Date().toISOString(),
  };
}

export const getGa4Snapshot = unstable_cache(
  fetchSnapshot,
  ["admin:ga4:snapshot:v2"],
  { revalidate: 600, tags: ["admin:ga4"] },
);

export const getGa4TrafficSnapshot = unstable_cache(
  fetchTrafficSnapshot,
  ["admin:ga4:traffic:v1"],
  { revalidate: 600, tags: ["admin:ga4"] },
);
