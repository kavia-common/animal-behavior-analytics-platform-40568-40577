import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import MultiSelect from '@/components/ui/MultiSelect';
import Slider from '@/components/ui/Slider';
import DateRangePicker from '@/components/ui/DateRangePicker';
import TimelineControls from '@/components/timeline/TimelineControls';
import BehaviorTimeline from '@/components/timeline/BehaviorTimeline';
import BehaviorGrid from '@/components/behavior/BehaviorGrid';
import VideoModal from '@/components/video/VideoModal';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/queries';
import { EmptyState } from '@/components/ui/Placeholders';
import { BehaviorEventsTable } from '@/components/ui/Tables';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { setLastActiveTab } from '@/store/slices/uiSlice';
import { getAllBehaviorOptions } from '@/lib/behaviorPalette';
import { EXACT_BEHAVIORS } from '@/lib/behaviors';

export default function TimelinePage() {
  const { data: behaviors } = useQuery({ queryKey: ['behaviors'], queryFn: api.getBehaviors });
  const behaviorOptions = getAllBehaviorOptions();
  const [selected, setSelected] = useState<string[]>(EXACT_BEHAVIORS);
  const [duration, setDuration] = useState(120);
  const uiRange = useSelector((s: RootState) => s.ui.globalDateRange);
  const [range, setRange] = useState({ start: uiRange.start, end: uiRange.end });
  const [zoom, setZoom] = useState<'1h' | '6h' | '12h' | '24h' | 'day' | 'week'>('day');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setLastActiveTab('timeline'));
  }, [dispatch]);

  // Read query param and clamp to allowed behaviors
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bh = params.get('behavior');
    if (bh && (EXACT_BEHAVIORS as string[]).includes(bh)) {
      setSelected([bh]);
      setPage(1);
    }
  }, [location.search]);

  const filtered = useMemo(
    () =>
      (behaviors ?? []).filter(
        (b: any) =>
          (selected.length ? selected.includes(b.type) : true) &&
          (EXACT_BEHAVIORS as string[]).includes(b.type) &&
          b.durationMin <= duration
      ),
    [behaviors, selected, duration]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Map TimelineControls zoom to BehaviorTimeline zoomScale
  const zoomToScale = (z: typeof zoom): 'hour' | 'day' | 'week' => {
    if (z === '1h') return 'hour';
    if (z === 'week') return 'week';
    return 'day';
  };

  return (
    <div className="stack-lg">
      <div className="page-header">
        <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Timeline</h1>
      </div>
      <Card>
        <CardHeader title="Filters" />
        <CardBody>
          <div className="grid md:grid-cols-4 gap-3">
            <div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Behavior Types</div>
              <MultiSelect
                options={behaviorOptions}
                values={selected}
                onChange={(v) => {
                  setSelected(v);
                  setPage(1);
                }}
              />
            </div>
            <div>
              <Slider min={0} max={120} value={duration} onChange={(v) => { setDuration(v); setPage(1); }} label="Max Duration (mins)" />
            </div>
            <div className="md:col-span-2">
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Date Range</div>
              <DateRangePicker value={range} onChange={(v) => { setRange(v); setPage(1); }} />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Behavior Timeline" />
        <CardBody>
          <div className="inline-controls">
            <TimelineControls zoom={zoom} onZoomChange={setZoom} onScrollLeft={() => {}} onScrollRight={() => {}} />
          </div>
          <div className="mt-3 overflow-x-auto">
            <div className="min-w-[640px]">
              <BehaviorTimeline
                segments={(behaviors ?? [])
                  .filter((b: any) => (EXACT_BEHAVIORS as string[]).includes(b.type))
                  .map((b: any) => ({
                    id: b.id,
                    type: b.type,
                    start: b.startMin,
                    end: b.endMin,
                    camera: b.camera,
                    confidence: b.confidence,
                  }))}
                onSelect={(id: string) => setPreviewId(id)}
                zoomScale={zoomToScale(zoom)}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="No results found" description="Adjust filters to see behavior events." />
      ) : (
        <>
          <BehaviorGrid items={pageItems} onPreview={setPreviewId} />
          <div className="flex items-center justify-center gap-2">
            <button className="px-2 py-1 rounded" style={{ background: 'var(--color-table-header-bg)' }} disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </button>
            <div className="text-sm" style={{ color: 'var(--color-text)' }}>
              Page {page} of {totalPages}
            </div>
            <button className="px-2 py-1 rounded" style={{ background: 'var(--color-table-header-bg)' }} disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              Next
            </button>
          </div>
        </>
      )}

      <div className="mt-4">
        {/* Behavior Events Table */}
        <div className="font-heading font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
          Behavior Events
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <BehaviorEventsTable items={filtered as any[]} />
          </div>
        </div>
      </div>

      <VideoModal open={!!previewId} onClose={() => setPreviewId(null)} src="/src/assets/video/sample2.mp4" />
    </div>
  );
}
