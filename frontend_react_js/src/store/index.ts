import { configureStore } from '@reduxjs/toolkit';
import animalReducer from './slices/animalSlice';
import behaviorReducer from './slices/behaviorSlice';
import filterReducer from './slices/filterSlice';
import reportReducer from './slices/reportSlice';
import playbackReducer from './slices/playbackSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    animal: animalReducer,
    behavior: behaviorReducer,
    filters: filterReducer,
    report: reportReducer,
    playback: playbackReducer,
    ui: uiReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
