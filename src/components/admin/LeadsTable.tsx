import type { Lead } from "@/lib/whatconverts";

const TIME = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function formatTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : TIME.format(d);
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  if (!leads.length) {
    return <div className="cf-admin-chart-empty">No leads yet.</div>;
  }
  return (
    <div className="cf-admin-table-wrap">
      <table className="cf-admin-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Type</th>
            <th>Source</th>
            <th>Campaign</th>
            <th>Page</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="cf-admin-table__time">{formatTime(lead.createdAt)}</td>
              <td>
                <div>{lead.name}</div>
                {lead.email ? <div className="cf-admin-table__sub">{lead.email}</div> : null}
              </td>
              <td>
                <span className="cf-admin-pill">{lead.type}</span>
              </td>
              <td>{lead.source}</td>
              <td>{lead.campaign}</td>
              <td className="cf-admin-table__url">
                {lead.url ? (
                  <a href={lead.url} target="_blank" rel="noreferrer">
                    {new URL(lead.url, "https://example.com").pathname || lead.url}
                  </a>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
