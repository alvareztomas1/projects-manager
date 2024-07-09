import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RouterLayout } from './common/RouterLayout';
import { SignupPage } from './pages/signup';
import { SuccessSignUpPage } from './pages/signup/success';
import { ProjectPage } from './pages/project';

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup-success/:username" element={<SuccessSignUpPage />} />
    </Routes>
  );
};
