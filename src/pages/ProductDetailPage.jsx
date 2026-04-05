import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Leaf, Truck, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, getStoreById, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = getProductById(productId);
  const { addItem, getItemQuantity, updateQuantity } = useCart();

  if (!product) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const store = getStoreById(product.storeId);
  const quantity = getItemQuantity(product.id);
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null;

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-page">
      <div className="page-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>

        <div className="product-detail-grid">
          <motion.div
            className="product-detail-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="product-detail-emoji">{product.image}</span>
            <div className="product-detail-badges">
              {product.isOrganic && (
                <span className="badge organic">
                  <Leaf size={14} /> Organic
                </span>
              )}
              {product.discount && (
                <span className="badge discount">-{product.discount}% OFF</span>
              )}
            </div>
          </motion.div>

          <motion.div
            className="product-detail-info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="product-detail-category">
              <Link to={`/category/${product.category}`}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
              {store && (
                <>
                  {' • '}
                  <Link to={`/store/${store.id}`}>{store.name}</Link>
                </>
              )}
            </div>

            <h1>{product.name}</h1>

            <div className="product-detail-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <span>{product.rating}</span>
              <span className="rating-count">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <div className="product-detail-price">
              {discountedPrice ? (
                <>
                  <span className="price-main">${discountedPrice.toFixed(2)}</span>
                  <span className="price-crossed">${product.price.toFixed(2)}</span>
                  <span className="price-save">
                    Save ${(product.price - discountedPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="price-main">${product.price.toFixed(2)}</span>
              )}
              <span className="price-unit">/ {product.unit}</span>
            </div>

            <p className="product-detail-desc">{product.description}</p>

            {product.nutrition && (
              <div className="product-nutrition">
                <h3>Nutrition Facts</h3>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="nutrition-value">{product.nutrition.calories}</span>
                    <span className="nutrition-label">Calories</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{product.nutrition.protein}</span>
                    <span className="nutrition-label">Protein</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{product.nutrition.carbs}</span>
                    <span className="nutrition-label">Carbs</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{product.nutrition.fiber}</span>
                    <span className="nutrition-label">Fiber</span>
                  </div>
                </div>
              </div>
            )}

            <div className="product-detail-actions">
              {quantity === 0 ? (
                <button
                  className="btn btn-primary btn-large"
                  onClick={() => addItem(product)}
                  id={`detail-add-${product.id}`}
                >
                  <Plus size={18} /> Add to Cart
                </button>
              ) : (
                <div className="quantity-control large">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="qty-value">{quantity} in cart</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="product-guarantees">
              <div className="guarantee-item">
                <Truck size={18} />
                <span>Fast delivery available</span>
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={18} />
                <span>Freshness guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="related-section">
            <h2 className="section-title">Related Products</h2>
            <div className="products-grid">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
