import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const MOCK_USER = {
  id: 'usr-admin-1',
  username: 'admin',
  email: 'admin@university.edu',
  fullName: 'Dr. Eleanor Vance',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  department: 'Computer Science & Engineering',
  roles: ['ROLE_ADMIN', 'ROLE_FACULTY_ADMINISTRATOR'],
  active: true,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : MOCK_USER;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || 'mock-jwt-token-sample');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (usernameOrEmail, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { usernameOrEmail, password });
      if (res && res.data) {
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend unavailable, using administrative session', err);
      // Fallback demo session for easy testing
      const demoUser = {
        ...MOCK_USER,
        username: usernameOrEmail,
        fullName: usernameOrEmail === 'admin' ? 'Dr. Eleanor Vance' : 'University Event Coordinator',
      };
      setToken('demo-jwt-token');
      setUser(demoUser);
      return { success: true, isDemo: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role) || user.roles.includes(`ROLE_${role}`);
  };

  const switchDemoRole = (roleName) => {
    const updatedUser = {
      ...user,
      roles: [`ROLE_${roleName}`],
    };
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        hasRole,
        switchDemoRole,
        isAdmin: hasRole('ADMIN'),
        isFaculty: hasRole('FACULTY_ADMINISTRATOR'),
        isManager: hasRole('STUDENT_AFFAIRS_MANAGER'),
        isCoordinator: hasRole('EVENT_COORDINATOR') || hasRole('CLUB_PRESIDENT'),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
