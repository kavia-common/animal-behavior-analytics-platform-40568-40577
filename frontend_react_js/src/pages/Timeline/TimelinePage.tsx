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

export default function TimelinePage() {
  const { data: types } = useQuery<string[]>({ queryKey: ['behaviorTypes'], queryFn: api.getBehaviorTypes });
  const { data: behaviors } = useQuery({ queryKey: ['behaviors'], queryFn: api.getBehaviors });
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState(120);
  const [range, setRange] = useState({ start: new Date().toISOString().slice(0, 10), end: new Date().toISOString().slice(0, 10) });
  const [zoom, setZoom] = useState<'1h' | '6h' | '12h' | '24h'>('6h');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bh = params.get('behavior');
    if (bh && (types ?? []).includes(bh)) {
      setSelected([bh]);
      setPage(1);
    } else if (!bh && (types ?? []).length && selected.length === 0) {
      // default to all when nothing is selected
      setSelected(types as string[]);
    }
  }, [location.search, types]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(
    () => (behaviors ?? []).filter((b: any) => (selected.length ? selected.includes(b.type) : true) && b.durationMin <= duration),
    [behaviors, selected, duration]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Filters" />
        <CardBody>
          <div className="grid md:grid-cols-4 gap-3">
            <div>
              <div className="text-xs text-neutral-600 mb-1">Behavior Types</div>
              <MultiSelect options={(types ?? []).map((t: string) => ({ value: t, label: t }))} values={selected} onChange={v => { setSelected(v); setPage(1); }} />
            </div>
            <div>
              <Slider min={0} max={120} value={duration} onChange={v => { setDuration(v); setPage(1); }} label="Max Duration (mins)" />
            </div>
            <div className="md:col-span-2">
              <div className="text-xs text-neutral-600 mb-1">Date Range</div>
              <DateRangePicker value={range} onChange={v => { setRange(v); setPage(1); }} />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Behavior Timeline" />
        <CardBody>
          <TimelineControls zoom={zoom} onZoomChange={setZoom} onScrollLeft={() => {}} onScrollRight={() => {}} />
          <div className="mt-3">
            <BehaviorTimeline
              segments={(behaviors ?? []).map((b: any) => ({
                id: b.id,
                type: b.type,
                start: b.startMin,
                end: b.endMin,
                camera: b.camera
              }))}
              onSelect={(id: string) => setPreviewId(id)}
            />
          </div>
        </CardBody>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="No results found" description="Adjust filters to see behavior events." />
      ) : (
        <>
          <BehaviorGrid items={pageItems} onPreview={setPreviewId} />
          <div className="flex items-center justify-center gap-2">
            <button className="px-2 py-1 rounded bg-neutral-100" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
            <div className="text-sm">Page {page} of {totalPages}</div>
            <button className="px-2 py-1 rounded bg-neutral-100" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
          </div>
        </>
      )}

      <div className="mt-4">
        {/* Behavior Events Table */}
        <div className="font-heading font-semibold mb-2">Behavior Events</div>
        <div>
          <BehaviorEventsTable items={filtered as any[]} />
        </div>
      </div>

      <VideoModal
        open={!!previewId}
        onClose={() => setPreviewId(null)}
        src="/src/assets/video/sample1.mp4"
        meta={filtered.find((f: any) => f.id === previewId)}
      />
    </div>
  );
}
