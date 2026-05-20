import { getGa4Snapshot } from "@/lib/ga4";
import { KpiCard } from "@/components/admin/KpiCard";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { SourceBreakdown } from "@/components/admin/SourceBreakdown";

const NUM = new Intl.NumberFormat("en-US");

export default async function AdminDashboardPage() {
  const ga4 = await getGa4Snapshot();
  const topSource = ga4.topSources[0]?.source ?? "—";

  return (
    <div className="cf-admin-stack">
      {!ga4.configured && (
        <div className="cf-admin-banner">
          GA4 isn&apos;t wired up yet. Set <code>GA4_PROPERTY_ID</code> and{" "}
          <code>GA4_SERVICE_ACCOUNT_JSON</code> in Vercel to start seeing real
          numbers.
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
          label="Sessions, last 30 days"
          value={NUM.format(ga4.sessionsLast30Days)}
          muted={!ga4.configured}
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
    </div>
  );
}
