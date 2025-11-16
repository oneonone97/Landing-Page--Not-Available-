import React, { useEffect, useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { normalizeImageGallery, normalizeImagePath } from '../utils/imageUtils';
import './Wishlist.css';

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { wishlist, loading, removeFromWishlist, loadWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    }
  }, [isAuthenticated, loadWishlist]);

  const handleRemoveFromWishlist = async (productId) => {
    setRemovingId(productId);
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const result = await addToCart(product.id, 1);
      if (result.success) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.error(result.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  // Transform wishlist items to product format for ProductCard
  const transformWishlistItem = (item) => {
    const product = item.product || {};
    const pricePaise = product.price_paise || product.price || 0;
    const salePaise = product.sale_price_paise || product.sale_price || null;
    const finalPaise = salePaise ?? pricePaise;
    
    // Get image gallery from backend (image_gallery or images.gallery)
    // Backend now provides image_gallery array with all images
    let imageGallery = product.image_gallery || product.images?.gallery;
    
    // If no gallery from backend, fallback to single image
    if (!imageGallery || !Array.isArray(imageGallery) || imageGallery.length === 0) {
      const singleImage = product.image_url || '/placeholder.jpg';
      imageGallery = [singleImage];
    }
    
    // Normalize image gallery - preserves full URLs (Supabase), normalizes local paths
    const normalizedGallery = normalizeImageGallery(imageGallery);
    
    const mainImage = normalizedGallery[0] || '/placeholder.jpg';
    
    return {
      id: product.id || item.productId,
      name: product.name || 'Unknown Product',
      category: product.category || 'Uncategorized',
      description: product.description || '',
      price_paise: pricePaise,
      sale_price_paise: salePaise,
      price: finalPaise / 100,
      pricing: {
        basePrice: pricePaise / 100,
        finalPrice: finalPaise / 100,
        discountPercentage: salePaise && pricePaise 
          ? Math.round(100 - (salePaise / pricePaise) * 100)
          : 0
      },
      images: {
        main: mainImage,
        thumbnail: mainImage,
        gallery: normalizedGallery
      },
      inventory: {
        stock: product.stock || 0,
        inStock: (product.stock || 0) > 0
      },
      reviews: {
        average: 0,
        count: 0
      },
      metadata: {
        isNew: product.is_new || false,
        isSale: !!salePaise,
        isFeatured: product.featured || false
      }
    };
  };

  if (!isAuthenticated) {
    return (
      <div className="container wishlist-page">
        <h2>Wishlist</h2>
        <p>Please login to view your wishlist.</p>
      </div>
    );
  }

  if (loading && !wishlist) {
    return (
      <div className="container wishlist-page">
        <h2>Wishlist</h2>
        <div className="loading-state">Loading your wishlist...</div>
      </div>
    );
  }

  const items = wishlist?.items || [];
  const products = items.map(transformWishlistItem);

  return (
    <div className="container wishlist-page">
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        {wishlist && (
          <p className="wishlist-count">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♡</div>
          <h3>Your wishlist is empty</h3>
          <p>Start adding products you love to your wishlist!</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/shop'}
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {products.map((product) => (
            <div key={product.id} className="wishlist-item-wrapper">
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
              />
              <button
                className="remove-from-wishlist-btn"
                onClick={() => handleRemoveFromWishlist(product.id)}
                disabled={removingId === product.id}
                aria-label="Remove from wishlist"
              >
                {removingId === product.id ? 'Removing...' : 'Remove from Wishlist'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

