import React, { useState } from 'react';

type Option = { value: string; label: string };
type Props = {
  options: Option[];
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
};

// PUBLIC_INTERFACE
export default function MultiSelect({ options, values, onChange, placeholder = 'Select...' }: Props) {
  /** Simple multiselect check list */
  const [open, setOpen] = useState(false);
  const toggle = (v: string) => {
    const set = new Set(values);
    set.has(v) ? set.delete(v) : set.add(v);
    onChange(Array.from(set));
  };

  return (
    <div className="relative">
      <button className="px-3 py-2 border rounded-md bg-white text-sm" onClick={() => setOpen(p => !p)} aria-haspopup="listbox" aria-expanded={open}>
        {values.length ? `${values.length} selected` : placeholder}
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-60 bg-white border rounded-md shadow-card p-2 space-y-1">
          {options.map(o => {
            const checked = values.includes(o.value);
            return (
              <li key={o.value}>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={checked} onChange={() => toggle(o.value)} />
                  <span>{o.label}</span>
                </label>
              </li>
            );
          })}
          <li className="pt-1 border-t">
            <button className="text-xs text-primary hover:underline" onClick={() => { onChange([]); setOpen(false); }}>Clear</button>
          </li>
        </ul>
      )}
    </div>
  );
}
