import React, { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import QuickViewModal from '../components/QuickViewModal'; // Import the new component
import productsData from '../data/products.json';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart: addToCartContext } = useCart();
  const [products, setProducts] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [useBackend, setUseBackend] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Add state for quick view
  const [_isRefreshing, setIsRefreshing] = useState(false);
  const productsRef = useRef(products); // Use ref to access current products without dependency

  // Update ref when products change
  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  // Try to load products from backend, fallback to local data
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 Attempting to load products from backend...');
      const response = await productService.getProducts({ limit: 20 });
      console.log('📦 Backend response:', response);
      if (response.success && response.products && response.products.length > 0) {
        console.log('✅ Using backend data, products count:', response.products.length);
        setProducts(response.products);
        setUseBackend(true);
      } else {
        console.log('⚠️ Backend response empty, falling back to local data');
        setProducts(productsData);
        setUseBackend(false);
      }
    } catch (err) {
      console.log('❌ Backend not available, using local data:', err);
      setProducts(productsData);
      setUseBackend(false);
    } finally {
      setLoading(false);
    }
  };

  // Refresh products (used for auto-refresh, doesn't show loading state)
  const refreshProducts = useCallback(async () => {
    // Only refresh if using backend and page is visible
    if (!useBackend || document.visibilityState !== 'visible') {
      return;
    }

    try {
      setIsRefreshing(true);
      const response = await productService.getProducts({ limit: 20 });
      
      if (response.success && response.products && response.products.length > 0) {
        // Compare product IDs to detect changes using ref to avoid stale closure
        const currentProductIds = new Set(productsRef.current.map(p => p.id));
        const newProductIds = new Set(response.products.map(p => p.id));
        
        // Check if products have changed
        const hasChanged = 
          currentProductIds.size !== newProductIds.size ||
          [...newProductIds].some(id => !currentProductIds.has(id)) ||
          [...currentProductIds].some(id => !newProductIds.has(id));

        if (hasChanged) {
          console.log('🔄 Products updated, refreshing display...');
          setProducts(response.products);
          // Optionally show a subtle notification (non-intrusive)
          // toast.success('New products available!', { duration: 2000 });
        }
      }
    } catch (err) {
      // Silently fail during auto-refresh to avoid disrupting user
      console.log('Auto-refresh failed (non-critical):', err);
    } finally {
      setIsRefreshing(false);
    }
  }, [useBackend]);

  // Auto-refresh products every 30 seconds (only when page is visible)
  useEffect(() => {
    // Only set up auto-refresh if using backend
    if (!useBackend) {
      return;
    }

    let intervalId = null;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Page became visible, resume refresh
        if (!intervalId) {
          intervalId = setInterval(() => {
            refreshProducts();
          }, 30000); // 30 seconds
        }
      } else {
        // Page became hidden, pause refresh
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    };

    // Set up initial interval if page is visible
    if (document.visibilityState === 'visible') {
      intervalId = setInterval(() => {
        refreshProducts();
      }, 30000); // 30 seconds
    }

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [useBackend, refreshProducts]);

  const featuredProducts = products.filter(p => p.metadata?.isFeatured || p.isFeatured);
  const newArrivals = products.filter(p => p.metadata?.isNew || p.isNew);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    // Check if product ID is valid for backend (must be numeric, not "prod_xxx")
    const isLocalProduct = typeof product.id === 'string' && product.id.startsWith('prod_');
    
    if (isLocalProduct) {
      toast.error('This product is not available in the backend. Please use products from the backend database.');
      return;
    }

    if (useBackend) {
      try {
        const result = await addToCartContext(product.id, 1);
        if (result.success) {
          toast.success(`${product.name} added to cart!`);
        } else {
          toast.error(result.message || 'Failed to add to cart');
        }
      } catch (error) {
        // Handle specific error messages
        const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to add to cart. Please try again.';
        if (errorMessage.includes('Product not found')) {
          toast.error('Product not found in database. Please refresh the page.');
        } else if (errorMessage.includes('Cart not found')) {
          toast.error('Cart error. Please try again.');
        } else {
          toast.error(errorMessage);
        }
      }
    } else {
      toast.error('Backend not available. Cannot add items to cart.');
    }
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product); // Open the modal with the selected product
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Close the modal
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Not Available</h1>
            <p className="hero-subtitle">
              Discover premium quality products for your home and lifestyle
            </p>
            <div className="hero-buttons">
              <Button variant="primary" size="large">
                Shop Now
              </Button>
              <Button variant="secondary" size="large">
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section className="policy-section">
        <div className="container">
          <div className="policy-grid">
            <div className="policy-item">
              <div className="policy-icon">🚚</div>
              <div className="policy-content">
                <h4>Free Shipping</h4>
                <p>On orders above ₹500</p>
              </div>
            </div>
            <div className="policy-item">
              <div className="policy-icon">🔄</div>
              <div className="policy-content">
                <h4>Easy Returns</h4>
                <p>30 days return policy</p>
              </div>
            </div>
            <div className="policy-item">
              <div className="policy-icon">🎁</div>
              <div className="policy-content">
                <h4>Gift Cards</h4>
                <p>Perfect gift for loved ones</p>
              </div>
            </div>
            <div className="policy-item">
              <div className="policy-icon">💳</div>
              <div className="policy-content">
                <h4>Secure Payment</h4>
                <p>100% secure transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked items just for you</p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="products-section new-arrivals">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Latest additions to our collection</p>
            </div>

            <div className="products-grid">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Banner */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
          </div>

          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <div className="category-placeholder" style={{background: '#5492db'}}>
                  Kitchen
                </div>
              </div>
              <h3>Kitchen</h3>
            </div>

            <div className="category-card">
              <div className="category-image">
                <div className="category-placeholder" style={{background: '#8B4513'}}>
                  Personal Care
                </div>
              </div>
              <h3>Personal Care</h3>
            </div>

            <div className="category-card">
              <div className="category-image">
                <div className="category-placeholder" style={{background: '#90EE90'}}>
                  Cleaning
                </div>
              </div>
              <h3>Cleaning</h3>
            </div>

            <div className="category-card">
              <div className="category-image">
                <div className="category-placeholder" style={{background: '#B8860B'}}>
                  Drinkware
                </div>
              </div>
              <h3>Drinkware</h3>
            </div>

            <div className="category-card">
              <div className="category-image">
                <div className="category-placeholder" style={{background: '#CD7F32'}}>
                  Religious
                </div>
              </div>
              <h3>Religious Items</h3>
            </div>

            <div className="category-card">
              <div className="category-image">
                <div className="category-placeholder" style={{background: '#FF6347'}}>
                  Bags
                </div>
              </div>
              <h3>Bags</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates on new products and special offers</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <Button variant="primary" size="medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;