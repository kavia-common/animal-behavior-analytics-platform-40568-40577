import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Report = { id: string; type: string; start: string; end: string; createdAt: string };

type State = { drafts: Report[] };

const initialState: State = { drafts: [] };

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    saveDraft(state, action: PayloadAction<Report>) {
      state.drafts.push(action.payload);
    }
  }
});

export const { saveDraft } = reportSlice.actions;
export default reportSlice.reducer;
