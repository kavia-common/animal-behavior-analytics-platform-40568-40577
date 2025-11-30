import React, { useEffect } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

type Props = { data: { label: string; value: number }[] };

// PUBLIC_INTERFACE
export default function DurationPieChart({ data }: Props) {
  /** Pie chart for duration breakdown */
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: ['#2C5F9A', '#20B2AA', '#FF6B35', '#4CAF50', '#FFC107']
      }
    ]
  };
  useEffect(() => {}, [data]);
  return <div className="w-full h-72"><Pie data={chartData} /></div>;
}
