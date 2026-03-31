import { categories, products } from '../data/mockData';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="container animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: '600', background: 'var(--primary-light)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
            <Sparkles size={16} /> Fresh groceries, delivered fast
          </div>
          <h1 className="heading-1 hero-title">
            Groceries delivered in as little as <span className="text-gradient">1 hour</span>
          </h1>
          <p className="hero-subtitle">
            Shop fresh produce, everyday essentials, and exclusive deals from your favorite local stores.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Shop Now <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="heading-2" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Explore Categories
          <button className="btn-icon text-subtle" style={{ fontSize: '1rem', background: 'transparent' }}>
            View All
          </button>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat, index) => (
            <CategoryCard key={cat.id} category={cat} delay={index} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Produce & Essentials</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}
