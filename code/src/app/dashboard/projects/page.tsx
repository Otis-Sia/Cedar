'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');

  const projects = [
    { id: 1, name: 'Architectural Lines', updated: '2h ago', status: 'live', items: 24, icon: 'architecture' },
    { id: 2, name: 'Vibrant Canvas', updated: '3 days ago', status: 'draft', items: 12, icon: 'palette' },
    { id: 3, name: 'Monochrome V1', updated: '1 week ago', status: 'archived', items: 45, icon: 'photo_camera' },
    { id: 4, name: 'Urban Minimalism', updated: '5h ago', status: 'live', items: 18, icon: 'apartment' },
    { id: 5, name: 'Natural Selection', updated: 'Dec 2025', status: 'archived', items: 30, icon: 'nature' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const filterTabs = [
    { label: 'All Projects', value: 'all' },
    { label: 'Live', value: 'live' },
    { label: 'Drafts', value: 'draft' },
    { label: 'Archived', value: 'archived' },
  ];

  return (
    <>
      <header className="flex justify-between items-end px-8 md:px-12 py-10 shrink-0">
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-cedar-forest">Portfolio Ecosystem</h2>
          <p className="text-sm text-cedar-slate mt-1 italic font-medium">Manage and curate your professional deployments.</p>
        </div>
        <Link href="/dashboard/templates" className="bg-cedar-forest text-white py-3 px-8 rounded-full font-bold text-sm shadow-md hover:bg-cedar-forest-dark transition-all active:scale-95">
          New Portfolio
        </Link>
      </header>

      <div className="px-8 md:px-12 pb-20 space-y-8 flex-1">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-black/5 pb-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                filter === tab.value 
                  ? 'bg-cedar-forest text-white shadow-md' 
                  : 'bg-white text-cedar-slate hover:text-cedar-midnight border border-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white rounded-[32px] p-8 border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
              {/* Background Accent */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-10 rounded-full ${
                project.status === 'live' ? 'bg-cedar-forest' : 
                project.status === 'draft' ? 'bg-cedar-bronze' : 'bg-cedar-slate'
              }`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cedar-alabaster border border-black/5 flex items-center justify-center text-cedar-forest transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-2xl">{project.icon}</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-xl shadow-sm border border-black/5 hover:bg-cedar-alabaster text-cedar-midnight">
                      <span className="material-symbols-outlined text-sm">settings</span>
                    </button>
                    <button className="p-2 bg-white rounded-xl shadow-sm border border-black/5 hover:bg-cedar-alabaster text-cedar-midnight">
                      <span className="material-symbols-outlined text-sm">more_vert</span>
                    </button>
                  </div>
                </div>

                <h3 className="font-headline text-2xl font-bold text-cedar-midnight">{project.name}</h3>
                <p className="text-cedar-slate text-xs mt-1 font-medium">{project.items} professional items • {project.updated}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'live' ? 'bg-cedar-forest animate-pulse' : 
                    project.status === 'draft' ? 'bg-cedar-bronze' : 'bg-cedar-slate/40'
                  }`}></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cedar-slate">{project.status}</span>
                </div>
                
                <div className="flex gap-3">
                  <button className="text-cedar-forest font-bold text-[11px] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Edit</button>
                  <button className="text-cedar-forest font-bold text-[11px] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View</button>
                </div>
              </div>
            </div>
          ))}
          
          {/* New Project Empty Card */}
          <Link href="/dashboard/templates" className="bg-cedar-alabaster/50 border-2 border-dashed border-black/10 rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 hover:border-cedar-forest/30 hover:bg-white transition-all group min-h-[280px]">
            <div className="w-14 h-14 rounded-full bg-white border border-black/5 flex items-center justify-center text-cedar-slate group-hover:text-cedar-forest group-hover:scale-110 transition-all shadow-sm">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
            <div className="text-center">
              <p className="font-headline text-xl font-bold text-cedar-midnight">Create New</p>
              <p className="text-cedar-slate text-xs mt-1">Start a fresh curated story.</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
