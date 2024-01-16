import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useIsLogin } from '../hooks/UseLoginData';

const PrivateRoute: React.FC = () => {
  const isUserLoggedIn = useIsLogin();

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
