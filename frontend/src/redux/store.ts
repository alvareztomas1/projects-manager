import { configureStore } from '@reduxjs/toolkit';
import { authSlice, getProjectSlice, getUserSlice } from './slices';
import { getTasksSlice } from './slices/getTasks.slice';

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    getUserReducer: getUserSlice.reducer,
    getProjectReducer: getProjectSlice.reducer,
    getTasksReducer: getTasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
