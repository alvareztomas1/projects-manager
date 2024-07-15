import { createAsyncThunk } from '@reduxjs/toolkit';
import { tasks } from '../../api/tasks.api';

type getTasksThunksProps = {
  projectId: string;
  accessToken: string;
};

export const getTasksThunk = createAsyncThunk(
  'backend/getTasks',
  async (
    { projectId, accessToken }: getTasksThunksProps,
    { rejectWithValue },
  ) => {
    try {
      const response = await tasks.findTasksByProject(projectId, accessToken);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
