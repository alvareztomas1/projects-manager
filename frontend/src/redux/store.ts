import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth.slice';
import { getUserSlice } from './slices/getUser.slice';

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    getUserReducer: getUserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
