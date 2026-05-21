import { getGa4TrafficSnapshot } from "@/lib/ga4";
import { parseRange, rangeLabel, type SearchParamsRecord } from "@/lib/dateRange";
import { PagesTable } from "@/components/admin/PagesTable";
import { DeviceChart } from "@/components/admin/DeviceChart";
import { CountryBars } from "@/components/admin/CountryBars";
import { CsvExportButton } from "@/components/admin/CsvExportButton";
import { DateRangePicker } from "../_components/DateRangePicker";

export const metadata = {
  title: "Traffic · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminTrafficPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  const params = await searchParams;
  const range = parseRange(params);
  const snapshot = await getGa4TrafficSnapshot(range);

  return (
    <div className="cf-admin-stack">
      <header className="cf-admin-page-head">
        <div>
          <h1 className="cf-t-h3">Traffic</h1>
          <p className="cf-t-small">{rangeLabel(range)}</p>
        </div>
        <DateRangePicker
          preset={range.preset}
          startDate={range.startDate}
          endDate={range.endDate}
        />
      </header>

      {!snapshot.configured && (
        <div className="cf-admin-banner">
          GA4 isn&apos;t wired up. Set <code>GA4_PROPERTY_ID</code> and{" "}
          <code>GA4_SERVICE_ACCOUNT_JSON</code> in Vercel to populate this page.
        </div>
      )}

      <section className="cf-admin-section">
        <header className="cf-admin-section__head cf-admin-section__head--row">
          <div>
            <h2 className="cf-t-h3">Top pages</h2>
            <p className="cf-t-small">Up to 50 most-viewed paths in this range.</p>
          </div>
          <div className="cf-admin-section__actions">
            <CsvExportButton
              rows={snapshot.topPages as unknown as Record<string, unknown>[]}
              columns={[
                { key: "path", label: "Path" },
                { key: "title", label: "Title" },
                { key: "pageviews", label: "Pageviews" },
                { key: "sessions", label: "Sessions" },
              ]}
              filename="top-pages"
            />
          </div>
        </header>
        <PagesTable pages={snapshot.topPages} />
      </section>

      <div className="cf-admin-chart-grid">
        <section className="cf-admin-section">
          <header className="cf-admin-section__head">
            <h2 className="cf-t-h3">Devices</h2>
            <p className="cf-t-small">Sessions split by device category.</p>
          </header>
          <DeviceChart data={snapshot.devices} />
        </section>
        <section className="cf-admin-section">
          <header className="cf-admin-section__head">
            <h2 className="cf-t-h3">Countries</h2>
            <p className="cf-t-small">Top 10 countries by sessions.</p>
          </header>
          <CountryBars data={snapshot.countries} />
        </section>
      </div>
    </div>
  );
}
