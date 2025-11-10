import api from '../api';

/**
 * Admin Service
 * Handles general admin operations like dashboard statistics
 */
const adminService = {
  /**
   * Get dashboard statistics
   * @returns {Promise} Dashboard data
   */
  async getDashboardStats() {
    try {
      // Increase timeout for dashboard as it makes multiple queries
      const response = await api.get('/admin/dashboard', {
        timeout: 30000 // 30 seconds for dashboard queries
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to fetch dashboard stats';
    }
  },

  /**
   * Get inventory overview
   * @returns {Promise} Inventory data
   */
  async getInventoryOverview() {
    try {
      const response = await api.get('/admin/inventory');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to fetch inventory';
    }
  },

  /**
   * Get analytics data
   * @param {Object} params - Query parameters (startDate, endDate, period)
   * @returns {Promise} Analytics data
   */
  async getAnalytics(params = {}) {
    try {
      const response = await api.get('/admin/analytics', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to fetch analytics';
    }
  },
};

export default adminService;
