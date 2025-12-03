import React from 'react';
import BehaviorCard from './BehaviorCard';

type Props = {
  items: any[];
  onPreview: (id: string) => void;
};

/**
 * Grid/list of behavior items with responsive columns.
 */
export default function BehaviorGrid({ items, onPreview }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map(it => (
        <BehaviorCard key={it.id} item={it} onPreview={onPreview} />
      ))}
    </div>
  );
}
