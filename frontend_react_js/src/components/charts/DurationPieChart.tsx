import React, { useEffect, useMemo } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getBehaviorColor } from '@/lib/behaviorPalette';
import { EXACT_BEHAVIORS, type BehaviorId } from '@/lib/behaviors';

Chart.register(ArcElement, Tooltip, Legend);

type Props = { data: { label: string; value: number }[] };

/**
 * PUBLIC_INTERFACE
 * DurationPieChart renders a pie and shows summary metrics for total, average and % of day.
 * Only allowed five behaviors are included and ordered consistently.
 */
export default function DurationPieChart({ data }: Props) {
  // Build a map and then output in EXACT_BEHAVIORS order
  const byLabel = useMemo(() => {
    const m = new Map<string, number>();
    (data ?? []).forEach((d) => m.set(d.label, (m.get(d.label) || 0) + (d.value || 0)));
    return m;
  }, [data]);

  const labels = (EXACT_BEHAVIORS as readonly BehaviorId[]);
  const values = [...labels].map((l) => byLabel.get(l) || 0);
  const colors = [...labels].map((l) => getBehaviorColor(l));

  const chartData = {
    // Chart.js expects a mutable array type for labels; spread to create one
    labels: [...labels],
    datasets: [
      {
        data: [...values],
        backgroundColor: [...colors],
      },
    ],
  };
  const totals = useMemo(() => {
    const total = values.reduce((a, b) => a + b, 0);
    const avg = values.length ? total / values.length : 0;
    const pct = (total / (24 * 60)) * 100;
    return { total, avg, pct };
  }, [values]);

  useEffect(() => {}, [values]);
  return (
    <div className="w-full">
      <div className="h-72">
        <Pie data={chartData} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs" style={{ color: 'var(--color-text)' }}>
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
