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
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📸</a>
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
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">Delivery FAQ</a>
            <a href="#">Returns</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
