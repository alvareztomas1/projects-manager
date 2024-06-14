import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { RouterLayout } from './common/RouterLayout';
import { SignupPage } from './pages/signup';

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};
