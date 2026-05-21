import type { TopPage } from "@/lib/ga4";

const NUM = new Intl.NumberFormat("en-US");

export function PagesTable({ pages }: { pages: TopPage[] }) {
  if (!pages.length) {
    return <div className="cf-admin-chart-empty">No page data in this range.</div>;
  }
  return (
    <div className="cf-admin-table-wrap">
      <table className="cf-admin-table">
        <thead>
          <tr>
            <th>Page</th>
            <th className="cf-admin-table__num">Pageviews</th>
            <th className="cf-admin-table__num">Sessions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page, idx) => (
            <tr key={`${page.path}-${idx}`}>
              <td>
                <div>{page.title || page.path || "(empty path)"}</div>
                <div className="cf-admin-table__sub">{page.path}</div>
              </td>
              <td className="cf-admin-table__num">{NUM.format(page.pageviews)}</td>
              <td className="cf-admin-table__num">{NUM.format(page.sessions)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
