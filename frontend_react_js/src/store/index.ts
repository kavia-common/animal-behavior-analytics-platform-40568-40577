import { configureStore, combineReducers } from '@reduxjs/toolkit';
import animalReducer from './slices/animalSlice';
import behaviorReducer from './slices/behaviorSlice';
import filterReducer from './slices/filterSlice';
import reportReducer from './slices/reportSlice';
import playbackReducer from './slices/playbackSlice';
import uiReducer from './slices/uiSlice';
import { loadPersist, savePersist } from './persist';

const rootReducer = combineReducers({
  animal: animalReducer,
  behavior: behaviorReducer,
  filters: filterReducer,
  report: reportReducer,
  playback: playbackReducer,
  ui: uiReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const preloaded = loadPersist() || undefined;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloaded as any
});

store.subscribe(() => {
  savePersist(store.getState());
});

export type AppDispatch = typeof store.dispatch;
