import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import propertiesReducer from '../features/properties/propertiesSlice';
import enquiriesReducer from '../features/enquiries/enquiriesSlice';
import favouritesReducer from '../features/favourites/favouritesSlice';
import projectsReducer from '../features/projects/projectsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertiesReducer,
    enquiries: enquiriesReducer,
    favourites: favouritesReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
