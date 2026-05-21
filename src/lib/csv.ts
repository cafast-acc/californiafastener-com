export type CsvColumn<Row> = {
  key: keyof Row | string;
  label: string;
  format?: (row: Row) => string | number | null | undefined;
};

const BOM = "﻿";

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function toCsv<Row extends Record<string, unknown>>(
  rows: Row[],
  columns: CsvColumn<Row>[],
): string {
  const header = columns.map((c) => escapeCell(c.label)).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((col) => {
          const raw = col.format ? col.format(row) : row[col.key as keyof Row];
          return escapeCell(raw);
        })
        .join(","),
    )
    .join("\n");
  return BOM + header + "\n" + body;
}
