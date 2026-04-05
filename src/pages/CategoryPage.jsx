import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories, getProductsByCategory } from '../data/products';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Category not found</h2>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="page-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <motion.div
          className="category-page-header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="category-page-icon"
            style={{ background: `${category.color}20` }}
          >
            {category.icon}
          </span>
          <div>
            <h1>{category.name}</h1>
            <p>{products.length} products</p>
          </div>
        </motion.div>

        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No products in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
