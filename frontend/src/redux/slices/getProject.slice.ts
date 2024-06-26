import { IGetProjectStatus } from '../../interfaces/redux.states.interface';
import { createSlice } from '@reduxjs/toolkit';
import { getProjectThunk } from '../thunks/getProject.thunk';

const initialState: IGetProjectStatus = {
  error: null,
  loading: true,
  project: null,
};

export const getProjectSlice = createSlice({
  name: 'getProject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectThunk.pending, (state) => {
        return (state = {
          ...initialState,
        });
      })
      .addCase(getProjectThunk.fulfilled, (state, action) => {
        return (state = {
          ...initialState,
          loading: false,
          project: action.payload,
        });
      })
      .addCase(getProjectThunk.rejected, (state, action) => {
        return (state = {
          ...initialState,
          error: action.payload,
        });
      });
  },
});
