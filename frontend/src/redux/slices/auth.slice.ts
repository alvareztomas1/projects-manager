import { createSlice } from '@reduxjs/toolkit';
import { authThunk } from '../thunks/auth.thunk';
import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { userData } from '../../types/user.type';

interface IAuthState {
  isAuth: boolean;
  success: boolean;
  error: RejectedActionFromAsyncThunk<any> | null;
  loading: boolean;
  userData: userData | null;
  accessToken: string | null;
  isExpired: boolean | null;
}

const initialState: IAuthState = {
  isAuth: false,
  success: false,
  error: null,
  loading: false,
  userData: null,
  accessToken: null,
  isExpired: null,
};

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
  extraReducers: (builder) => {
    builder
      .addCase(authThunk.pending, (state) => {
        return (state = {
          ...initialState,
          loading: true,
        });
      })
      .addCase(authThunk.fulfilled, (state, action) => {
        return (state = {
          ...initialState,
          loading: false,
          userData: action.payload.user,
          isAuth: true,
          isExpired: false,
          success: true,
          accessToken: action.payload['access_token'],
        });
      })
      .addCase(authThunk.rejected, (state, action) => {
        return (state = {
          ...initialState,
          error: action.payload,
        });
      });
  },
});

export const { login, logout } = authSlice.actions;
