import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Not Available</h3>
            <p className="footer-text">Minimal ecommerce experience</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms-conditions" className="footer-link">Terms & Conditions</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Not Available. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

