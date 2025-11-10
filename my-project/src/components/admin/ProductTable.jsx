import React from 'react';
import { Link } from 'react-router-dom';
import './ProductTable.css';

/**
 * ProductTable Component
 * Displays products in a table format with actions
 */
const ProductTable = ({ products, onDelete, loading }) => {
  const formatPrice = (pricePaise) => {
    return `₹${(pricePaise / 100).toFixed(2)}`;
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return { label: 'Out of Stock', class: 'out-of-stock' };
    } else if (stock <= 10) {
      return { label: 'Low Stock', class: 'low-stock' };
    }
    return { label: 'In Stock', class: 'in-stock' };
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      onDelete(productId);
    }
  };

  if (loading) {
    return (
      <div className="product-table-loading">
        <p>Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-table-empty">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <tr key={product.id}>
                <td>
                  <div className="product-image-cell">
                    <img
                      src={product.image_url || '/no-image.jpg'}
                      alt={product.name}
                      className="product-thumbnail"
                      onError={(e) => {
                        e.target.src = '/no-image.jpg';
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="product-name-cell">
                    <strong>{product.name}</strong>
                    {product.featured && <span className="badge badge-featured">Featured</span>}
                    {product.is_new && <span className="badge badge-new">New</span>}
                    {product.is_sale && <span className="badge badge-sale">Sale</span>}
                  </div>
                </td>
                <td>{product.category?.name || 'N/A'}</td>
                <td>
                  <div className="product-price-cell">
                    {product.sale_price_paise ? (
                      <>
                        <span className="price-sale">{formatPrice(product.sale_price_paise)}</span>
                        <span className="price-original">{formatPrice(product.price_paise)}</span>
                      </>
                    ) : (
                      <span>{formatPrice(product.price_paise)}</span>
                    )}
                  </div>
                </td>
                <td>{product.stock}</td>
                <td>
                  <span className={`stock-status ${stockStatus.class}`}>
                    {stockStatus.label}
                  </span>
                </td>
                <td>
                  <div className="product-actions">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="action-btn action-edit"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      className="action-btn action-delete"
                      onClick={() => handleDelete(product.id, product.name)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
