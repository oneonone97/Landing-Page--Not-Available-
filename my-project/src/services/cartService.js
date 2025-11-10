import api from './api';

class CartService {
  async ensureCsrf() {
    // Always fetch a fresh CSRF token because tokens are one-time-use and short-lived
    try {
      const res = await api.get('/csrf-token');
      const data = res?.data?.data;
      if (data?.csrfToken) localStorage.setItem('csrfToken', data.csrfToken);
      if (data?.sessionId) localStorage.setItem('sessionId', data.sessionId);
    } catch (error) {
      // Server will return 403 if CSRF is actually required
      console.warn('Failed to fetch CSRF token:', error?.response?.status || error?.message);
      // Re-throw the error to prevent the subsequent request from being made without a token
      throw error;
    }
  }

  // Get user's cart
  async getCart() {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add item to cart
  async addToCart(productId, quantity = 1) {
    try {
      await this.ensureCsrf();
      console.log('Adding to cart:', { productId, quantity });
      const response = await api.post('/cart', {
        productId,
        quantity,
      });
      console.log('Cart response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Cart service error:', error);
      throw this.handleError(error);
    }
  }

  // Update cart item quantity
  async updateCartItem(itemId, quantity) {
    try {
      await this.ensureCsrf();
      const response = await api.put(`/cart/${itemId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Remove item from cart
  async removeCartItem(itemId) {
    try {
      await this.ensureCsrf();
      const response = await api.delete(`/cart/${itemId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Clear entire cart
  async clearCart() {
    try {
      await this.ensureCsrf();
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      return {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        message: 'No response from server. Please check your connection.',
        status: 0,
      };
    } else {
      return {
        message: error.message || 'An error occurred',
        status: 0,
      };
    }
  }
}

export default new CartService();
