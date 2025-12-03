import React from 'react';
import Badge from '@/components/ui/Badge';

type Props = {
  label: string;
  value: string | number;
  delta?: string;
  tone?: 'success' | 'warning' | 'error' | 'default';
};

// PUBLIC_INTERFACE
export default function StatWidget({ label, value, delta, tone = 'default' }: Props) {
  /** KPI stat with optional delta badge */
  return (
    <div className="card p-4">
      <div className="text-xs text-neutralMid">{label}</div>
      <div className="mt-1 font-mono text-2xl text-secondaryText">{value}</div>
      {delta && (
        <div className="mt-2">
          <Badge tone={tone}>{delta}</Badge>
        </div>
      )}
    </div>
  );
}
