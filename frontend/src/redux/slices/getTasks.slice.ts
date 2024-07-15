import { createSlice } from '@reduxjs/toolkit';
import { IGetTasksStatus } from '../../interfaces/redux.states.interface';
import { getTasksThunk } from '../thunks/getTasks.thunk';

const initialState: IGetTasksStatus = {
  loading: true,
  error: null,
  tasks: [],
};

export const getTasksSlice = createSlice({
  name: 'getTasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksThunk.pending, (state) => {
        return (state = {
          ...initialState,
        });
      })
      .addCase(getTasksThunk.fulfilled, (state, action) => {
        return (state = {
          ...initialState,
          loading: false,
          tasks: action.payload,
        });
      })
      .addCase(getTasksThunk.rejected, (state, action) => {
        return (state = {
          ...initialState,
          loading: false,
          error: action.payload,
        });
      });
  },
});
