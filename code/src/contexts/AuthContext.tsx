"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const AUTH_STORAGE_KEY = 'cedar:auth-user';

interface MockUser {
  uid: string;
  email: string;
  displayName: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  tenantId: string | null;
  providerData: { providerId: string; displayName: string | null; email: string | null; photoURL: string | null }[];
}

interface AuthContextType {
  user: MockUser | null;
  tier: 'free' | 'professional' | 'business';
  loading: boolean;
  isAuthenticating: boolean;
  signUp: (email: string, pass: string, name: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [tier] = useState<'free' | 'professional' | 'business'>('free');
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as MockUser);
      }
    } catch {
      // ignore parse errors
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, _pass: string, name: string) => {
    setIsAuthenticating(true);
    try {
      const newUser: MockUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: name,
        emailVerified: false,
        isAnonymous: false,
        tenantId: null,
        providerData: [],
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const login = async (email: string, _pass: string) => {
    setIsAuthenticating(true);
    try {
      const existingRaw = localStorage.getItem(AUTH_STORAGE_KEY);
      const existing = existingRaw ? (JSON.parse(existingRaw) as MockUser) : null;
      const loggedIn: MockUser = existing?.email === email
        ? existing
        : {
            uid: `user-${email}`,
            email,
            displayName: null,
            emailVerified: true,
            isAnonymous: false,
            tenantId: null,
            providerData: [],
          };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedIn));
      setUser(loggedIn);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resetPassword = async (_email: string) => {
    // No-op in frontend-only mode
  };

  const logout = async () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, tier, loading, isAuthenticating, signUp, login, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
