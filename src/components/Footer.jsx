import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">FreshCart</span>
            </Link>
            <p className="footer-tagline">
              Get your groceries delivered in as fast as 30 minutes.
              Fresh produce, pantry staples, and household essentials.
            </p>
            <div className="footer-social">
              <Link to="/" aria-label="Facebook">📘</Link>
              <Link to="/" aria-label="Twitter">🐦</Link>
              <Link to="/" aria-label="Instagram">📸</Link>
            </div>
          </div>

          <div className="footer-links">
            <h4>Shop</h4>
            <Link to="/stores">Browse Stores</Link>
            <Link to="/deals">Deals & Offers</Link>
            <Link to="/search?q=organic">Organic</Link>
            <Link to="/search?q=snacks">Snacks</Link>
          </div>

          <div className="footer-links">
            <h4>Account</h4>
            <Link to="/account">My Account</Link>
            <Link to="/orders">Order History</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/cart">Shopping Cart</Link>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <Link to="/">Help Center</Link>
            <Link to="/">Contact Us</Link>
            <Link to="/">Delivery FAQ</Link>
            <Link to="/">Returns</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
