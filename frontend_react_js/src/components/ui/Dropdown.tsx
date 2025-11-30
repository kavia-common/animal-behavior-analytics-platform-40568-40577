import React, { useState, useRef, useEffect } from 'react';

type Option = { value: string; label: string };
type Props = {
  options: Option[];
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

// PUBLIC_INTERFACE
export default function Dropdown({ options, value, onChange, placeholder = 'Select' }: Props) {
  /** Basic dropdown */
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button className="px-3 py-2 border rounded-md bg-white text-sm" onClick={() => setOpen(p => !p)} aria-haspopup="listbox">
        {selected ? selected.label : placeholder}
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-48 bg-white border rounded-md shadow-card" role="listbox">
          {options.map(o => (
            <li key={o.value}>
              <button className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-sm" onClick={() => { onChange(o.value); setOpen(false); }}>
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
