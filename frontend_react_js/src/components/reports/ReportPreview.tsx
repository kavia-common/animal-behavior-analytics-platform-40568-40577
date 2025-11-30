import React from 'react';
import GroupedBarChart from '@/components/charts/GroupedBarChart';
import TrendLineChart from '@/components/charts/TrendLineChart';
import DurationPieChart from '@/components/charts/DurationPieChart';

type Props = { type: string };

// PUBLIC_INTERFACE
export default function ReportPreview({ type }: Props) {
  /** Preview widgets per report type */
  if (type === 'summary') {
    return (
      <div className="card p-4">
        <div className="font-heading font-semibold mb-2">Behavior Summary</div>
        <DurationPieChart data={[{ label: 'Foraging', value: 40 }, { label: 'Resting', value: 30 }, { label: 'Grooming', value: 20 }, { label: 'Walking', value: 10 }]} />
      </div>
    );
  }
  if (type === 'detailed') {
    return (
      <div className="card p-4">
        <div className="font-heading font-semibold mb-2">Detailed Timeline Activity</div>
        <TrendLineChart data={[{ d: 'Mon', v: 12 }, { d: 'Tue', v: 18 }, { d: 'Wed', v: 9 }, { d: 'Thu', v: 21 }, { d: 'Fri', v: 15 }]} xKey="d" yKey="v" />
      </div>
    );
  }
  return (
    <div className="card p-4">
      <div className="font-heading font-semibold mb-2">Comparative Analysis</div>
      <GroupedBarChart data={[
        { name: 'Week 1', Foraging: 12, Resting: 8 },
        { name: 'Week 2', Foraging: 15, Resting: 10 },
        { name: 'Week 3', Foraging: 9, Resting: 14 }
      ]} keys={['Foraging', 'Resting']} xKey="name" />
    </div>
  );
}
