'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-cedar-alabaster">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cedar-forest/20 border-t-cedar-forest rounded-full animate-spin"></div>
          <p className="text-cedar-slate text-sm font-medium animate-pulse">Establishing secure session...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: 'grid_view' },
    { name: 'CV Import', href: '/dashboard/cv-upload', icon: 'cloud_upload' },
    { name: 'Templates', href: '/dashboard/templates', icon: 'auto_awesome_motion' },
    { name: 'Assets', href: '/dashboard/assets', icon: 'folder_open' },
    { name: 'Insights', href: '/dashboard/insights', icon: 'insights' },
    { name: 'Settings', href: '/dashboard/settings', icon: 'settings_accessibility' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-cedar-alabaster text-cedar-midnight font-body antialiased selection:bg-cedar-bronze/30">
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-full py-6 w-64 bg-white border-r border-black/5 shrink-0">
        <div className="px-6 mb-10 pt-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic group-hover:bg-cedar-forest-dark transition-colors">
              C
            </div>
            <h1 className="font-headline font-bold text-cedar-forest text-2xl tracking-tight">Cedar</h1>
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-cedar-alabaster">
              <img className="w-full h-full object-cover" alt="close-up portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz7R0o4_SwDScB_gU1LxAzSxZhpqjml-7YKu3L6IgONXpA4Bcq6I_aPRXl1eQyo0z6wCPJ8YChJLWycJPuaZjtDQz2tO8NgRQHry0R6Bpo9jjPrY3Ow8VaGiDWEOqYW_m_qy5kRQVHiMqszoaReVLVd37DyGMGtHQG1NClhd5O1mexvI6WfAS1eZoP0j95mvHR4VlkgWVuDuTiph2eCQPtwy8kSZxLwLU5_7IP42RszVL4bT8ogiBuBL47tPxRs-QVY-vmWgclv1hA"/>
            </div>
            <div>
              <p className="text-sm font-bold text-cedar-midnight">Project Alpha</p>
              <p className="text-[10px] text-cedar-slate uppercase tracking-widest font-semibold">Portfolio v2.1</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={
                  isActive
                    ? "bg-cedar-forest text-white rounded-xl px-4 py-3 mx-2 flex items-center gap-3 transition-all shadow-md"
                    : "text-cedar-slate px-4 py-3 mx-2 flex items-center gap-3 hover:bg-cedar-alabaster hover:text-cedar-midnight transition-colors rounded-xl"
                }
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>{link.icon}</span>
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="px-4 mt-auto mb-6">
          <Link href="/dashboard/templates" className="block w-full bg-cedar-forest text-white py-3 rounded-xl font-bold text-sm mb-6 shadow-md hover:bg-cedar-forest-dark transition-all text-center">
            New Portfolio
          </Link>
          <div className="border-t border-black/5 pt-4">
            <Link className="text-cedar-slate px-4 py-3 flex items-center gap-3 hover:text-cedar-midnight transition-colors rounded-xl" href="/">
              <span className="material-symbols-outlined text-sm">help</span>
              <span className="text-sm font-medium">Help Center</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full text-cedar-slate px-4 py-3 flex items-center gap-3 hover:text-red-600 hover:bg-red-50 transition-colors rounded-xl text-left"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar bg-cedar-alabaster relative flex flex-col">
        {children}
        
        {/* Footer inside main area */}
        <footer className="mt-auto flex flex-col md:flex-row justify-between items-center px-8 md:px-12 py-10 w-full bg-white border-t border-black/5 shrink-0">
          <p className="text-xs font-medium text-cedar-slate mb-4 md:mb-0">© 2026 Cedar. Curated with excellence in Nairobi.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link className="text-xs font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/privacy">Privacy Policy</Link>
            <Link className="text-xs font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/terms">Terms of Service</Link>
            <Link className="text-xs font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/support">Support</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
