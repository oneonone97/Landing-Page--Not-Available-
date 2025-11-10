import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductTable from './ProductTable';
import productService from '../../services/admin/productService';
import './ProductList.css';

/**
 * ProductList Component
 * Container component for product management with search, filter, and pagination
 */
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery, categoryFilter]);

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      const categoriesData = response.data || response.categories || response;
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        page: currentPage,
        limit: limit,
        ...(searchQuery && { search: searchQuery }),
        ...(categoryFilter && { category: categoryFilter }),
      };

      const response = await productService.getAllProducts(params);
      const productsData = response.data?.products || response.data?.rows || response.data || [];
      const pagination = response.data?.pagination || response.pagination || {};

      setProducts(Array.isArray(productsData) ? productsData : []);
      setTotalPages(pagination.totalPages || 1);
      setTotalItems(pagination.totalItems || productsData.length || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('Product fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      // Refresh the list
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product inventory</p>
        </div>
        <Link to="/admin/products/new" className="btn btn-primary btn-medium">
          + Add New Product
        </Link>
      </div>

      <div className="product-list-filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary btn-medium">
            Search
          </button>
        </form>

        <select
          value={categoryFilter}
          onChange={handleCategoryFilter}
          className="category-filter"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="product-list-error">
          <p>{error}</p>
          <button onClick={fetchProducts} className="btn btn-primary btn-medium">
            Retry
          </button>
        </div>
      )}

      <ProductTable products={products} onDelete={handleDelete} loading={loading} />

      {totalPages > 1 && (
        <div className="product-list-pagination">
          <button
            className="btn btn-outline btn-medium"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages} ({totalItems} total)
          </span>
          <button
            className="btn btn-outline btn-medium"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
