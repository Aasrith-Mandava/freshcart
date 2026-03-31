import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cartItemCount, toggleCart } = useCart();
  const { user, openAuthModal, logout } = useAuth();

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="flex items-center gap-4">
          <button className="btn-icon md:hidden">
            <Menu size={24} />
          </button>
          <Link to="/" className="brand">
            <span style={{ color: 'var(--primary)' }}>Insta</span>
            <span style={{ color: 'var(--secondary)' }}>Fresh</span>
          </Link>
        </div>

        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for products, categories..." 
            className="search-input"
          />
        </div>

        <div className="nav-actions">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div 
                style={{ 
                  background: 'var(--primary-light)', 
                  color: 'var(--primary)',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                {user.initial}
              </div>
              <button className="btn-icon" onClick={logout} title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" onClick={openAuthModal}>
              <User size={18} />
              Log in
            </button>
          )}

          <button className="btn btn-primary" onClick={toggleCart} style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>
              Cart
            </span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
