import COOKIE_NAMES from '../constants/cookie';
import { IAccessTokenCookie } from '../interfaces/cookies.interface';
import { IJwtToken } from '../interfaces/jwt.interface';
import { getCookie } from './cookies';
import { decodeToken, tokenIsExpired } from './decodeToken';

export const getIsAuthByCookie = (): boolean => {
  const cookie = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

  if (cookie !== undefined) {
    return !tokenIsExpired(cookie);
  }

  return false;
};

export const getIsExpiredByCookie = (): boolean => {
  const cookie = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

  if (cookie !== undefined) {
    return tokenIsExpired(cookie);
  }

  return false;
};

export const getAccessTokenByCookie = (): string | false => {
  const cookie = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

  return cookie || false;
};

export const getUserDataByCookie = (): IAccessTokenCookie | false => {
  const cookie = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

  if (cookie !== undefined) {
    return {
      username: decodeToken<IJwtToken>(cookie).username,
      id: decodeToken<IJwtToken>(cookie).sub,
    };
  }

  return false;
};
