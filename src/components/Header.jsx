import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../WhatsApp Image 2025-10-07 at 00.31.51_da03e69a.jpg';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={logoImage} alt="Not Available" className="logo-image" />
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
            <Link to="/terms-conditions" className="nav-link">Terms & Conditions</Link>
            <Link to="/refund-policy" className="nav-link">Refund Policy</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

