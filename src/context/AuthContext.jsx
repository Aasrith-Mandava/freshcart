/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, PropTypes } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('freshcart_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isLoading = false;

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('freshcart_users') || '[]');

    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: name.charAt(0).toUpperCase(),
      address: '',
      phone: '',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('freshcart_users', JSON.stringify(users));

    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('freshcart_user', JSON.stringify(safeUser));

    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('freshcart_users') || '[]');
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('freshcart_user', JSON.stringify(safeUser));
  };

  AuthProvider.propTypes = {
    children: PropTypes.node,
  };

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('freshcart_user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('freshcart_user', JSON.stringify(updatedUser));

    // Also update in users array
    const users = JSON.parse(localStorage.getItem('freshcart_users') || '[]');
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('freshcart_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signup, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};