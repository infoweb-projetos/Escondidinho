import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const ProtectedRoute = ({ requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwt_decode(token);
    if (decodedToken.role !== requiredRole) {
      return <Navigate to="/not-authorized" />; 
    }
    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
