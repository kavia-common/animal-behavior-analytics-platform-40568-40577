import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

type Props = { data: any[]; xKey: string; yKey: string; color?: string };

/**
 * Simple line chart with a responsive container.
 * Adds a min width to avoid over-squishing on narrow screens;
 * use inside a horizontally scrollable parent if needed.
 */
export default function TrendLineChart({ data, xKey, yKey, color = 'var(--primary)' }: Props) {
  return (
    <div className="w-full h-64">
      <div className="min-w-[640px] w-full h-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
