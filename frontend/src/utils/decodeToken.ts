import * as jwt from 'jwt-decode';
import { IJwtToken } from '../interfaces/jwt.interface';

export const decodeToken = <T>(token: string): T => {
  const decodedToken: T = jwt.jwtDecode(token);
  return decodedToken;
};

export const tokenIsExpired = (token: string) => {
  const { exp } = decodeToken<IJwtToken>(token);
  const currentTime = Math.floor(Date.now() / 1000);

  return currentTime >= exp;
};
