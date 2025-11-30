import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/queries';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { StatWidget } from '@/components/widgets';
import BehaviorCountBarChart from '@/components/charts/BehaviorCountBarChart';
import DurationPieChart from '@/components/charts/DurationPieChart';
import DailyHeatmap from '@/components/charts/DailyHeatmap';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { PlaceholderImage } from '@/components/ui/Placeholders';

/**
 * PUBLIC_INTERFACE
 * DashboardPage shows KPIs and visualizations. Now includes Activity Summary analytics cards and a profile header with placeholder image.
 */
export default function DashboardPage() {
  const { data: selectedAnimal } = useQuery({ queryKey: ['selectedAnimal'], queryFn: api.getSelectedAnimal });
  const { data: behaviorCounts } = useQuery({ queryKey: ['behaviorCounts'], queryFn: api.getBehaviorCounts });
  const { data: durationBreakdown } = useQuery({ queryKey: ['durationBreakdown'], queryFn: api.getDurationBreakdown });
  const { data: dailyHeatmap } = useQuery({ queryKey: ['dailyHeatmap'], queryFn: api.getDailyHeatmap });

  const totalBehaviors = useMemo(
    () => (behaviorCounts ?? []).reduce((a: number, b: any) => a + (b.count || 0), 0),
    [behaviorCounts]
  );
  const mostFrequent = useMemo(
    () => (behaviorCounts ?? []).slice().sort((a: any, b: any) => b.count - a.count)[0]?.type ?? '—',
    [behaviorCounts]
  );

  const sparkData = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({ x: i, y: Math.round(Math.random() * 10) + 5 })), []);

  return (
    <div className="space-y-4">
      <section className="card p-4 flex items-center gap-4">
        <PlaceholderImage label="Profile" className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <div className="font-heading font-semibold">{selectedAnimal?.name ?? '—'} <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-green-50 text-success border border-green-200">Online</span></div>
          <div className="text-xs text-neutral-600">Tag {selectedAnimal?.tag ?? '—'} • Last seen {selectedAnimal?.lastSeen ?? '—'}</div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        <div className="card p-4">
          <div className="text-xs text-neutral-600">Total behaviors today</div>
          <div className="flex items-end justify-between">
            <div className="font-mono text-2xl">{totalBehaviors}</div>
            <div className="w-24 h-10">
              <ResponsiveContainer>
                <LineChart data={sparkData}>
                  <Line type="monotone" dataKey="y" stroke="#2C5F9A" strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-neutral-600">Most frequent behavior</div>
          <div className="font-mono text-2xl">{mostFrequent}</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-neutral-600">Total active duration</div>
          <div className="font-mono text-2xl">
            {(durationBreakdown ?? []).reduce((a: number, b: any) => a + (b.value || 0), 0)} mins
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-neutral-600">Rest-to-active ratio</div>
          <div className="font-mono text-2xl">
            {(() => {
              const rest = (durationBreakdown ?? []).find((d: any) => d.label === 'Resting')?.value ?? 0;
              const active = Math.max(1, (durationBreakdown ?? []).reduce((a: number, b: any) => a + (b.value || 0), 0) - rest);
              return `${(rest / active).toFixed(2)}`
            })()}
          </div>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Behavior Counts" subtitle="Distribution by type (last 24h)" />
          <CardBody>
            <BehaviorCountBarChart data={(behaviorCounts as any[]) ?? []} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Duration Breakdown" subtitle="Total minutes by behavior (toggle pie/horizontal)" />
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
