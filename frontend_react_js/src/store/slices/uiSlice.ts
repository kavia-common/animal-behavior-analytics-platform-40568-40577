import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DateRange = { start: string; end: string };

type State = {
  modal: string | null;
  // Persisted navigation context per Architecture doc:
  // - lastActiveTab: 'dashboard' | 'timeline' | 'reports' | 'chat'
  // - globalDateRange: shared across sections
  // - species: species key for species-agnostic components
  lastActiveTab: 'dashboard' | 'timeline' | 'reports' | 'chat';
  globalDateRange: DateRange;
  species: string; // e.g., 'giant-anteater'
};

const today = new Date().toISOString().slice(0, 10);
const initialState: State = {
  modal: null,
  lastActiveTab: 'dashboard',
  globalDateRange: { start: today, end: today },
  species: 'giant-anteater',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) { state.modal = action.payload; },
    closeModal(state) { state.modal = null; },
    setLastActiveTab(state, action: PayloadAction<State['lastActiveTab']>) {
      state.lastActiveTab = action.payload;
    },
    setGlobalDateRange(state, action: PayloadAction<DateRange>) {
      state.globalDateRange = action.payload;
    },
    setSpecies(state, action: PayloadAction<string>) {
      state.species = action.payload;
    }
  }
});

export const { openModal, closeModal, setLastActiveTab, setGlobalDateRange, setSpecies } = uiSlice.actions;
export default uiSlice.reducer;
