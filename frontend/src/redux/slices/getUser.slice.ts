import { getUserThunk } from '../thunks/getUser.thunk';
import { createSlice } from '@reduxjs/toolkit';
import { IGetUserState } from '../../interfaces/redux.states.interface';

const initialState: IGetUserState = {
  error: null,
  loading: true,
  user: null,
};

export const getUserSlice = createSlice({
  name: 'getUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        return (state = {
          ...initialState,
        });
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        return (state = {
          ...initialState,
          loading: false,
          user: action.payload,
        });
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        return (state = {
          ...initialState,
          error: action.payload,
        });
      });
  },
});
