import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { searchProducts, products as allProducts } from '../data/products';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = query.trim() ? searchProducts(query) : allProducts;

  return (
    <div className="search-page">
      <div className="page-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <motion.div
          className="search-page-header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search size={28} className="search-page-icon" />
          <div>
            <h1>
              {query
                ? `Results for "${query}"`
                : 'All Products'}
            </h1>
            <p>{results.length} products found</p>
          </div>
        </motion.div>

        {results.length > 0 ? (
          <div className="products-grid">
            {results.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={64} className="empty-icon" />
            <h2>No products found</h2>
            <p>Try a different search term or browse our categories.</p>
            <Link to="/" className="btn btn-primary">Browse Categories</Link>
          </div>
        )}
      </div>
    </div>
  );
}
