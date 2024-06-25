import { createSlice } from '@reduxjs/toolkit';
import { authThunk } from '../thunks/auth.thunk';
import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { getCookie } from '../../utils/cookies';
import {
  getAccessTokenByCookie,
  getIsAuthByCookie,
  getIsExpiredByCookie,
  getUserDataByCookie,
} from '../../utils/authState';
import { IAccessTokenCookie } from '../../interfaces/cookies.interface';

interface IAuthState {
  isAuth: boolean;
  success: boolean;
  error: RejectedActionFromAsyncThunk<any> | null;
  loading: boolean;
  userData: IAccessTokenCookie | null;
  accessToken: string | null;
  isExpired: boolean | null;
}

const initialState: IAuthState = {
  isAuth: getIsAuthByCookie(),
  success: getCookie('accessToken') !== undefined,
  error: null,
  loading: false,
  userData: getUserDataByCookie() || null,
  accessToken: getAccessTokenByCookie() || null,
  isExpired: getIsExpiredByCookie(),
};

export const authSlice = createSlice({
  name: 'auth',
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
