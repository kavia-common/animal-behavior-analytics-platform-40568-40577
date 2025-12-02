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
    <div className="inline-flex bg-neutralLightBg rounded-md p-1 text-secondaryText border border-neutralBorder">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={clsx(
            'px-3 py-1.5 text-sm rounded',
            value === t.id ? 'bg-surface shadow-card text-secondaryText' : 'text-neutralMid hover:text-secondaryText hover:bg-sidebarActiveBg'
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
