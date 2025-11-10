import api from './api';

class ProductService {
  // Get all products with pagination and filters
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      const body = response?.data || {};
      // Debug: inspect backend response shape and count
      console.debug('[productService.getProducts] raw body:', body);
      const count = Array.isArray(body?.data) ? body.data.length : 0;
      console.debug('[productService.getProducts] products count:', count);
      // Backend returns { success, data: products[], pagination }
      const toUiProduct = (p) => {
        if (!p || typeof p !== 'object') return p;
        const pricePaise = typeof p.price_paise === 'number' ? p.price_paise : 0;
        const salePaise = typeof p.sale_price_paise === 'number' ? p.sale_price_paise : null;
        const finalPaise = salePaise ?? pricePaise;
        const discountPct = salePaise && pricePaise
          ? Math.max(0, Math.round(100 - (salePaise / pricePaise) * 100))
          : 0;
        return {
          id: p.id,
          name: p.name,
          slug: p.slug || undefined,
          category: p.category,
          description: p.description,
          images: {
            // Ensure all image paths start with / for frontend
            main: (() => {
              const img = p.images?.main || p.image_gallery?.[0] || p.image_url || '/placeholder.jpg';
              return img.startsWith('/') ? img : `/${img}`;
            })(),
            thumbnail: (() => {
              const img = p.images?.thumbnail || p.image_gallery?.[0] || p.image_url || '/placeholder.jpg';
              return img.startsWith('/') ? img : `/${img}`;
            })(),
            gallery: (() => {
              const gallery = p.images?.gallery || p.image_gallery || (p.image_url ? [p.image_url] : ['/placeholder.jpg']);
              // Ensure all gallery images have leading slash
              return Array.isArray(gallery) 
                ? gallery.map(img => img.startsWith('/') ? img : `/${img}`)
                : ['/placeholder.jpg'];
            })()
          },
          pricing: {
            basePrice: pricePaise / 100,
            finalPrice: finalPaise / 100,
            discount: discountPct > 0 ? (pricePaise - finalPaise) / 100 : 0,
            discountPercentage: discountPct,
            currency: 'INR'
          },
          inventory: {
            stock: typeof p.stock === 'number' ? p.stock : 0,
            inStock: (typeof p.stock === 'number' ? p.stock : 0) > 0
          },
          reviews: {
            average: 0,
            count: 0
          },
          metadata: {
            isFeatured: !!p.featured,
            isNew: !!p.is_new,
            isSale: !!p.is_sale
          }
        };
      };
      const mapped = Array.isArray(body?.data) ? body.data.map(toUiProduct) : [];
      return {
        success: !!body?.success,
        products: mapped,
        pagination: body?.pagination ?? null,
        cached: body?.cached ?? false,
        message: body?.message,
      };
    } catch (error) {
      console.warn('[productService.getProducts] error:', error);
      throw this.handleError(error);
    }
  }

  // Get single product by ID
  async getProduct(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search products
  async searchProducts(query, params = {}) {
    try {
      const response = await api.get('/products/search', {
        params: { q: query, ...params },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get product categories
  async getCategories() {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get new products
  async getNewProducts(limit = 10) {
    try {
      const response = await api.get('/products/new', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get sale products
  async getSaleProducts(limit = 10) {
    try {
      const response = await api.get('/products/sale', {
        params: { limit },
      });
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

export default new ProductService();
