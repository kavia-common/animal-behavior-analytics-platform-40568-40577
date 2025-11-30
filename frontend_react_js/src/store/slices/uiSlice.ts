import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = { modal: string | null };

const initialState: State = { modal: null };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) { state.modal = action.payload; },
    closeModal(state) { state.modal = null; }
  }
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
