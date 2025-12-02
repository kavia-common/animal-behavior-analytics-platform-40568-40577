import React from 'react';
import Button from './Button';

type Props = {
  value: { start: string; end: string };
  onChange: (v: { start: string; end: string }) => void;
  /** When true, hide 7d/30d quick presets (used by top-row only). Defaults to false. */
  hideExtendedPresets?: boolean;
};

// PUBLIC_INTERFACE
export default function DateRangePicker({ value, onChange, hideExtendedPresets = false }: Props) {
  /**
   * Lightweight date range with presets.
   * Today is always shown. 7d/30d are hidden when hideExtendedPresets is true.
   */
  const today = new Date().toISOString().slice(0, 10);
  const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

  return (
    <div className="flex items-center gap-2">
      <input
        aria-label="Start date"
        type="date"
        className="border rounded-md px-2 py-1 text-sm"
        value={value.start}
        onChange={e => onChange({ ...value, start: e.target.value })}
      />
      <span className="text-sm">to</span>
      <input
        aria-label="End date"
        type="date"
        className="border rounded-md px-2 py-1 text-sm"
        value={value.end}
        onChange={e => onChange({ ...value, end: e.target.value })}
      />
      <div className="flex gap-1">
        <Button
          title="Set date range to Today"
          variant="ghost"
          size="sm"
          onClick={() => onChange({ start: today, end: today })}
        >
          Today
        </Button>
        {!hideExtendedPresets && (
          <>
            <Button
              title="Set date range to last 7 days"
              variant="ghost"
              size="sm"
              onClick={() => onChange({ start: daysAgo(6), end: today })}
            >
              7d
            </Button>
            <Button
              title="Set date range to last 30 days"
              variant="ghost"
              size="sm"
              onClick={() => onChange({ start: daysAgo(29), end: today })}
            >
              30d
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
