"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { DailySessions } from "@/lib/ga4";

export function TrafficChart({ data }: { data: DailySessions[] }) {
  if (!data.length) {
    return <div className="cf-admin-chart-empty">No traffic data yet.</div>;
  }
  return (
    <div className="cf-admin-chart" style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="#E6E4DF" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#6E6E73" }}
            tickFormatter={(d: string) => d.slice(5)}
            tickLine={false}
            axisLine={{ stroke: "#D2D2D0" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6E6E73" }}
            tickLine={false}
            axisLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #D2D2D0",
            }}
            labelStyle={{ color: "#1D1D1F" }}
          />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#1C52A3"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
