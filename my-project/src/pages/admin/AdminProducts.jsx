import React from 'react';
import ProductList from '../../components/admin/ProductList';
import './AdminProducts.css';

/**
 * AdminProducts Page
 * Product management page using ProductList component
 */
const AdminProducts = () => {
  return (
    <div className="admin-products-page">
      <ProductList />
    </div>
  );
};

export default AdminProducts;
