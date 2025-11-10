import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/admin/adminService';
import './AdminDashboard.css';

/**
 * AdminDashboard Page
 * Main dashboard showing overview statistics and quick actions
 * Modern, responsive design with improved UX
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getDashboardStats();
      setStats(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard statistics');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹0.00';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-error">
          <div className="error-icon">⚠️</div>
          <h3>Unable to Load Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchDashboardStats} className="btn-retry">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Dashboard Overview</h1>
            <p className="header-subtitle">Welcome back! Here's what's happening with your store today.</p>
          </div>
          <button onClick={fetchDashboardStats} className="btn-refresh" aria-label="Refresh dashboard">
            <span className="refresh-icon">↻</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="dashboard-summary">
        <div className="summary-card card-products">
          <div className="card-background"></div>
          <div className="card-content">
            <div className="card-header">
              <div className="card-icon-wrapper">
                <span className="card-icon">📦</span>
              </div>
              <Link to="/admin/products" className="card-link" aria-label="View all products">
                <span>View All</span>
                <span className="arrow">→</span>
              </Link>
            </div>
            <div className="card-body">
              <h3 className="card-value">{stats?.inventory?.totalProducts || 0}</h3>
              <p className="card-label">Total Products</p>
            </div>
            {stats?.inventory?.lowStockCount > 0 && (
              <div className="card-footer">
                <span className="card-alert">{stats.inventory.lowStockCount} low stock</span>
              </div>
            )}
          </div>
        </div>

        <div className="summary-card card-orders">
          <div className="card-background"></div>
          <div className="card-content">
            <div className="card-header">
              <div className="card-icon-wrapper">
                <span className="card-icon">🛒</span>
              </div>
              <Link to="/admin/orders" className="card-link" aria-label="View all orders">
                <span>View All</span>
                <span className="arrow">→</span>
              </Link>
            </div>
            <div className="card-body">
              <h3 className="card-value">{stats?.summary?.monthlyOrders || 0}</h3>
              <p className="card-label">Monthly Orders</p>
            </div>
            {stats?.summary?.todayOrders > 0 && (
              <div className="card-footer">
                <span className="card-info">{stats.summary.todayOrders} today</span>
              </div>
            )}
          </div>
        </div>

        <div className="summary-card card-revenue">
          <div className="card-background"></div>
          <div className="card-content">
            <div className="card-header">
              <div className="card-icon-wrapper">
                <span className="card-icon">💰</span>
              </div>
            </div>
            <div className="card-body">
              <h3 className="card-value">{formatCurrency((stats?.summary?.monthlyRevenue || 0) / 100)}</h3>
              <p className="card-label">Monthly Revenue</p>
            </div>
            {stats?.summary?.todayRevenue > 0 && (
              <div className="card-footer">
                <span className="card-info">₹{((stats.summary.todayRevenue || 0) / 100).toFixed(2)} today</span>
              </div>
            )}
          </div>
        </div>

        <div className="summary-card card-alerts">
          <div className="card-background"></div>
          <div className="card-content">
            <div className="card-header">
              <div className="card-icon-wrapper">
                <span className="card-icon">⚠️</span>
              </div>
              <Link to="/admin/inventory" className="card-link" aria-label="View inventory alerts">
                <span>View All</span>
                <span className="arrow">→</span>
              </Link>
            </div>
            <div className="card-body">
              <h3 className="card-value">{stats?.alerts?.lowStockCount || 0}</h3>
              <p className="card-label">Low Stock Items</p>
            </div>
            {stats?.alerts?.outOfStockCount > 0 && (
              <div className="card-footer">
                <span className="card-alert critical">{stats.alerts.outOfStockCount} out of stock</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Orders Grid */}
      <div className="dashboard-grid">
        {/* Quick Actions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
            <p className="section-subtitle">Common tasks and shortcuts</p>
          </div>
          <div className="quick-actions">
            <Link to="/admin/products/new" className="action-card">
              <div className="action-icon-wrapper">
                <span className="action-icon">➕</span>
              </div>
              <div className="action-content">
                <h3>Add New Product</h3>
                <p>Create a new product in your inventory</p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <Link to="/admin/products" className="action-card">
              <div className="action-icon-wrapper">
                <span className="action-icon">📦</span>
              </div>
              <div className="action-content">
                <h3>Manage Products</h3>
                <p>View and edit existing products</p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <Link to="/admin/orders" className="action-card">
              <div className="action-icon-wrapper">
                <span className="action-icon">🛒</span>
              </div>
              <div className="action-content">
                <h3>View Orders</h3>
                <p>Manage customer orders</p>
              </div>
              <span className="action-arrow">→</span>
            </Link>

            <Link to="/admin/inventory" className="action-card">
              <div className="action-icon-wrapper">
                <span className="action-icon">📋</span>
              </div>
              <div className="action-content">
                <h3>Inventory</h3>
                <p>Check stock levels and updates</p>
              </div>
              <span className="action-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        {stats?.lists?.recentOrders && stats.lists.recentOrders.length > 0 && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <Link to="/admin/orders" className="section-link">View All →</Link>
            </div>
            <div className="recent-orders">
              {stats.lists.recentOrders.slice(0, 5).map((order, index) => (
                <div key={order.id || index} className="order-item">
                  <div className="order-info">
                    <div className="order-id-wrapper">
                      <span className="order-id">#{order.id}</span>
                      <span className="order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    {order.total_amount_paise && (
                      <span className="order-amount">
                        {formatCurrency((order.total_amount_paise || 0) / 100)}
                      </span>
                    )}
                  </div>
                  <div className="order-status-wrapper">
                    <span className={`status-badge status-${order.status?.toLowerCase() || 'pending'}`}>
                      {order.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
