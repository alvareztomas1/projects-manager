import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLoginData } from '../../types/user.type';
import { auth } from '../../api/auth.api';

export const authThunk = createAsyncThunk(
  'backend/auth',
  async (userData: UserLoginData, { rejectWithValue }) => {
    try {
      const response = await auth.login(userData);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
