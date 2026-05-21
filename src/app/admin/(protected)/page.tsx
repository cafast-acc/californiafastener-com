import Link from "next/link";
import { Suspense } from "react";
import { getGa4Snapshot } from "@/lib/ga4";
import { getWhatConvertsSnapshot } from "@/lib/whatconverts";
import { getJotformSnapshot } from "@/lib/jotform";
import { parseRange, rangeLabel, type SearchParamsRecord } from "@/lib/dateRange";
import { KpiCard } from "@/components/admin/KpiCard";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { SourceBreakdown } from "@/components/admin/SourceBreakdown";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { JotformCounts } from "@/components/admin/JotformCounts";
import { CsvExportButton } from "@/components/admin/CsvExportButton";
import { ErrorBoundary } from "@/components/admin/ErrorBoundary";
import { DateRangePicker } from "./_components/DateRangePicker";

const NUM = new Intl.NumberFormat("en-US");

const WidgetError = ({ name }: { name: string }) => (
  <div className="cf-admin-section cf-admin-section--error">
    <p className="cf-t-small">{name} widget failed to load. Reload to retry.</p>
  </div>
);

const WidgetSkeleton = () => (
  <div className="cf-admin-section cf-admin-section--skeleton" aria-hidden="true">
    <div style={{ height: 120 }} />
  </div>
);

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  const params = await searchParams;
  const range = parseRange(params);

  return (
    <div className="cf-admin-stack">
      <header className="cf-admin-page-head">
        <div>
          <h1 className="cf-t-h3">Dashboard</h1>
          <p className="cf-t-small">{rangeLabel(range)}</p>
        </div>
        <DateRangePicker
          preset={range.preset}
          startDate={range.startDate}
          endDate={range.endDate}
        />
      </header>

      <ErrorBoundary fallback={<WidgetError name="KPIs" />}>
        <Suspense fallback={<WidgetSkeleton />}>
          <KpiRow params={params} />
        </Suspense>
      </ErrorBoundary>

      <div className="cf-admin-chart-grid">
        <ErrorBoundary fallback={<WidgetError name="Traffic chart" />}>
          <Suspense fallback={<WidgetSkeleton />}>
            <TrafficSection params={params} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<WidgetError name="Channel mix" />}>
          <Suspense fallback={<WidgetSkeleton />}>
            <SourcesSection params={params} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <ErrorBoundary fallback={<WidgetError name="Recent leads" />}>
        <Suspense fallback={<WidgetSkeleton />}>
          <LeadsSection params={params} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<WidgetError name="Jotform counts" />}>
        <Suspense fallback={<WidgetSkeleton />}>
          <JotformSection params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

async function KpiRow({ params }: { params: SearchParamsRecord }) {
  const range = parseRange(params);
  const [ga4, wc, jf] = await Promise.all([
    getGa4Snapshot(range),
    getWhatConvertsSnapshot(range),
    getJotformSnapshot(range),
  ]);
  const topSource = ga4.topSources[0]?.source ?? "—";
  const missing: string[] = [];
  if (!ga4.configured) missing.push("GA4 (GA4_PROPERTY_ID + GA4_SERVICE_ACCOUNT_JSON)");
  if (!wc.configured) missing.push("WhatConverts (WHATCONVERTS_API_TOKEN + _SECRET)");
  if (!jf.configured) missing.push("Jotform (JOTFORM_API_KEY)");

  return (
    <>
      {missing.length > 0 && (
        <div className="cf-admin-banner">
          <strong>Set these in Vercel to bring widgets online:</strong>
          <ul className="cf-admin-banner__list">
            {missing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="cf-admin-kpi-grid">
        <KpiCard
          label="Sessions today"
          value={NUM.format(ga4.sessionsToday)}
          muted={!ga4.configured}
        />
        <KpiCard
          label="Sessions in range"
          value={NUM.format(ga4.sessionsInRange)}
          muted={!ga4.configured}
        />
        <KpiCard
          label="Leads in range"
          value={NUM.format(wc.leadsInRange)}
          muted={!wc.configured}
        />
        <KpiCard
          label="Form submissions in range"
          value={NUM.format(jf.totalInRange)}
          sublabel={jf.configured ? `${NUM.format(jf.totalToday)} today` : undefined}
          muted={!jf.configured}
        />
        <KpiCard
          label="Top channel"
          value={topSource}
          muted={!ga4.configured}
        />
      </div>
    </>
  );
}

async function TrafficSection({ params }: { params: SearchParamsRecord }) {
  const range = parseRange(params);
  const ga4 = await getGa4Snapshot(range);
  return (
    <section className="cf-admin-section">
      <header className="cf-admin-section__head">
        <h2 className="cf-t-h3">Traffic</h2>
        <p className="cf-t-small">Sessions per day in the selected range.</p>
      </header>
      <TrafficChart data={ga4.dailySessions} />
    </section>
  );
}

async function SourcesSection({ params }: { params: SearchParamsRecord }) {
  const range = parseRange(params);
  const ga4 = await getGa4Snapshot(range);
  return (
    <section className="cf-admin-section">
      <header className="cf-admin-section__head">
        <h2 className="cf-t-h3">Channel mix</h2>
        <p className="cf-t-small">Sessions by default channel group.</p>
      </header>
      <SourceBreakdown data={ga4.topSources} />
    </section>
  );
}

async function LeadsSection({ params }: { params: SearchParamsRecord }) {
  const range = parseRange(params);
  const wc = await getWhatConvertsSnapshot(range);
  return (
    <section className="cf-admin-section">
      <header className="cf-admin-section__head cf-admin-section__head--row">
        <div>
          <h2 className="cf-t-h3">Recent leads</h2>
          <p className="cf-t-small">
            Latest 10 calls and form submissions captured by WhatConverts.
          </p>
        </div>
        <div className="cf-admin-section__actions">
          <CsvExportButton
            rows={wc.recentLeads as unknown as Record<string, unknown>[]}
            columns={[
              { key: "createdAt", label: "Time" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "type", label: "Type" },
              { key: "source", label: "Source" },
              { key: "campaign", label: "Campaign" },
              { key: "url", label: "Page" },
            ]}
            filename="recent-leads"
          />
          <Link href="/admin/leads" className="cf-admin-btn cf-admin-btn--ghost cf-admin-btn--small">
            View all →
          </Link>
        </div>
      </header>
      <LeadsTable leads={wc.recentLeads} />
    </section>
  );
}

async function JotformSection({ params }: { params: SearchParamsRecord }) {
  const range = parseRange(params);
  const jf = await getJotformSnapshot(range);
  return (
    <section className="cf-admin-section">
      <header className="cf-admin-section__head cf-admin-section__head--row">
        <div>
          <h2 className="cf-t-h3">Form submissions by form</h2>
          <p className="cf-t-small">Counts straight from the Jotform API for the selected range.</p>
        </div>
        <div className="cf-admin-section__actions">
          <CsvExportButton
            rows={jf.forms as unknown as Record<string, unknown>[]}
            columns={[
              { key: "id", label: "Form ID" },
              { key: "title", label: "Title" },
              { key: "today", label: "Today" },
              { key: "inRange", label: "In range" },
            ]}
            filename="form-submissions"
          />
        </div>
      </header>
      <JotformCounts forms={jf.forms} />
    </section>
  );
}
