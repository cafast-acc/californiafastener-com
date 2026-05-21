import { demoteAdmin, removeUser } from "./actions";

const DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export type AdminRow = {
  id: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
};

export function AdminsTable({
  rows,
  currentUserId,
}: {
  rows: AdminRow[];
  currentUserId: string;
}) {
  if (!rows.length) {
    return <div className="cf-admin-chart-empty">No users yet.</div>;
  }
  return (
    <div className="cf-admin-table-wrap">
      <table className="cf-admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th aria-label="actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isSelf = row.id === currentUserId;
            const created = row.created_at ? new Date(row.created_at) : null;
            return (
              <tr key={row.id}>
                <td>
                  {row.email}
                  {isSelf && <span className="cf-admin-table__self">you</span>}
                </td>
                <td>
                  <span
                    className={`cf-admin-pill${row.role === "admin" ? " cf-admin-pill--accent" : ""}`}
                  >
                    {row.role}
                  </span>
                </td>
                <td className="cf-admin-table__time">
                  {created && !Number.isNaN(created.getTime()) ? DATE.format(created) : "—"}
                </td>
                <td>
                  {!isSelf && (
                    <div className="cf-admin-table__actions">
                      {row.role === "admin" && (
                        <form action={demoteAdmin}>
                          <input type="hidden" name="userId" value={row.id} />
                          <button
                            type="submit"
                            className="cf-admin-btn cf-admin-btn--ghost cf-admin-btn--small"
                          >
                            Demote
                          </button>
                        </form>
                      )}
                      <form action={removeUser}>
                        <input type="hidden" name="userId" value={row.id} />
                        <button
                          type="submit"
                          className="cf-admin-btn cf-admin-btn--ghost cf-admin-btn--small cf-admin-btn--danger"
                        >
                          Remove
                        </button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
