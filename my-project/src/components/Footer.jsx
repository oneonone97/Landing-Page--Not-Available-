import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-column">
              <h3 className="footer-title">About Not Available</h3>
              <p className="footer-text">
                Your one-stop destination for premium quality products.
                We offer a wide range of items for your home and lifestyle needs.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">f</a>
                <a href="#" className="social-link" aria-label="Twitter">t</a>
                <a href="#" className="social-link" aria-label="Instagram">i</a>
                <a href="#" className="social-link" aria-label="LinkedIn">in</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-column">
              <h3 className="footer-title">Customer Service</h3>
              <ul className="footer-links">
                <li><Link to="/my-account">My Account</Link></li>
                <li><Link to="/orders">Order Tracking</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/shipping">Shipping Info</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="footer-contact">
                <li>
                  <span className="contact-icon">📍</span>
                  <span>PK-78, Sector - 122, Noida - 201301, Uttar Pradesh</span>
                </li>
                <li>
                  <span className="contact-icon">📞</span>
                  <a href="tel:+917982572738" className="contact-link">+91 7982572738</a>
                </li>
                <li>
                  <span className="contact-icon">✉️</span>
                  <a href="mailto:wesourceb2c@gmail.com" className="contact-link">wesourceb2c@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Not Available. All rights reserved.</p>
            <div className="payment-methods">
              <span>We Accept:</span>
              <span className="payment-icon">💳</span>
              <span className="payment-icon">💰</span>
              <span className="payment-icon">🏦</span>
            </div>
          </div>
          <div className="footer-policies">
            <Link to="/terms-conditions" className="policy-link">Terms & Conditions</Link>
            <span className="policy-separator">|</span>
            <Link to="/privacy-policy" className="policy-link">Privacy Policy</Link>
            <span className="policy-separator">|</span>
            <Link to="/refund-policy" className="policy-link">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
