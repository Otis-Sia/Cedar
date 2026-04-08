import React from 'react';
import Link from 'next/link';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cedar-alabaster text-cedar-midnight font-body antialiased min-h-screen flex flex-col selection:bg-cedar-bronze/30">
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-6 md:px-12 py-4 h-20 border-b border-black/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic shadow-sm hover:scale-105 transition-transform">C</div>
          <div className="font-headline text-2xl font-bold tracking-tight text-cedar-forest">Cedar</div>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-cedar-slate hover:text-cedar-forest transition-colors">Sign In</Link>
          <Link href="/signup" className="text-xs font-bold uppercase tracking-widest bg-cedar-forest text-white px-6 py-2.5 rounded-full hover:bg-cedar-forest-dark shadow-md transition-all">Join</Link>
        </div>
      </nav>
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        {children}
      </main>

      <footer className="bg-white flex flex-col md:flex-row justify-between items-center px-6 md:px-15 py-10 w-full border-t border-black/5 shrink-0">
        <div className="text-[13px] font-medium text-cedar-slate">© 2026 Cedar. Curated with excellence in Nairobi.</div>
        <div className="flex gap-8 mt-6 md:mt-0">
          <Link className="text-[11px] font-bold uppercase tracking-widest text-cedar-slate hover:text-cedar-forest" href="/legal/privacy">Privacy</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-cedar-slate hover:text-cedar-forest" href="/legal/terms">Terms</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-cedar-slate hover:text-cedar-forest" href="/legal/support">Support</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-cedar-slate hover:text-cedar-forest" href="/">Home</Link>
        </div>
      </footer>
    </div>
  );
}
