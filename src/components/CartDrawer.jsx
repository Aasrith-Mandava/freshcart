import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    if (!user) {
      openAuthModal();
      return;
    }
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cart-overlay"
            onClick={closeCart}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-drawer"
          >
            <div className="cart-header">
              <h2 className="heading-3" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={24} color="var(--primary)" />
                Your Cart
              </h2>
              <button onClick={closeCart} className="btn-icon">
                <X size={24} />
              </button>
            </div>

            <div className="cart-body">
              {cart.length === 0 ? (
                <div className="empty-state">
                  <ShoppingBag className="empty-icon" size={64} />
                  <h3 className="heading-3">Cart is empty</h3>
                  <p className="text-subtle" style={{ marginTop: '0.5rem' }}>
                    Add some fresh items to your cart!
                  </p>
                  <button onClick={closeCart} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h4 className="cart-item-title">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="btn-icon" style={{ padding: '0.25rem' }}>
                            <X size={16} />
                          </button>
                        </div>
                        <div className="text-subtle" style={{ fontSize: '0.875rem' }}>${item.price.toFixed(2)} / {item.unit}</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                          <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                          
                          <div className="quantity-control">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">
                              <Minus size={14} />
                            </button>
                            <span className="quantity-text">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '700' }}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                  Go to Checkout <ArrowRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
