import React from 'react';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';

type Props = {
  zoom: '1h' | '6h' | '12h' | '24h';
  onZoomChange: (z: '1h' | '6h' | '12h' | '24h') => void;
  onScrollLeft: () => void;
  onScrollRight: () => void;
};

// PUBLIC_INTERFACE
export default function TimelineControls({ zoom, onZoomChange, onScrollLeft, onScrollRight }: Props) {
  /** Timeline zoom and scroll controls */
  return (
    <div className="flex items-center justify-between">
      <Tabs
        tabs={[
          { id: '1h', label: '1h' },
          { id: '6h', label: '6h' },
          { id: '12h', label: '12h' },
          { id: '24h', label: '24h' }
        ]}
        value={zoom}
        onChange={(id: string) => onZoomChange(id as any)}
      />
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onScrollLeft} aria-label="Scroll left">←</Button>
        <Button variant="ghost" onClick={onScrollRight} aria-label="Scroll right">→</Button>
      </div>
    </div>
  );
}
