import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await productService.getProducts({ query: searchQuery });
        if (response.success) {
          setResults(response.products);
        } else {
          setError(response.message || 'Failed to fetch search results');
          toast.error(response.message || 'Failed to fetch search results');
        }
      } catch (err) {
        setError('An error occurred while fetching search results.');
        toast.error('An error occurred while fetching search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  if (loading) {
    return <div className="container search-page"><h2>Searching...</h2></div>;
  }

  if (error) {
    return <div className="container search-page"><h2 className="error-message">Error: {error}</h2></div>;
  }

  return (
    <div className="container search-page">
      <h2>Search Results for "{searchQuery}"</h2>
      {results.length > 0 ? (
        <div className="products-grid">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found matching your search.</p>
      )}
    </div>
  );
};

export default SearchPage;