import React from 'react';

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  label?: string;
};

// PUBLIC_INTERFACE
export default function Slider({ min, max, value, onChange, step = 1, label }: Props) {
  /** Basic input range slider */
  return (
    <div className="w-full">
      {label && <div className="text-xs mb-1 text-neutral-700">{label}</div>}
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      <div className="text-xs text-neutral-600 mt-1">{value} mins</div>
    </div>
  );
}
