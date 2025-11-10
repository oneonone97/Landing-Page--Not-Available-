import api from '../api';

/**
 * Admin Product Service
 * Handles all product-related admin API calls including image uploads
 * Separated from regular product service for proper code organization
 */
const productService = {
  /**
   * Create a new product with image upload
   * @param {Object} productData - Product data (name, description, price, category, stock, etc.)
   * @param {File} imageFile - Product image file
   * @returns {Promise} API response
   */
  async createProduct(productData, imageFile) {
    try {
      const formData = new FormData();
      
      // Append product data
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price); // In rupees
      if (productData.salePrice) {
        formData.append('salePrice', productData.salePrice);
      }
      formData.append('category', productData.category); // Category name or ID
      formData.append('stock', productData.stock);
      formData.append('featured', productData.featured || false);
      formData.append('is_new', productData.is_new || false);
      formData.append('is_sale', productData.is_sale || false);

      // Append image file if provided
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to create product';
    }
  },

  /**
   * Update an existing product
   * @param {number} productId - Product ID
   * @param {Object} productData - Updated product data
   * @param {File} imageFile - New product image file (optional)
   * @returns {Promise} API response
   */
  async updateProduct(productId, productData, imageFile) {
    try {
      const formData = new FormData();
      
      // Append product data
      if (productData.name) formData.append('name', productData.name);
      if (productData.description) formData.append('description', productData.description);
      if (productData.price !== undefined) formData.append('price', productData.price);
      if (productData.salePrice !== undefined) formData.append('salePrice', productData.salePrice);
      if (productData.category) formData.append('category', productData.category);
      if (productData.stock !== undefined) formData.append('stock', productData.stock);
      if (productData.featured !== undefined) formData.append('featured', productData.featured);
      if (productData.is_new !== undefined) formData.append('is_new', productData.is_new);
      if (productData.is_sale !== undefined) formData.append('is_sale', productData.is_sale);

      // Append image file if provided
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await api.put(`/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to update product';
    }
  },

  /**
   * Delete a product
   * @param {number} productId - Product ID
   * @returns {Promise} API response
   */
  async deleteProduct(productId) {
    try {
      const response = await api.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to delete product';
    }
  },

  /**
   * Get all categories
   * @returns {Promise} List of categories
   */
  async getCategories() {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to fetch categories';
    }
  },

  /**
   * Get all products with pagination (admin view)
   * @param {Object} params - Query parameters (page, limit, search, category, etc.)
   * @returns {Promise} Products list with pagination
   */
  async getAllProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to fetch products';
    }
  },

  /**
   * Get a single product by ID
   * @param {number} productId - Product ID
   * @returns {Promise} Product data
   */
  async getProduct(productId) {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Failed to fetch product';
    }
  },
};

export default productService;
