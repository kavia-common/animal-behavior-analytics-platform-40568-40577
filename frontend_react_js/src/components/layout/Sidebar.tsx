import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setBehaviorTypes, clearAll, setDateRangePreset } from '@/store/slices/filterSlice';
import { ChevronRight, Filter, History, Bookmark } from 'lucide-react';

type Props = { onNavigate: (path: string) => void };

// PUBLIC_INTERFACE
export default function Sidebar({ onNavigate }: Props) {
  /** Left sidebar showing quick filters, saved views, and recent activities. */
  const dispatch = useDispatch();
  const filters = useSelector((s: RootState) => s.filters);

  const toggleType = (t: string) => {
    const set = new Set(filters.behaviorTypes);
    set.has(t) ? set.delete(t) : set.add(t);
    dispatch(setBehaviorTypes(Array.from(set)));
  };

  const quickTypes = ['Foraging', 'Resting', 'Grooming', 'Walking', 'Alert'];

  return (
    <div className="h-full p-4 md:p-5 space-y-6">
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-heading text-sm font-semibold">Quick Filters</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickTypes.map(t => {
            const active = filters.behaviorTypes.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={`px-2.5 py-1 rounded-full text-xs border ${active ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:bg-neutral-50'}`}
                aria-pressed={active}
              >
                {t}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-1.5 text-xs rounded-md bg-neutral-100 hover:bg-neutral-200"
            onClick={() => dispatch(clearAll())}
          >
            Clear all
          </button>
          <button
            className="px-3 py-1.5 text-xs rounded-md bg-neutral-100 hover:bg-neutral-200"
            onClick={() => dispatch(setDateRangePreset('7d'))}
            title="Apply last 7 days"
          >
            Last 7 days
          </button>
          <button
            className="px-3 py-1.5 text-xs rounded-md bg-neutral-100 hover:bg-neutral-200"
            onClick={() => dispatch(setDateRangePreset('30d'))}
            title="Apply last 30 days"
          >
            Last 30 days
          </button>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bookmark className="w-4 h-4 text-primary" />
          <h3 className="font-heading text-sm font-semibold">Saved Views</h3>
        </div>
        <ul className="space-y-2 text-sm">
          {['Morning Foraging', 'High Confidence', 'Camera A'].map(n => (
            <li key={n} className="flex items-center justify-between">
              <button className="text-neutral-900 hover:text-primary" onClick={() => onNavigate('/timeline')}>{n}</button>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </li>
          ))}
          <li className="pt-2 mt-2 border-t">
            <button className="text-neutral-900 hover:text-primary" onClick={() => onNavigate('/reports/saved')}>Saved Reports</button>
          </li>
          <li>
            <button className="text-neutral-900 hover:text-primary" onClick={() => onNavigate('/reports/scheduled')}>Scheduled</button>
          </li>
          <li>
            <button className="text-neutral-900 hover:text-primary" onClick={() => onNavigate('/settings')}>Settings</button>
          </li>
        </ul>
      </div>

      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-primary" />
          <h3 className="font-heading text-sm font-semibold">Recent Activities</h3>
        </div>
        <ul className="space-y-2 text-xs text-neutral-700">
          <li>Viewed video sample1.mp4 - 2m ago</li>
          <li>Exported Behavior Summary - 1h ago</li>
          <li>Updated Filter Preset "Morning Foraging" - yesterday</li>
        </ul>
      </div>
    </div>
  );
}
