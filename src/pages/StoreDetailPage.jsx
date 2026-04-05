import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Truck, Star, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getStoreById, getProductsByStore } from '../data/products';

export default function StoreDetailPage() {
  const { storeId } = useParams();
  const store = getStoreById(storeId);
  const products = getProductsByStore(storeId);

  if (!store) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Store not found</h2>
          <Link to="/stores" className="btn btn-primary">
            Browse Stores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="store-detail-page">
      <motion.div
        className="store-detail-banner"
        style={{ background: `linear-gradient(135deg, ${store.color}, ${store.color}cc)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="page-container">
          <Link to="/stores" className="back-link light">
            <ArrowLeft size={18} /> All Stores
          </Link>
          <div className="store-detail-header">
            <span className="store-detail-logo">{store.logo}</span>
            <div className="store-detail-info">
              <h1>{store.name}</h1>
              <p>{store.description}</p>
              <div className="store-detail-meta">
                <span>
                  <Clock size={16} /> {store.deliveryTime}
                </span>
                <span>
                  <Truck size={16} /> ${store.deliveryFee.toFixed(2)} delivery
                </span>
                <span>
                  <Star size={16} /> {store.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="page-container">
        <h2 className="section-title" style={{ marginTop: '2rem' }}>
          All Products ({products.length})
        </h2>
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No products available in this store yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
