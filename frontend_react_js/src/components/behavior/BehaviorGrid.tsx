import React from 'react';
import BehaviorCard from './BehaviorCard';

type Props = {
  items: any[];
  onPreview: (id: string) => void;
};

// PUBLIC_INTERFACE
export default function BehaviorGrid({ items, onPreview }: Props) {
  /** Grid/list of behavior items */
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {items.map(it => (
        <BehaviorCard key={it.id} item={it} onPreview={onPreview} />
      ))}
    </div>
  );
}
