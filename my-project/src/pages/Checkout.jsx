import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import checkoutService from '../services/checkoutService';
import toast from 'react-hot-toast';
import { getItemPriceInRupees } from '../utils/priceUtils';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, loading: cartLoading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSavedAddress, setHasSavedAddress] = useState(false);

  // Pre-fill form with user data and saved address if available
  useEffect(() => {
    // First, try to load saved address from localStorage
    const savedAddress = localStorage.getItem('checkout_address');
    if (savedAddress) {
      try {
        const addressData = JSON.parse(savedAddress);
        setFormData(prev => ({
          ...prev,
          ...addressData
        }));
        setHasSavedAddress(true);
        console.log('✅ Loaded saved address from localStorage');
      } catch (error) {
        console.error('Error loading saved address:', error);
        localStorage.removeItem('checkout_address');
        setHasSavedAddress(false);
      }
    } else {
      setHasSavedAddress(false);
    }
    
    // Then, pre-fill with user data if available (but don't overwrite saved address)
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && (!cart || !cart.items || cart.items.length === 0)) {
      navigate('/cart');
    }
  }, [cart, cartLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode (6 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare items for checkout
      // Backend expects prices in paise, and cart items already have prices in paise
      const items = cart.items.map(item => {
        const product = item.Product || item.product || {};
        // Price from backend is already in paise, use it directly
        const priceInPaise = typeof item.price === 'number' 
          ? item.price 
          : parseFloat(item.price) || 0;

        return {
          productId: item.productId || product.id,
          quantity: item.quantity,
          price: priceInPaise // Already in paise from backend
        };
      });

      // Prepare address
      const address = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      };

      // Save address to localStorage before creating order
      // This allows user to return without filling address again if payment fails/cancelled
      try {
        localStorage.setItem('checkout_address', JSON.stringify(address));
        console.log('💾 Saved address to localStorage for future use');
      } catch (error) {
        console.warn('Failed to save address to localStorage:', error);
        // Continue even if localStorage save fails
      }

      // Create order
      const result = await checkoutService.createOrder(items, address);

      if (result.success && result.data.paymentUrl) {
        // Address is already saved, now redirect to payment gateway
        // Address will be cleared only after successful payment
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error(result.message || 'Failed to create order');
        setIsSubmitting(false);
        // Don't clear saved address on order creation failure - user might want to retry
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (cartLoading || !cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container checkout-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Calculate total (assuming prices are in rupees)
  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="container checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-layout">
        <div className="checkout-form-section">
          <h3>Shipping Address</h3>
          {hasSavedAddress && (
            <div className="address-restored-notice" style={{
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#e8f5e9',
              border: '1px solid #4caf50',
              borderRadius: '4px',
              color: '#2e7d32',
              fontSize: '14px'
            }}>
              ✓ Your address has been restored. You can edit it if needed.
            </div>
          )}
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                required
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                rows="3"
                required
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                  required
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={errors.state ? 'error' : ''}
                  required
                />
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={errors.pincode ? 'error' : ''}
                maxLength="6"
                required
              />
              {errors.pincode && <span className="error-message">{errors.pincode}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-checkout-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cart.items.map(item => {
              const product = item.Product || item.product || {};
              const productName = product.name || 'Unknown Product';
              // Price from backend is in paise, convert to rupees for display
              const priceInRupees = getItemPriceInRupees(item);
              const itemTotal = priceInRupees * item.quantity;

              return (
                <div key={item.id} className="order-item">
                  <div className="order-item-info">
                    <span className="order-item-name">{productName}</span>
                    <span className="order-item-quantity">Qty: {item.quantity}</span>
                  </div>
                  <span className="order-item-price">₹{itemTotal.toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="total-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

