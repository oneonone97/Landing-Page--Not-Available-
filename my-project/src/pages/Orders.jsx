import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';
import './Orders.css';

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated, statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const options = {};
      if (statusFilter !== 'all') {
        options.status = statusFilter;
      }
      
      const response = await orderService.getUserOrders(options);
      
      if (response.success) {
        setOrders(response.orders || []);
      } else {
        setError('Failed to load orders');
      }
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err.message || 'Failed to load orders');
      toast.error('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'paid':
        return 'status-badge status-paid';
      case 'pending':
        return 'status-badge status-pending';
      case 'failed':
        return 'status-badge status-failed';
      case 'cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="container orders-page">
        <h2>My Orders</h2>
        <p>Please login to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container orders-page">
        <h2>My Orders</h2>
        <div className="loading-state">Loading your orders...</div>
      </div>
    );
  }

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="container orders-page">
      <div className="orders-header">
        <h2>My Orders</h2>
        <div className="filter-controls">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>You haven't placed any orders yet</h3>
          <p>Start shopping to see your orders here!</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/shop')}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className="order-card"
              onClick={() => handleOrderClick(order.id)}
            >
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{order.createdAt}</p>
                </div>
                <span className={getStatusBadgeClass(order.status)}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="order-items">
                <p className="items-count">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </p>
                <div className="items-preview">
                  {order.items.slice(0, 3).map((item, index) => (
                    <span key={index} className="item-name">
                      {item.productName} {item.quantity > 1 && `(x${item.quantity})`}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="more-items">+{order.items.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">₹{order.totalAmount}</span>
                </div>
                <button className="view-details-btn">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

