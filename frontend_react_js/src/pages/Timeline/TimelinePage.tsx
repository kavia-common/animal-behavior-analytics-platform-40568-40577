import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBehaviorColor, BEHAVIOR_LABELS } from '@/lib/behaviorPalette';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import MultiSelect from '@/components/ui/MultiSelect';
import DateRangePicker from '@/components/ui/DateRangePicker';
import Toggle from '@/components/ui/Toggle';
import Tooltip from '@/components/ui/Tooltip';

type TimelineEvent = {
  id: string;
  behaviorId: string;
  label: string;
  start: string; // ISO
  end: string;   // ISO
  durationSec: number;
  confidence: number;
  cameraId: string;
  location?: string;
  videoUrl?: string;
  thumbUrl?: string;
};

type QueryFilters = {
  behaviors?: string[];
  hour?: number | null;
  start?: string | null;
  end?: string | null;
  camera?: string | null;
  location?: string | null;
  tod?: string | null; // time of day bucket (morning/afternoon/evening/night)
};

// Sample/mock dataset (kept consistent with dashboard counts)
const MOCK_EVENTS: TimelineEvent[] = (() => {
  const now = new Date();
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
  const mk = (idx: number, behaviorId: keyof typeof BEHAVIOR_LABELS, minsFromBase: number, durationSec: number, confidence: number, cameraId: string): TimelineEvent => {
    const s = new Date(base.getTime() + minsFromBase * 60000);
    const e = new Date(s.getTime() + durationSec * 1000);
    return {
      id: `ev_${idx}`,
      behaviorId,
      label: BEHAVIOR_LABELS[behaviorId],
      start: s.toISOString(),
      end: e.toISOString(),
      durationSec,
      confidence,
      cameraId,
      location: cameraId === 'C1' ? 'Habitat North' : 'Habitat South',
      videoUrl: '/assets/sample1.mp4',
      thumbUrl: undefined,
    };
  };
  const items: TimelineEvent[] = [];
  let idx = 0;
  // counts aligned roughly with dashboard demo: pacing 12, moving 25, scratching 8, recumbent 15, non_recumbent 20
  const pushMany = (n: number, bh: keyof typeof BEHAVIOR_LABELS, startMin: number, gapMin: number) => {
    for (let i = 0; i < n; i++) {
      items.push(mk(idx++, bh, startMin + i * gapMin, 30 + ((i * 13) % 120), Math.min(1, 0.6 + (i % 5) * 0.08), i % 2 === 0 ? 'C1' : 'C2'));
    }
  };
  pushMany(12, 'pacing', 0, 10);
  pushMany(25, 'moving', 5, 8);
  pushMany(8, 'scratching', 15, 20);
  pushMany(15, 'recumbent', 2, 18);
  pushMany(20, 'non_recumbent', 3, 12);
  // Sort latest first
  items.sort((a, b) => (new Date(b.start).getTime() - new Date(a.start).getTime()));
  return items;
})();

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function parseQuery(q: URLSearchParams): QueryFilters {
  const behaviors = q.getAll('behavior');
  const hourRaw = q.get('hour');
  const hour = hourRaw != null ? Number(hourRaw) : null;
  const start = q.get('start');
  const end = q.get('end');
  const camera = q.get('camera');
  const location = q.get('location');
  const tod = q.get('tod');
  return {
    behaviors: behaviors.length ? behaviors : undefined,
    hour: Number.isFinite(hour) ? (hour as number) : null,
    start,
    end,
    camera,
    location,
    tod,
  };
}

function applyFilters(events: TimelineEvent[], f: QueryFilters): TimelineEvent[] {
  let res = events;
  if (f.behaviors && f.behaviors.length) {
    res = res.filter(e => f.behaviors!.includes(e.behaviorId));
  }
  if (f.hour != null) {
    res = res.filter(e => new Date(e.start).getHours() === f.hour);
  }
  if (f.start) {
    const s = new Date(f.start).getTime();
    res = res.filter(e => new Date(e.start).getTime() >= s);
  }
  if (f.end) {
    const en = new Date(f.end).getTime();
    res = res.filter(e => new Date(e.end).getTime() <= en);
  }
  if (f.camera) {
    res = res.filter(e => e.cameraId === f.camera);
  }
  if (f.location) {
    res = res.filter(e => e.location === f.location);
  }
  if (f.tod) {
    const ranges: Record<string, [number, number]> = {
      morning: [6, 11],
      afternoon: [12, 17],
      evening: [18, 21],
      night: [22, 5],
    };
    const r = ranges[f.tod];
    if (r) {
      res = res.filter(e => {
        const h = new Date(e.start).getHours();
        if (f.tod === 'night') return h >= 22 || h <= 5;
        return h >= r[0] && h <= r[1];
      });
    }
  }
  return res;
}

function durationFmt(s: number) {
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r ? `${m}m ${r}s` : `${m}m`;
}

function timeFmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function dateKey(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString();
}

function useStickyScrollAnchor(deps: any[]) {
  // Keep scroll position on modal open/close
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const saved = useRef<number>(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    saved.current = el.scrollTop;
  }, deps);
  const restore = () => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: saved.current });
  };
  return { scrollRef, restore };
}

const behaviorOptions = Object.entries(BEHAVIOR_LABELS).map(([id, label]) => ({ value: id, label }));

// PUBLIC_INTERFACE
export default function TimelinePage() {
  const navigate = useNavigate();
  const q = useQuery();
  const initial = useMemo(() => parseQuery(q), [q]);

  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>(initial.behaviors || []);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: initial.start ? new Date(initial.start) : null,
    end: initial.end ? new Date(initial.end) : null,
  });
  const [camera, setCamera] = useState<string | null>(initial.camera || null);
  const [locationSel, setLocationSel] = useState<string | null>(initial.location || null);
  const [tod, setTod] = useState<string | null>(initial.tod || null);
  const [hourLocked] = useState<number | null>(initial.hour ?? null);
  const [showVideo, setShowVideo] = useState(false);
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);

  const { scrollRef, restore } = useStickyScrollAnchor([showVideo]);

  const eventsFiltered = useMemo(() => {
    const applied: QueryFilters = {
      behaviors: selectedBehaviors.length ? selectedBehaviors : undefined,
      hour: hourLocked,
      start: dateRange.start ? dateRange.start.toISOString() : null,
      end: dateRange.end ? dateRange.end.toISOString() : null,
      camera,
      location: locationSel,
      tod,
    };
    return applyFilters(MOCK_EVENTS, applied);
  }, [selectedBehaviors, hourLocked, dateRange, camera, locationSel, tod]);

  const groupedByDate = useMemo(() => {
    const m = new Map<string, TimelineEvent[]>();
    for (const e of eventsFiltered) {
      const k = dateKey(e.start);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(e);
    }
    return Array.from(m.entries())
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([k, arr]) => [k, arr.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())] as const);
  }, [eventsFiltered]);

  const applyToQuery = () => {
    const params = new URLSearchParams();
    selectedBehaviors.forEach(b => params.append('behavior', b));
    if (hourLocked != null) params.set('hour', String(hourLocked));
    if (dateRange.start) params.set('start', dateRange.start.toISOString());
    if (dateRange.end) params.set('end', dateRange.end.toISOString());
    if (camera) params.set('camera', camera);
    if (locationSel) params.set('location', locationSel);
    if (tod) params.set('tod', tod);
    navigate({ pathname: '/timeline', search: `?${params.toString()}` }, { replace: false });
  };

  const clearFilters = () => {
    setSelectedBehaviors([]);
    setDateRange({ start: null, end: null });
    setCamera(null);
    setLocationSel(null);
    setTod(null);
    navigate({ pathname: '/timeline' }, { replace: true });
  };

  // Navbar active state is handled by TopNav route highlighting (ensure Timeline is active via pathname)
  // Top filter card UI
  return (
    <div className="page-container" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
      <aside className="card" style={{ position: 'sticky', top: 12, height: 'fit-content' }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="text-sm font-semibold">Filters</div>
          <div className="text-xs text-neutralMid">Refine the timeline and keep dashboard counts consistent.</div>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <div className="text-xs text-neutralMid mb-1">Behaviors</div>
            <MultiSelect
              options={behaviorOptions}
              values={selectedBehaviors}
              onChange={(vals: string[]) => setSelectedBehaviors(vals)}
              placeholder="Select behaviors"
            />
          </div>

          <div>
            <div className="text-xs text-neutralMid mb-1">Date range</div>
            <DateRangePicker
              value={{
                start: dateRange.start ? dateRange.start.toISOString().slice(0,10) : '',
                end: dateRange.end ? dateRange.end.toISOString().slice(0,10) : '',
              }}
              onChange={(v: { start: string; end: string }) => {
                const s = v.start ? new Date(v.start) : null;
                const e = v.end ? new Date(v.end) : null;
                setDateRange({ start: s, end: e });
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-neutralMid mb-1">Camera</div>
              <select
                className="w-full border rounded px-2 py-1 text-sm"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                value={camera || ''}
                onChange={(e) => setCamera(e.target.value || null)}
              >
                <option value="">All</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
            <div>
              <div className="text-xs text-neutralMid mb-1">Location</div>
              <select
                className="w-full border rounded px-2 py-1 text-sm"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                value={locationSel || ''}
                onChange={(e) => setLocationSel(e.target.value || null)}
              >
                <option value="">All</option>
                <option value="Habitat North">Habitat North</option>
                <option value="Habitat South">Habitat South</option>
              </select>
            </div>
          </div>

          <div>
            <div className="text-xs text-neutralMid mb-1">Time of day</div>
            <div className="flex flex-wrap gap-2">
              {['morning', 'afternoon', 'evening', 'night'].map((k) => (
                <Toggle
                  key={k}
                  checked={tod === k}
                  onChange={() => setTod((cur) => (cur === k ? null : k))}
                  label={k[0].toUpperCase() + k.slice(1)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="primary" onClick={applyToQuery}>Apply</Button>
            <Button variant="ghost" onClick={clearFilters}>Clear</Button>
          </div>
        </div>
      </aside>

      <main className="card p-0" style={{ display: 'grid', gridTemplateColumns: '64px 1fr', minHeight: '60vh' }}>
        {/* Left time labels */}
        <div className="border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="p-2 text-[11px] text-neutralMid">Time</div>
          <div className="relative">
            {/* Markers every hour from 0..23 for guidance */}
            {Array.from({ length: 24 }, (_, h) => (
              <div key={h} style={{ height: 56, position: 'relative' }}>
                <div className="text-[11px] text-neutralMid absolute top-1 right-2">{String(h).padStart(2, '0')}:00</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right timeline column */}
        <div className="relative" ref={scrollRef} style={{ overflowY: 'auto', maxHeight: '75vh' }}>
          {/* Center vertical line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 24, width: 2, background: 'var(--border)' }} />

          {/* Sections by date */}
          <div className="p-4">
            {groupedByDate.map(([dkey, arr]) => (
              <section key={dkey} className="mb-6">
                <div className="sticky top-0 bg-[var(--surface)] z-10 py-2">
                  <div className="text-xs font-semibold text-neutralMid">{dkey}</div>
                </div>
                <div className="space-y-4">
                  {arr.map((e) => {
                    const color = getBehaviorColor(e.behaviorId);
                    return (
                      <div key={e.id} className="grid grid-cols-[48px_1fr] gap-3 items-start">
                        {/* Dot and connector */}
                        <div className="relative flex items-center justify-center">
                          <div
                            className="rounded-full"
                            style={{
                              width: 12,
                              height: 12,
                              background: color,
                              border: '2px solid var(--surface)',
                              boxShadow: '0 0 0 2px var(--border)',
                              zIndex: 1,
                            }}
                          />
                        </div>

                        {/* Event card */}
                        <div className="border rounded p-3 hover:shadow-sm transition-colors" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium" style={{ color }}>{e.label}</span>
                              <Tooltip content={`Confidence ${(e.confidence * 100).toFixed(0)}%`}>
                                <span className="text-[11px] text-neutralMid">({(e.confidence * 100).toFixed(0)}%)</span>
                              </Tooltip>
                            </div>
                            <div className="text-xs text-neutralMid">{timeFmt(e.start)} — {durationFmt(e.durationSec)}</div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-neutralMid">
                            <div>Camera: <span className="text-text">{e.cameraId}</span></div>
                            <div>Location: <span className="text-text">{e.location || '-'}</span></div>
                            <div>Start: <span className="text-text">{new Date(e.start).toLocaleString()}</span></div>
                            <div>End: <span className="text-text">{new Date(e.end).toLocaleString()}</span></div>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <Button variant="secondary" onClick={() => { setActiveEvent(e); setShowVideo(true); }}>
                              View Video
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {!arr.length && (
                    <div className="text-sm text-neutralMid">No events for this date.</div>
                  )}
                </div>
              </section>
            ))}
            {!groupedByDate.length && (
              <div className="text-sm text-neutralMid p-4">No events match current filters.</div>
            )}
          </div>
        </div>
      </main>

      {/* Floating AI Chat */}
      <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 20 }}>
        <div className="card shadow-md p-3 w-64">
          <div className="text-sm font-semibold mb-2">AI Assistant</div>
          <div className="text-xs text-neutralMid mb-2">Ask questions or run actions.</div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">Explain filters</Button>
            <Button size="sm" variant="primary">Summarize</Button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        open={showVideo}
        onClose={() => { setShowVideo(false); restore(); }}
        title={activeEvent ? `${activeEvent.label} • ${timeFmt(activeEvent.start)}` : 'Video'}
      >
        {activeEvent && (
          <div className="space-y-3">
            <video src={activeEvent.videoUrl} controls style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)' }}>
              Your browser does not support the video tag.
            </video>
            <div className="text-xs grid grid-cols-2 gap-2 text-neutralMid">
              <div>Camera: <span className="text-text">{activeEvent.cameraId}</span></div>
              <div>Confidence: <span className="text-text">{(activeEvent.confidence * 100).toFixed(0)}%</span></div>
              <div>Start: <span className="text-text">{new Date(activeEvent.start).toLocaleString()}</span></div>
              <div>Duration: <span className="text-text">{durationFmt(activeEvent.durationSec)}</span></div>
            </div>
            <div className="text-xs text-neutralMid">
              Bounding boxes: Enabled (sample overlay via model, not rendered in mock).
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
