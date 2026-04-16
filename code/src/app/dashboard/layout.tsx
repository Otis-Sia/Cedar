"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [user, setUser] = useState<{ displayName?: string; email?: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Basic Auth Check
    const userData = localStorage.getItem("cedar:auth-user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [mobileDrawerOpen]);

  const navLinks = [
    { href: "/dashboard", icon: "grid_view", label: "Dashboard" },
    { href: "/dashboard/templates", icon: "auto_awesome_motion", label: "Templates" },
    { href: "/dashboard/portfolio-builder", icon: "edit_note", label: "Portfolio Builder" },
    { href: "/dashboard/assets", icon: "folder_open", label: "Assets" },
    { href: "/dashboard/insights", icon: "insights", label: "Insights" },
    { href: "/dashboard/settings", icon: "settings_accessibility", label: "Settings" },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("cedar:auth-user");
    router.push("/login");
  };

  const closeDrawer = () => setMobileDrawerOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-cedar-alabaster text-cedar-midnight font-body antialiased selection:bg-cedar-bronze/30">
      {/* Mobile Top Bar */}
      <div className="mobile-topbar md:hidden absolute top-0 w-full z-40 bg-white">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className={`hamburger-btn ${mobileDrawerOpen ? "active" : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic text-xs">
            C
          </div>
          <span className="font-headline text-lg font-bold tracking-tight text-cedar-forest">
            Cedar
          </span>
        </Link>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-cedar-alabaster border border-black/5">
          <span className="material-symbols-outlined text-cedar-midnight text-xl">
            notifications
          </span>
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-backdrop ${mobileDrawerOpen ? "open" : ""}`}
        onClick={closeDrawer}
      ></div>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer bg-white flex flex-col py-6 ${
          mobileDrawerOpen ? "open" : ""
        }`}
      >
        <div className="px-6 mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic group-hover:bg-cedar-forest-dark transition-colors">
              C
            </div>
            <h1 className="font-headline font-bold text-cedar-forest text-2xl tracking-tight">
              Cedar
            </h1>
          </Link>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-cedar-alabaster">
              <img
                className="w-full h-full object-cover"
                alt="portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz7R0o4_SwDScB_gU1LxAzSxZhpqjml-7YKu3L6IgONXpA4Bcq6I_aPRXl1eQyo0z6wCPJ8YChJLWycJPuaZjtDQz2tO8NgRQHry0R6Bpo9jjPrY3Ow8VaGiDWEOqYW_m_qy5kRQVHiMqszoaReVLVd37DyGMGtHQG1NClhd5O1mexvI6WfAS1eZoP0j95mvHR4VlkgWVuDuTiph2eCQPtwy8kSZxLwLU5_7IP42RszVL4bT8ogiBuBL47tPxRs-QVY-vmWgclv1hA"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-cedar-midnight">
                {user?.displayName || "Project Alpha"}
              </p>
              <p className="text-[10px] text-cedar-slate uppercase tracking-widest font-semibold">
                Portfolio v2.1
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className={
                  isActive
                    ? "bg-cedar-forest text-white rounded-xl px-4 py-3 mx-2 flex items-center gap-3 transition-all shadow-md"
                    : "text-cedar-slate px-4 py-3 mx-2 flex items-center gap-3 hover:bg-cedar-alabaster hover:text-cedar-midnight transition-colors rounded-xl"
                }
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 mt-auto">
          <Link
            href="/dashboard/portfolio-builder"
            onClick={closeDrawer}
            className="block w-full bg-cedar-forest text-white py-3 rounded-xl font-bold text-sm mb-4 shadow-md hover:bg-cedar-forest-dark transition-all text-center"
          >
            New Portfolio
          </Link>
          <div className="border-t border-black/5 pt-4">
            <Link
              href="/support"
              className="text-cedar-slate px-4 py-3 flex items-center gap-3 hover:text-cedar-midnight transition-colors rounded-xl"
            >
              <span className="material-symbols-outlined">help</span>
              <span className="text-sm font-medium">Help Center</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-cedar-slate px-4 py-3 flex items-center gap-3 hover:text-red-600 transition-colors rounded-xl"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col h-full py-6 w-64 bg-white border-r border-black/5 shrink-0">
        <div className="px-6 mb-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic group-hover:bg-cedar-forest-dark transition-colors">
              C
            </div>
            <h1 className="font-headline font-bold text-cedar-forest text-2xl tracking-tight">
              Cedar
            </h1>
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-cedar-alabaster">
              <img
                className="w-full h-full object-cover"
                alt="portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz7R0o4_SwDScB_gU1LxAzSxZhpqjml-7YKu3L6IgONXpA4Bcq6I_aPRXl1eQyo0z6wCPJ8YChJLWycJPuaZjtDQz2tO8NgRQHry0R6Bpo9jjPrY3Ow8VaGiDWEOqYW_m_qy5kRQVHiMqszoaReVLVd37DyGMGtHQG1NClhd5O1mexvI6WfAS1eZoP0j95mvHR4VlkgWVuDuTiph2eCQPtwy8kSZxLwLU5_7IP42RszVL4bT8ogiBuBL47tPxRs-QVY-vmWgclv1hA"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-cedar-midnight">
                {user?.displayName || "Project Alpha"}
              </p>
              <p className="text-[10px] text-cedar-slate uppercase tracking-widest font-semibold">
                Portfolio v2.1
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "bg-cedar-forest text-white rounded-xl px-4 py-3 mx-2 flex items-center gap-3 transition-all shadow-md"
                    : "text-cedar-slate px-4 py-3 mx-2 flex items-center gap-3 hover:bg-cedar-alabaster hover:text-cedar-midnight transition-colors rounded-xl"
                }
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <Link
            href="/dashboard/portfolio-builder"
            className="block w-full bg-cedar-forest text-white py-3 rounded-xl font-bold text-sm mb-6 shadow-md hover:bg-cedar-forest-dark transition-all text-center"
          >
            New Portfolio
          </Link>
          <div className="border-t border-black/5 pt-4">
            <Link
              href="/support"
              className="text-cedar-slate px-4 py-3 flex items-center gap-3 hover:text-cedar-midnight transition-colors rounded-xl"
            >
              <span className="material-symbols-outlined">help</span>
              <span className="text-sm font-medium">Help Center</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-cedar-slate px-4 py-3 flex items-center gap-3 hover:text-red-600 transition-colors rounded-xl"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 bg-cedar-alabaster py-16 md:py-0 overflow-y-auto no-scrollbar relative flex flex-col justify-between">
        <div>{children}</div>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 py-8 md:py-10 w-full bg-white border-t border-black/5 mt-auto">
          <p className="text-xs font-medium text-cedar-slate mb-4 md:mb-0">
            © 2026 Cedar. Curated with excellence in Nairobi.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link
              className="text-xs font-medium text-cedar-slate hover:text-cedar-forest transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-xs font-medium text-cedar-slate hover:text-cedar-forest transition-colors"
              href="/terms"
            >
              Terms & Conditions
            </Link>
            <Link
              className="text-xs font-medium text-cedar-slate hover:text-cedar-forest transition-colors"
              href="/support"
            >
              Support
            </Link>
            <a
              className="text-xs font-medium text-cedar-slate hover:text-cedar-forest transition-colors"
              href="https://instagram.com/cedar"
            >
              Instagram
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
