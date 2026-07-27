import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Default to Student user (Pradhikshalini Mahendran) or restore from LocalStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('campus_connect_user');
    return saved ? JSON.parse(saved) : MOCK_USERS[1];
  });

  const [jwtToken, setJwtToken] = useState(() => {
    return localStorage.getItem('campus_connect_jwt') || 'mock-jwt-token-campus-nexus-2026';
  });

  useEffect(() => {
    localStorage.setItem('campus_connect_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Switch role between available personas (Admin, Student, Club Head, Faculty)
  const switchUserRole = (userId) => {
    const found = MOCK_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      const token = `mock-jwt-token-${found.role.toLowerCase()}-${Date.now()}`;
      setJwtToken(token);
      localStorage.setItem('campus_connect_jwt', token);
    }
  };

  const updateProfile = (updatedProfileData) => {
    setCurrentUser(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updatedProfileData }
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      jwtToken,
      switchUserRole,
      updateProfile,
      allAvailableUsers: MOCK_USERS,
      isAdmin: currentUser.role === 'ADMIN',
      isStudent: currentUser.role === 'STUDENT',
      isClubHead: currentUser.role === 'CLUB_HEAD',
      isFaculty: currentUser.role === 'FACULTY'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
