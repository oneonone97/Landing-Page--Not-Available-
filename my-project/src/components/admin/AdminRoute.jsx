import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * AdminRoute Component
 * Protects admin routes by checking if user is authenticated and has admin role
 * Follows Single Responsibility Principle: Route protection only
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if user is not admin
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and is admin, render children
  return <>{children}</>;
};

export default AdminRoute;
