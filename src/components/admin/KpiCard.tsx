type Props = {
  label: string;
  value: string;
  sublabel?: string;
  muted?: boolean;
};

export function KpiCard({ label, value, sublabel, muted }: Props) {
  return (
    <div className={`cf-admin-kpi${muted ? " cf-admin-kpi--muted" : ""}`}>
      <div className="cf-admin-kpi__label">{label}</div>
      <div className="cf-admin-kpi__value">{value}</div>
      {sublabel ? <div className="cf-admin-kpi__sub">{sublabel}</div> : null}
    </div>
  );
}
