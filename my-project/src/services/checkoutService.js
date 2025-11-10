import api from './api';

/**
 * Checkout Service
 * 
 * Handles all checkout-related API calls
 */
const checkoutService = {
  /**
   * Ensure CSRF token is available before making POST requests
   */
  async ensureCsrf() {
    // Always fetch a fresh CSRF token because tokens are one-time-use and short-lived
    try {
      const res = await api.get('/csrf-token');
      const data = res?.data?.data;
      if (data?.csrfToken) localStorage.setItem('csrfToken', data.csrfToken);
      if (data?.sessionId) localStorage.setItem('sessionId', data.sessionId);
    } catch (error) {
      console.warn('Failed to fetch CSRF token:', error?.response?.status || error?.message);
      // Re-throw the error to prevent the subsequent request from being made without a token
      throw error;
    }
  },

  /**
   * Create order and initiate payment
   * @param {Array} items - Cart items
   * @param {Object} address - Shipping address
   * @returns {Promise<Object>} Order creation response with payment URL
   */
  async createOrder(items, address) {
    try {
      // Fetch fresh CSRF token before making the request
      await this.ensureCsrf();
      
      const response = await api.post('/checkout/create-order', {
        items,
        address
      });

      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        message: error.response?.data?.error?.message || error.message || 'Failed to create order',
        error: error.response?.data?.error || error
      };
    }
  },

  /**
   * Verify payment after redirect
   * @param {Object} paymentData - Payment data from gateway
   * @param {number} orderId - Order ID
   * @returns {Promise<Object>} Payment verification result
   */
  async verifyPayment(paymentData, orderId) {
    try {
      // Fetch fresh CSRF token before making the request
      await this.ensureCsrf();
      
      const response = await api.post('/checkout/verify', {
        ...paymentData,
        orderId
      });

      return {
        success: response.data.success,
        data: response.data.data,
        message: response.data.data?.message || 'Payment verified'
      };
    } catch (error) {
      console.error('Error verifying payment:', error);
      return {
        success: false,
        message: error.response?.data?.error?.message || error.message || 'Failed to verify payment',
        error: error.response?.data?.error || error
      };
    }
  },

  /**
   * Check payment status
   * @param {string} merchantTransactionId - Merchant transaction ID
   * @returns {Promise<Object>} Payment status
   */
  async checkPaymentStatus(merchantTransactionId) {
    try {
      const response = await api.get(`/checkout/payment-status/${merchantTransactionId}`);

      return {
        success: response.data.success,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error checking payment status:', error);
      return {
        success: false,
        message: error.response?.data?.error?.message || error.message || 'Failed to check payment status',
        error: error.response?.data?.error || error
      };
    }
  },

  /**
   * Get payment gateway configuration
   * @returns {Promise<Object>} Gateway configuration
   */
  async getConfig() {
    try {
      const response = await api.get('/checkout/config');

      return {
        success: response.data.success,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error getting payment config:', error);
      return {
        success: false,
        message: error.response?.data?.error?.message || error.message || 'Failed to get payment configuration',
        error: error.response?.data?.error || error
      };
    }
  }
};

export default checkoutService;

