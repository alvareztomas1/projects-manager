import React from 'react';
import { NavBar } from './NavBar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useCookies } from 'react-cookie';
import COOKIE_NAMES from '../constants/cookie';

export const RouterLayout: React.FC<{}> = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIE_NAMES.ACCESS_TOKEN,
  ]);
  const { isAuth, accessToken, isExpired } = useAppSelector(
    (state) => state.authReducer,
  );
  React.useEffect(() => {
    if (accessToken)
      setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, { path: '/' });
  }, [accessToken, setCookie]);

  React.useEffect(() => {
    if (isExpired) removeCookie(COOKIE_NAMES.ACCESS_TOKEN, { path: '/' });
  }, [isExpired, removeCookie, cookies.accessToken]);

  return isAuth ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
