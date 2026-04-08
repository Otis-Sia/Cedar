'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TemplatesPage() {
  return (
    <>
      {/* Header Section */}
      <header className="pt-12 px-8 md:px-12 lg:px-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cedar-alabaster border border-cedar-bronze/20 text-cedar-bronze text-[10px] font-bold uppercase tracking-widest mb-4">
              <span className="flex h-2 w-2 rounded-full bg-cedar-bronze animate-[pulse_2s_infinite]"></span>
              Auto-Curator Active
            </div>
            <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-cedar-midnight mb-4">Select Your Canvas</h1>
            <p className="text-cedar-slate text-base lg:text-lg max-w-2xl leading-relaxed">Our system has analyzed your creative profile. These layouts are engineered to amplify your specific aesthetic signature.</p>
          </div>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-30 bg-cedar-alabaster/90 backdrop-blur-xl px-8 md:px-12 lg:px-16 py-4 flex flex-wrap items-center gap-3 lg:gap-4 border-b border-black/5">
        <span className="text-cedar-slate font-medium text-[10px] sm:text-xs uppercase tracking-widest mr-2">Filter by:</span>
        
        <button className="px-5 py-2 rounded-full bg-cedar-forest text-white text-sm font-semibold shadow-sm">All Templates</button>
        <button className="px-5 py-2 rounded-full bg-white border border-black/5 text-cedar-slate hover:text-cedar-midnight hover:border-black/10 text-sm font-medium transition-colors">Minimalist</button>
        <button className="px-5 py-2 rounded-full bg-white border border-black/5 text-cedar-slate hover:text-cedar-midnight hover:border-black/10 text-sm font-medium transition-colors">Creative Director</button>
        <button className="px-5 py-2 rounded-full bg-white border border-black/5 text-cedar-slate hover:text-cedar-midnight hover:border-black/10 text-sm font-medium transition-colors">Corporate Tech</button>
        <button className="px-5 py-2 rounded-full bg-white border border-black/5 text-cedar-slate hover:text-cedar-midnight hover:border-black/10 text-sm font-medium transition-colors">Experimental</button>
        
        <div className="ml-auto mt-4 sm:mt-0 flex items-center bg-white border border-black/5 rounded-full px-4 py-2 w-full lg:w-auto">
          <span className="material-symbols-outlined text-cedar-slate text-lg">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm text-cedar-midnight placeholder-cedar-slate/60 w-full sm:w-48 ml-2 outline-none" placeholder="Search layouts..." type="text"/>
        </div>
      </div>

      {/* Bento Template Grid */}
      <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        
        {/* Large Feature Card */}
        <div className="lg:col-span-8 group relative flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-lg border border-black/5 transition-all duration-500">
          <div className="aspect-[16/9] w-full relative overflow-hidden bg-gray-100">
            <Image fill alt="Creative Director Template Preview" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcC5MivyEEPqfs4JlfP9endAXvPFetgDAOfgeli06NIo781gOYj8bqle3sKB6NrsRRfY4REdNPROjt5xCtpjB49leCwbYZRT8WVeGV7HWP_rt5uQcCwssZGyQ9MsTD9JyApaLbIKOerJU4ahYYD_xnVTxR3sn1fzbxLNSg3jPzKXe0KTRgnOmhMutr8PcdeO-F6DoiEdBIlry8BWTzWQ8F0Dq8U6mRKaWjzr84S3P_s_EtSKberwln-5oGMKtOWtsve9WD-aZs6oIb"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-10"></div>
          </div>
          
          <div className="p-8 lg:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-20 -mt-[120px]">
            <div className="text-white">
              <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">Trending Pick</span>
              <h3 className="font-headline text-3xl md:text-4xl font-bold mb-2">Creative Director</h3>
              <p className="text-white/80 text-sm max-w-sm leading-relaxed">Asymmetric layouts designed for high-impact visual storytelling. Optimized for large-scale imagery.</p>
            </div>
            <Link href="/dashboard/templates/builder/sample-portfolio" className="bg-white text-cedar-midnight px-8 py-3.5 rounded-full font-bold text-[15px] shadow-lg hover:bg-cedar-forest hover:text-white transition-all active:scale-95 whitespace-nowrap text-center inline-block">
              Select Template
            </Link>
          </div>
        </div>
        
        {/* Secondary Card */}
        <div className="lg:col-span-4 group relative flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-lg border border-black/5 transition-all duration-500">
          <div className="aspect-[4/5] w-full relative overflow-hidden bg-gray-100">
            <Image fill alt="Minimalist Template Preview" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOMJw5GWZh1ebScLwnRO5Bph0HQ7ZDwB2_jvDEMDlpFXOkj2S0q92cg5R-991gG2m-KlxSn8L333HmeFyDam6N58oxPjgtlRHJpckDxXoSwusZBudpKA8x7ZM_CTzR7wU2Io02oKYgogF5IZOuAqhaOUCHd6jFSMcepr118TnbJgj-NKmI4em-eIsdYWMQHTVKRwxWHj8O-aRBz3E6scGYz4VLdFYmi2nqoG8a_HKl1IpCyn2cdPZWdoK_95OESrPH3TPK8laSYYGv"/>
          </div>
          
          <div className="p-6 border-t border-black/5 bg-white flex-grow flex flex-col justify-end">
            <h3 className="font-headline text-2xl font-bold text-cedar-midnight mb-1">Minimalist</h3>
            <p className="text-cedar-slate text-sm mb-6">Focused on whitespace and editorial clarity.</p>
            <Link href="/dashboard/templates/builder/sample-portfolio" className="w-full bg-cedar-alabaster text-cedar-midnight py-3.5 rounded-2xl font-semibold hover:bg-cedar-forest hover:text-white transition-all shadow-sm text-center">
              Select Template
            </Link>
          </div>
        </div>
        
        {/* Row 2 */}
        <div className="lg:col-span-4 group relative flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-lg border border-black/5 transition-all duration-500">
          <div className="aspect-[4/5] w-full relative overflow-hidden bg-gray-100">
            <Image fill alt="Corporate Tech Template Preview" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB5wo4G9NfGZln-cZk_2YF7neuJZMcfZ2zhlHIbIJMajzLNsJOXAk9mRAmgJWsiJ-qFU46tCyeJCX7HY399A8sfEnhCFBj9Z1tMY0Lo5novg2X4ty_iEHFyzhZUw3ye52iwHOdvAKm5k9kfaqr8wINcId0FgLL8Nj65ioObbYfrN-pPGAq8gIbk8fvKiq7GafBMTc_8kLd-DC71covwt8hI3LH3WlTDXpQ2xIDd4Whn6wvS3Do5wKU-f4J5RB6Esuu1JxB_SMR7MlU"/>
          </div>
          
          <div className="p-6 border-t border-black/5 bg-white flex-grow flex flex-col justify-end">
            <h3 className="font-headline text-2xl font-bold text-cedar-midnight mb-1">Corporate Tech</h3>
            <p className="text-cedar-slate text-sm mb-6">Structured grids for data-driven professionals.</p>
            <Link href="/dashboard/templates/builder/sample-portfolio" className="w-full bg-cedar-alabaster text-cedar-midnight py-3.5 rounded-2xl font-semibold hover:bg-cedar-forest hover:text-white transition-all shadow-sm text-center">
              Select Template
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-4 group relative flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-lg border border-black/5 transition-all duration-500">
          <div className="aspect-[4/5] w-full relative overflow-hidden bg-gray-100">
            <Image fill alt="Experimental Template Preview" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmWvv7kaCzGEh4vL7LcCzrTRAn9GYXgA63axMSi4RFxuhMcjzlLJKqaZ6r0YEwpSUGi5jw4oJST3Zr6VRAEWyv8fL1bRePNV7OXGbcqGKTdjF7m1fEpF8SzBQzBNdiEAIXwbOlTzY7e6-2A_q9E6ciKaGPX42Fdheco914LNCdW8rkSZWswvAjRtKvuisUZXe-q5bcNjJo5LKd_D7WKObCHiws6V5KLIJU0UMY5xkhjKuYU8-U4Nr_XbjQsFUmw4sLNtJ9dWqw09za"/>
          </div>
          
          <div className="p-6 border-t border-black/5 bg-white flex-grow flex flex-col justify-end">
            <h3 className="font-headline text-2xl font-bold text-cedar-midnight mb-1">Modern Theory</h3>
            <p className="text-cedar-slate text-sm mb-6">Bold typography and unconventional navigation.</p>
            <Link href="/dashboard/templates/builder/sample-portfolio" className="w-full bg-cedar-alabaster text-cedar-midnight py-3.5 rounded-2xl font-semibold hover:bg-cedar-forest hover:text-white transition-all shadow-sm text-center">
              Select Template
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-4 group relative flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-lg border border-black/5 transition-all duration-500">
          <div className="aspect-[4/5] w-full relative overflow-hidden bg-gray-100">
            <Image fill alt="Product Showcase Template Preview" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDYYEUvaZAZe8wpNpMF3ZRclOVX_E3BJXvptylXbTyqxuMPhUfwitLDderuz9gy2i0vOtAbraFDlX2cHkOIXSOtexzAi6JatFfcBQ3CJI4IOoe3WjPDAiJ6RwHGQmIbG298Htl9u2-WLOs-wkWdjB43NcfwuA0RhQnJs3iq83Q0ifM9-pucTT4sDPT-YvWENT8pXZFm3i41iv-AeCvcnvZRDbnSx2_coLQjA2YLr_mCTLvqKBRnkaridT821KSd-Bw84AaxKD56ewQ"/>
          </div>
          
          <div className="p-6 border-t border-black/5 bg-white flex-grow flex flex-col justify-end">
            <h3 className="font-headline text-2xl font-bold text-cedar-midnight mb-1">Product Gallery</h3>
            <p className="text-cedar-slate text-sm mb-6">Engineered for hardware and industrial design.</p>
            <Link href="/dashboard/templates/builder/sample-portfolio" className="w-full bg-cedar-alabaster text-cedar-midnight py-3.5 rounded-2xl font-semibold hover:bg-cedar-forest hover:text-white transition-all shadow-sm text-center">
              Select Template
            </Link>
          </div>
        </div>
      </div>

      {/* AI Floating Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md border border-black/5 rounded-full px-8 py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-[0_10px_40px_rgba(27,48,34,0.1)]">
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-cedar-bronze animate-[pulse_2s_infinite] shadow-[0_0_10px_#AA8C55]"></div>
          <span className="text-sm font-semibold text-cedar-midnight whitespace-nowrap">Cedar Intelligence</span>
        </div>
        <div className="hidden sm:block h-6 w-px bg-black/10"></div>
        <span className="text-[13px] font-medium text-cedar-slate italic max-w-[300px] text-center sm:text-left leading-tight">
          &quot;I recommend &apos;Creative Director&apos; based on your recent workflow.&quot;
        </span>
        <button className="text-[13px] font-bold text-cedar-forest hover:text-cedar-forest-dark shrink-0 ml-2">Analyze More</button>
      </div>
    </>
  );
}
