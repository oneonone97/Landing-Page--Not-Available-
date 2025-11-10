/**
 * Price utility functions for handling paise to rupees conversion
 * Backend stores all prices in paise (smallest currency unit)
 * Frontend displays prices in rupees
 */

/**
 * Convert paise to rupees
 * @param {number|string} paise - Price in paise
 * @returns {number} Price in rupees
 */
export const paiseToRupees = (paise) => {
  if (paise === null || paise === undefined) return 0;
  const numPaise = typeof paise === 'string' ? parseFloat(paise) : paise;
  if (isNaN(numPaise)) return 0;
  return numPaise / 100;
};

/**
 * Convert rupees to paise
 * @param {number|string} rupees - Price in rupees
 * @returns {number} Price in paise
 */
export const rupeesToPaise = (rupees) => {
  if (rupees === null || rupees === undefined) return 0;
  const numRupees = typeof rupees === 'string' ? parseFloat(rupees) : rupees;
  if (isNaN(numRupees)) return 0;
  return Math.round(numRupees * 100);
};

/**
 * Format price in rupees with currency symbol
 * @param {number|string} price - Price in paise (from backend) or rupees
 * @param {boolean} isPaise - Whether the price is in paise (default: true)
 * @returns {string} Formatted price string (e.g., "₹3,480.00")
 */
export const formatPrice = (price, isPaise = true) => {
  const priceInRupees = isPaise ? paiseToRupees(price) : price;
  return `₹${priceInRupees.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Calculate total from cart items (converts paise to rupees)
 * @param {Array} items - Array of cart items with price and quantity
 * @returns {number} Total in rupees
 */
export const calculateCartTotal = (items) => {
  if (!items || !Array.isArray(items) || items.length === 0) return 0;
  
  return items.reduce((total, item) => {
    const priceInPaise = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    const priceInRupees = paiseToRupees(priceInPaise);
    return total + (priceInRupees * (item.quantity || 1));
  }, 0);
};

/**
 * Get price in rupees from cart item
 * @param {Object} item - Cart item with price property
 * @returns {number} Price in rupees
 */
export const getItemPriceInRupees = (item) => {
  if (!item || item.price === null || item.price === undefined) return 0;
  return paiseToRupees(item.price);
};

