import { createSlice } from '@reduxjs/toolkit';
import { authThunk } from '../thunks/auth.thunk';
import { getCookie } from '../../utils/cookies';
import {
  getAccessTokenByCookie,
  getIsAuthByCookie,
  getIsExpiredByCookie,
  getUserDataByCookie,
} from '../../utils/authState';
import { IAuthState } from '../../interfaces/redux.states.interface';

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
