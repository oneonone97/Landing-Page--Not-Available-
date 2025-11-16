import React, { useState, useRef } from 'react';
import './ProductCard.css';
import Button from './Button';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { normalizeImagePath } from '../utils/imageUtils';

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  
  const productId = product.id;
  const inWishlist = isInWishlist(productId);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      return;
    }
    
    setWishlistLoading(true);
    try {
      await toggleWishlist(productId);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };
  // Handle both frontend and backend data structures for price
  const finalPrice = product.price || product.pricing?.finalPrice || (product.price_paise ? product.price_paise / 100 : 0);
  const basePrice = product.sale_price || product.pricing?.basePrice || (product.sale_price_paise ? product.sale_price_paise / 100 : finalPrice);
  const hasDiscount = product.pricing?.discountPercentage > 0 || (product.sale_price_paise && product.sale_price_paise < product.price_paise);
  
  // Extract image gallery array from product data (support multiple formats)
  const getImageGallery = () => {
    // Support product.images.gallery (array)
    if (product.images?.gallery && Array.isArray(product.images.gallery) && product.images.gallery.length > 0) {
      return product.images.gallery;
    }
    // Support product.images if it's an array directly
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    // Fallback to single image
    const singleImage = product.images?.main || product.image_url || '/placeholder.jpg';
    return [singleImage];
  };

  const imageGallery = getImageGallery();
  const hasMultipleImages = imageGallery.length > 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Touch/swipe support
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const minSwipeDistance = 50;

  // Navigation functions
  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageGallery.length);
  };

  const handlePrevious = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (!hasMultipleImages) return;
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchMove = (e) => {
    if (!hasMultipleImages || touchStartX.current === null) return;
    e.preventDefault(); // Prevent scrolling during swipe
  };

  const handleTouchEnd = (e) => {
    if (!hasMultipleImages || touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    
    // Check if horizontal swipe is greater than vertical (horizontal swipe)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Normalize image URL - preserves full URLs (Supabase), normalizes local paths
  const currentImageUrl = normalizeImagePath(
    imageGallery[currentImageIndex] || '/placeholder.jpg'
  );

  return (
    <div className="product-card">
      <div className="product-card-inner">
        <div 
          className="product-image"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={currentImageUrl}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            loading="lazy"
            className="product-image-main"
            onError={(e) => {
              const svg = encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>` +
                `<rect width='400' height='400' fill='#f2f2f2'/>` +
                `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='#999'>Image not available</text>` +
                `</svg>`
              );
              e.currentTarget.src = `data:image/svg+xml;charset=UTF-8,${svg}`;
              e.currentTarget.onerror = null;
            }}
          />
          
          {/* Navigation Arrow Buttons - Only show when multiple images */}
          {hasMultipleImages && (
            <>
              <button
                className="image-nav-btn image-nav-btn-prev"
                onClick={handlePrevious}
                aria-label="Previous image"
                type="button"
              >
                <span className="nav-arrow">‹</span>
              </button>
              <button
                className="image-nav-btn image-nav-btn-next"
                onClick={handleNext}
                aria-label="Next image"
                type="button"
              >
                <span className="nav-arrow">›</span>
              </button>
            </>
          )}

          {/* Dot Indicators - Only show when multiple images */}
          {hasMultipleImages && (
            <div className="image-dots">
              {imageGallery.map((_, index) => (
                <button
                  key={index}
                  className={`image-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          )}

          {product.metadata?.isNew || product.is_new ? <span className="badge badge-new">New</span> : null}
          {hasDiscount && (
            <span className="badge badge-sale">
              -{product.pricing?.discountPercentage || Math.round(((product.price_paise - product.sale_price_paise) / product.price_paise) * 100)}%
            </span>
          )}
          
          {/* Wishlist Button */}
          {isAuthenticated && (
            <button
              className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              type="button"
            >
              {inWishlist ? '❤️' : '♡'}
            </button>
          )}
        </div>

        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">
            {typeof product.category === 'object' && product.category !== null
              ? product.category.name || product.category.slug || 'Uncategorized'
              : product.category || 'Uncategorized'}
          </p>

          <div className="price-box">
            {hasDiscount && (
              <span className="old-price">₹{basePrice}</span>
            )}
            <span className="price">₹{finalPrice}</span>
          </div>

          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={index < Math.floor(product.reviews?.average || product.rating || 0) ? 'star filled' : 'star'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="review-count">({product.reviews?.count || product.review_count || 0})</span>
          </div>

          <div className="action-buttons">
            <Button
              variant="primary"
              size="small"
              fullWidth
              onClick={() => onAddToCart && onAddToCart(product)}
              className="btn-add-to-cart"
            >
              Add to Cart
            </Button>
            {onQuickView && (
              <button
                className="btn-quick-view"
                onClick={() => onQuickView(product)}
                aria-label="Quick View"
              >
                Quick View
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
