import { getGa4Snapshot } from "@/lib/ga4";
import { getWhatConvertsSnapshot } from "@/lib/whatconverts";
import { getJotformSnapshot } from "@/lib/jotform";
import { KpiCard } from "@/components/admin/KpiCard";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { SourceBreakdown } from "@/components/admin/SourceBreakdown";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { JotformCounts } from "@/components/admin/JotformCounts";

const NUM = new Intl.NumberFormat("en-US");

export default async function AdminDashboardPage() {
  const [ga4, wc, jf] = await Promise.all([
    getGa4Snapshot(),
    getWhatConvertsSnapshot(),
    getJotformSnapshot(),
  ]);
  const topSource = ga4.topSources[0]?.source ?? "—";
  const missing: string[] = [];
  if (!ga4.configured) missing.push("GA4 (GA4_PROPERTY_ID + GA4_SERVICE_ACCOUNT_JSON)");
  if (!wc.configured) missing.push("WhatConverts (WHATCONVERTS_API_TOKEN + _SECRET)");
  if (!jf.configured) missing.push("Jotform (JOTFORM_API_KEY)");

  return (
    <div className="cf-admin-stack">
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
          label="Form submissions this week"
          value={NUM.format(jf.totalWeek)}
          sublabel={jf.configured ? `${NUM.format(jf.totalMonth)} in last 30 days` : undefined}
          muted={!jf.configured}
        />
      </div>

      <div className="cf-admin-chart-grid">
        <section className="cf-admin-section">
          <header className="cf-admin-section__head">
            <h2 className="cf-t-h3">Traffic, last 30 days</h2>
            <p className="cf-t-small">
              Sessions per day from Google Analytics 4. Top source: {topSource}.
            </p>
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

      <section className="cf-admin-section">
        <header className="cf-admin-section__head">
          <h2 className="cf-t-h3">Form submissions by form</h2>
          <p className="cf-t-small">
            Counts come straight from the Jotform API. Today / 7-day / 30-day per form.
          </p>
        </header>
        <JotformCounts forms={jf.forms} />
      </section>
    </div>
  );
}
