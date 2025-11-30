import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Behavior = any;

type State = {
  list: Behavior[];
};

const initialState: State = { list: [] };

const behaviorSlice = createSlice({
  name: 'behavior',
  initialState,
  reducers: {
    setBehaviors(state, action: PayloadAction<Behavior[]>) {
      state.list = action.payload;
    }
  }
});

export const { setBehaviors } = behaviorSlice.actions;
export default behaviorSlice.reducer;
