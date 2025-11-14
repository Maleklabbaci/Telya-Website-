
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isAdmin') === 'true';
    if (loggedIn) {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === 'malek123') {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      window.location.href = '/'; // Redirect to home page
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isAdmin');
    setIsAdmin(false);
     window.location.href = '/'; // Redirect to home page
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
