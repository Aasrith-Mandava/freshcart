import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = () => {
    if (password.length === 0) return null;
    if (password.length < 6) return { level: 'weak', text: 'Weak', color: '#ef4444' };
    if (password.length < 10) return { level: 'medium', text: 'Medium', color: '#f59e0b' };
    return { level: 'strong', text: 'Strong', color: '#22c55e' };
  };

  const strength = passwordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const result = signup(name, email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">🛒</span>
          </Link>
          <h1>Create your account</h1>
          <p>Join FreshCart and start saving</p>
        </div>

        {error && (
          <div className="auth-error" id="signup-error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" id="signup-form">
          <div className="form-group">
            <label htmlFor="signup-name">Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="signup-name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
autoComplete="name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="signup-email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="signup-password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {strength && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width:
                        (strength.level === 'weak' ? '33%' : 
                        strength.level === 'medium' ? '66%' : '100%'),
                      background: strength.color,
                    }}
                  />
                </div>
                <span style={{ color: strength.color }}>{strength.text}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirm">Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="signup-confirm"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              {confirmPassword && password === confirmPassword && (
                <CheckCircle size={18} className="input-success" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isSubmitting}
            id="signup-submit"
          >
            {isSubmitting ? (
              <span className="btn-loading">
                <span className="spinner small" /> Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}