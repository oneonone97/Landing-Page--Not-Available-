import React, { createContext, useState, useContext, useEffect } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';
import { calculateCartTotal } from '../utils/priceUtils';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart(null);
      setCartCount(0);
    }
  }, [isAuthenticated]);

  // Update cart count whenever cart changes
  useEffect(() => {
    if (cart && cart.items) {
      const count = cart.items.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  }, [cart]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      console.log('🛒 CartContext - Load Cart Response:', response);
      if (response.success) {
        // Backend returns cart in response.data, not response.cart
        const cartData = response.data || response.cart;
        console.log('🛒 CartContext - Setting Cart:', cartData);
        console.log('🛒 CartContext - Cart Items:', cartData?.items);
        setCart(cartData);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const response = await cartService.addToCart(productId, quantity);
      console.log('🛒 CartContext - Add to Cart Response:', response);
      if (response.success) {
        // Backend returns cart in response.data, not response.cart
        const cartData = response.data || response.cart;
        console.log('🛒 CartContext - Setting Cart After Add:', cartData);
        console.log('🛒 CartContext - Cart Items After Add:', cartData?.items);
        
        // If cart data doesn't have items or items are empty, reload the cart
        if (!cartData || !cartData.items || cartData.items.length === 0) {
          console.log('🛒 CartContext - Cart data incomplete, reloading...');
          await loadCart();
        } else {
          setCart(cartData);
        }
        
        return { success: true, message: response.message || 'Item added to cart' };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error('Add to cart error:', error);
      // Re-throw the error so the API interceptor can handle it
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await cartService.updateCartItem(itemId, quantity);
      if (response.success) {
        // Backend returns cart in response.data, not response.cart
        setCart(response.data || response.cart);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update cart item'
      };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      // Optimistic update: remove item from state immediately
      const updatedItems = cart.items.filter(item => item.id !== itemId);
      setCart({ ...cart, items: updatedItems });

      setLoading(true);
      const response = await cartService.removeCartItem(itemId);
      if (response.success) {
        // If the backend confirms, the state is already correct.
        // Optionally, you could re-fetch the cart here to be 100% in sync.
        // For now, we trust the optimistic update.
        return { success: true, message: 'Item removed from cart' };
      } else {
        // If backend fails, revert the optimistic update
        setCart(cart);
        return { success: false, message: response.message };
      }
    } catch (error) {
      // If backend fails, revert the optimistic update
      setCart(cart);
      return {
        success: false,
        message: error.message || 'Failed to remove item from cart'
      };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.clearCart();
      if (response.success) {
        setCart(null);
        setCartCount(0);
        return { success: true, message: 'Cart cleared' };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to clear cart'
      };
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    if (!cart || !cart.items) return 0;
    // Prices from backend are in paise, convert to rupees for display
    return calculateCartTotal(cart.items);
  };

  const value = {
    cart,
    cartCount,
    loading,
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
