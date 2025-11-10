import api from './api';

/**
 * Service for interacting with wishlist API endpoints
 */
class WishlistService {
  /**
   * Ensure CSRF token is available before making POST/DELETE requests
   */
  async ensureCsrf() {
    try {
      const res = await api.get('/csrf-token');
      const data = res?.data?.data;
      if (data?.csrfToken) {
        localStorage.setItem('csrfToken', data.csrfToken);
      }
      if (data?.sessionId) {
        localStorage.setItem('sessionId', data.sessionId);
      }
    } catch (error) {
      console.warn('Failed to fetch CSRF token:', error?.response?.status || error?.message);
      throw error;
    }
  }

  /**
   * Get default wishlist for current user
   * @returns {Promise<Object>} Wishlist data with items
   */
  async getDefaultWishlist() {
    try {
      const response = await api.get('/wishlists/default');
      return {
        success: response.data?.success || true,
        data: response.data?.data || response.data,
        message: response.data?.message
      };
    } catch (error) {
      console.error('Error fetching default wishlist:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get all wishlists for current user
   * @returns {Promise<Object>} Array of wishlists
   */
  async getWishlists() {
    try {
      const response = await api.get('/wishlists');
      return {
        success: response.data?.success || true,
        data: response.data?.data || response.data,
        count: response.data?.count || 0
      };
    } catch (error) {
      console.error('Error fetching wishlists:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Add product to wishlist
   * @param {number} productId - Product ID to add
   * @param {number} wishlistId - Wishlist ID (default wishlist if not provided)
   * @returns {Promise<Object>} Success response
   */
  async addToWishlist(productId, wishlistId = null) {
    try {
      await this.ensureCsrf();

      // If wishlistId not provided, get default wishlist first
      let targetWishlistId = wishlistId;
      if (!targetWishlistId) {
        const defaultWishlist = await this.getDefaultWishlist();
        if (defaultWishlist.success && defaultWishlist.data?.id) {
          targetWishlistId = defaultWishlist.data.id;
        } else {
          throw new Error('Could not get default wishlist');
        }
      }

      const response = await api.post(`/wishlists/${targetWishlistId}/items`, {
        productId: parseInt(productId)
      });

      return {
        success: response.data?.success || true,
        data: response.data?.data || response.data,
        message: response.data?.message || 'Product added to wishlist'
      };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Remove product from wishlist
   * @param {number} productId - Product ID to remove
   * @param {number} wishlistId - Wishlist ID (default wishlist if not provided)
   * @returns {Promise<Object>} Success response
   */
  async removeFromWishlist(productId, wishlistId = null) {
    try {
      await this.ensureCsrf();

      // If wishlistId not provided, get default wishlist first
      let targetWishlistId = wishlistId;
      if (!targetWishlistId) {
        const defaultWishlist = await this.getDefaultWishlist();
        if (defaultWishlist.success && defaultWishlist.data?.id) {
          targetWishlistId = defaultWishlist.data.id;
        } else {
          throw new Error('Could not get default wishlist');
        }
      }

      const response = await api.delete(`/wishlists/${targetWishlistId}/items/${productId}`);

      return {
        success: response.data?.success || true,
        message: response.data?.message || 'Product removed from wishlist'
      };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @returns {Error} Formatted error
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 
                     error.response.data?.error?.message || 
                     'An error occurred';
      const statusCode = error.response.status;
      const errorObj = new Error(message);
      errorObj.statusCode = statusCode;
      errorObj.response = error.response;
      return errorObj;
    } else if (error.request) {
      // Request made but no response
      return new Error('Network error. Please check your connection.');
    } else {
      // Error in request setup
      return error;
    }
  }
}

export default new WishlistService();

