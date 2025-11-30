import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  behaviorTypes: string[];
  maxDurationMin: number;
  dateRange: { start: string; end: string };
};

const today = new Date().toISOString().slice(0, 10);

const initialState: State = {
  behaviorTypes: [],
  maxDurationMin: 120,
  dateRange: { start: today, end: today }
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setBehaviorTypes(state, action: PayloadAction<string[]>) {
      state.behaviorTypes = action.payload;
    },
    setMaxDuration(state, action: PayloadAction<number>) {
      state.maxDurationMin = action.payload;
    },
    setDateRange(state, action: PayloadAction<{ start: string; end: string }>) {
      state.dateRange = action.payload;
    },
    setDateRangePreset(state, action: PayloadAction<'7d' | '30d' | 'today'>) {
      const end = today;
      const days = action.payload === '7d' ? 7 : action.payload === '30d' ? 30 : 0;
      const start = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
      state.dateRange = { start, end };
    },
    clearAll(state) {
      state.behaviorTypes = [];
      state.maxDurationMin = 120;
      state.dateRange = { start: today, end: today };
    }
  }
});

export const { setBehaviorTypes, setMaxDuration, setDateRange, setDateRangePreset, clearAll } = filterSlice.actions;
export default filterSlice.reducer;
