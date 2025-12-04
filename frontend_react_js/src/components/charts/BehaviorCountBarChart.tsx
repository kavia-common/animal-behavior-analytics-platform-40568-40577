import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { BEHAVIOR_COLORS, BEHAVIOR_LABELS, BehaviorKey } from '@/lib/behaviorPalette';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Props = {
  behaviors?: BehaviorKey[];
};

const BehaviorCountBarChart: React.FC<Props> = ({ behaviors }) => {
  const keys: BehaviorKey[] = behaviors ?? (Object.keys(BEHAVIOR_LABELS) as BehaviorKey[]);
  const labels = keys.map((k) => BEHAVIOR_LABELS[k]);
  const data = keys.map((_, i) => [140, 90, 120, 70, 60][i % 5]);
  const backgroundColor = keys.map((k) => BEHAVIOR_COLORS[k]);

  return (
    <div style={{ height: 280 }}>
      <Bar
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor,
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        }}
        options={{
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: 'var(--border)' as any }, ticks: { callback: (v) => `${v}` as any } },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default BehaviorCountBarChart;
