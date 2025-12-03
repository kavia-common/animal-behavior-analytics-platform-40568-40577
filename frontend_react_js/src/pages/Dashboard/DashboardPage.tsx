import React, { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/queries';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import BehaviorCountBarChart from '@/components/charts/BehaviorCountBarChart';
import DurationPieChart from '@/components/charts/DurationPieChart';
import DurationStackedBar from '@/components/charts/DurationStackedBar';
import DailyHeatmap from '@/components/charts/DailyHeatmap';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { PlaceholderImage, Skeleton, EmptyState } from '@/components/ui/Placeholders';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useSocket } from '@/hooks/useSocket';

/**
 * PUBLIC_INTERFACE
 * DashboardPage shows KPIs and visualizations and reacts to WebSocket events for live updates.
 */
export default function DashboardPage() {
  const [chartMode, setChartMode] = useState<'pie'|'stacked'>('pie');
  const navigate = useNavigate();

  // Use global date range from Redux so all charts react to changes (Architecture: shared across tabs)
  const range = useSelector((s: RootState) => s.ui.globalDateRange);

  const animalQ = useQuery({ queryKey: ['selectedAnimal', range], queryFn: api.getSelectedAnimal });
  const countsQ = useQuery({ queryKey: ['behaviorCounts', range], queryFn: api.getBehaviorCounts });
  const durationQ = useQuery({ queryKey: ['durationBreakdown', range], queryFn: api.getDurationBreakdown });
  const heatmapQ = useQuery({ queryKey: ['dailyHeatmap', range], queryFn: api.getDailyHeatmap });

  const qc = useQueryClient();
  useSocket(() => {
    // additional flush if needed; per-hook invalidations already happen in useSocket
    qc.invalidateQueries({ queryKey: ['behaviorCounts'] });
  });

  const behaviorCounts = countsQ.data ?? [];
  const durationBreakdown = durationQ.data ?? [];
  const dailyHeatmap = heatmapQ.data ?? Array(24).fill(0);

  const totalBehaviors = useMemo(
    () => behaviorCounts.reduce((a: number, b: any) => a + (b.count || 0), 0),
    [behaviorCounts]
  );
  const mostFrequent = useMemo(
    () => behaviorCounts.slice().sort((a: any, b: any) => b.count - a.count)[0]?.type ?? '—',
    [behaviorCounts]
  );

  const sparkData = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({ x: i, y: Math.round(Math.random() * 10) + 5 })), []);

  const durationStackData = useMemo(() => {
    // Convert breakdown into single row for stacked bar
    const row: any = { name: 'Total' };
    durationBreakdown.forEach((d: any) => { row[d.label] = d.value; });
    return [row];
  }, [durationBreakdown]);

  const durationKeys = useMemo(() => durationBreakdown.map((d: any) => d.label), [durationBreakdown]);

  const totalMinutes = durationBreakdown.reduce((a: number, b: any) => a + (b.value || 0), 0);
  const avgPerType = durationBreakdown.length ? (totalMinutes / durationBreakdown.length) : 0;
  const pctOfDay = ((totalMinutes / (24 * 60)) * 100);

  const anyLoading = animalQ.isLoading || countsQ.isLoading || durationQ.isLoading || heatmapQ.isLoading;
  const anyError = animalQ.isError || countsQ.isError || durationQ.isError || heatmapQ.isError;

  const onBarClick = (type: string) => {
    // Behavior Specs: Clicking a bar drills to Timeline filtered by that behavior
    navigate(`/timeline?behavior=${encodeURIComponent(type)}`);
  };

  return (
    <div className="space-y-4">
      {/* Anteater Profile Card; global date selector is in TopNav (RootLayout) */}
      <section className="card p-4 flex items-center gap-4">
        <PlaceholderImage label="Anteater" className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <div className="font-heading font-semibold flex items-center gap-2">
            {animalQ.isLoading ? <Skeleton className="h-5 w-36" /> : (animalQ.data?.name ?? '—')}
            <span className="text-xs rounded-full px-2 py-0.5 bg-green-50 text-success border border-green-200">
              {animalQ.data?.status ?? 'Healthy'}
            </span>
          </div>
          <div className="text-xs text-neutral-600 flex flex-wrap gap-2">
            {animalQ.isLoading ? (
              <Skeleton className="h-3 w-64" />
            ) : (
              <>
                <span>Tag {(animalQ.data as any)?.tag ?? '—'}</span>
                <span>•</span>
                <span>Age {(animalQ.data as any)?.age ?? '—'}</span>
                <span>•</span>
                <span>Sex {(animalQ.data as any)?.sex ?? '—'}</span>
                <span>•</span>
                <span>Enclosure {(animalQ.data as any)?.enclosure ?? '—'}</span>
                <span>•</span>
                <span>Last updated {(animalQ.data as any)?.updatedAt ?? (animalQ.data as any)?.lastSeen ?? '—'}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          {/* Global date selector is placed in TopNav; this area shows only profile details */}
        </div>
      </section>

      {anyError && (
        <div className="card p-4">
          <div className="text-red-700 text-sm">Failed to load some dashboard data. Showing what is available.</div>
        </div>
      )}

      {anyLoading && behaviorCounts.length === 0 && durationBreakdown.length === 0 ? (
        <div className="grid gap-3 md:grid-cols-4">
          {[...Array(4)].map((_, i) => <div key={i} className="card p-4"><Skeleton className="h-4 w-24" /><Skeleton className="h-8 w-20 mt-2" /></div>)}
        </div>
      ) : null}

      <section className="grid gap-3 md:grid-cols-4">
        <div className="card p-4">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total behaviors in range</div>
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
          <div className="text-xs text-neutral-600">Total duration</div>
          <div className="font-mono text-2xl">
            {totalMinutes} mins
          </div>
          <div className="text-xs text-neutral-600 mt-1">Avg per type: {avgPerType.toFixed(1)} min</div>
          <div className="text-xs text-neutral-600">~{pctOfDay.toFixed(1)}% of day</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-neutral-600">Rest-to-active ratio</div>
          <div className="font-mono text-2xl">
            {(() => {
              const rest = durationBreakdown.find((d: any) => d.label === 'Resting or Sleeping')?.value ?? 0;
              const active = Math.max(1, totalMinutes - rest);
              return `${(rest / active).toFixed(2)}`
            })()}
          </div>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Behavior Counts" subtitle="Distribution by type (selected range)" />
          <CardBody>
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                {behaviorCounts.length === 0 ? (
                  <EmptyState title="No behavior data" description="Try expanding the date range." />
                ) : (
                  <BehaviorCountBarChart data={behaviorCounts as any[]} onBarClick={onBarClick} />
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Duration Breakdown"
            subtitle="Total minutes by behavior"
            actions={
              <div className="flex gap-2">
                <Button size="sm" variant={chartMode === 'pie' ? 'primary' : 'ghost'} onClick={() => setChartMode('pie')}>Pie</Button>
                <Button size="sm" variant={chartMode === 'stacked' ? 'primary' : 'ghost'} onClick={() => setChartMode('stacked')}>Stacked</Button>
              </div>
            }
          />
          <CardBody>
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                {durationBreakdown.length === 0 ? (
                  <EmptyState title="No duration data" description="Adjust filters or time range." />
                ) : chartMode === 'pie' ? (
                  <DurationPieChart data={durationBreakdown as any[]} />
                ) : (
                  <DurationStackedBar data={durationStackData} keys={durationKeys} />
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader title="Daily Activity Heatmap" subtitle="Events by hour (0–23)" />
          <CardBody>
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                {dailyHeatmap.length === 0 ? (
                  <EmptyState title="No heatmap data" description="Adjust time range." />
                ) : (
                  <DailyHeatmap data={dailyHeatmap as number[]} />
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
