import { motion } from 'framer-motion';

export default function CategoryCard({ category, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
      className="category-card"
    >
      <div className="category-icon">{category.icon}</div>
      <h3 className="category-name">{category.name}</h3>
    </motion.div>
  );
}
