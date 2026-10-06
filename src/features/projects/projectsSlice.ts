import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Project, ListingStatus } from '../../types';
import { projects as seed } from '../../data/mockData';

interface ProjectsState {
  items: Project[];
}

const initialState: ProjectsState = {
  items: [...seed],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.items.unshift(action.payload);
    },
    updateProject(state, action: PayloadAction<Project>) {
      const idx = state.items.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    setProjectStatus(
      state,
      action: PayloadAction<{ id: string; status: ListingStatus }>,
    ) {
      const item = state.items.find((p) => p.id === action.payload.id);
      if (item) item.status = action.payload.status;
    },
  },
});

export const { addProject, updateProject, setProjectStatus } =
  projectsSlice.actions;
export default projectsSlice.reducer;
