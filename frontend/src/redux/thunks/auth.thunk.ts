import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLoginData } from '../../types/user.type';
import { auth } from '../../api/auth.api';

export const authThunk = createAsyncThunk(
  'backend/auth',
  async (userData: userLoginData, { rejectWithValue }) => {
    try {
      const response = await auth.login(userData);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
