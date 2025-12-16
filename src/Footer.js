import React from 'react';
import './styles/Footer.css';
import { Link } from 'react-router-dom';

const handleWhatsApp = () => {
  const phoneNumber = '995597912091';
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
};

function Footer() {
  const currentYear = new Date().getFullYear();

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="luxury-footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-column">
            <h3 className="footer-title">Luxury Rentals</h3>
            <p className="footer-description">
              Experience the finest collection of premium vehicles.
              Drive excellence, live luxury.
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/groups/661759419903606/permalink/717948847617996/?rdid=PKAh1zmU9bAPxtjt#"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/995597912091"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" onClick={scrollToTop}>Home</Link>
              </li>
              <li>
                <Link to="/all-cars" onClick={scrollToTop}>Cars</Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link to="#" onClick={scrollToTop}>Daily Rentals</Link></li>
              <li><Link to="#" onClick={scrollToTop}>Long Term Lease</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-heading">Get in Touch</h4>
            <ul className="footer-contact">
              <li>📍 Nodar Dumbadze Street, 1, Tbilisi</li>
              <li>📞 +995 597 91 20 91</li>
              <li>✉️ pavlepetriashvili@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Designed & Developed by Apollo Creations. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="#" onClick={scrollToTop}>Privacy Policy</Link>
              <span className="separator">•</span>
              <Link to="#" onClick={scrollToTop}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;