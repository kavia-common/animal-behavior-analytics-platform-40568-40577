import React from 'react';
import clsx from 'clsx';

type Tab = { id: string; label: string };
type Props = {
  tabs: Tab[];
  value: string;
  onChange: (id: string) => void;
};

// PUBLIC_INTERFACE
export default function Tabs({ tabs, value, onChange }: Props) {
  /** Tabs with active state */
  return (
    <div className="inline-flex bg-neutral-100 rounded-md p-1 text-text">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={clsx(
            'px-3 py-1.5 text-sm rounded',
            value === t.id ? 'bg-surface shadow-card text-text' : 'text-neutral-700 hover:text-neutral-900'
          )}
          aria-selected={value === t.id}
          role="tab"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
