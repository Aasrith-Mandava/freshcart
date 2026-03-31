import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '1.5rem' }} />
        <h1 className="heading-1" style={{ marginBottom: '1rem' }}>Order Placed!</h1>
        <p className="text-subtle" style={{ fontSize: '1.25rem' }}>
          Thank you, {user?.name || 'Guest'}. Your fresh groceries are on the way.
        </p>
        <p className="text-subtle" style={{ marginTop: '0.5rem' }}>Redirecting to home...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container empty-state animate-fade-in">
        <ShoppingBag className="empty-icon" size={80} />
        <h2 className="heading-2">Your cart is empty</h2>
        <p className="text-subtle" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          You need items in your cart to checkout.
        </p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <h1 className="heading-2" style={{ marginBottom: '2rem' }}>Checkout</h1>

      <div className="checkout-grid">
        <form onSubmit={handleCheckout} className="checkout-form">
          <div className="checkout-section">
            <h3 className="checkout-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} color="var(--primary)" /> Delivery Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" className="input-field" required defaultValue={user?.name} />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" className="input-field" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="input-field" required placeholder="123 Fresh Lane" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input type="text" className="input-field" required />
              </div>
              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input type="text" className="input-field" required />
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h3 className="checkout-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={20} color="var(--primary)" /> Payment Method
            </h3>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input type="text" className="input-field" required placeholder="0000 0000 0000 0000" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input type="text" className="input-field" required placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label className="form-label">CVC</label>
                <input type="text" className="input-field" required placeholder="123" />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem' }}>
            Place Order (${(cartTotal + 5.99).toFixed(2)})
          </button>
        </form>

        <div className="checkout-section" style={{ position: 'sticky', top: '6rem' }}>
          <h3 className="checkout-section-title">Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="text-subtle">{item.quantity}x</span>
                  <span>{item.name}</span>
                </span>
                <span style={{ fontWeight: '500' }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div style={{ borderTop: '1px solid var(--divider)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Delivery Fee</span>
              <span>$5.99</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--divider)' }}>
              <span>Total</span>
              <span>${(cartTotal + 5.99).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
