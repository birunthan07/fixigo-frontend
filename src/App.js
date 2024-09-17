// // App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/admin" 
        element={<ProtectedRoute element={AdminPage} allowedRoles={['admin']} />} 
      />
      <Route 
        path="/user" 
        element={<ProtectedRoute element={UserPage} allowedRoles={['user', 'admin']} />} 
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;
