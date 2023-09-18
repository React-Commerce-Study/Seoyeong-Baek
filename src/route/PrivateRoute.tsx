import React from 'react';
import { useIsLogin } from '../hooks/UseLoginData';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const isUserLoggedIn = useIsLogin();

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
