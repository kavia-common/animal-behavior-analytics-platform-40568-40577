import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { BEHAVIOR_COLORS, BEHAVIOR_LABELS, BehaviorKey } from '@/lib/behaviorPalette';

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  behaviors?: BehaviorKey[];
};

const DurationPieChart: React.FC<Props> = ({ behaviors }) => {
  const keys: BehaviorKey[] = behaviors ?? (Object.keys(BEHAVIOR_LABELS) as BehaviorKey[]);
  const labels = keys.map((k) => BEHAVIOR_LABELS[k]);
  const data = keys.map((_, i) => [320, 210, 120, 80, 180][i % 5]);
  const backgroundColor = keys.map((k) => BEHAVIOR_COLORS[k]);

  return (
    <div style={{ height: 280 }}>
      <Pie
        data={{
          labels,
          datasets: [{ data, backgroundColor, borderColor: 'var(--color-surface)', borderWidth: 2 }],
        }}
        options={{
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: { label: (ctx) => `${ctx.label}: ${ctx.formattedValue} mins` },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default DurationPieChart;
