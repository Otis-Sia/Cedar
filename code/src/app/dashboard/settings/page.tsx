'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user, tier } = useAuth();
  const tierLabel = tier === 'professional' ? 'Career' : tier === 'business' ? 'Creator Pro' : 'Starter Presence';

  return (
    <>
      <header className="flex justify-between items-center px-8 md:px-12 py-10 shrink-0">
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-cedar-forest">Account Settings</h2>
          <p className="text-sm text-cedar-slate mt-1 italic font-medium">Manage your personal presence and preferences.</p>
        </div>
      </header>

      <div className="px-8 md:px-12 pb-20 space-y-10 flex-1">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Profile Section */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-[32px] p-8 md:p-10 border border-black/5 shadow-sm">
              <h3 className="text-cedar-midnight font-bold text-lg mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-cedar-bronze">person_edit</span>
                Profile Information
              </h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-cedar-slate ml-1">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.displayName || 'Sarah Jenkins'} 
                      className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/30 font-body text-sm outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-cedar-slate ml-1">Professional Title</label>
                    <input 
                      type="text" 
                      defaultValue="Creative Director" 
                      className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/30 font-body text-sm outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-cedar-slate ml-1">Email Address</label>
                  <input 
                    type="email" 
                    readOnly
                    value={user?.email || ''} 
                    className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/10 font-body text-sm text-cedar-slate cursor-not-allowed" 
                  />
                  <p className="text-[10px] text-cedar-slate/60 ml-1">Email cannot be changed while account is active.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-cedar-slate ml-1">Bio Snapshot</label>
                  <textarea 
                    rows={4}
                    defaultValue="Passionate about minimalist architecture and clean digital experiences. Nairobi based."
                    className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/30 font-body text-sm outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight resize-none" 
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="bg-cedar-forest text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-md hover:bg-cedar-forest-dark transition-all">
                    Update Profile
                  </button>
                </div>
              </form>
            </section>

            <section className="bg-white rounded-[32px] p-8 md:p-10 border border-black/5 shadow-sm">
              <h3 className="text-cedar-midnight font-bold text-lg mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-cedar-bronze">security</span>
                Security
              </h3>
              <p className="text-cedar-slate text-sm mb-8">Maintain the integrity of your professional workspace.</p>
              
              <div className="flex items-center justify-between p-6 bg-cedar-alabaster/50 rounded-2xl border border-black/5">
                <div>
                  <p className="text-sm font-bold text-cedar-midnight">Password</p>
                  <p className="text-[11px] text-cedar-slate mt-1">Last changed 4 months ago</p>
                </div>
                <button className="text-cedar-forest font-bold text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Reset Password</button>
              </div>
            </section>
          </div>

          {/* Right Column: Billing & Plan */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-cedar-forest rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
              
              <span className="text-cedar-bronze font-bold text-[10px] tracking-[0.3em] uppercase">Subscription</span>
              <h3 className="font-headline text-3xl font-bold mt-2">{tierLabel}</h3>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-cedar-bronze text-sm">check_circle</span>
                  <span className="text-xs font-medium text-white/80 font-body">Unlimited Portfolio Items</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-cedar-bronze text-sm">check_circle</span>
                  <span className="text-xs font-medium text-white/80 font-body">Custom Domain Mapping</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-cedar-bronze text-sm">check_circle</span>
                  <span className="text-xs font-medium text-white/80 font-body">Concierge Support</span>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Next Billing Date</p>
                <p className="font-headline text-xl font-bold">April 24, 2026</p>
                <button className="mt-8 w-full py-3 rounded-xl bg-white text-cedar-forest font-bold text-xs uppercase tracking-widest hover:bg-cedar-alabaster transition-all">
                  Manage Billing
                </button>
              </div>
            </section>

            <section className="bg-white rounded-[32px] p-8 border border-black/5 shadow-sm">
              <h4 className="text-cedar-midnight font-bold text-sm mb-4">Danger Zone</h4>
              <p className="text-cedar-slate text-xs leading-relaxed mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="text-red-600 font-bold text-xs uppercase tracking-widest hover:text-red-700 transition-colors">Deactivate Account</button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
