import React from 'react';
import clsx from 'clsx';

// PUBLIC_INTERFACE
export default function Badge({ label, tone = 'default' }: { label: string; tone?: 'default' | 'success' | 'warning' | 'error' }) {
  /** Small badge with tones */
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs border',
        tone === 'default' && 'bg-neutral-100 text-text border-neutral-200',
        tone === 'success' && 'bg-neutral-100 text-success border-neutral-200',
        tone === 'warning' && 'bg-neutral-100 text-[color:var(--color-warning)] border-neutral-200',
        tone === 'error' && 'bg-neutral-100 text-error border-neutral-200'
      )}
    >
      {label}
    </span>
  );
}
