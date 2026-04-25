"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { getUserPortfolios } from "@/services/portfolio.service";
import { getActiveSubscription } from "@/services/subscription.service";

interface DashboardPortfolio {
  id: string;
  title: string | null;
  slug: string | null;
  is_published: boolean | null;
  updated_at: string | null;
}

export default function DashboardOverview() {
  const [portfolios, setPortfolios] = useState<DashboardPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!supabase) {
        setIsLoading(false);
        return;
      }
      
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        setIsLoading(false);
        return;
      }

      const [portfolioResult, subscriptionResult] = await Promise.all([
        getUserPortfolios(user.id),
        getActiveSubscription(user.id),
      ]);

      setPortfolios((portfolioResult.data as DashboardPortfolio[]) ?? []);
      setHasActiveSubscription(Boolean(subscriptionResult.data));
      setIsLoading(false);
    };

    void loadDashboardData();
  }, []);

  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 md:px-12 py-6 md:py-10 gap-4 sm:gap-0 mt-6 md:mt-0">
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-cedar-forest">
            Creative Hub
          </h2>
          <p className="text-sm text-cedar-slate mt-1 italic font-medium">
            Welcome back, Curator.
          </p>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
            <span className="material-symbols-outlined text-cedar-bronze text-sm">
              bolt
            </span>
            <span className="ml-2 text-xs font-bold text-cedar-midnight tracking-widest uppercase">
              Elite Tier
            </span>
          </div>
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-black/5 shadow-sm hover:shadow-md transition-all">
            <span className="material-symbols-outlined text-cedar-midnight">
              notifications
            </span>
          </button>
        </div>
      </header>

      <div className="px-4 sm:px-8 md:px-12 pb-20 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-8 bg-white rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[400px] border border-black/5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <span className="text-cedar-bronze uppercase tracking-[0.2em] font-bold text-[10px]">
                  Active Ecosystem
                </span>
                <h3 className="font-headline text-2xl md:text-4xl text-cedar-midnight mt-1 md:mt-2 font-bold leading-tight">
                  Your Portfolios
                </h3>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button className="p-2 rounded-xl bg-cedar-alabaster text-cedar-slate hover:text-cedar-forest transition-colors">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <button className="p-2 rounded-xl bg-cedar-alabaster text-cedar-slate hover:text-cedar-forest transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isLoading && (
                <div className="sm:col-span-2 bg-cedar-alabaster border border-black/5 rounded-2xl p-6 text-sm text-cedar-slate">
                  Loading your portfolios...
                </div>
              )}

              {!isLoading && portfolios.length === 0 && (
                <div className="sm:col-span-2 bg-cedar-alabaster border border-black/5 rounded-2xl p-6">
                  <h4 className="text-cedar-midnight font-bold text-lg">No portfolios yet</h4>
                  <p className="text-cedar-slate text-sm mt-2">
                    Create your first portfolio to start building and publishing.
                  </p>
                  <Link
                    href="/dashboard/portfolio-builder"
                    className="inline-flex mt-4 items-center gap-2 text-sm font-bold text-cedar-forest"
                  >
                    Open portfolio builder
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              )}

              {!isLoading &&
                portfolios.slice(0, 4).map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className="group relative bg-cedar-alabaster border border-black/5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href="/dashboard/portfolio-builder"
                        className="bg-white text-cedar-forest p-2 rounded-lg shadow-sm hover:bg-cedar-forest hover:text-white transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </Link>
                      {portfolio.slug && (
                        <Link
                          href={`/${portfolio.slug}`}
                          className="bg-white text-cedar-forest p-2 rounded-lg shadow-sm hover:bg-cedar-forest hover:text-white transition-colors flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </Link>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center mb-5 text-cedar-forest">
                      <span className="material-symbols-outlined">architecture</span>
                    </div>
                    <h4 className="text-cedar-midnight font-bold text-lg">
                      {portfolio.title || "Untitled"}
                    </h4>
                    <p className="text-cedar-slate text-xs mt-1 font-medium">
                      {portfolio.updated_at
                        ? `Updated ${new Date(portfolio.updated_at).toLocaleDateString()}`
                        : "Recently created"}
                    </p>
                    <div className="mt-5 flex items-center text-xs font-bold tracking-widest uppercase gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          portfolio.is_published ? "bg-cedar-forest animate-pulse" : "bg-cedar-slate/50"
                        }`}
                      ></div>
                      <span className={portfolio.is_published ? "text-cedar-forest" : "text-cedar-slate"}>
                        {portfolio.is_published ? "Published" : "Draft mode"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                className="text-cedar-forest font-bold text-sm flex items-center gap-2 group hover:text-cedar-forest-dark transition-colors"
                href="/dashboard/projects"
              >
                View all projects
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between border border-black/5 shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cedar-bronze/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <span className="text-cedar-bronze uppercase tracking-[0.2em] font-bold text-[10px]">
                  Membership
                </span>
                <h3 className="font-headline text-2xl text-cedar-midnight mt-2 font-bold">
                  {hasActiveSubscription ? "Elite Tier" : "Free Tier"}
                </h3>
                <p className="text-cedar-slate text-sm mt-3 md:mt-4 leading-relaxed">
                  {hasActiveSubscription
                    ? "Your active subscription unlocks premium portfolio and publishing features."
                    : "Upgrade to unlock premium templates, custom domains, and advanced publishing."}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-black/5 relative z-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-cedar-slate font-medium">
                    Storage Used
                  </span>
                  <span className="text-xs text-cedar-midnight font-bold">
                    1.2 GB / 50 GB
                  </span>
                </div>
                <div className="w-full h-1.5 bg-cedar-alabaster rounded-full overflow-hidden">
                  <div className="h-full bg-cedar-forest" style={{ width: "24%" }}></div>
                </div>
                <button className="mt-6 w-full py-4 md:py-3 rounded-xl border border-cedar-forest/20 text-cedar-forest font-bold text-xs uppercase tracking-widest hover:bg-cedar-forest hover:text-white transition-all">
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex flex-col items-start text-left">
            <span className="text-cedar-bronze font-bold text-xs tracking-[0.2em] uppercase">
              Control
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-cedar-midnight mt-2">
              Custom Domains
            </h2>
            <p className="text-cedar-slate text-sm mt-3 md:mt-4 leading-relaxed">
              Take full control of your digital identity. Elite members can link
              multiple external domains directly to their portfolios.
            </p>
            <Link
              href="/dashboard/settings"
              className="inline-flex mt-6 md:mt-8 items-center justify-center w-full sm:w-auto gap-3 py-4 md:py-3 px-8 rounded-2xl md:rounded-full bg-cedar-forest text-white hover:bg-cedar-forest-dark transition-colors font-semibold text-sm shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">
                add_link
              </span>{" "}
              Connect New Domain
            </Link>
          </div>
          <div className="md:col-span-8 bg-white border border-black/5 shadow-sm rounded-3xl p-6 lg:p-8">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-cedar-alabaster rounded-2xl group hover:bg-white hover:shadow-md border border-transparent hover:border-black/5 transition-all gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-black/5 shrink-0">
                    <span className="material-symbols-outlined text-cedar-forest">
                      language
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-cedar-midnight font-bold text-sm truncate max-w-[200px] sm:max-w-none">
                      www.sarahvisuals.com
                    </p>
                    <p className="text-cedar-slate text-xs mt-0.5">
                      Primary Domain • Active
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <span className="text-cedar-forest text-xs font-bold px-3 py-1 bg-white border border-cedar-forest/10 rounded-full shadow-sm">
                    Secure
                  </span>
                  <button className="text-cedar-slate hover:text-cedar-midnight transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-cedar-alabaster rounded-2xl group hover:bg-white hover:shadow-md border border-transparent hover:border-black/5 transition-all opacity-60 grayscale hover:grayscale-0 hover:opacity-100 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-black/5 shrink-0">
                    <span className="material-symbols-outlined text-cedar-bronze">
                      dns
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-cedar-midnight font-bold text-sm truncate max-w-[200px] sm:max-w-none">
                      portfolio.creative.studio
                    </p>
                    <p className="text-cedar-slate text-xs mt-0.5">
                      Propagating... (Estimated 2h)
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <button className="text-cedar-slate hover:text-cedar-midnight transition-colors">
                    <span className="material-symbols-outlined">cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-3xl p-6 md:p-10 border border-black/5 shadow-sm relative overflow-hidden mt-6">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-cedar-bronze/5 blur-[80px] rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cedar-forest/5 blur-[80px] rounded-full"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 divide-y md:divide-y-0 md:divide-x divide-black/5">
            <div className="flex flex-col items-center text-center pt-2 md:pt-0 pb-6 md:pb-0">
              <span className="material-symbols-outlined text-[32px] md:text-[40px] text-cedar-forest mb-3 md:mb-4">
                visibility
              </span>
              <h4 className="text-cedar-midnight font-headline font-bold text-3xl md:text-4xl">
                4,281
              </h4>
              <p className="text-cedar-slate text-[10px] sm:text-xs uppercase font-semibold tracking-widest mt-2">
                Portfolio Views
              </p>
            </div>
            <div className="flex flex-col items-center text-center pt-6 md:pt-0 pb-6 md:pb-0">
              <span className="material-symbols-outlined text-[32px] md:text-[40px] text-cedar-bronze mb-3 md:mb-4">
                auto_awesome
              </span>
              <h4 className="text-cedar-midnight font-headline font-bold text-3xl md:text-4xl">
                18
              </h4>
              <p className="text-cedar-slate text-[10px] sm:text-xs uppercase font-semibold tracking-widest mt-2">
                Curated Edits
              </p>
            </div>
            <div className="flex flex-col items-center text-center pt-6 md:pt-0">
              <span className="material-symbols-outlined text-[32px] md:text-[40px] text-cedar-forest mb-3 md:mb-4">
                trending_up
              </span>
              <h4 className="text-cedar-midnight font-headline font-bold text-3xl md:text-4xl">
                12%
              </h4>
              <p className="text-cedar-slate text-[10px] sm:text-xs uppercase font-semibold tracking-widest mt-2">
                Conversion Lift
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
