import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import wishlistService from '../services/wishlistService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [defaultWishlistId, setDefaultWishlistId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load wishlist when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    } else {
      setWishlist(null);
      setDefaultWishlistId(null);
      setWishlistCount(0);
    }
  }, [isAuthenticated]);

  // Update wishlist count whenever wishlist changes
  useEffect(() => {
    if (wishlist && wishlist.items) {
      setWishlistCount(wishlist.items.length);
      if (wishlist.id && !defaultWishlistId) {
        setDefaultWishlistId(wishlist.id);
      }
    } else {
      setWishlistCount(0);
    }
  }, [wishlist, defaultWishlistId]);

  /**
   * Load default wishlist from API
   */
  const loadWishlist = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await wishlistService.getDefaultWishlist();
      
      if (response.success && response.data) {
        setWishlist(response.data);
        if (response.data.id) {
          setDefaultWishlistId(response.data.id);
        }
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      // Don't show error toast on initial load
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  /**
   * Get default wishlist ID, fetching if needed
   */
  const getDefaultWishlistId = useCallback(async () => {
    if (defaultWishlistId) {
      return defaultWishlistId;
    }

    try {
      const response = await wishlistService.getDefaultWishlist();
      if (response.success && response.data?.id) {
        setDefaultWishlistId(response.data.id);
        return response.data.id;
      }
    } catch (error) {
      console.error('Failed to get default wishlist ID:', error);
    }
    return null;
  }, [defaultWishlistId]);

  /**
   * Add product to wishlist
   */
  const addToWishlist = useCallback(async (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return { success: false, message: 'Not authenticated' };
    }

    try {
      setLoading(true);
      
      // Get wishlist ID if not cached
      const wishlistId = await getDefaultWishlistId();
      if (!wishlistId) {
        throw new Error('Could not get wishlist');
      }

      const response = await wishlistService.addToWishlist(productId, wishlistId);
      
      if (response.success) {
        // Reload wishlist to get updated data
        await loadWishlist();
        toast.success('Added to wishlist');
        return { success: true, message: 'Added to wishlist' };
      } else {
        throw new Error(response.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to add to wishlist';
      
      // Check if product is already in wishlist
      if (errorMessage.includes('already') || errorMessage.includes('exists')) {
        toast.error('Product is already in your wishlist');
      } else {
        toast.error(errorMessage);
      }
      
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getDefaultWishlistId, loadWishlist]);

  /**
   * Remove product from wishlist
   */
  const removeFromWishlist = useCallback(async (productId) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      setLoading(true);
      
      // Get wishlist ID if not cached
      const wishlistId = await getDefaultWishlistId();
      if (!wishlistId) {
        throw new Error('Could not get wishlist');
      }

      const response = await wishlistService.removeFromWishlist(productId, wishlistId);
      
      if (response.success) {
        // Reload wishlist to get updated data
        await loadWishlist();
        toast.success('Removed from wishlist');
        return { success: true, message: 'Removed from wishlist' };
      } else {
        throw new Error(response.message || 'Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to remove from wishlist';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getDefaultWishlistId, loadWishlist]);

  /**
   * Check if product is in wishlist
   */
  const isInWishlist = useCallback((productId) => {
    if (!wishlist || !wishlist.items || !Array.isArray(wishlist.items)) {
      return false;
    }
    
    return wishlist.items.some(item => {
      const itemProductId = item.productId || item.product?.id;
      return itemProductId === parseInt(productId);
    });
  }, [wishlist]);

  /**
   * Toggle product in wishlist (add if not present, remove if present)
   */
  const toggleWishlist = useCallback(async (productId) => {
    if (isInWishlist(productId)) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  const value = {
    wishlist,
    wishlistCount,
    defaultWishlistId,
    loading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    loadWishlist,
    getDefaultWishlistId
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    // Return default values if used outside provider (for components that might not be wrapped)
    return {
      wishlist: null,
      wishlistCount: 0,
      defaultWishlistId: null,
      loading: false,
      addToWishlist: async () => ({ success: false, message: 'Not authenticated' }),
      removeFromWishlist: async () => ({ success: false, message: 'Not authenticated' }),
      toggleWishlist: async () => ({ success: false, message: 'Not authenticated' }),
      isInWishlist: () => false,
      loadWishlist: async () => {},
      getDefaultWishlistId: async () => null
    };
  }
  return context;
};

export default WishlistContext;

