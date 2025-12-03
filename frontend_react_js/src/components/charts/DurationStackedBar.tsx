import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getBehaviorColor, BEHAVIOR_ORDER, type BehaviorKey as BehaviorId } from '@/lib/behaviorPalette';

type Props = {
  data: any[];
  keys: string[];
};

/**
 * PUBLIC_INTERFACE
 * DurationStackedBar renders a horizontal stacked bar using behavior palette colors.
 * Only the five allowed behavior keys are rendered, in strict order.
 */
export default function DurationStackedBar({ data, keys }: Props) {
  const orderedKeys = useMemo(
    () => (BEHAVIOR_ORDER as readonly BehaviorId[]).filter((k) => keys.includes(k)),
    [keys]
  );

  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Legend />
          {orderedKeys.map((k) => (
            <Bar key={k} dataKey={k} stackId="a" fill={getBehaviorColor(k)} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
