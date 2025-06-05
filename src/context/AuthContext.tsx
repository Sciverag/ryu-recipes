// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/generated/prisma';

type LogedUser = Omit<User, 'password'>;

type AuthContextType = {
  isLoggedIn: boolean;
  user: LogedUser | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<LogedUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<LogedUser & { exp: number }>(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          image: decoded.image,
          createdAt: decoded.createdAt,
          updatedAt: decoded.updatedAt,
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Token inválido', error);
        logout();
      }
    }
    setIsLoggedIn(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode<LogedUser & { exp: number }>(token);
      setUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        image: decoded.image,
        createdAt: decoded.createdAt,
        updatedAt: decoded.updatedAt,
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Token inválido', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
