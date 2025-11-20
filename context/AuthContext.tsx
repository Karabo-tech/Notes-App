import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    storage.getCurrentUser().then(setUser);
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await storage.login(email, password);
    if (!loggedInUser) throw new Error('Invalid credentials');
    setUser(loggedInUser);
  };

  const register = async (userData: Omit<User, 'id'>) => {
    const newUser = { ...userData, id: Date.now().toString() }; // ← Fixed: single colon
    await storage.saveUser(newUser);
    setUser(newUser);
    await AsyncStorage.setItem('@current_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    await storage.logout();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    await storage.updateUser(updated);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};