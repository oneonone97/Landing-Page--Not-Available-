import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import CategorySelector from './CategorySelector';
import './ProductForm.css';

/**
 * ProductForm Component
 * Reusable form component for creating and editing products
 */
const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price_paise ? (product.price_paise / 100).toFixed(2) : '',
    salePrice: product?.sale_price_paise ? (product.sale_price_paise / 100).toFixed(2) : '',
    category: product?.categoryId || '',
    stock: product?.stock || 0,
    featured: product?.featured || false,
    is_new: product?.is_new || false,
    is_sale: product?.is_sale || false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prev) => ({ ...prev, category: categoryId }));
    if (errors.category) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.category;
        return newErrors;
      });
    }
  };

  const handleImageChange = (file, error) => {
    setImageFile(file);
    setImageError(error);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Product name cannot exceed 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.salePrice && parseFloat(formData.salePrice) >= parseFloat(formData.price)) {
      newErrors.salePrice = 'Sale price must be less than regular price';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.stock < 0 || formData.stock === '') {
      newErrors.stock = 'Stock must be a non-negative number';
    }

    if (imageError) {
      newErrors.image = imageError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData, imageFile);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Basic Information</h3>
        
        <div className="form-group">
          <label htmlFor="name">
            Product Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter product name"
            maxLength={100}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="Enter product description (10-500 characters)"
            rows={4}
            maxLength={500}
          />
          <div className="char-count">
            {formData.description.length}/500 characters
          </div>
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <CategorySelector
              value={formData.category}
              onChange={handleCategoryChange}
              error={errors.category}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Pricing & Stock</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">
              Price (₹) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              placeholder="0.00"
              step="0.01"
              min="0.01"
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="salePrice">Sale Price (₹)</label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              className={errors.salePrice ? 'error' : ''}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.salePrice && <div className="error-message">{errors.salePrice}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="stock">
              Stock <span className="required">*</span>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={errors.stock ? 'error' : ''}
              placeholder="0"
              min="0"
            />
            {errors.stock && <div className="error-message">{errors.stock}</div>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Product Image</h3>
        <ImageUpload
          onImageChange={handleImageChange}
          existingImageUrl={product?.image_url}
          error={errors.image}
        />
      </div>

      <div className="form-section">
        <h3>Product Options</h3>
        
        <div className="form-checkboxes">
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <label htmlFor="featured">Featured Product</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="is_new"
              name="is_new"
              checked={formData.is_new}
              onChange={handleChange}
            />
            <label htmlFor="is_new">New Arrival</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="is_sale"
              name="is_sale"
              checked={formData.is_sale}
              onChange={handleChange}
            />
            <label htmlFor="is_sale">On Sale</label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary btn-medium"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-medium"
          disabled={loading}
        >
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
