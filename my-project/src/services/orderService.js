import api from './api';
import { normalizeImageGallery, normalizeImagePath } from '../utils/imageUtils';

/**
 * Service for interacting with order API endpoints
 */
class OrderService {
  /**
   * Get user orders with optional filters
   * @param {Object} options - Query options (status, page, limit, sortBy, sortOrder)
   * @returns {Promise<Object>} Orders data with pagination
   */
  async getUserOrders(options = {}) {
    try {
      const params = {};
      if (options.status) params.status = options.status;
      if (options.page) params.page = options.page;
      if (options.limit) params.limit = options.limit;
      if (options.sortBy) params.sortBy = options.sortBy;
      if (options.sortOrder) params.sortOrder = options.sortOrder;

      const response = await api.get('/orders', { params });

      // Transform order data for frontend
      const orders = Array.isArray(response.data?.data) 
        ? response.data.data.map(order => this.transformOrder(order))
        : [];

      return {
        success: response.data?.success || true,
        orders: orders,
        count: response.data?.count || orders.length,
        pagination: response.data?.pagination || null
      };
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get single order by ID
   * @param {number} orderId - Order ID
   * @returns {Promise<Object>} Order data
   */
  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      
      if (response.data?.success && response.data?.data) {
        return {
          success: true,
          order: this.transformOrder(response.data.data)
        };
      }
      
      return {
        success: false,
        message: response.data?.message || 'Order not found'
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Transform order data from backend to frontend format
   * @param {Object} order - Raw order data from backend
   * @returns {Object} Transformed order data
   */
  transformOrder(order) {
    // Convert prices from paise to rupees
    const totalAmount = order.total_amount_paise 
      ? (order.total_amount_paise / 100).toFixed(2)
      : '0.00';

    // Transform order items
    const items = (order.items || []).map(item => {
      const product = item.Product || item.product || {};
      
      // Get image gallery from product if available
      let imageGallery = product.image_gallery || 
                        product.images?.gallery || 
                        (product.image_url ? [product.image_url] : ['/placeholder.jpg']);
      
      // Normalize image gallery - preserves full URLs (Supabase), normalizes local paths
      const normalizedGallery = normalizeImageGallery(imageGallery);
      
      return {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unit_price_paise 
          ? (item.unit_price_paise / 100).toFixed(2)
          : '0.00',
        totalPrice: item.unit_price_paise && item.quantity
          ? ((item.unit_price_paise * item.quantity) / 100).toFixed(2)
          : '0.00',
        productName: item.productName || 'Unknown Product',
        productDescription: item.productDescription || '',
        // Product details if included (with image gallery)
        product: product && Object.keys(product).length > 0 ? {
          ...product,
          image_gallery: normalizedGallery,
          images: {
            main: normalizeImagePath(normalizedGallery[0] || '/placeholder.jpg'),
            thumbnail: normalizeImagePath(normalizedGallery[0] || '/placeholder.jpg'),
            gallery: normalizedGallery
          }
        } : null
      };
    });

    // Parse address JSON if it's a string
    let address = order.address_json;
    if (typeof address === 'string') {
      try {
        address = JSON.parse(address);
      } catch (e) {
        console.warn('Failed to parse address_json:', e);
        address = {};
      }
    }

    // Format dates
    const createdAt = order.createdAt 
      ? new Date(order.createdAt).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '';

    const updatedAt = order.updatedAt
      ? new Date(order.updatedAt).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '';

    return {
      id: order.id,
      userId: order.userId,
      totalAmount,
      totalAmountPaise: order.total_amount_paise,
      currency: order.currency || 'INR',
      status: order.status || 'pending',
      address,
      items,
      paymentGateway: order.payment_gateway || null,
      phonepeMerchantTransactionId: order.phonepe_merchant_transaction_id || null,
      phonepeTransactionId: order.phonepe_transaction_id || null,
      createdAt,
      updatedAt,
      createdAtRaw: order.createdAt,
      updatedAtRaw: order.updatedAt
    };
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

export default new OrderService();

