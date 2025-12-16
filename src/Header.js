import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-body">
        {/* Logo */}
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1"/>
            <path d="M16 8L20 16L16 24L12 16L16 8Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/all-cars" className="nav-link">Cars</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            <Link to="/" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/all-cars" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Cars</Link>
            <Link to="/contact" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
