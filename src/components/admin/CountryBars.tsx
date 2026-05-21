"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CountryRow } from "@/lib/ga4";

export function CountryBars({ data }: { data: CountryRow[] }) {
  if (!data.length) {
    return <div className="cf-admin-chart-empty">No country data yet.</div>;
  }
  return (
    <div className="cf-admin-chart" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <CartesianGrid stroke="#E6E4DF" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#6E6E73" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="country"
            tick={{ fontSize: 12, fill: "#1D1D1F" }}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #D2D2D0",
            }}
          />
          <Bar
            dataKey="sessions"
            fill="#1C52A3"
            radius={[0, 4, 4, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
