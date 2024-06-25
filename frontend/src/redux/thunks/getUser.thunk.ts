import { createAsyncThunk } from '@reduxjs/toolkit';
import { users } from '../../api/users.api';

interface GetUserThunkArgs {
  userId: string;
  accessToken: string;
}

export const getUserThunk = createAsyncThunk(
  'backend/getUser',
  async ({ userId, accessToken }: GetUserThunkArgs, { rejectWithValue }) => {
    try {
      const response = await users.getById(userId, accessToken);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
