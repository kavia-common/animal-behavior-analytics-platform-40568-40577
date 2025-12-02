import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

type Props = { data: any[]; keys: string[]; xKey: string };

// PUBLIC_INTERFACE
export default function GroupedBarChart({ data, keys, xKey }: Props) {
  /** Grouped bars */
  const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', 'var(--color-success)', 'var(--color-warning)'];
  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((k, i) => <Bar key={k} dataKey={k} fill={colors[i % colors.length]} />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
