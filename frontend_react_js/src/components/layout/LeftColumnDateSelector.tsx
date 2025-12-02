import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateRangePicker from '@/components/ui/DateRangePicker';
import { RootState } from '@/store';
import { setDateRange } from '@/store/slices/filterSlice';

/**
 * PUBLIC_INTERFACE
 * LeftColumnDateSelector renders the date range picker for the sidebar/left column,
 * intentionally showing extended presets (7d/30d). It does not pass hideExtendedPresets.
 */
export default function LeftColumnDateSelector() {
  const dispatch = useDispatch();
  const { dateRange } = useSelector((s: RootState) => s.filters);

  return (
    <div className="w-full">
      <DateRangePicker
        value={dateRange}
        onChange={(v) => dispatch(setDateRange(v))}
      />
    </div>
  );
}
