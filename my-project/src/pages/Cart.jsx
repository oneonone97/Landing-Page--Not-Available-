import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { getItemPriceInRupees } from '../utils/priceUtils';
import ImageGallery from '../components/ImageGallery';
import './Cart.css'; // We'll create this file for styling

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Debug: Log cart structure
    console.log('🛒 Cart Page - Cart Data:', cart);
    console.log('🛒 Cart Page - Cart Items:', cart?.items);
    if (cart?.items && cart.items.length > 0) {
      console.log('🛒 Cart Page - First Item:', cart.items[0]);
      console.log('🛒 Cart Page - First Item Product:', cart.items[0]?.Product);
    }
    
    // Redirect to home if cart is empty after loading
    if (!loading && cart && cart.items && cart.items.length === 0) {
      navigate('/');
    }
  }, [cart, loading, navigate]);

  if (loading && !cart) {
    return <div className="container cart-page"><h2>Loading Cart...</h2></div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container cart-page cart-empty">
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  const handleQuantityDecrease = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="container cart-page">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <p>{cart.items.length} items</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map(item => {
            // Handle both Product association and direct product data
            const product = item.Product || item.product || {};
            const productName = product.name || 'Unknown Product';
            
            // Get image gallery from backend (image_gallery or images.gallery)
            const imageGallery = product.image_gallery || 
                                product.images?.gallery || 
                                (product.image_url ? [product.image_url] : ['/placeholder.jpg']);
            
            // Ensure all image URLs have leading slash
            const normalizedGallery = imageGallery.map(img => 
              img.startsWith('/') ? img : `/${img}`
            );
            
            // Price from backend is in paise, convert to rupees for display
            const priceInRupees = getItemPriceInRupees(item);
            const itemTotal = priceInRupees * item.quantity;
            
            return (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <ImageGallery 
                    images={normalizedGallery} 
                    alt={productName}
                    className="cart-item-gallery"
                  />
                </div>
                <div className="cart-item-details">
                  <h3>{productName}</h3>
                  <p>Price: ₹{priceInRupees.toFixed(2)}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-selector">
                      <button onClick={() => handleQuantityDecrease(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
                <div className="cart-item-subtotal">
                  <p>₹{itemTotal.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          <button 
            className="btn btn-primary btn-checkout"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;