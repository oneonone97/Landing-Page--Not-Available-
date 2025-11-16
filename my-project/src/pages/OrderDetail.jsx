import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';
import { normalizeImageGallery } from '../utils/imageUtils';
import ImageGallery from '../components/ImageGallery';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated && id) {
      loadOrder();
    }
  }, [isAuthenticated, id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await orderService.getOrderById(parseInt(id));
      
      if (response.success && response.order) {
        setOrder(response.order);
      } else {
        setError(response.message || 'Order not found');
        toast.error('Order not found');
      }
    } catch (err) {
      console.error('Error loading order:', err);
      setError(err.message || 'Failed to load order');
      toast.error('Failed to load order. Please try again.');
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

  const getPaymentGatewayLabel = (gateway) => {
    if (!gateway) return 'N/A';
    return gateway.charAt(0).toUpperCase() + gateway.slice(1);
  };

  if (!isAuthenticated) {
    return (
      <div className="container order-detail-page">
        <p>Please login to view order details.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container order-detail-page">
        <div className="loading-state">Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container order-detail-page">
        <div className="error-state">
          <h3>Order Not Found</h3>
          <p>{error || 'The order you are looking for does not exist.'}</p>
          <button className="btn-primary" onClick={() => navigate('/orders')}>
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container order-detail-page">
      <div className="order-detail-header">
        <button className="back-btn" onClick={() => navigate('/orders')}>
          ← Back to Orders
        </button>
        <h2>Order #{order.id}</h2>
        <span className={getStatusBadgeClass(order.status)}>
          {getStatusLabel(order.status)}
        </span>
      </div>

      <div className="order-detail-content">
        <div className="order-section">
          <h3>Order Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Order ID:</span>
              <span className="info-value">#{order.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Order Date:</span>
              <span className="info-value">{order.createdAt}</span>
            </div>
            {order.updatedAt && order.updatedAt !== order.createdAt && (
              <div className="info-item">
                <span className="info-label">Last Updated:</span>
                <span className="info-value">{order.updatedAt}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className={getStatusBadgeClass(order.status)}>
                {getStatusLabel(order.status)}
              </span>
            </div>
          </div>
        </div>

        <div className="order-section">
          <h3>Order Items</h3>
          <div className="items-list">
            {order.items.map((item, index) => {
              // Get image gallery from product if available
              const product = item.product || {};
              let imageGallery = product.image_gallery || 
                                product.images?.gallery || 
                                (product.image_url ? [product.image_url] : ['/placeholder.jpg']);
              
              // Normalize image gallery - preserves full URLs (Supabase), normalizes local paths
              const normalizedGallery = normalizeImageGallery(imageGallery);
              
              return (
                <div key={index} className="order-item">
                  <div className="order-item-image">
                    <ImageGallery 
                      images={normalizedGallery} 
                      alt={item.productName}
                      className="order-item-gallery"
                    />
                  </div>
                  <div className="item-info">
                    <h4>{item.productName}</h4>
                    {item.productDescription && (
                      <p className="item-description">{item.productDescription}</p>
                    )}
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-pricing">
                    <p className="item-unit-price">₹{item.unitPrice} each</p>
                    <p className="item-total-price">₹{item.totalPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order-total-section">
            <div className="total-row">
              <span className="total-label">Total Amount:</span>
              <span className="total-amount">₹{order.totalAmount}</span>
            </div>
            <p className="currency-note">Currency: {order.currency}</p>
          </div>
        </div>

        <div className="order-section">
          <h3>Shipping Address</h3>
          {order.address && typeof order.address === 'object' ? (
            <div className="address-details">
              <p><strong>{order.address.name || 'N/A'}</strong></p>
              {order.address.email && <p>{order.address.email}</p>}
              {order.address.phone && <p>{order.address.phone}</p>}
              {order.address.address && <p>{order.address.address}</p>}
              <p>
                {order.address.city && `${order.address.city}, `}
                {order.address.state && `${order.address.state} `}
                {order.address.pincode && `- ${order.address.pincode}`}
              </p>
            </div>
          ) : (
            <p className="no-address">Address information not available</p>
          )}
        </div>

        <div className="order-section">
          <h3>Payment Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Payment Gateway:</span>
              <span className="info-value">
                {getPaymentGatewayLabel(order.paymentGateway)}
              </span>
            </div>
            {order.phonepeMerchantTransactionId && (
              <div className="info-item">
                <span className="info-label">Merchant Transaction ID:</span>
                <span className="info-value">{order.phonepeMerchantTransactionId}</span>
              </div>
            )}
            {order.phonepeTransactionId && (
              <div className="info-item">
                <span className="info-label">Transaction ID:</span>
                <span className="info-value">{order.phonepeTransactionId}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

