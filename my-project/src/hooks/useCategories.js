import { useState, useEffect } from 'react';
import productService from '../services/productService';
import toast from 'react-hot-toast';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        console.log('Fetching categories...');
        const response = await productService.getCategories();
        console.log('Categories API Response:', response);

        if (response.success && Array.isArray(response.data)) {
          setCategories(response.data);
          console.log('Categories set successfully:', response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch categories: Invalid data format');
        }
      } catch (err) {
        setError(err);
        console.error('Error fetching categories:', err);
        toast.error('Could not load product categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;