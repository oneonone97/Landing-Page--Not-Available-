import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import productService from '../services/productService';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const slugToName = (slug) => {
  if (slug === 'bags') {
    return 'Bags & Accessories';
  }
  if (slug === 'electronics') {
    return 'Tech & Electronics';
  }
  if (slug === 'hydration' || slug === 'drinkware') {
    return 'Hydration';
  }
  if (slug === 'cleaning') {
    return 'Cleaning & Maintenance';
  }
  if (slug === 'religious-items') {
    return 'Spiritual & Cultural';
  }
  if (slug === 'glassware') {
    return 'Kitchen & Dining';
  }
  // map kebab-case to display case, e.g., personal-care -> Personal Care
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
};

const Category = () => {
  const { slug } = useParams();
  const { isAuthenticated } = useAuth();
  const { addToCart: addToCartContext } = useCart();
  const categoryName = useMemo(() => slugToName(slug), [slug]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const load = async (pageNum = 1) => {
      try {
        setLoading(true);
        const resp = await productService.getProducts({ limit: 9, page: pageNum, category: categoryName });
        if (resp.success && resp.products?.length) {
          setProducts(resp.products);
          setPagination(resp.pagination);
        } else {
          // fallback: filter local data by category name if available
          const all = productsData.filter((p) => (p.category || '').toLowerCase() === categoryName.toLowerCase());
          const start = (pageNum - 1) * 9;
          setProducts(all.slice(start, start + 9));
          setPagination({
            currentPage: pageNum,
            totalItems: all.length,
            itemsPerPage: 9,
            totalPages: Math.ceil(all.length / 9),
            hasNextPage: pageNum * 9 < all.length,
            hasPrevPage: pageNum > 1,
          });
        }
      } catch (e) {
        console.error('!!! DETAILED ERROR in Category.jsx !!!', e); // Detailed logging
        setError(e?.message || 'Failed to load category');
        const all = productsData.filter((p) => (p.category || '').toLowerCase() === categoryName.toLowerCase());
        const start = (page - 1) * 9;
        setProducts(all.slice(start, start + 9));
        setPagination({
          currentPage: page,
          totalItems: all.length,
          itemsPerPage: 9,
          totalPages: Math.ceil(all.length / 9),
          hasNextPage: page * 9 < all.length,
          hasPrevPage: page > 1,
        });
      } finally {
        setLoading(false);
      }
    };
    load(page);
  }, [categoryName, page]);

  if (loading) return <div className="container" style={{ padding: '24px' }}>Loading {categoryName}...</div>;
  if (error) console.warn('Category load error:', error);

  return (
    <div className="container" style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>{categoryName}</h2>
      
      {/* Debug Console */}
      {/* <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
        <summary>Debug Console</summary>
        <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(products, null, 2)}
        </pre>
      </details> */}

      {products.length === 0 && !loading && (
        <div>No products found in this category.</div>
      )}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={async () => {
              if (!isAuthenticated) {
                toast.error('Please login to add items to cart');
                return;
              }
              
              // Check if product ID is valid for backend (must be numeric, not "prod_xxx")
              const isLocalProduct = typeof product.id === 'string' && product.id.startsWith('prod_');
              if (isLocalProduct) {
                toast.error('This product is not available in the backend. Please use products from the backend database.');
                return;
              }
              
              try {
                const res = await addToCartContext(product.id, 1);
                if (res.success) toast.success(`${product.name} added to cart!`);
                else toast.error(res.message || 'Failed to add to cart');
              } catch (error) {
                const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to add to cart. Please try again.';
                if (errorMessage.includes('Product not found')) {
                  toast.error('Product not found in database. Please refresh the page.');
                } else {
                  toast.error(errorMessage);
                }
              }
            }}
            onQuickView={() => toast(`Quick view: ${product.name}`)}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <button
          disabled={!pagination?.hasPrevPage}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <div>
          Page {pagination?.currentPage || page} {pagination?.totalPages ? `of ${pagination.totalPages}` : ''}
        </div>
        <button
          disabled={!pagination?.hasNextPage}
          onClick={() => setPage((p) => (pagination?.hasNextPage ? p + 1 : p))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Category;


