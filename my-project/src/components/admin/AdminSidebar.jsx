import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

/**
 * AdminSidebar Component
 * Navigation sidebar for admin dashboard
 * Shows menu items and highlights active route
 */
const AdminSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/orders', label: 'Orders', icon: '🛒' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/inventory', label: 'Inventory', icon: '📋' },
    { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <aside className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
            {isOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-menu-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="menu-icon">{item.icon}</span>
                  {isOpen && <span className="menu-label">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="sidebar-menu-item">
            <span className="menu-icon">🏠</span>
            {isOpen && <span className="menu-label">Back to Shop</span>}
          </Link>
        </div>
      </aside>
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
    </>
  );
};

export default AdminSidebar;
