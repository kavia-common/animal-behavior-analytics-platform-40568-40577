import React from 'react';
import clsx from 'clsx';

// PUBLIC_INTERFACE
export default function Badge({ label, tone = 'default' }: { label: string; tone?: 'default' | 'success' | 'warning' | 'error' }) {
  /** Small badge with tones */
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs border',
        tone === 'default' && 'bg-neutralLightBg text-secondaryText border-neutralBorder',
        tone === 'success' && 'bg-neutralLightBg text-success border-neutralBorder',
        tone === 'warning' && 'bg-neutralLightBg border-neutralBorder',
        tone === 'error' && 'bg-neutralLightBg text-error border-neutralBorder'
      )}
      style={tone === 'warning' ? { color: 'var(--color-warning)' } : undefined}
    >
      {label}
    </span>
  );
}
