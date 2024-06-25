import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { IAccessTokenCookie } from './cookies.interface';
import { UserData } from '../types/user.type';

export interface IAuthState {
  isAuth: boolean;
  success: boolean;
  error: RejectedActionFromAsyncThunk<any> | null;
  loading: boolean;
  userData: IAccessTokenCookie | null;
  accessToken: string | null;
  isExpired: boolean | null;
}

export interface IGetUserState {
  loading: boolean;
  error: RejectedActionFromAsyncThunk<any> | null;
  user: UserData | null;
}