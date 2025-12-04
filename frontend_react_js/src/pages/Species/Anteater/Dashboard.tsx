import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BehaviorCountBarChart from '../../../components/charts/BehaviorCountBarChart';
import DurationStackedBar from '../../../components/charts/DurationStackedBar';
import DurationPieChart from '../../../components/charts/DurationPieChart';
import BehaviorHeatmap from '../../../components/charts/BehaviorHeatmap';
import { formatSeconds } from '../../../lib/format';
import { BEHAVIOR_ORDER, BEHAVIOR_LABELS, BEHAVIOR_COLORS } from '../../../lib/behaviorPalette';

type DatePreset = 'today' | 'last7' | 'last30' | 'custom';

const EXACT_COUNTS: Record<string, number> = {
  pacing: 12,
  moving: 25,
  scratching: 22,
  recumbent: 15,
  non_recumbent: 20,
};

const EXACT_DURATIONS: Record<string, number> = {
  pacing: 50,
  moving: 120,
  scratching: 80,
  recumbent: 70,
  non_recumbent: 95,
};

function generateHeatmap(selected: string[]) {
  const rows: { behaviorId: string; cells: { hour: number; intensity: number; duration: number }[] }[] = [];
  for (const b of selected) {
    const cells = [];
    for (let h = 0; h < 24; h++) {
      let base = 0;
      if (h % 6 === 0) base = 5;
      else if (h % 3 === 0) base = 3;
      else if (h % 2 === 0) base = 1;
      else base = 0;

      const adj =
        b === 'moving' ? Math.min(5, base + 1) :
        b === 'scratching' ? base :
        b === 'pacing' ? Math.max(0, base - 1) :
        b === 'recumbent' ? (h >= 22 || h <= 5 ? Math.min(5, base + 2) : base) :
        b === 'non_recumbent' ? (h >= 8 && h <= 18 ? Math.min(5, base + 1) : base) :
        base;

      cells.push({ hour: h, intensity: adj, duration: Math.round((EXACT_DURATIONS[b] / 24) * (0.7 + 0.6 * Math.sin(((h + 1) * Math.PI) / 12))) });
    }
    rows.push({ behaviorId: b, cells });
  }
  // scale intensity 0..5 -> 0..100
  rows.forEach(r => r.cells.forEach(c => (c.intensity = Math.round((c.intensity / 5) * 100))));
  return rows;
}

// PUBLIC_INTERFACE
export default function AnteaterDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>(
    BEHAVIOR_ORDER.slice()
  );
  const [datePreset, setDatePreset] = useState<DatePreset>('today');
  const [dateRange, setDateRange] = useState<{ from: string | null; to: string | null }>({ from: null, to: null });
  const [cameras, setCameras] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const appliedFilters = useMemo(
    () => ({
      datePreset,
      dateFrom: dateRange.from,
      dateTo: dateRange.to,
      cameras,
      locations,
    }),
    [datePreset, dateRange, cameras, locations]
  );

  const byBehavior = useMemo(() => {
    const ids = selectedBehaviors.length ? selectedBehaviors : BEHAVIOR_ORDER.slice();
    const totalCount = ids.reduce((a, id) => a + (EXACT_COUNTS[id] || 0), 0) || 1;
    const totalDuration = ids.reduce((a, id) => a + (EXACT_DURATIONS[id] || 0), 0) || 1;
    return ids.map((id) => ({
      id,
      label: (BEHAVIOR_LABELS as any)[id] || id,
      color: (BEHAVIOR_COLORS as any)[id] || 'var(--primary)',
      count: EXACT_COUNTS[id] || 0,
      countPct: ((EXACT_COUNTS[id] || 0) / totalCount) * 100,
      duration: EXACT_DURATIONS[id] || 0,
      durationPct: ((EXACT_DURATIONS[id] || 0) / totalDuration) * 100,
    }));
  }, [selectedBehaviors]);

  const heatmapRows = useMemo(() => generateHeatmap(selectedBehaviors), [selectedBehaviors]);

  const behaviorOptions = BEHAVIOR_ORDER.map((b) => ({ value: b, label: (BEHAVIOR_LABELS as any)[b] }));

  const onNavigateTimeline = (behaviorId: string, extras?: Record<string, string>) => {
    const sp = new URLSearchParams();
    sp.set('behavior', behaviorId);
    if (appliedFilters.datePreset) sp.set('datePreset', appliedFilters.datePreset);
    if (appliedFilters.dateFrom) sp.set('dateFrom', appliedFilters.dateFrom);
    if (appliedFilters.dateTo) sp.set('dateTo', appliedFilters.dateTo);
    if (appliedFilters.cameras?.length) sp.set('cameras', appliedFilters.cameras.join(','));
    if (appliedFilters.locations?.length) sp.set('locations', appliedFilters.locations.join(','));
    if (extras) Object.entries(extras).forEach(([k, v]) => sp.set(k, v));
    navigate(`/species/anteater/timeline?${sp.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="ui-card p-4">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Behavior multi-select */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ color: 'var(--muted)' }}>Behavior</label>
            <div className="flex flex-wrap gap-2">
              {behaviorOptions.map((opt) => {
                const active = selectedBehaviors.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    className="border rounded px-3 py-1 text-sm"
                    style={{
                      background: active ? 'var(--card-hover)' : 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                    onClick={() => {
                      setSelectedBehaviors((prev) =>
                        prev.includes(opt.value) ? prev.filter((x) => x !== opt.value) : [...prev, opt.value]
                      );
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date range presets */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ color: 'var(--muted)' }}>Date Range</label>
            <div className="flex gap-2">
              {['Today', 'Last 7', 'Last 30', 'Custom'].map((p) => {
                const val = p === 'Today' ? 'today' : p === 'Last 7' ? 'last7' : p === 'Last 30' ? 'last30' : 'custom';
                const active = datePreset === (val as DatePreset);
                return (
                  <button
                    key={p}
                    className="border rounded px-3 py-1 text-sm"
                    style={{
                      background: active ? 'var(--card-hover)' : 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                    onClick={() => setDatePreset(val as DatePreset)}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Camera */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ color: 'var(--muted)' }}>Camera</label>
            <div className="flex gap-2">
              {['cam-1', 'cam-2', 'cam-3'].map((c) => {
                const active = cameras.includes(c);
                return (
                  <button
                    key={c}
                    className="border rounded px-3 py-1 text-sm"
                    style={{
                      background: active ? 'var(--card-hover)' : 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                    onClick={() =>
                      setCameras((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ color: 'var(--muted)' }}>Location</label>
            <div className="flex gap-2">
              {['loc-a', 'loc-b'].map((l) => {
                const active = locations.includes(l);
                return (
                  <button
                    key={l}
                    className="border rounded px-3 py-1 text-sm"
                    style={{
                      background: active ? 'var(--card-hover)' : 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                    onClick={() =>
                      setLocations((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]))
                    }
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="px-3 py-2 rounded border text-sm"
            style={{ background: 'var(--primary)', color: 'white', borderColor: 'var(--primary-600)' }}
            onClick={() => {
              // recompute is state-driven; keep for explicit user action
              // could trigger backend refetch here in future
            }}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="ui-card p-4">
          <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text)' }}>Behavior Count</h3>
          <BehaviorCountBarChart
            data={byBehavior.map((b) => ({
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

        <div className="ui-card p-4">
          <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text)' }}>Behavior Duration (Stacked)</h3>
          <DurationStackedBar
            data={byBehavior.map((b) => ({
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

        <div className="ui-card p-4">
          <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text)' }}>Behavior Duration (Pie)</h3>
          <DurationPieChart
            data={byBehavior.map((b) => ({
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

      <div className="ui-card p-4">
        <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text)' }}>Daily 24-hour Heatmap</h3>
        <BehaviorHeatmap
          behaviors={byBehavior.map((b) => ({ id: b.id, label: b.label, color: b.color }))}
          rows={heatmapRows as any}
          hourLabels={Array.from({ length: 24 }, (_: unknown, h: number) => String(h).padStart(2, '0'))}
          colorScale={{ min: 'var(--table-row-hover)', max: 'var(--primary)' }}
          borderColor="var(--border)"
          hoverShadow="var(--shadow)"
          tooltipFormatter={(cell) =>
            `${cell.behaviorLabel} @ ${String(cell.hour).padStart(2, '0')}:00\nEvents: ${Math.round((cell.intensity / 100) * 5)}\nDuration: ${formatSeconds(cell.duration)}`
          }
          onCellClick={(behaviorId, hour) => onNavigateTimeline(behaviorId, { hour: String(hour) })}
        />
      </div>
    </div>
  );
}
