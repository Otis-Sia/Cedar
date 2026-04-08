"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [tier, setTier] = useState<'free' | 'professional' | 'business'>('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setTier(userDoc.data().tier as 'free' | 'professional' | 'business');
          } else {
            // Create user profile
            const newProfile = {
              email: currentUser.email || '',
              tier: 'free',
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newProfile);
            setTier('free');
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signUp = async (email: string, pass: string, name: string) => {
    setIsAuthenticating(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const newUser = userCredential.user;
      
      // Create user profile in Firestore
      const userDocRef = doc(db, 'users', newUser.uid);
      const newProfile = {
        name,
        email,
        tier: 'free',
        createdAt: new Date().toISOString()
      };
      await setDoc(userDocRef, newProfile);
      setTier('free');
    } catch (err: unknown) {
      console.error('Sign up error:', err);
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const login = async (email: string, pass: string) => {
    setIsAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: unknown) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: unknown) {
      console.error('Password reset error:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: unknown) {
      console.error('Error signing out', err);
    }
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
