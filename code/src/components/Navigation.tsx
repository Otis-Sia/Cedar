"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { getCurrentUser } from "@/services/auth.service";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("user");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getInitialAuth() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch role if user exists
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", currentUser.id)
          .maybeSingle();
        
        if (data?.role) {
          setRole(data.role);
        }
      }
      setIsLoading(false);
    }

    getInitialAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();
        setRole(data?.role || "user");
      } else {
        setRole("user");
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [mobileMenuOpen]);

  const dashboardHref = role === "admin" ? "/admin/dashboard" : "/dashboard";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-[20px] border-b border-black/5 flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 md:py-4 h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand-mark.svg"
            alt="Cedar brand mark"
            width={32}
            height={32}
            className="rounded-lg"
            priority
          />
          <div className="font-headline text-2xl font-bold tracking-tight text-cedar-forest">
            Cedar
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link
            className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors"
            href="/#services"
          >
            Services
          </Link>
          <Link
            className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors"
            href="/#showcase"
          >
            Templates
          </Link>
          <Link
            className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors"
            href="/#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors"
            href="/#faq"
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {!isLoading && (
            <>
              {user ? (
                <Link
                  href={dashboardHref}
                  className="bg-cedar-forest text-cedar-alabaster px-7 py-3 rounded-full font-semibold text-sm shadow-md hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:block text-sm font-semibold text-cedar-slate hover:text-cedar-forest transition-colors uppercase tracking-widest"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="hidden sm:inline-flex bg-cedar-forest text-cedar-alabaster px-7 py-3 rounded-full font-semibold text-sm shadow-md hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all"
                  >
                    Build Portfolio
                  </Link>
                </>
              )}
            </>
          )}
          <button
            className={`hamburger-btn md:hidden ${
              mobileMenuOpen ? "active" : ""
            }`}
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-backdrop ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        className={`mobile-menu-panel bg-white flex flex-col ${
          mobileMenuOpen ? "open" : ""
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-black/5">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/brand-mark.svg"
              alt="Cedar brand mark"
              width={32}
              height={32}
              className="rounded-lg"
              priority
            />
            <div className="font-headline text-xl font-bold tracking-tight text-cedar-forest">
              Cedar
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-xl bg-cedar-alabaster flex items-center justify-center text-cedar-slate hover:text-cedar-midnight transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 p-5 space-y-1">
          <Link
            href="/#services"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-cedar-midnight font-medium hover:bg-cedar-alabaster transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-cedar-forest">
              design_services
            </span>{" "}
            Services
          </Link>
          <Link
            href="/#showcase"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-cedar-midnight font-medium hover:bg-cedar-alabaster transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-cedar-forest">
              auto_awesome_motion
            </span>{" "}
            Templates
          </Link>
          <Link
            href="/#pricing"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-cedar-midnight font-medium hover:bg-cedar-alabaster transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-cedar-forest">
              payments
            </span>{" "}
            Pricing
          </Link>
          <Link
            href="/#faq"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-cedar-midnight font-medium hover:bg-cedar-alabaster transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-cedar-forest">
              help
            </span>{" "}
            FAQ
          </Link>
        </nav>
        <div className="p-5 border-t border-black/5 space-y-3">
          {user ? (
             <Link
             href={dashboardHref}
             className="block w-full text-center py-3.5 rounded-xl bg-cedar-forest text-white font-bold text-sm shadow-md hover:bg-cedar-forest-dark transition-all"
             onClick={() => setMobileMenuOpen(false)}
           >
             Go to Dashboard
           </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="block w-full text-center py-3.5 rounded-xl border border-black/10 text-cedar-midnight font-bold text-sm hover:bg-cedar-alabaster transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center py-3.5 rounded-xl bg-cedar-forest text-white font-bold text-sm shadow-md hover:bg-cedar-forest-dark transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Build Portfolio
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
