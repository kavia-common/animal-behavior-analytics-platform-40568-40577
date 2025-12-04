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
        <BehaviorCountBarChart />
      </div>

      {/* Duration Breakdown - Pie Chart with summaries */}
      <div className="chart-container">
        <h3 className="font-semibold mb-2">Duration breakdown</h3>
        <DurationPieChart />
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
