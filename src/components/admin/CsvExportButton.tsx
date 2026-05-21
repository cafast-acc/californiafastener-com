"use client";

import { toCsv, type CsvColumn } from "@/lib/csv";

type Props<Row extends Record<string, unknown>> = {
  rows: Row[];
  columns: CsvColumn<Row>[];
  filename: string;
  label?: string;
};

export function CsvExportButton<Row extends Record<string, unknown>>({
  rows,
  columns,
  filename,
  label = "Export CSV",
}: Props<Row>) {
  function handleDownload() {
    if (!rows.length) return;
    const csv = toCsv(rows, columns);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      className="cf-admin-btn cf-admin-btn--ghost cf-admin-btn--small"
      onClick={handleDownload}
      disabled={rows.length === 0}
    >
      {label}
    </button>
  );
}
