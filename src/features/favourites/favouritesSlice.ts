import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { favourites as seed } from '../../data/mockData';

interface FavouritesState {
  ids: string[];
}

const stored = localStorage.getItem('propconnect_favourites');
const initialState: FavouritesState = {
  ids: stored ? JSON.parse(stored) : [...seed],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
      localStorage.setItem('propconnect_favourites', JSON.stringify(state.ids));
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
