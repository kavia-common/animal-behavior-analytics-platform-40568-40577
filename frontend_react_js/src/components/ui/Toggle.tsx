import React from 'react';

type Props = { checked: boolean; onChange: (v: boolean) => void; label?: string };

// PUBLIC_INTERFACE
export default function Toggle({ checked, onChange, label }: Props) {
  /** Simple toggle switch */
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <span className="relative inline-flex items-center w-10 h-5 rounded-full transition-colors" style={{ backgroundColor: checked ? '#2C5F9A' : '#e5e7eb' }}>
        <input type="checkbox" className="sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform" style={{ transform: `translateX(${checked ? '20px' : '0'})` }} />
      </span>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
