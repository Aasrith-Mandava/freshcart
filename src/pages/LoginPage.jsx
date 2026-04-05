import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(email, password);
    setIsSubmitting(false);
    if (result.success) { navigate('/'); } else { setError(result.error); }
  };

  const handleDemo = () => {
    const demoEmail = 'demo@freshcart.com';
    const demoPass = 'demo123';
    let result = login(demoEmail, demoPass);
    if (!result.success) {
      signup('Demo User', demoEmail, demoPass);
      result = login(demoEmail, demoPass);
    }
    if (result.success) navigate('/');
  };

  return (
    <div className="auth-page">
      <motion.div className="auth-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="auth-header">
          <Link to="/" className="auth-logo"><span className="logo-icon">🛒</span></Link>
          <h1>Welcome back</h1>
          <p>Log in to your FreshCart account</p>
        </div>
        {error && (<div className="auth-error" id="login-error"><AlertCircle size={16} />{error}</div>)}
        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input type="email" id="login-email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input type={showPassword ? 'text' : 'password'} id="login-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
              <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting} id="login-submit">
            {isSubmitting ? <span className="btn-loading"><span className="spinner small" /> Logging in...</span> : 'Log In'}
          </button>
        </form>
        <div className="auth-footer"><p>Don&apos;t have an account? <Link to="/signup">Sign up</Link></p></div>
        <div className="auth-divider"><span>or continue with</span></div>
        <div className="auth-social">
          <button className="btn btn-social" onClick={handleDemo}>🎪 Demo Account</button>
        </div>
      </motion.div>
    </div>
  );
}
