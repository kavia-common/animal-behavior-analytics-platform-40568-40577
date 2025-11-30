import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Animal = { id: string; name: string; tag: string; lastSeen: string };

type State = {
  selectedId: string;
  entities: Record<string, Animal>;
};

const initialState: State = {
  selectedId: 'anteater-1',
  entities: {}
};

const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    setSelectedAnimal(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    upsertAnimals(state, action: PayloadAction<Animal[]>) {
      action.payload.forEach(a => { state.entities[a.id] = a; });
    }
  }
});

export const { setSelectedAnimal, upsertAnimals } = animalSlice.actions;
export default animalSlice.reducer;
