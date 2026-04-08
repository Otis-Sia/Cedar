'use client';

import React from 'react';
import Link from 'next/link';

export default function InsightsPage() {
  const stats = [
    { label: 'Total Views', value: '12,842', change: '+14%', trend: 'up' },
    { label: 'Avg. Session', value: '4m 32s', change: '+22%', trend: 'up' },
    { label: 'Bounce Rate', value: '18.4%', change: '-5%', trend: 'down' },
    { label: 'Conversions', value: '842', change: '+8%', trend: 'up' },
  ];

  return (
    <>
      {/* Top Header Area */}
      <header className="flex justify-between items-center px-8 md:px-12 py-10 shrink-0">
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-cedar-forest">Performance Insights</h2>
          <p className="text-sm text-cedar-slate mt-1 italic font-medium">Real-time engagement across your ecosystem.</p>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
            <span className="material-symbols-outlined text-cedar-bronze text-sm">schedule</span>
            <span className="ml-2 text-xs font-bold text-cedar-midnight tracking-widest uppercase">Last 30 Days</span>
          </div>
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-black/5 shadow-sm hover:shadow-md transition-all">
            <span className="material-symbols-outlined text-cedar-midnight">download_for_offline</span>
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="px-8 md:px-12 pb-20 space-y-10 flex-1">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm hover:shadow-md transition-all group">
              <p className="text-cedar-slate text-[10px] uppercase tracking-[0.2em] font-bold mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="font-headline text-3xl font-bold text-cedar-midnight">{stat.value}</h3>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Traffic Chart Placeholder (Bento 8x) */}
          <div className="lg:col-span-8 bg-white rounded-[40px] p-8 md:p-10 border border-black/5 shadow-sm flex flex-col min-h-[450px]">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="font-headline text-2xl font-bold text-cedar-midnight">Traffic Overview</h3>
                <p className="text-cedar-slate text-sm mt-1">Unique visitors over the current period.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full bg-cedar-forest text-white text-[10px] font-bold uppercase tracking-widest">Daily</button>
                <button className="px-4 py-2 rounded-full bg-cedar-alabaster text-cedar-slate text-[10px] font-bold uppercase tracking-widest hover:text-cedar-midnight transition-colors">Weekly</button>
              </div>
            </div>

            {/* Simulated Chart Visual */}
            <div className="flex-1 flex items-end gap-3 md:gap-6 pt-10 pb-4 relative">
              <div className="absolute inset-0 flex flex-col justify-between py-10 pointer-events-none opacity-20">
                <div className="border-t border-black/10 w-full"></div>
                <div className="border-t border-black/10 w-full"></div>
                <div className="border-t border-black/10 w-full"></div>
                <div className="border-t border-black/10 w-full"></div>
              </div>
              {[45, 62, 58, 75, 92, 84, 70, 88, 95, 60, 52, 78, 85, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group relative z-10">
                  <div 
                    className="w-full max-w-[24px] bg-cedar-alabaster group-hover:bg-cedar-forest transition-all rounded-full relative" 
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cedar-midnight text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                      {Math.floor(height * 123)} views
                    </div>
                  </div>
                  <span className="text-[10px] text-cedar-slate font-bold mt-4 uppercase tracking-tighter opacity-40 group-hover:opacity-100">{i + 1} Apr</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device & Source (Bento 4x) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] p-8 border border-black/5 shadow-sm h-full flex flex-col">
              <h3 className="font-headline text-2xl font-bold text-cedar-midnight mb-8">Device Mix</h3>
              <div className="space-y-8 flex-1 flex flex-col justify-center">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-cedar-slate">
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cedar-forest"></span>Mobile</span>
                    <span className="text-cedar-midnight">68%</span>
                  </div>
                  <div className="w-full h-2 bg-cedar-alabaster rounded-full overflow-hidden">
                    <div className="h-full bg-cedar-forest" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-cedar-slate">
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cedar-bronze"></span>Desktop</span>
                    <span className="text-cedar-midnight">24%</span>
                  </div>
                  <div className="w-full h-2 bg-cedar-alabaster rounded-full overflow-hidden">
                    <div className="h-full bg-cedar-bronze" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-cedar-slate">
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cedar-slate/40"></span>Tablet</span>
                    <span className="text-cedar-midnight">8%</span>
                  </div>
                  <div className="w-full h-2 bg-cedar-alabaster rounded-full overflow-hidden">
                    <div className="h-full bg-cedar-slate/20" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-cedar-slate italic mt-8 text-center">Optimized and responsive across all viewports.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Geographic Reach */}
        <section className="bg-cedar-forest rounded-[40px] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 blur-[100px] rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <span className="text-cedar-bronze font-bold text-xs tracking-[0.3em] uppercase">Global Reach</span>
              <h2 className="font-headline text-4xl font-bold mt-4">Audience by Origin</h2>
              <p className="text-white/60 text-base mt-6 leading-relaxed">Your professional brand is resonating across key global markets. Primary engagement is surging in Nairobi and European hubs.</p>
              <button className="mt-8 py-3 px-8 rounded-full border border-white/20 hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest">View Detailed Map</button>
            </div>
            
            <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="space-y-6">
                {[
                  { country: 'Kenya', city: 'Nairobi', percent: 42 },
                  { country: 'United Kingdom', city: 'London', percent: 18 },
                  { country: 'United States', city: 'New York', percent: 15 },
                  { country: 'Germany', city: 'Berlin', percent: 12 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs text-white">0{i+1}</div>
                      <div>
                        <p className="font-bold text-sm">{item.city}</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.country}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-headline text-xl font-bold">{item.percent}%</p>
                      <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-cedar-bronze" style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
