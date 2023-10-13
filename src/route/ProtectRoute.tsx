import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectRoute: React.FC = () => {
  const userType = localStorage.getItem('user_type');
  return userType === 'SELLER' ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoute;
