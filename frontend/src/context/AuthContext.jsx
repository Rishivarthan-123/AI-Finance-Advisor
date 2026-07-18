import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('finlytic-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('finlytic-token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem('finlytic-token');
          localStorage.removeItem('finlytic-user');
          setUser(null);
        }
      } catch {
        localStorage.removeItem('finlytic-token');
        localStorage.removeItem('finlytic-user');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // data: { email, password } -> returns user, throws on failure
  const login = async (data) => {
    const res = await api.post('/api/auth/login', data);
    const { token, user: userData } = res.data;
    localStorage.setItem('finlytic-token', token);
    localStorage.setItem('finlytic-user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  // payload: { fullname, email, phone, password }
  const register = async (payload) => {
    const res = await api.post('/api/auth/register', payload);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('finlytic-token');
    localStorage.removeItem('finlytic-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}