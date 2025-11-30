import React, { useEffect, useMemo } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getBehaviorColor } from '@/lib/behaviorPalette';

Chart.register(ArcElement, Tooltip, Legend);

type Props = { data: { label: string; value: number }[] };

/**
 * PUBLIC_INTERFACE
 * DurationPieChart renders a pie and shows summary metrics for total, average and % of day.
 */
export default function DurationPieChart({ data }: Props) {
  /** Pie chart for duration breakdown */
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: data.map(d => getBehaviorColor(d.label)),
      }
    ]
  };
  const totals = useMemo(() => {
    const total = data.reduce((a, b) => a + (b.value || 0), 0);
    const avg = data.length ? total / data.length : 0;
    const pct = (total / (24 * 60)) * 100;
    return { total, avg, pct };
  }, [data]);

  useEffect(() => {}, [data]);
  return (
    <div className="w-full">
      <div className="h-72">
        <Pie data={chartData} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-neutral-700">
        <div className="card p-2">
          <div>Total Duration</div>
          <div className="font-mono text-lg">{totals.total} min</div>
        </div>
        <div className="card p-2">
          <div>Average per Type</div>
          <div className="font-mono text-lg">{totals.avg.toFixed(1)} min</div>
        </div>
        <div className="card p-2">
          <div>% of Day</div>
          <div className="font-mono text-lg">{totals.pct.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}
