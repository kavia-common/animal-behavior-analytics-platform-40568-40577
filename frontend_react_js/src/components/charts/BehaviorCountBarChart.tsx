import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Props = {
  data: { type: string; count: number }[];
  onBarClick?: (type: string) => void;
};

// PUBLIC_INTERFACE
export default function BehaviorCountBarChart({ data, onBarClick }: Props) {
  /** Vertical bar chart for behavior counts */
  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            name="Count"
            fill="#2C5F9A"
            onClick={(entry: any, index: number) => {
              const t = data?.[index]?.type ?? entry?.type;
              if (t) onBarClick?.(t);
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
