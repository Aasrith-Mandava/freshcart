import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, CreditCard, ArrowLeft, Check, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
  const { items, subtotal, savings, deliveryFee, serviceFee, tax, total, clearCart, deliveryAddress, setDeliveryAddress } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState(deliveryAddress || '');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [tip, setTip] = useState(2);
  const [isPlacing, setIsPlacing] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [errorLine, setErrorLine] = useState('');

  const EXPRESS_DELIVERY_FEE = 3.99;

  if (items.length === 0 && !isPlaced) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setErrorLine('Please enter a delivery address.');
      return;
    }
    setErrorLine('');

    setIsPlacing(true);
    await new Promise((r) => setTimeout(r, 2000));

    // Save order
    const orders = JSON.parse(localStorage.getItem('freshcart_orders') || '[]');
    const order = {
      id: `FC-${Date.now()}`,
      userId: user.id,
      items: [...items],
      subtotal,
      savings,
      deliveryFee,
      serviceFee,
      tax,
      tip,
      total: total + tip,
      address,
      deliveryOption,
      instructions,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: deliveryOption === 'express' ? '25-35 min' : '45-60 min',
    };
    orders.push(order);
    localStorage.setItem('freshcart_orders', JSON.stringify(orders));
    setDeliveryAddress(address);

    clearCart();
    setIsPlacing(false);
    setIsPlaced(true);
  };

  if (isPlaced) {
    return (
      <div className="page-container">
        <motion.div
          className="order-success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h1>Order Placed!</h1>
          <p>Your groceries are on the way. Sit back and relax!</p>
          <div className="success-details">
            <div className="success-detail-item">
              <Truck size={20} />
              <span>Estimated delivery: {deliveryOption === 'express' ? '25-35 min' : '45-60 min'}</span>
            </div>
            <div className="success-detail-item">
              <MapPin size={20} />
              <span>{address}</span>
            </div>
          </div>
          <div className="success-actions">
            <Link to="/orders" className="btn btn-primary">View Orders</Link>
            <Link to="/" className="btn btn-outline">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-container">
        <Link to="/cart" className="back-link">
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <h1 className="page-title">Checkout</h1>
        {errorLine && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{errorLine}</div>}

        <div className="checkout-layout">
          <div className="checkout-form">
            {/* Delivery Address */}
            <motion.div
              className="checkout-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>
                <MapPin size={20} /> Delivery Address
              </h2>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter your full delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="checkout-address"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Delivery instructions (optional)"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={2}
                  id="checkout-instructions"
                />
              </div>
            </motion.div>

            {/* Delivery Speed */}
            <motion.div
              className="checkout-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2>
                <Clock size={20} /> Delivery Speed
              </h2>
              <div className="delivery-options">
                <label
                  className={`delivery-option ${deliveryOption === 'standard' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={deliveryOption === 'standard'}
                    onChange={() => setDeliveryOption('standard')}
                  />
                  <div className="delivery-option-content">
                    <strong>Standard</strong>
                    <span>45–60 min</span>
                  </div>
                  <span className="delivery-option-price">
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </label>
                <label
                  className={`delivery-option ${deliveryOption === 'express' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={deliveryOption === 'express'}
                    onChange={() => setDeliveryOption('express')}
                  />
                  <div className="delivery-option-content">
                    <strong>Express</strong>
                    <span>25–35 min</span>
                  </div>
                  <span className="delivery-option-price">+${EXPRESS_DELIVERY_FEE}</span>
                </label>
              </div>
            </motion.div>

            {/* Tip */}
            <motion.div
              className="checkout-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>Tip your shopper</h2>
              <div className="tip-options">
                {[0, 2, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    className={`tip-btn ${tip === amount ? 'active' : ''}`}
                    onClick={() => setTip(amount)}
                  >
                    {amount === 0 ? 'None' : `$${amount}`}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div
              className="checkout-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>
                <CreditCard size={20} /> Payment Method
              </h2>
              <div className="payment-methods">
                <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  💳 Credit / Debit Card
                </label>
                <label className={`payment-option ${paymentMethod === 'apple' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="apple"
                    checked={paymentMethod === 'apple'}
                    onChange={() => setPaymentMethod('apple')}
                  />
                  🍎 Apple Pay
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-form">
                  <div className="form-group">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                      type="text"
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="card-expiry">Expiry</label>
                      <input
                        type="text"
                        id="card-expiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card-cvv">CVV</label>
                      <input
                        type="text"
                        id="card-cvv"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            className="checkout-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Order Summary</h2>

            <div className="checkout-items-preview">
              {items.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <span className="checkout-item-emoji">{item.image}</span>
                  <span className="checkout-item-name">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="checkout-item-price">
                    $
                    {(
                      (item.discount
                        ? item.price * (1 - item.discount / 100)
                        : item.price) * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

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
                <span>Delivery</span>
                <span>
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  {deliveryOption === 'express' && ` + $${EXPRESS_DELIVERY_FEE}`}
                </span>
              </div>
              <div className="summary-line">
                <span>Service fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Tip</span>
                <span>${tip.toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>
                $
                {(
                  total +
                  tip +
                  (deliveryOption === 'express' ? EXPRESS_DELIVERY_FEE : 0)
                ).toFixed(2)}
              </span>
            </div>

            <button
              className="btn btn-primary btn-full btn-large"
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              id="place-order-btn"
            >
              {isPlacing ? (
                <span className="btn-loading">
                  <span className="spinner small" /> Placing Order...
                </span>
              ) : (
                `Place Order — $${expressDeliveryFeeAdded = deliveryOption === 'express' ? EXPRESS_DELIVERY_FEE : 0, (total + tip + expressDeliveryFeeAdded).toFixed(2)}`
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}