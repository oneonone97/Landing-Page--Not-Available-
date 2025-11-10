import React, { useEffect, useState } from 'react';
import productService from '../../services/admin/productService';
import './CategorySelector.css';

/**
 * CategorySelector Component
 * Dropdown component for selecting product categories
 * Single Responsibility: Category selection only
 */
const CategorySelector = ({ value, onChange, error, required = true }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await productService.getCategories();
      // Handle different response structures
      const categoriesData = response.data || response.categories || response;
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      setErrorMessage('Failed to load categories');
      console.error('Category fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className="category-selector">
      <label className="category-selector-label">
        Category {required && <span className="required">*</span>}
      </label>
      <select
        value={value || ''}
        onChange={handleChange}
        className={`category-select ${error ? 'error' : ''}`}
        required={required}
        disabled={loading}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {loading && <div className="category-loading">Loading categories...</div>}
      {errorMessage && <div className="category-error">{errorMessage}</div>}
      {error && <div className="category-error">{error}</div>}
    </div>
  );
};

export default CategorySelector;
