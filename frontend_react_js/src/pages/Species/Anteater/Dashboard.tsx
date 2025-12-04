import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BehaviorCountBarChart from '../../../components/charts/BehaviorCountBarChart';
import DurationStackedBar from '../../../components/charts/DurationStackedBar';
import DurationPieChart from '../../../components/charts/DurationPieChart';
import BehaviorHeatmap from '../../../components/charts/BehaviorHeatmap';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { formatSeconds } from '../../../lib/format';

type DatePreset = 'today' | 'last7' | 'last30' | 'custom';

const CAMERA_OPTIONS = [
  { label: 'All Cameras', value: 'all' },
  { label: 'Cam A', value: 'cam-a' },
  { label: 'Cam B', value: 'cam-b' },
  { label: 'Cam C', value: 'cam-c' },
];

const DATE_PRESETS: { label: string; value: DatePreset }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7', value: 'last7' },
  { label: 'Last 30', value: 'last30' },
  { label: 'Custom', value: 'custom' },
];

// PUBLIC_INTERFACE
export default function AnteaterDashboard() {
  // Behaviors from store (fallback to defaults if store not populated)
  const behaviors = useSelector((s: RootState) => (s as any)?.behavior?.items) || [
    { id: 'pacing', label: 'Pacing', color: 'var(--primary)' },
    { id: 'moving', label: 'Moving', color: 'var(--primary-600)' },
    { id: 'scratching', label: 'Scratching', color: 'var(--secondary)' },
    { id: 'recumbent', label: 'Recumbent', color: 'var(--muted)' },
    { id: 'non_recumbent', label: 'Non-Recumbent', color: '#3B82F6' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filters
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>(
    searchParams.getAll('behavior') || []
  );
  const [camera, setCamera] = useState<string>(searchParams.get('camera') || 'all');
  const [datePreset, setDatePreset] = useState<DatePreset>(
    (searchParams.get('date') as DatePreset) || 'last7'
  );
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | undefined>(undefined);

  // URL sync helper
  const syncUrl = (next: {
    behaviors?: string[];
    camera?: string;
    date?: DatePreset;
    start?: string;
    end?: string;
  }) => {
    const sp = new URLSearchParams(searchParams);
    if (next.behaviors) {
      sp.delete('behavior');
      next.behaviors.forEach((b) => sp.append('behavior', b));
    }
    if (next.camera) sp.set('camera', next.camera);
    if (next.date) sp.set('date', next.date);
    if (next.start) sp.set('start', next.start);
    if (next.end) sp.set('end', next.end);
    setSearchParams(sp);
  };

  // Use active behaviors (selected or all)
  const activeBehaviorIds = selectedBehaviors.length
    ? selectedBehaviors
    : behaviors.map((b: any) => b.id);

  // Mock analytics based on filters (deterministic, preview)
  const counts = useMemo(() => {
    const base = 25;
    const obj: Record<string, number> = {};
    activeBehaviorIds.forEach((id: string, idx: number) => {
      const camBias = camera === 'all' ? 0 : camera.charCodeAt(0) % 7;
      const dateBias = datePreset === 'today' ? 1 : datePreset === 'last7' ? 4 : datePreset === 'last30' ? 7 : 5;
      obj[id] = base + (idx % 5) * 7 + camBias + dateBias;
    });
    return obj;
  }, [activeBehaviorIds, camera, datePreset]);

  const durations = useMemo(() => {
    const base = 300;
    const obj: Record<string, number> = {};
    activeBehaviorIds.forEach((id: string, idx: number) => {
      obj[id] = base + (idx % 6) * 120 + (camera === 'all' ? 0 : 30);
    });
    return obj;
  }, [activeBehaviorIds, camera]);

  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const totalDuration = Object.values(durations).reduce((a, b) => a + b, 0) || 1;

  const byBehavior = useMemo(() => {
    const map = new Map(behaviors.map((b: any) => [b.id, b]));
    return activeBehaviorIds.map((id: string) => {
      const meta: any = map.get(id) || {};
      return {
        id,
        label: meta.label || id,
        color: meta.color || 'var(--primary)',
        count: counts[id] || 0,
        duration: durations[id] || 0,
        countPct: ((counts[id] || 0) / totalCount) * 100,
        durationPct: ((durations[id] || 0) / totalDuration) * 100,
      };
    });
  }, [activeBehaviorIds, behaviors, counts, durations, totalCount, totalDuration]);

  // Heatmap rows
  const heatmapRows = useMemo(() => {
    return activeBehaviorIds.map((id: string, idx: number) => {
      const hours = Array.from({ length: 24 }, (_: unknown, h: number) => {
        const intensity = Math.max(0, Math.round(60 + 40 * Math.sin((Math.PI * (h + idx)) / 12)));
        const duration = Math.round((durations[id] / 24) * (0.7 + 0.6 * Math.sin(((h + 1) * Math.PI) / 12)));
        return { hour: h, intensity, duration };
      });
      return { behaviorId: id, cells: hours };
    });
  }, [activeBehaviorIds, durations]);

  const behaviorOptions = behaviors.map((b: any) => ({ label: b.label, value: b.id }));

  const onNavigateTimeline = (behaviorId: string, extras?: Record<string, string>) => {
    const sp = new URLSearchParams();
    sp.append('behavior', behaviorId);
    if (camera && camera !== 'all') sp.set('camera', camera);
    if (datePreset) sp.set('date', datePreset);
    if (customRange && datePreset === 'custom') {
      sp.set('start', customRange.start.toISOString());
      sp.set('end', customRange.end.toISOString());
    }
    if (extras) Object.entries(extras).forEach(([k, v]) => sp.set(k, v));
    navigate(`/species/anteater/timeline?${sp.toString()}`);
  };

  return (
    <div className="bg-app" style={{ minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h2 className="text-body" style={{ margin: 0 }}>Giant Anteater Dashboard</h2>
            <div className="text-muted" style={{ fontSize: 12 }}>Interactive behavior analytics overview</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <div className="text-muted" style={{ fontSize: 12, marginBottom: 6 }}>Behaviors</div>
            <div className="flex flex-wrap gap-2">
              {behaviorOptions.map((opt: { label: string; value: string }) => {
                const active = activeBehaviorIds.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      let next: string[] = [];
                      if (activeBehaviorIds.includes(opt.value)) {
                        next = activeBehaviorIds.filter((x: string) => x !== opt.value);
                      } else {
                        next = [...activeBehaviorIds, opt.value];
                      }
                      setSelectedBehaviors(next);
                      syncUrl({ behaviors: next });
                    }}
                    className="border-default"
                    style={{
                      padding: '6px 10px',
                      borderRadius: 8,
                      background: active ? 'var(--card-hover)' : 'var(--surface)',
                      color: 'var(--text)',
                      fontSize: 13,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-muted" style={{ fontSize: 12, marginBottom: 6 }}>Date Range</div>
            <div className="flex flex-wrap gap-2">
              {DATE_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => {
                    setDatePreset(p.value);
                    syncUrl({ date: p.value });
                  }}
                  className="border-default"
                  style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: datePreset === p.value ? 'var(--card-hover)' : 'var(--surface)',
                    color: 'var(--text)',
                    fontSize: 13,
                  }}
                >
                  {p.label}
                </button>
              ))}
              {datePreset === 'custom' && (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="border-default"
                    onChange={(e) => {
                      const d = e.target.value ? new Date(e.target.value) : undefined;
                      setCustomRange((prev) => ({ start: d || prev?.start || new Date(), end: prev?.end || new Date() }));
                    }}
                    style={{ padding: 6, borderRadius: 6 }}
                  />
                  <input
                    type="date"
                    className="border-default"
                    onChange={(e) => {
                      const d = e.target.value ? new Date(e.target.value) : undefined;
                      setCustomRange((prev) => ({ start: prev?.start || new Date(), end: d || prev?.end || new Date() }));
                    }}
                    style={{ padding: 6, borderRadius: 6 }}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-muted" style={{ fontSize: 12, marginBottom: 6 }}>Camera/Location</div>
            <div className="flex flex-wrap gap-2">
              {CAMERA_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setCamera(c.value);
                    syncUrl({ camera: c.value });
                  }}
                  className="border-default"
                  style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: camera === c.value ? 'var(--card-hover)' : 'var(--surface)',
                    color: 'var(--text)',
                    fontSize: 13,
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="card" style={{ padding: 16 }}>
          <h3 className="text-body" style={{ marginTop: 0 }}>Behavior Count</h3>
          <BehaviorCountBarChart
            data={byBehavior.map((b: any) => ({
              id: b.id,
              label: b.label,
              count: b.count,
              percentage: b.countPct,
              color: b.color,
            }))}
            barWidth={40}
            barGap={20}
            showValueLabels
            hoverLighten={0.1}
            tooltipFormatter={(d) => `${d.label}\nCount: ${d.count}\nShare: ${d.percentage?.toFixed(1)}%`}
            onBarClick={(id) => onNavigateTimeline(id)}
          />
        </div>

        <div className="card" style={{ padding: 16 }}>
          <h3 className="text-body" style={{ marginTop: 0 }}>Behavior Duration (Stacked)</h3>
          <DurationStackedBar
            data={byBehavior.map((b: any) => ({
              id: b.id,
              label: b.label,
              value: b.duration,
              percentage: b.durationPct,
              color: b.color,
            }))}
            barWidth={60}
            tooltipFormatter={(d) => `${d.label}\nDuration: ${formatSeconds(d.value)}\nShare: ${d.percentage?.toFixed(1)}%`}
            onSegmentClick={(id) => onNavigateTimeline(id)}
          />
        </div>

        <div className="card" style={{ padding: 16 }}>
          <h3 className="text-body" style={{ marginTop: 0 }}>Behavior Duration (Pie)</h3>
          <DurationPieChart
            data={byBehavior.map((b: any) => ({
              id: b.id,
              label: b.label,
              value: b.duration,
              percentage: b.durationPct,
              color: b.color,
            }))}
            showSliceLabels
            tooltipFormatter={(d) => `${d.label}\nDuration: ${formatSeconds(d.value)}\nShare: ${d.percentage?.toFixed(1)}%`}
            onSliceClick={(id) => onNavigateTimeline(id)}
          />
        </div>
      </div>

      {/* Heatmap */}
      <div className="card" style={{ padding: 16, marginTop: 16 }}>
        <h3 className="text-body" style={{ marginTop: 0 }}>Daily 24-hour Heatmap</h3>
        <BehaviorHeatmap
          behaviors={byBehavior.map((b: any) => ({ id: b.id, label: b.label, color: b.color }))}
          rows={heatmapRows as any}
          hourLabels={Array.from({ length: 24 }, (_: unknown, h: number) => String(h).padStart(2, '0'))}
          colorScale={{ min: 'hsl(215, 20%, 92%)', max: 'var(--primary)' }}
          borderColor="var(--border)"
          hoverShadow="var(--shadow)"
          tooltipFormatter={(cell) =>
            `${cell.behaviorLabel} @ ${String(cell.hour).padStart(2, '0')}:00\nIntensity: ${cell.intensity}\nDuration: ${formatSeconds(cell.duration)}`
          }
          onCellClick={(behaviorId, hour) => onNavigateTimeline(behaviorId, { hour: String(hour).padStart(2, '0') })}
        />
      </div>
    </div>
  );
}
