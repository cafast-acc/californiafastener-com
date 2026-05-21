export default function AdminLoading() {
  return (
    <div className="cf-admin-stack">
      <div className="cf-admin-kpi-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="cf-admin-kpi cf-admin-kpi--skeleton" aria-hidden="true">
            <div className="cf-admin-kpi__label">&nbsp;</div>
            <div className="cf-admin-kpi__value">&nbsp;</div>
          </div>
        ))}
      </div>
      <div className="cf-admin-section cf-admin-section--skeleton" aria-hidden="true">
        <div style={{ height: 220 }} />
      </div>
    </div>
  );
}
