import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Props = {
  data: any[];
  keys: string[];
};

// PUBLIC_INTERFACE
export default function DurationStackedBar({ data, keys }: Props) {
  /** Horizontal stacked bar by behavior durations */
  const colors = ['#2C5F9A', '#20B2AA', '#FF6B35', '#4CAF50', '#FFC107'];
  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Legend />
          {keys.map((k, i) => (
            <Bar key={k} dataKey={k} stackId="a" fill={colors[i % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
