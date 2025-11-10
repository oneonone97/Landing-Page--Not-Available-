import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import productService from '../services/productService';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart: addToCartContext } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const load = async (pageNum = 1) => {
      try {
        setLoading(true);
        const resp = await productService.getProducts({ limit: 9, page: pageNum });
        if (resp.success && resp.products?.length) {
          setProducts(resp.products);
          setPagination(resp.pagination);
        } else {
          // Fallback paginate locally
          const start = (pageNum - 1) * 9;
          setProducts(productsData.slice(start, start + 9));
          setPagination({
            currentPage: pageNum,
            totalItems: productsData.length,
            itemsPerPage: 9,
            totalPages: Math.ceil(productsData.length / 9),
            hasNextPage: pageNum * 9 < productsData.length,
            hasPrevPage: pageNum > 1,
          });
        }
      } catch (e) {
        setError(e?.message || 'Failed to load products');
        const start = (page - 1) * 9;
        setProducts(productsData.slice(start, start + 9));
        setPagination({
          currentPage: page,
          totalItems: productsData.length,
          itemsPerPage: 9,
          totalPages: Math.ceil(productsData.length / 9),
          hasNextPage: page * 9 < productsData.length,
          hasPrevPage: page > 1,
        });
      } finally {
        setLoading(false);
      }
    };
    load(page);
  }, [page]);

  if (loading) return <div className="container" style={{padding: '24px'}}>Loading products...</div>;
  if (error) {
    // Show fallback silently but keep a small note for devs
    console.warn('Shop load error:', error);
  }

  return (
    <div className="container" style={{padding: '24px'}}>
      <h2 style={{marginBottom: '16px'}}>All Products</h2>
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

export default Shop;


