import React, { useMemo, useState } from 'react';
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

export default function TimelinePage() {
  const { data: types } = useQuery<string[]>({ queryKey: ['behaviorTypes'], queryFn: api.getBehaviorTypes });
  const { data: behaviors } = useQuery({ queryKey: ['behaviors'], queryFn: api.getBehaviors });
  const [selected, setSelected] = useState<string[]>(['Foraging', 'Resting']);
  const [duration, setDuration] = useState(60);
  const [range, setRange] = useState({ start: new Date().toISOString().slice(0, 10), end: new Date().toISOString().slice(0, 10) });
  const [zoom, setZoom] = useState<'1h' | '6h' | '12h' | '24h'>('6h');
  const [previewId, setPreviewId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (behaviors ?? []).filter((b: any) => selected.includes(b.type) && b.durationMin <= duration),
    [behaviors, selected, duration]
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Filters" />
        <CardBody>
          <div className="grid md:grid-cols-4 gap-3">
            <div>
              <div className="text-xs text-neutral-600 mb-1">Behavior Types</div>
              <MultiSelect options={(types ?? []).map((t: string) => ({ value: t, label: t }))} values={selected} onChange={setSelected} />
            </div>
            <div>
              <Slider min={0} max={120} value={duration} onChange={setDuration} label="Max Duration (mins)" />
            </div>
            <div className="md:col-span-2">
              <div className="text-xs text-neutral-600 mb-1">Date Range</div>
              <DateRangePicker value={range} onChange={setRange} />
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

      <BehaviorGrid items={filtered} onPreview={setPreviewId} />

      <VideoModal
        open={!!previewId}
        onClose={() => setPreviewId(null)}
        src="/src/assets/video/sample1.mp4"
        meta={filtered.find((f: any) => f.id === previewId)}
      />
    </div>
  );
}
