import React from 'react';
import './QuickViewModal.css';

const QuickViewModal = ({ product, onClose }) => {
  if (!product) {
    return null;
  }

  const [mainImage, setMainImage] = React.useState(product.images?.main || product.image_url || '/placeholder.jpg');

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="quick-view-modal-overlay" onClick={onClose}>
      <div className="quick-view-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="product-images">
          <div className="main-image">
            <img src={mainImage} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {product.images?.all && product.images.all.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={mainImage === image ? 'active' : ''}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {/* Add more product details here if you want */}
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;