/**
 * Image utility functions for handling image URL normalization
 * Handles both Supabase Storage URLs (full URLs) and local paths
 */

/**
 * Normalizes image paths to ensure proper rendering
 * - Preserves full URLs (http:// or https://) as-is
 * - Adds leading slash to local paths for proper frontend resolution
 * - Handles placeholder fallbacks
 * 
 * @param {string|null|undefined} img - Image path or URL
 * @returns {string} Normalized image path or placeholder
 * 
 * @example
 * normalizeImagePath('https://supabase.co/image.jpg') // Returns: 'https://supabase.co/image.jpg'
 * normalizeImagePath('products/image.jpg') // Returns: '/products/image.jpg'
 * normalizeImagePath(null) // Returns: '/placeholder.jpg'
 */
export const normalizeImagePath = (img) => {
  // Handle null, undefined, or empty strings
  if (!img || img === 'no-image.jpg' || img === 'placeholder.jpg') {
    return '/placeholder.jpg';
  }

  // Ensure img is a string
  if (typeof img !== 'string') {
    return '/placeholder.jpg';
  }

  // If it's already a full URL (http:// or https://), return as-is
  if (img.startsWith('http://') || img.startsWith('https://')) {
    return img;
  }

  // For local paths, ensure they start with /
  return img.startsWith('/') ? img : `/${img}`;
};

/**
 * Normalizes an array of image paths
 * Useful for image galleries
 * 
 * @param {Array<string>|null|undefined} gallery - Array of image paths
 * @returns {Array<string>} Array of normalized image paths
 * 
 * @example
 * normalizeImageGallery(['https://supabase.co/img1.jpg', 'products/img2.jpg'])
 * // Returns: ['https://supabase.co/img1.jpg', '/products/img2.jpg']
 */
export const normalizeImageGallery = (gallery) => {
  if (!Array.isArray(gallery) || gallery.length === 0) {
    return ['/placeholder.jpg'];
  }

  return gallery.map(img => normalizeImagePath(img));
};

