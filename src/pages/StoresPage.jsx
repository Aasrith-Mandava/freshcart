import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Truck, Star } from 'lucide-react';
import { stores, getProductsByStore } from '../data/products';

export default function StoresPage() {
  return (
    <div className="stores-page">
      <div className="page-container">
        <div className="page-header">
          <h1>All Stores</h1>
          <p>Shop from your favorite stores — delivered fast</p>
        </div>

        <div className="stores-list-grid">
          {stores.map((store, i) => {
            const productCount = getProductsByStore(store.id).length;
            return (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/store/${store.id}`}
                  className="store-list-card"
                  id={`store-list-${store.id}`}
                >
                  <div
                    className="store-list-banner"
                    style={{ background: `linear-gradient(135deg, ${store.color}, ${store.color}dd)` }}
                  >
                    <span className="store-list-logo">{store.logo}</span>
                  </div>
                  <div className="store-list-content">
                    <h2>{store.name}</h2>
                    <p className="store-list-desc">{store.description}</p>
                    <div className="store-list-meta">
                      <span className="store-meta-item">
                        <Clock size={14} /> {store.deliveryTime}
                      </span>
                      <span className="store-meta-item">
                        <Truck size={14} />{' '}
                        {store.deliveryFee === 0
                          ? 'Free'
                          : `$${store.deliveryFee.toFixed(2)}`}
                      </span>
                      <span className="store-meta-item">
                        <Star size={14} /> {store.rating}
                      </span>
                    </div>
                    <span className="store-product-count">
                      {productCount} products
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
