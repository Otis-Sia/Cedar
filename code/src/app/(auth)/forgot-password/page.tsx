'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please check your address.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cedar-alabaster text-cedar-midnight font-body antialiased flex h-screen items-center justify-center selection:bg-cedar-bronze/30">
      <div className="w-full max-w-md bg-white p-10 rounded-[32px] border border-black/5 shadow-xl m-4 animate-in fade-in zoom-in duration-500">
        <Link href="/" className="flex items-center justify-center gap-3 group mb-8">
          <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic group-hover:bg-cedar-forest-dark transition-colors">
            C
          </div>
          <div className="font-headline text-2xl font-bold tracking-tight text-cedar-forest">Cedar</div>
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl font-bold text-cedar-midnight mb-2">Reset Password</h1>
          <p className="text-cedar-slate text-sm">
            {isSubmitted 
              ? "We've sent a recovery link to your inbox." 
              : "Enter your email and we'll send you instructions."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-100 text-green-700 text-sm rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Success! Please check your email for the reset link.
            </div>
            <Link 
              href="/login" 
              className="w-full flex justify-center items-center gap-2 bg-cedar-forest text-white py-4 rounded-xl font-bold text-base shadow-md hover:bg-cedar-forest-dark transition-all"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-cedar-midnight uppercase tracking-widest mb-2" htmlFor="email">Email Address</label>
              <input 
                id="email" 
                type="email" 
                placeholder="hello@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight" 
              />
            </div>
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-cedar-forest text-white py-4 rounded-xl font-bold text-base shadow-md hover:bg-cedar-forest-dark disabled:opacity-70 disabled:translate-y-0 transition-all"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Reset Link <span className="material-symbols-outlined text-[18px]">mail</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-8 text-center">
          <Link href="/login" className="font-bold text-cedar-forest hover:underline text-sm inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
