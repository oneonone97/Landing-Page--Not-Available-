import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import useCategories from '../hooks/useCategories'; // Import the new hook
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount, clearCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { categories } = useCategories(); // Use the hook
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    clearCart(); // Clear cart on logout
    navigate('/');
  };

  // Helper to create a URL-friendly slug from a category name
  const nameToSlug = (name) => {
    switch (name) {
      case 'Bags & Accessories':
        return 'bags';
      case 'Tech & Electronics':
        return 'electronics';
      case 'Hydration':
        return 'hydration';
      case 'Cleaning & Maintenance':
        return 'cleaning';
      case 'Spiritual & Cultural':
        return 'religious-items';
      case 'Kitchen & Dining':
        return 'glassware';
      default:
        return name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    }
  };

  return (
    <header className="header">
      {/* Header Top */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="header-left">
              <div className="language-switcher">
                <span>English</span>
              </div>
              <div className="currency-switcher">
                <span>INR</span>
              </div>
            </div>

            <div className="header-right">
              {isAuthenticated && user && user.role === 'admin' && (
                <Link to="/admin" className="admin-link">
                  Admin
                </Link>
              )}
              <div className="account-dropdown">
                <button className="account-toggle">
                  <span>{isAuthenticated && user ? user.name : 'My Account'}</span>
                  <span className="icon-arrow">▼</span>
                </button>
                <div className="account-menu">
                  {isAuthenticated ? (
                    <>
                      <Link to="/account">My Account</Link>
                      <Link to="/orders">My Orders</Link>
                      <Link to="/wishlist">Wishlist</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin">Admin Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">Login</Link>
                      <Link to="/register">Register</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Main */}
      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            {/* Logo */}
            <div className="logo">
              <Link to={isAuthenticated ? "/home" : "/"} className="logo-link">
                <img 
                  src="/images/logo.jpg" 
                  alt="Not Available Logo" 
                  className="logo-image"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <h1 className="logo-text">Not Available</h1>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  Search
                </button>
              </form>
            </div>

            {/* Header Icons */}
            <div className="header-icons">
              <Link to="/wishlist" className="icon-link wishlist-link">
                <span className="icon">♥</span>
                <span className="icon-label">Wishlist</span>
                {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="icon-link cart-link">
                <span className="icon">🛒</span>
                <span className="icon-label">Cart</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`main-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
        <div className="container">
          <ul className="nav-menu">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li className="has-dropdown">
              <Link to="/shop">Shop</Link>
              <ul className="dropdown-menu">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      to={`/category/${nameToSlug(category.name)}`} 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link to="/deals" onClick={() => setIsMenuOpen(false)}>Deals</Link></li>
            <li><Link to="/new-arrivals" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
