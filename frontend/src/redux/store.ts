import { configureStore } from '@reduxjs/toolkit';
import { authSlice, getProjectSlice, getUserSlice } from './slices';

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    getUserReducer: getUserSlice.reducer,
    getProjectReducer: getProjectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
