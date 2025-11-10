import React, { useState, useRef } from 'react';
import './ImageGallery.css';

/**
 * Reusable Image Gallery Component
 * Displays multiple product images with navigation
 * @param {Array} images - Array of image URLs
 * @param {string} alt - Alt text for images
 * @param {string} className - Additional CSS classes
 */
const ImageGallery = ({ images = [], alt = 'Product image', className = '' }) => {
  const imageGallery = Array.isArray(images) && images.length > 0 ? images : ['/placeholder.jpg'];
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
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!hasMultipleImages || touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    
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

  // Ensure image URL has leading slash
  const currentImageUrl = (() => {
    const url = imageGallery[currentImageIndex] || '/placeholder.jpg';
    return url.startsWith('/') ? url : `/${url}`;
  })();

  return (
    <div 
      className={`image-gallery ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="image-gallery-container">
        <img
          src={currentImageUrl}
          alt={`${alt} - Image ${currentImageIndex + 1}`}
          loading="lazy"
          className="image-gallery-main"
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
              className="image-gallery-nav-btn image-gallery-nav-btn-prev"
              onClick={handlePrevious}
              aria-label="Previous image"
              type="button"
            >
              <span className="nav-arrow">‹</span>
            </button>
            <button
              className="image-gallery-nav-btn image-gallery-nav-btn-next"
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
          <div className="image-gallery-dots">
            {imageGallery.map((_, index) => (
              <button
                key={index}
                className={`image-gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
                aria-label={`Go to image ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;

