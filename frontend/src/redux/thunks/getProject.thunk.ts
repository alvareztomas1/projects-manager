import { createAsyncThunk } from '@reduxjs/toolkit';
import { projects } from '../../api/projects.api';

interface GetProjectThunkArgs {
  projectId: string;
  accessToken: string;
}

export const getProjectThunk = createAsyncThunk(
  'backend/getProject',
  async (
    { projectId, accessToken }: GetProjectThunkArgs,
    { rejectWithValue },
  ) => {
    try {
      const response = await projects.getById(projectId, accessToken);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
