import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <AuthModal />
      <CartDrawer />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>

      <footer style={{ padding: '3rem 2rem', background: '#111827', color: '#9CA3AF', marginTop: 'auto', textAlign: 'center' }}>
        <p>© 2026 InstaFresh. Built by Antigravity.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.875rem' }}>
          <a href="#" className="hover-white" style={{ transition: 'color 0.2s' }}>Terms of Service</a>
          <a href="#" className="hover-white" style={{ transition: 'color 0.2s' }}>Privacy</a>
          <a href="#" className="hover-white" style={{ transition: 'color 0.2s' }}>Help</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
