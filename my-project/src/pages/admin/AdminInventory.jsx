import React, { useEffect, useState } from 'react';
import adminService from '../../services/admin/adminService';
import './AdminInventory.css';

/**
 * AdminInventory Page
 * Displays inventory overview and stock management
 */
const AdminInventory = () => {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getInventoryOverview();
      setInventory(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load inventory');
      console.error('Inventory error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-inventory">
        <div className="inventory-loading">Loading inventory...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-inventory">
        <div className="inventory-error">
          <p>Error: {error}</p>
          <button onClick={fetchInventory} className="btn btn-primary btn-medium">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-inventory">
      <div className="inventory-header">
        <h1>Inventory Management</h1>
        <button onClick={fetchInventory} className="btn btn-secondary btn-medium">
          Refresh
        </button>
      </div>

      {inventory?.summary && (
        <div className="inventory-summary">
          <div className="summary-card">
            <h3>Total Products</h3>
            <p className="summary-value">{inventory.summary.totalProducts || 0}</p>
          </div>
          <div className="summary-card">
            <h3>Total Stock Value</h3>
            <p className="summary-value">₹{inventory.summary.totalStockValue || 0}</p>
          </div>
          {inventory.summary.stockStatus && (
            <>
              <div className="summary-card">
                <h3>In Stock</h3>
                <p className="summary-value in-stock">{inventory.summary.stockStatus.inStock || 0}</p>
              </div>
              <div className="summary-card">
                <h3>Low Stock</h3>
                <p className="summary-value low-stock">{inventory.summary.stockStatus.lowStock || 0}</p>
              </div>
              <div className="summary-card">
                <h3>Critical Stock</h3>
                <p className="summary-value critical-stock">{inventory.summary.stockStatus.criticalStock || 0}</p>
              </div>
              <div className="summary-card">
                <h3>Out of Stock</h3>
                <p className="summary-value out-of-stock">{inventory.summary.stockStatus.outOfStock || 0}</p>
              </div>
            </>
          )}
        </div>
      )}

      {inventory?.summary?.stockByCategory && Object.keys(inventory.summary.stockByCategory).length > 0 && (
        <div className="inventory-section">
          <h2>Stock by Category</h2>
          <div className="category-stock">
            {Object.entries(inventory.summary.stockByCategory).map(([category, data]) => (
              <div key={category} className="category-card">
                <h3>{category}</h3>
                <p>Products: {data.productCount || 0}</p>
                <p>Total Stock: {data.totalStock || 0}</p>
                <p>Average Stock: {Math.round(data.averageStock || 0)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;

