import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Star, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function ProductCard({ product, index = 0 }) {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null;

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      id={`product-card-${product.id}`}
    >
      {product.discount && (
        <div className="product-badge discount">-{product.discount}%</div>
      )}
      {product.isOrganic && (
        <div className="product-badge organic">
          <Leaf size={12} /> Organic
        </div>
      )}

      <Link to={`/product/${product.id}`} className="product-card-image">
        <span className="product-emoji">{product.image}</span>
      </Link>

      <div className="product-card-content">
        <Link to={`/product/${product.id}`} className="product-card-name">
          {product.name}
        </Link>

        <div className="product-card-price">
          {discountedPrice ? (
            <>
              <span className="price-current">${discountedPrice.toFixed(2)}</span>
              <span className="price-original">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="price-current">${product.price.toFixed(2)}</span>
          )}
          <span className="price-unit">/ {product.unit}</span>
        </div>

        <div className="product-card-rating">
          <Star size={14} className="star-icon" />
          <span>{product.rating}</span>
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-card-actions">
          {quantity === 0 ? (
            <button
              className="btn btn-add"
              onClick={() => addItem(product)}
              id={`add-btn-${product.id}`}
            >
              <Plus size={16} /> Add
            </button>
          ) : (
            <div className="quantity-control">
              <button
                className="qty-btn"
                onClick={() => updateQuantity(product.id, quantity - 1)}
              >
                <Minus size={16} />
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => updateQuantity(product.id, quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}