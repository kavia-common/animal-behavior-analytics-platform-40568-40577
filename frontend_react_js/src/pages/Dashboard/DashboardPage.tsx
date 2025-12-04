import React from 'react';
import StatWidget from '@/components/widgets/StatWidget';
import BehaviorCountBarChart from '@/components/charts/BehaviorCountBarChart';
import DurationPieChart from '@/components/charts/DurationPieChart';

const DashboardPage: React.FC = () => {
  return (
    <div className="page-container space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <StatWidget label="Total behaviours detected" value="1,248" />
        </div>
        <div className="card">
          <StatWidget label="Most frequent behaviour" value="Pacing" />
        </div>
        <div className="card">
          <StatWidget label="Total duration (mins)" value="532" />
        </div>
        <div className="card">
          <StatWidget label="Rest-to-active ratio" value="1:3.1" />
        </div>
      </div>

      {/* Behavior Counts - Bar Chart */}
      <div className="chart-container">
        <h3 className="font-semibold mb-2">Behavior counts</h3>
        <BehaviorCountBarChart
          data={[
            { id: 'pacing', label: 'Pacing', count: 12, percentage: 12 / (12 + 25 + 8 + 15 + 20) * 100, color: 'var(--primary)' },
            { id: 'moving', label: 'Moving', count: 25, percentage: 25 / (12 + 25 + 8 + 15 + 20) * 100, color: 'var(--primary-600)' },
            { id: 'scratching', label: 'Scratching', count: 8, percentage: 8 / (12 + 25 + 8 + 15 + 20) * 100, color: 'var(--secondary)' },
            { id: 'recumbent', label: 'Recumbent', count: 15, percentage: 15 / (12 + 25 + 8 + 15 + 20) * 100, color: 'var(--muted)' },
            { id: 'non_recumbent', label: 'Non-Recumbent', count: 20, percentage: 20 / (12 + 25 + 8 + 15 + 20) * 100, color: '#3B82F6' },
          ]}
        />
      </div>

      {/* Duration Breakdown - Pie Chart with summaries */}
      <div className="chart-container">
        <h3 className="font-semibold mb-2">Duration breakdown</h3>
        <DurationPieChart
          data={[
            { id: 'pacing', label: 'Pacing', value: 50, color: 'var(--primary)' },
            { id: 'moving', label: 'Moving', value: 120, color: 'var(--primary-600)' },
            { id: 'scratching', label: 'Scratching', value: 35, color: 'var(--secondary)' },
            { id: 'recumbent', label: 'Recumbent', value: 70, color: 'var(--muted)' },
            { id: 'non_recumbent', label: 'Non-Recumbent', value: 95, color: '#3B82F6' },
          ]}
        />
        <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card">
            <div className="text-sm text-neutralMid">Total Duration</div>
            <div className="text-xl font-semibold">1,024 mins</div>
          </div>
          <div className="card">
            <div className="text-sm text-neutralMid">Average per Type</div>
            <div className="text-xl font-semibold">205 mins</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
