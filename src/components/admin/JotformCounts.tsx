import type { FormCounts } from "@/lib/jotform";

const NUM = new Intl.NumberFormat("en-US");

export function JotformCounts({ forms }: { forms: FormCounts[] }) {
  if (!forms.length) {
    return <div className="cf-admin-chart-empty">No form submissions in this range.</div>;
  }
  return (
    <div className="cf-admin-table-wrap">
      <table className="cf-admin-table">
        <thead>
          <tr>
            <th>Form</th>
            <th className="cf-admin-table__num">Today</th>
            <th className="cf-admin-table__num">In range</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>
                <div>{form.title}</div>
                <div className="cf-admin-table__sub">#{form.id}</div>
              </td>
              <td className="cf-admin-table__num">{NUM.format(form.today)}</td>
              <td className="cf-admin-table__num">{NUM.format(form.inRange)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
