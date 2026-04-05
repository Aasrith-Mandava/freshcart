import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getDeals } from '../data/products';

export default function DealsPage() {
  const deals = getDeals();

  return (
    <div className="deals-page">
      <div className="page-container">
        <motion.div
          className="deals-page-header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Zap size={32} className="deals-header-icon" />
          <div>
            <h1>Today&apos;s Deals</h1>
            <p>Save big on your favorite items</p>
          </div>
        </motion.div>

        <div className="products-grid">
          {deals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
