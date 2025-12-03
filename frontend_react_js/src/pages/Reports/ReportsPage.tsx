import React from 'react';
import { BEHAVIOR_KEYS, BEHAVIOR_LABELS, BEHAVIOR_COLORS } from '@/lib/behaviorPalette';
import BehaviorCountBarChart from '@/components/charts/BehaviorCountBarChart';
import DurationPieChart from '@/components/charts/DurationPieChart';

const ExportButtons = () => (
  <div className="flex gap-2">
    <button className="px-3 py-2 border" style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}>
      CSV
    </button>
    <button className="px-3 py-2 border" style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}>
      PDF
    </button>
    <button className="px-3 py-2 border" style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-button)' }}>
      Excel
    </button>
  </div>
);

const ReportsPage: React.FC = () => {
  return (
    <div className="page-container space-y-6">
      {/* Daily Summary */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Daily Summary</h3>
          <ExportButtons />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="chart-container">
            <BehaviorCountBarChart behaviors={[...BEHAVIOR_KEYS]} />
          </div>
          <div className="chart-container">
            <DurationPieChart behaviors={[...BEHAVIOR_KEYS]} />
          </div>
        </div>
      </div>

      {/* Behaviour Summary (table) */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Behaviour Summary</h3>
          <ExportButtons />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm" style={{ background: 'var(--color-table-header-bg)' }}>
                <th className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>Behaviour</th>
                <th className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>Count</th>
                <th className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>Total Duration (mins)</th>
                <th className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>Avg Duration (mins)</th>
              </tr>
            </thead>
            <tbody>
              {BEHAVIOR_KEYS.map((k, idx) => (
                <tr key={k} className="row-hover">
                  <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="pill" style={{ borderColor: BEHAVIOR_COLORS[k], color: BEHAVIOR_COLORS[k] }}>
                      {BEHAVIOR_LABELS[k]}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    {[140, 90, 120, 70, 60][idx]}
                  </td>
                  <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    {[320, 210, 120, 80, 180][idx]}
                  </td>
                  <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    {[12, 9, 8, 4, 6][idx]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trend Over Time */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Trend Over Time</h3>
          <ExportButtons />
        </div>
        <div className="text-sm text-neutralMid">Trend visualization placeholder; when implemented ensure strict 5-behavior colors.</div>
      </div>

      {/* Welfare Score Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Welfare Score Overview</h3>
          <ExportButtons />
        </div>
        <div className="text-sm text-neutralMid">Score overview placeholder; style follows tokens.</div>
      </div>
    </div>
  );
};

export default ReportsPage;
