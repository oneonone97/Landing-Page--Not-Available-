import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ProductForm from '../../components/admin/ProductForm';
import productService from '../../services/admin/productService';
import './AdminProductForm.css';

/**
 * AdminProductForm Page
 * Page for adding new products or editing existing ones
 */
const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      const response = await productService.getProduct(id);
      const productData = response.data || response;
      setProduct(productData);
    } catch (error) {
      toast.error(error.message || 'Failed to load product');
      navigate('/admin/products');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData, imageFile) => {
    try {
      setLoading(true);
      
      if (isEditMode) {
        await productService.updateProduct(id, formData, imageFile);
        toast.success('Product updated successfully');
      } else {
        await productService.createProduct(formData, imageFile);
        toast.success('Product created successfully');
      }
      
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.message || `Failed to ${isEditMode ? 'update' : 'create'} product`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  if (fetching) {
    return (
      <div className="admin-product-form-page">
        <div className="form-loading">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="admin-product-form-page">
      <div className="form-page-header">
        <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
        <p>{isEditMode ? 'Update product information' : 'Create a new product in your inventory'}</p>
      </div>
      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};

export default AdminProductForm;
