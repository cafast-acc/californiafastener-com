import { getGa4Snapshot } from "@/lib/ga4";
import { getWhatConvertsSnapshot } from "@/lib/whatconverts";
import { KpiCard } from "@/components/admin/KpiCard";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { SourceBreakdown } from "@/components/admin/SourceBreakdown";
import { LeadsTable } from "@/components/admin/LeadsTable";

const NUM = new Intl.NumberFormat("en-US");

export default async function AdminDashboardPage() {
  const [ga4, wc] = await Promise.all([
    getGa4Snapshot(),
    getWhatConvertsSnapshot(),
  ]);
  const topSource = ga4.topSources[0]?.source ?? "—";

  return (
    <div className="cf-admin-stack">
      {(!ga4.configured || !wc.configured) && (
        <div className="cf-admin-banner">
          {!ga4.configured && (
            <div>
              GA4 isn&apos;t wired up. Set <code>GA4_PROPERTY_ID</code> +{" "}
              <code>GA4_SERVICE_ACCOUNT_JSON</code> in Vercel.
            </div>
          )}
          {!wc.configured && (
            <div>
              WhatConverts isn&apos;t wired up. Set{" "}
              <code>WHATCONVERTS_API_TOKEN</code> +{" "}
              <code>WHATCONVERTS_API_SECRET</code> in Vercel.
            </div>
          )}
        </div>
      )}

      <div className="cf-admin-kpi-grid">
        <KpiCard
          label="Sessions today"
          value={NUM.format(ga4.sessionsToday)}
          muted={!ga4.configured}
        />
        <KpiCard
          label="Sessions, last 7 days"
          value={NUM.format(ga4.sessionsLast7Days)}
          muted={!ga4.configured}
        />
        <KpiCard
          label="Leads this week"
          value={NUM.format(wc.leadsLast7Days)}
          sublabel={wc.configured ? `${NUM.format(wc.leadsLast30Days)} in last 30 days` : undefined}
          muted={!wc.configured}
        />
        <KpiCard
          label="Top source (30d)"
          value={topSource}
          muted={!ga4.configured}
        />
      </div>

      <div className="cf-admin-chart-grid">
        <section className="cf-admin-section">
          <header className="cf-admin-section__head">
            <h2 className="cf-t-h3">Traffic, last 30 days</h2>
            <p className="cf-t-small">Sessions per day from Google Analytics 4.</p>
          </header>
          <TrafficChart data={ga4.dailySessions} />
        </section>
        <section className="cf-admin-section">
          <header className="cf-admin-section__head">
            <h2 className="cf-t-h3">Channel mix</h2>
            <p className="cf-t-small">Sessions by default channel group, last 30 days.</p>
          </header>
          <SourceBreakdown data={ga4.topSources} />
        </section>
      </div>

      <section className="cf-admin-section">
        <header className="cf-admin-section__head">
          <h2 className="cf-t-h3">Recent leads</h2>
          <p className="cf-t-small">
            Last 10 calls and form submissions captured by WhatConverts.
          </p>
        </header>
        <LeadsTable leads={wc.recentLeads} />
      </section>
    </div>
  );
}
