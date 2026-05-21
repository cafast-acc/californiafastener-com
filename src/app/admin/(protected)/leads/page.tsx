import { searchLeads } from "@/lib/whatconverts";
import { parseRange, rangeLabel, type SearchParamsRecord } from "@/lib/dateRange";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { CsvExportButton } from "@/components/admin/CsvExportButton";
import { DateRangePicker } from "../_components/DateRangePicker";
import { LeadsFilters } from "./LeadsFilters";
import { Pagination } from "./Pagination";

export const metadata = {
  title: "Leads · Admin",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 25;

function firstString(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  const params = await searchParams;
  const range = parseRange(params);
  const type = firstString(params.type);
  const source = firstString(params.source);
  const search = firstString(params.q);
  const pageRaw = Number.parseInt(firstString(params.page), 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  const result = await searchLeads({
    range,
    type: type || undefined,
    source: source || undefined,
    search: search || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className="cf-admin-stack">
      <header className="cf-admin-page-head">
        <div>
          <h1 className="cf-t-h3">Leads</h1>
          <p className="cf-t-small">{rangeLabel(range)}</p>
        </div>
        <DateRangePicker
          preset={range.preset}
          startDate={range.startDate}
          endDate={range.endDate}
        />
      </header>

      {!result.configured && (
        <div className="cf-admin-banner">
          WhatConverts isn&apos;t wired up. Set <code>WHATCONVERTS_API_TOKEN</code> and{" "}
          <code>WHATCONVERTS_API_SECRET</code> in Vercel.
        </div>
      )}

      <section className="cf-admin-section">
        <LeadsFilters type={type} source={source} search={search} />
      </section>

      <section className="cf-admin-section">
        <header className="cf-admin-section__head cf-admin-section__head--row">
          <div>
            <h2 className="cf-t-h3">
              {result.total.toLocaleString("en-US")} leads matched
            </h2>
            <p className="cf-t-small">
              {type && `Type: ${type} · `}
              {source && `Source: ${source} · `}
              {search && `Search: "${search}" · `}
              {rangeLabel(range)}
            </p>
          </div>
          <div className="cf-admin-section__actions">
            <CsvExportButton
              rows={result.leads as unknown as Record<string, unknown>[]}
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
              filename={`leads-page-${page}`}
            />
          </div>
        </header>
        <LeadsTable leads={result.leads} />
      </section>

      <Pagination page={page} pageSize={result.pageSize} total={result.total} />
    </div>
  );
}
