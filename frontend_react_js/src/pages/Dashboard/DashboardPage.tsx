import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import DateRangePicker from '@/components/ui/DateRangePicker';
import BehaviorCountBarChart from '@/components/charts/BehaviorCountBarChart';
import DurationStackedBar from '@/components/charts/DurationStackedBar';
import DurationPieChart from '@/components/charts/DurationPieChart';
import DailyHeatmap from '@/components/charts/DailyHeatmap';
import StatWidget from '@/components/widgets/StatWidget';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/queries';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [range, setRange] = useState({ start: new Date().toISOString().slice(0, 10), end: new Date().toISOString().slice(0, 10) });
  const { data: animal } = useQuery({ queryKey: ['animal'], queryFn: api.getSelectedAnimal });
  const { data: behaviorCounts } = useQuery({ queryKey: ['behaviorCounts'], queryFn: api.getBehaviorCounts });
  const { data: durationBreakdown } = useQuery({ queryKey: ['durationBreakdown'], queryFn: api.getDurationBreakdown });
  const { data: heatmap } = useQuery({ queryKey: ['heatmap'], queryFn: api.getDailyHeatmap });

  const stackedData = useMemo(() => [
    { name: 'Durations', ...(durationBreakdown?.reduce((acc: any, cur: any) => (acc[cur.label] = cur.value, acc), {}) ?? {}) }
  ], [durationBreakdown]);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-3">
        <Card className="md:col-span-2">
          <CardHeader title="Profile" subtitle="Giant Anteater" />
          <CardBody>
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=400&auto=format&fit=crop" alt="Anteater" className="w-24 h-24 object-cover rounded" />
              <div className="space-y-1">
                <div className="font-heading font-semibold text-lg">{animal?.name}</div>
                <div className="text-sm text-neutral-600">Status: Healthy • Age: 6 yrs • Tag: {animal?.tag}</div>
                <div className="text-sm">Last seen: {animal?.lastSeen}</div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Date Range" />
          <CardBody>
            <DateRangePicker value={range} onChange={setRange} />
          </CardBody>
        </Card>
        <StatWidget label="Total Behaviors" value={behaviorCounts?.reduce((s: number, b: any) => s + b.count, 0) ?? 0} delta="+8% this week" tone="success" />
      </div>

      <Card>
        <CardHeader title="Behavior Counts" subtitle="Click bars to drill down to timeline" />
        <CardBody>
          <BehaviorCountBarChart data={behaviorCounts ?? []} onBarClick={() => navigate('/timeline')} />
        </CardBody>
      </Card>

      <div className="grid md:grid-cols-2 gap-3">
        <Card>
          <CardHeader title="Duration Analysis (Stacked)" />
          <CardBody>
            <DurationStackedBar data={stackedData} keys={(durationBreakdown ?? []).map((d: any) => d.label)} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Duration Breakdown (Pie)" />
          <CardBody>
            <DurationPieChart data={durationBreakdown ?? []} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Daily Heatmap" subtitle="24-hour activity pattern" />
        <CardBody>
          <DailyHeatmap data={heatmap ?? Array(24).fill(0)} />
        </CardBody>
      </Card>
    </div>
  );
}
