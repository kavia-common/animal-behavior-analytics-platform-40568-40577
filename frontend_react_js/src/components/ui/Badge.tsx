import React from 'react';
import clsx from 'clsx';

// PUBLIC_INTERFACE
export default function Badge({ label, tone = 'default' }: { label: string; tone?: 'default' | 'success' | 'warning' | 'error' }) {
  /** Small badge with tones */
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs border',
        tone === 'default' && 'bg-neutral-50 text-neutral-900 border-gray-200',
        tone === 'success' && 'bg-green-50 text-success border-green-200',
        tone === 'warning' && 'bg-yellow-50 text-warning border-yellow-200',
        tone === 'error' && 'bg-red-50 text-error border-red-200'
      )}
    >
      {label}
    </span>
  );
}
