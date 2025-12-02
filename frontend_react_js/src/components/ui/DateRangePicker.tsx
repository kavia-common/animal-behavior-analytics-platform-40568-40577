import React from 'react';
import Button from './Button';

type Props = {
  value: { start: string; end: string };
  onChange: (v: { start: string; end: string }) => void;
};

// PUBLIC_INTERFACE
export default function DateRangePicker({ value, onChange }: Props) {
  /** Lightweight date range with presets (Today, 7, 30) */
  const today = new Date().toISOString().slice(0, 10);
  const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

  return (
    <div className="flex items-center gap-2">
      <input aria-label="Start date" type="date" className="border rounded-md px-2 py-1 text-sm" value={value.start} onChange={e => onChange({ ...value, start: e.target.value })} />
      <span className="text-sm">to</span>
      <input aria-label="End date" type="date" className="border rounded-md px-2 py-1 text-sm" value={value.end} onChange={e => onChange({ ...value, end: e.target.value })} />
      <div className="flex gap-1">
        <Button title="Set date range to Today" variant="ghost" size="sm" onClick={() => onChange({ start: today, end: today })}>Today</Button>
      </div>
    </div>
  );
}
