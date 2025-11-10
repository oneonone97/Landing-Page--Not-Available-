import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminHeader.css';

/**
 * AdminHeader Component
 * Header for admin dashboard with user info and logout
 */
const AdminHeader = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <button className="admin-menu-toggle" onClick={onMenuClick} aria-label="Toggle menu">
          ☰
        </button>
        <div className="admin-logo">
          <a href="/" className="admin-logo-link">
            <img 
              src="/images/logo.jpg" 
              alt="Not Available Logo" 
              className="admin-logo-image"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="admin-logo-text">Not Available</span>
          </a>
        </div>
        <div className="admin-header-right">
          <div className="admin-user-info">
            <span className="admin-user-name">{user?.name || 'Admin'}</span>
            <span className="admin-user-role">Administrator</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
