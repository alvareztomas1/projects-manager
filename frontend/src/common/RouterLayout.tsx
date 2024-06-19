import React from 'react';
import { NavBar } from './NavBar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useNotification } from '../context/notification.context';

export const RouterLayout: React.FC<{}> = () => {
  const { isAuth, error } = useAppSelector((state) => state.authReducer);
  const { getError } = useNotification();

  if (error) getError(JSON.stringify(error));
  return isAuth ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
