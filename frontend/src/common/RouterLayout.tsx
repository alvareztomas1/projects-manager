import React from 'react';
import { NavBar } from './NavBar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useNotification } from '../context/notification.context';
import { useCookies } from 'react-cookie';
import COOKIE_NAMES from '../constants/cookie';

export const RouterLayout: React.FC<{}> = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIE_NAMES.ACCESS_TOKEN,
  ]);
  const { isAuth, error, accessToken, isExpired } = useAppSelector(
    (state) => state.authReducer,
  );
  const { getError } = useNotification();

  React.useEffect(() => {
    if (accessToken) setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken);
  }, [accessToken, setCookie]);

  React.useEffect(() => {
    if (isExpired) removeCookie(COOKIE_NAMES.ACCESS_TOKEN, cookies.accessToken);
  }, [isExpired, removeCookie, cookies.accessToken]);

  React.useEffect(() => {
    if (error) getError(JSON.stringify(error));
  }, [error, getError]);

  return isAuth ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
