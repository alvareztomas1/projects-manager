import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
