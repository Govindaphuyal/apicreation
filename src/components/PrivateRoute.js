import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './context/userState/UserContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;