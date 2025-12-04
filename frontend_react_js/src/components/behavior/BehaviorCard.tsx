import React from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PlaceholderImage } from '@/components/ui/Placeholders';

type Props = {
  item: {
    id: string;
    type: string;
    start: string;
    end: string;
    durationMin: number;
    confidence: number;
    camera: string;
    thumbnail?: string;
  };
  onPreview: (id: string) => void;
};

// PUBLIC_INTERFACE
export default function BehaviorCard({ item, onPreview }: Props) {
  /** Behavior card with preview button and metadata */
  const legacyTone: 'secondary' | 'default' = item.confidence > 80 ? 'default' : 'secondary';
  return (
    <div className="card p-3 flex gap-3">
      <PlaceholderImage label="Video" className="w-28 h-20" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="font-heading font-semibold">{item.type}</div>
          <Badge tone={legacyTone}>{`${item.confidence}% conf`}</Badge>
        </div>
        <div className="text-xs text-neutral-600">
          {item.start} – {item.end} • {item.durationMin} mins • Cam {item.camera}
        </div>
        <div className="mt-2">
          <Button size="sm" onClick={() => onPreview(item.id)}>Preview</Button>
        </div>
      </div>
    </div>
  );
}
