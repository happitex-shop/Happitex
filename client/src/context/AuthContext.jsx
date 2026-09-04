import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user info on load
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    const { data } = await axios.post('/api/auth/login', { identifier, password });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const adminLogin = async (identifier, password) => {
    const { data } = await axios.post('/api/auth/admin/login', { identifier, password });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const register = async (name, phone, email, password) => {
    const { data } = await axios.post('/api/auth/register', { name, phone, email, password });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const updateUser = async (updateData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put('/api/auth/profile', updateData, config);
      const updated = { ...data, token: user.token };
      setUser(updated);
      localStorage.setItem('userInfo', JSON.stringify(updated));
      return { success: true, user: updated };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Update failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      adminLogin, 
      register, 
      updateUser, 
      updateAdminProfile: updateUser, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
