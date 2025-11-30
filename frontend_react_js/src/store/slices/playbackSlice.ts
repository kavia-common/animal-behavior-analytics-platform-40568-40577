import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = { rate: number; currentTime: number };

const initialState: State = { rate: 1, currentTime: 0 };

const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    setRate(state, action: PayloadAction<number>) { state.rate = action.payload; },
    setCurrentTime(state, action: PayloadAction<number>) { state.currentTime = action.payload; }
  }
});

export const { setRate, setCurrentTime } = playbackSlice.actions;
export default playbackSlice.reducer;
