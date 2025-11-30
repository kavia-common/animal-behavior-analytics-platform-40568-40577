import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/queries';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { StatWidget } from '@/components/widgets';
import BehaviorCountBarChart from '@/components/charts/BehaviorCountBarChart';
import DurationPieChart from '@/components/charts/DurationPieChart';
import DailyHeatmap from '@/components/charts/DailyHeatmap';

/**
 * PUBLIC_INTERFACE
 * DashboardPage shows high-level KPIs and visualizations for recent behavior activity.
 * This is the original dashboard view prior to the 3-card perspective update.
 */
export default function DashboardPage() {
  const { data: selectedAnimal } = useQuery({ queryKey: ['selectedAnimal'], queryFn: api.getSelectedAnimal });
  const { data: behaviorCounts } = useQuery({ queryKey: ['behaviorCounts'], queryFn: api.getBehaviorCounts });
  const { data: durationBreakdown } = useQuery({ queryKey: ['durationBreakdown'], queryFn: api.getDurationBreakdown });
  const { data: dailyHeatmap } = useQuery({ queryKey: ['dailyHeatmap'], queryFn: api.getDailyHeatmap });

  return (
    <div className="space-y-4">
      <section className="grid gap-3 md:grid-cols-3">
        <StatWidget label="Monitored Animal" value={selectedAnimal?.name ?? '—'} />
        <StatWidget label="Detected Behaviors (24h)" value={(behaviorCounts ?? []).reduce((a, b: any) => a + (b.count || 0), 0)} delta="+3% vs prev" tone="success" />
        <StatWidget label="Active Cameras" value={12} delta="+1 today" />
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Behavior Counts" subtitle="Distribution by type (last 24h)" />
          <CardBody>
            <BehaviorCountBarChart data={(behaviorCounts as any[]) ?? []} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Duration Breakdown" subtitle="Total minutes by behavior" />
          <CardBody>
            <DurationPieChart data={(durationBreakdown as any[]) ?? []} />
          </CardBody>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader title="Daily Activity Heatmap" subtitle="Events by hour (0–23)" />
          <CardBody>
            <DailyHeatmap data={(dailyHeatmap as number[]) ?? Array(24).fill(0)} />
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
