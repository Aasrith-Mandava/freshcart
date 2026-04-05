import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    savings,
    deliveryFee,
    serviceFee,
    tax,
    total,
    itemCount,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <ShoppingBag size={64} className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven&apos;t added anything yet.</p>
          <Link to="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <div className="page-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>

        <h1 className="page-title">
          Shopping Cart <span className="cart-count">({itemCount} items)</span>
        </h1>

        <div className="cart-layout">
          <div className="cart-items">
            <AnimatePresence>
              {items.map((item) => {
                const discountedPrice = item.discount
                  ? item.price * (1 - item.discount / 100)
                  : item.price;
                return (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/product/${item.id}`} className="cart-item-image">
                      <span className="cart-item-emoji">{item.image}</span>
                    </Link>

                    <div className="cart-item-details">
                      <Link to={`/product/${item.id}`} className="cart-item-name">
                        {item.name}
                      </Link>
                      <span className="cart-item-unit">{item.unit}</span>
                      {item.discount && (
                        <span className="cart-item-discount">
                          <Tag size={12} /> {item.discount}% off
                        </span>
                      )}
                    </div>

                    <div className="cart-item-qty">
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price">
                      <span className="cart-price">
                        ${(discountedPrice * item.quantity).toFixed(2)}
                      </span>
                      {item.discount && (
                        <span className="cart-price-original">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      className="cart-item-remove"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <div className="cart-actions-row">
              <button className="btn btn-outline btn-sm" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Order Summary</h2>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {savings > 0 && (
                <div className="summary-line savings">
                  <span>Savings</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-line">
                <span>
                  Delivery fee{' '}
                  {deliveryFee === 0 && <span className="free-tag">FREE</span>}
                </span>
                <span>{deliveryFee === 0 ? '$0.00' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="summary-line">
                <span>Service fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {subtotal < 35 && (
              <div className="free-delivery-msg">
                <Truck size={16} />
                Add ${(35 - subtotal).toFixed(2)} more for free delivery
              </div>
            )}

            <button
              className="btn btn-primary btn-full btn-large"
              onClick={handleCheckout}
              id="checkout-btn"
            >
              {user ? 'Proceed to Checkout' : 'Log in to Checkout'}
            </button>

            <div className="summary-guarantee">
              <ShieldCheck size={16} />
              <span>100% satisfaction guaranteed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
