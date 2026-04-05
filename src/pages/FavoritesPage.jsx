import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProductById } from '../data/products';

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    return JSON.parse(localStorage.getItem('freshcart_favorites') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('freshcart_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const favorites = favoriteIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  const removeFavorite = (productId) => {
    setFavoriteIds((prev) => prev.filter((id) => id !== productId));
  };

  if (favorites.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <Heart size={64} className="empty-icon" />
          <h2>No favorites yet</h2>
          <p>Start adding products you love!</p>
          <Link to="/" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="page-container">
        <h1 className="page-title">
          <Heart size={28} className="page-title-icon" /> My Favorites
        </h1>
        <div className="products-grid">
          {favorites.map((product, i) => (
            <div key={product.id} className="favorite-wrapper">
              <ProductCard product={product} index={i} />
              <button
                className="favorite-remove"
                onClick={() => removeFavorite(product.id)}
                aria-label="Remove from favorites"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
