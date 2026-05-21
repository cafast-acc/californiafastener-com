"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { DeviceRow } from "@/lib/ga4";

const PALETTE = ["#1C52A3", "#38B6FF", "#8C52FF", "#6B37D6", "#6E6E73"];

export function DeviceChart({ data }: { data: DeviceRow[] }) {
  if (!data.length) {
    return <div className="cf-admin-chart-empty">No device data yet.</div>;
  }
  return (
    <div className="cf-admin-chart" style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="sessions"
            nameKey="device"
            innerRadius={48}
            outerRadius={88}
            paddingAngle={2}
            isAnimationActive={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #D2D2D0",
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: "#424245" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
