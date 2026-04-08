"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  MoreVertical, 
  Download, 
  ExternalLink,
  FolderOpen
} from 'lucide-react';

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Images', 'Documents', 'Other'];

  const assets = [
    { id: 1, name: 'Portrait_Elite.jpg', type: 'Image', size: '2.4 MB', date: 'Apr 7, 2026', url: '#' },
    { id: 2, name: 'Strategy_Deck_2026.pdf', type: 'Document', size: '15.2 MB', date: 'Apr 6, 2026', url: '#' },
    { id: 3, name: 'Logo_Cedar_Dark.svg', type: 'Image', size: '42 KB', date: 'Apr 5, 2026', url: '#' },
    { id: 4, name: 'Service_Terms.pdf', type: 'Document', size: '1.1 MB', date: 'Apr 5, 2026', url: '#' },
  ];

  const filteredAssets = activeTab === 'All' 
    ? assets 
    : assets.filter(a => a.type === activeTab.replace('s', ''));

  return (
    <div className="pt-12 px-8 md:px-12 lg:px-16 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cedar-alabaster border border-black/5 text-cedar-bronze font-bold text-[10px] uppercase tracking-widest">
            <FolderOpen className="w-3 h-3" />
            Digital Sanctuary
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-tight text-cedar-midnight">Your Assets</h1>
          <p className="text-cedar-slate text-lg max-w-xl leading-relaxed">A curated collection of your creative history and professional documents.</p>
        </div>
        
        <button className="bg-cedar-forest text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl hover:bg-cedar-forest-dark hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3">
          <Plus className="w-4 h-4" />
          Upload New Asset
        </button>
      </header>

      {/* Filter & Search Bar */}
      <div className="sticky top-0 z-20 bg-cedar-alabaster/90 backdrop-blur-xl py-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-black/5">
        <div className="flex bg-white p-1 rounded-2xl border border-black/5 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-cedar-forest text-white shadow-md' 
                  : 'text-cedar-slate hover:text-cedar-midnight'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cedar-slate transition-colors group-focus-within:text-cedar-forest" />
          <input 
            type="text" 
            placeholder="Search your collection..."
            className="w-full bg-white border border-black/5 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cedar-forest/10 focus:border-cedar-forest/20 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="group relative bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
            {/* Asset Preview */}
            <div className="aspect-[4/3] bg-cedar-alabaster flex items-center justify-center relative overflow-hidden">
              {asset.type === 'Image' ? (
                <div className="w-full h-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOMJw5GWZh1ebScLwnRO5Bph0HQ7ZDwB2_jvDEMDlpFXOkj2S0q92cg5R-991gG2m-KlxSn8L333HmeFyDam6N58oxPjgtlRHJpckDxXoSwusZBudpKA8x7ZM_CTzR7wU2Io02oKYgogF5IZOuAqhaOUCHd6jFSMcepr118TnbJgj-NKmI4em-eIsdYWMQHTVKRwxWHj8O-aRBz3E6scGYz4VLdFYmi2nqoG8a_HKl1IpCyn2cdPZWdoK_95OESrPH3TPK8laSYYGv')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"></div>
              ) : (
                <div className="space-y-4 text-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto shadow-sm text-cedar-forest">
                    <FileText className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold text-cedar-slate uppercase tracking-[0.2em]">PDF Document</span>
                </div>
              )}
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-cedar-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-cedar-forest transition-all">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-cedar-forest transition-all">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Asset Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-cedar-midnight text-sm truncate pr-4">{asset.name}</h3>
                <button className="text-cedar-slate hover:text-cedar-midnight">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-cedar-slate/60 uppercase tracking-widest">{asset.size}</span>
                <span className="w-1 h-1 rounded-full bg-cedar-bronze/40"></span>
                <span className="text-[10px] font-bold text-cedar-slate/60 uppercase tracking-widest">{asset.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (If no results) */}
      {filteredAssets.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-700">
          <div className="w-24 h-24 rounded-full bg-white border border-black/5 flex items-center justify-center text-cedar-bronze/30 shadow-sm">
            <Plus className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-2xl font-bold text-cedar-midnight italic">The Sanctuary is Empty</h3>
            <p className="text-cedar-slate text-sm max-w-xs mx-auto">Build your curation folder by uploading your professional assets and documents.</p>
          </div>
        </div>
      )}
    </div>
  );
}
