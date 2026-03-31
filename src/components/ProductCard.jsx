import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart, updateQuantity, cart } = useCart();
  const cartItem = cart.find(item => item.id === product.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </div>
      <div className="product-content">
        <div className="product-price">${product.price.toFixed(2)}</div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-meta">{product.unit} • {product.description.substring(0, 40)}...</p>
        
        <div className="add-to-cart-wrapper">
          {qty === 0 ? (
            <button className="btn-add-cart" onClick={() => addToCart(product)}>
              <Plus size={18} />
              Add to Cart
            </button>
          ) : (
            <div className="quantity-control" style={{ width: '100%', height: '2.5rem' }}>
              <button className="quantity-btn" onClick={() => updateQuantity(product.id, qty - 1)}>
                <Minus size={16} />
              </button>
              <span className="quantity-text">{qty} in cart</span>
              <button className="quantity-btn" onClick={() => updateQuantity(product.id, qty + 1)}>
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
