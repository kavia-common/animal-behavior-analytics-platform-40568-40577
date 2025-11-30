import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getBehaviorColor } from '@/lib/behaviorPalette';

type Props = {
  data: any[];
  keys: string[];
};

/**
 * PUBLIC_INTERFACE
 * DurationStackedBar renders a horizontal stacked bar using behavior palette colors.
 */
export default function DurationStackedBar({ data, keys }: Props) {
  /** Horizontal stacked bar by behavior durations */
  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Legend />
          {keys.map((k) => (
            <Bar key={k} dataKey={k} stackId="a" fill={getBehaviorColor(k)} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
