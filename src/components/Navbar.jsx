import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { searchProducts } from '../data/products';
import {
  ShoppingCart,
  Search,
  MapPin,
  User,
  LogOut,
  ChevronDown,
  X,
  Menu,
  Heart,
  Clock,
  Settings,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, deliveryAddress, setDeliveryAddress } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempAddress, setTempAddress] = useState(deliveryAddress);
  
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.trim().length > 1) {
      const results = searchProducts(value).slice(0, 6);
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleSaveAddress = () => {
    setDeliveryAddress(tempAddress);
    setShowLocationModal(false);
  };

  return (
    <>
      <nav className="navbar" id="main-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" id="navbar-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">FreshCart</span>
          </Link>

          {/* Delivery Location */}
          <button
            className="navbar-location"
            onClick={() => setShowLocationModal(true)}
            id="delivery-location-btn"
          >
            <MapPin size={18} />
            <div className="location-text">
              <span className="location-label">Deliver to</span>
              <span className="location-address">
                {deliveryAddress || 'Set your address'}
                <ChevronDown size={14} />
              </span>
            </div>
          </button>

          {/* Search Bar */}
          <div className="navbar-search" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products, stores..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                id="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearch(false);
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {showSearch && searchResults.length > 0 && (
              <div className="search-dropdown" id="search-dropdown">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="search-result-item"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                  >
                    <span className="search-result-emoji">{product.image}</span>
                    <div className="search-result-info">
                      <span className="search-result-name">{product.name}</span>
                      <span className="search-result-price">
                        ${product.price.toFixed(2)} / {product.unit}
                      </span>
                    </div>
                  </Link>
                ))}
                <Link
                  to={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="search-see-all"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                >
                  See all results for &ldquo;{searchQuery}&rdquo;
                </Link>
              </div>
            )}
          </div>

          {/* Nav Actions */}
          <div className="navbar-actions">
            {user ? (
              <div className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  className="navbar-user-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  id="user-menu-btn"
                >
                  <div className="user-avatar">{user.avatar}</div>
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>

                {showUserMenu && (
                  <div className="user-dropdown" id="user-dropdown">
                    <div className="user-dropdown-header">
                      <div className="user-avatar large">{user.avatar}</div>
                      <div>
                        <p className="user-dropdown-name">{user.name}</p>
                        <p className="user-dropdown-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="user-dropdown-divider" />
                    <Link
                      to="/orders"
                      className="user-dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Clock size={16} /> Your Orders
                    </Link>
                    <Link
                      to="/favorites"
                      className="user-dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Heart size={16} /> Favorites
                    </Link>
                    <Link
to="/account"
                      className="user-dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={16} /> Account Settings
                    </Link>
                    <div className="user-dropdown-divider" />
                    <div
                      className="user-dropdown-item logout"
                      role="button"
                      tabIndex="0"
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        navigate('/');
                      }}
                    >
                      <LogOut size={16} /> Log Out
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login" id="login-btn">
                  Log in
                </Link>
                <Link to="/signup" className="btn-signup" id="signup-btn">
                  Sign up
                </Link>
              </div>
            )}

            <Link to="/cart" className="navbar-cart" id="cart-btn">
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </Link>

            <button
              className="mobile-menu-btn"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="mobile-nav-overlay" onClick={() => setShowMobileMenu(false)}>
          <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">FreshCart</span>
              <button onClick={() => setShowMobileMenu(false)}>
                <X size={24} />
              </button>
            </div>
            {user && (
              <div className="mobile-nav-user">
                <div className="user-avatar large">{user.avatar}</div>
                <div>
                  <p className="user-dropdown-name">{user.name}</p>
                  <p className="user-dropdown-email">{user.email}</p>
                </div>
              </div>
            )}
            <div className="mobile-nav-links">
              <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <Link to="/stores" onClick={() => setShowMobileMenu(false)}>Stores</Link>
              <Link to="/deals" onClick={() => setShowMobileMenu(false)}>Deals</Link>
              <Link to="/cart" onClick={() => setShowMobileMenu(false)}>
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
              {user ? (
                <>
                  <Link to="/orders" onClick={() => setShowMobileMenu(false)}>Orders</Link>
                  <Link to="/account" onClick={() => setShowMobileMenu(false)}>Account</Link>
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                      navigate('/');
                    }}
                  >
                    Log Out
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setShowMobileMenu(false)}>Log In</Link>
                  <Link to="/signup" onClick={() => setShowMobileMenu(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Location modal */}
      {showLocationModal && (
        <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Set delivery address</h3>
              <button onClick={() => setShowLocationModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="delivery-address-input">Street address</label>
                <input
                  type="text"
                  id="delivery-address-input"
                  placeholder="Enter your delivery address"
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-full" onClick={handleSaveAddress}>
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}