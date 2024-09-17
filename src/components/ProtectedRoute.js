// 


import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Logged in but role not allowed
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;


// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('role');

//   if (!token) {
//     // Redirect to login if no token
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     // Redirect to homepage if the user doesn't have the required role
//     return <Navigate to="/" />;
//   }

//   return <Component {...rest} />;
// };

// export default ProtectedRoute;
