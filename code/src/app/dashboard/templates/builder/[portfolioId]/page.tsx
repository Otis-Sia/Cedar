"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';

interface ExperienceItem {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationItem {
  year: string;
  degree: string;
  institution: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  website?: string;
}

interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  contactInfo?: ContactInfo;
  experience?: ExperienceItem[];
  education?: EducationItem[];
}

interface Portfolio {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  isPublic: boolean;
  customDomain?: string;
  data: string;
  updatedAt?: string;
}

const HARDCODED_PORTFOLIO_DATA = {
  name: 'Sarah Jenkins',
  title: 'Creative Director',
  bio: 'Passionate about minimalist architecture and clean digital experiences. Nairobi based.',
  skills: ['UI Design', 'Brand Strategy', 'Typography', 'Photography', 'Creative Direction'],
  contactInfo: {
    email: 'sarah@example.com',
    location: 'Nairobi, Kenya',
    linkedin: 'https://linkedin.com/in/sarahjenkins',
  },
  experience: [
    {
      role: 'Creative Director',
      company: 'Studio Meridian',
      startDate: '2022',
      endDate: 'Present',
      description: 'Leading creative strategy for global brand campaigns and identity systems.',
    },
    {
      role: 'Senior Designer',
      company: 'Apex Creative',
      startDate: '2019',
      endDate: '2022',
      description: 'Designed award-winning visual identities for Fortune 500 clients.',
    },
  ],
  education: [
    {
      year: '2018',
      degree: 'BA in Visual Communication',
      institution: 'University of Nairobi',
    },
  ],
};

export default function PortfolioBuilder() {
  const params = useParams();
  const portfolioId = params?.portfolioId as string;
  const { user, tier } = useAuth();
  const router = useRouter();
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (!user || !portfolioId) return;

    const storageKey = `cedar:portfolio-${portfolioId}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setPortfolio(JSON.parse(stored) as Portfolio);
        setLoading(false);
        return;
      } catch {
        // ignore
      }
    }

    // Try sessionStorage for draft from CV upload
    let portfolioData = HARDCODED_PORTFOLIO_DATA;
    const draft = sessionStorage.getItem('cedar:portfolio-draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft) as { portfolio?: typeof HARDCODED_PORTFOLIO_DATA };
        if (parsed.portfolio) portfolioData = parsed.portfolio;
      } catch {
        // ignore
      }
    }

    const defaultPortfolio: Portfolio = {
      id: portfolioId,
      userId: user.uid,
      title: 'My Portfolio',
      templateId: 'minimal',
      isPublic: false,
      data: JSON.stringify(portfolioData),
    };
    setPortfolio(defaultPortfolio);
    setLoading(false);
  }, [user, portfolioId]);

  const handleSave = async () => {
    if (!portfolio) return;
    setSaving(true);
    try {
      const updated = { ...portfolio, updatedAt: new Date().toISOString() };
      localStorage.setItem(`cedar:portfolio-${portfolio.id}`, JSON.stringify(updated));
      setPortfolio(updated);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!portfolio || !window.confirm('Are you sure you want to delete this portfolio?')) return;
    localStorage.removeItem(`cedar:portfolio-${portfolio.id}`);
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cedar-alabaster">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cedar-forest/20 border-t-cedar-forest rounded-full animate-spin"></div>
          <p className="text-cedar-slate text-sm font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) return null;

  let portfolioData: PortfolioData;
  try {
    portfolioData = JSON.parse(portfolio.data) as PortfolioData;
  } catch {
    portfolioData = HARDCODED_PORTFOLIO_DATA as PortfolioData;
  }
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const publicUrl = portfolio.customDomain ? `https://${portfolio.customDomain}` : `${origin}/p/${portfolio.id}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(publicUrl)}&text=${encodeURIComponent(`Check out my portfolio: ${portfolio.title}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}`
  };

  return (
    <div className="min-h-screen bg-cedar-alabaster flex flex-col font-body">
      {/* Topbar */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-cedar-alabaster rounded-full transition-colors">
              <span className="material-symbols-outlined text-cedar-slate">arrow_back</span>
            </button>
            <input 
              type="text" 
              value={portfolio.title}
              onChange={(e) => setPortfolio({...portfolio, title: e.target.value})}
              className="text-lg font-bold text-cedar-midnight bg-transparent border-none focus:ring-0 p-0 w-64"
            />
          </div>
          <div className="flex items-center gap-3">
            {portfolio.isPublic && (
              <div className="relative">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-cedar-slate hover:text-cedar-forest transition-colors px-3 py-2 rounded-lg hover:bg-cedar-alabaster"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span> Share
                </button>
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/5 py-2 z-50">
                    <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2 hover:bg-cedar-alabaster text-sm text-cedar-slate hover:text-cedar-midnight">
                      <span className="material-symbols-outlined text-[16px]">language</span> Twitter
                    </a>
                    <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2 hover:bg-cedar-alabaster text-sm text-cedar-slate hover:text-cedar-midnight">
                      <span className="material-symbols-outlined text-[16px]">language</span> LinkedIn
                    </a>
                    <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2 hover:bg-cedar-alabaster text-sm text-cedar-slate hover:text-cedar-midnight">
                      <span className="material-symbols-outlined text-[16px]">language</span> Facebook
                    </a>
                    <div className="h-px bg-black/5 my-2"></div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(publicUrl);
                        alert('Link copied to clipboard!');
                        setShowShareMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-cedar-alabaster text-sm text-cedar-slate hover:text-cedar-midnight text-left"
                    >
                      <span className="material-symbols-outlined text-[16px]">link</span> Copy Link
                    </button>
                  </div>
                )}
              </div>
            )}
            {portfolio.isPublic && (
              <a 
                href={`/p/${portfolio.id}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-cedar-slate hover:text-cedar-forest transition-colors px-3 py-2 rounded-lg hover:bg-cedar-alabaster"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span> View Live
              </a>
            )}
            <button 
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-cedar-forest text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-cedar-forest-dark transition-colors disabled:opacity-50 shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">save</span> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8 flex gap-8 max-w-7xl">
        {/* Sidebar Controls */}
        <aside className="w-80 shrink-0 space-y-6">
          {/* Publishing */}
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
            <h3 className="font-bold text-cedar-midnight mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
              <span className="material-symbols-outlined text-cedar-bronze text-[18px]">language</span> Publishing
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-cedar-slate">Public Access</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={portfolio.isPublic}
                  onChange={(e) => setPortfolio({...portfolio, isPublic: e.target.checked})}
                />
                <div className="w-11 h-6 bg-cedar-alabaster peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-cedar-slate/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cedar-forest"></div>
              </label>
            </div>
            
            {tier === 'business' ? (
              <div className="space-y-2">
                <label className="text-sm text-cedar-slate block">Custom Domain</label>
                <input 
                  type="text" 
                  placeholder="e.g., myportfolio.com"
                  value={portfolio.customDomain || ''}
                  onChange={(e) => setPortfolio({...portfolio, customDomain: e.target.value})}
                  className="w-full px-3 py-2 border border-black/10 rounded-xl text-sm focus:ring-2 focus:ring-cedar-bronze/20 focus:border-cedar-bronze/30 bg-cedar-alabaster/50 text-cedar-midnight"
                />
              </div>
            ) : (
              <div className="bg-cedar-alabaster p-3 rounded-xl border border-black/5 mt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-cedar-midnight mb-1">
                  <span className="material-symbols-outlined text-cedar-bronze text-[16px]">lock</span> Custom Domain
                </div>
                <p className="text-xs text-cedar-slate">Upgrade to Creator Pro to use your own custom domain.</p>
              </div>
            )}
          </div>

          {/* Templates */}
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
            <h3 className="font-bold text-cedar-midnight mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
              <span className="material-symbols-outlined text-cedar-bronze text-[18px]">view_quilt</span> Templates
            </h3>
            <div className="space-y-3">
              <label className={`block cursor-pointer border rounded-xl p-3 transition-all ${portfolio.templateId === 'minimal' ? 'border-cedar-forest bg-cedar-forest/5 ring-1 ring-cedar-forest' : 'border-black/5 hover:border-cedar-forest/30'}`}>
                <input type="radio" name="template" className="sr-only" checked={portfolio.templateId === 'minimal'} onChange={() => setPortfolio({...portfolio, templateId: 'minimal'})} />
                <div className="font-bold text-cedar-midnight text-sm">Minimal</div>
                <div className="text-xs text-cedar-slate">Clean, typography-focused design.</div>
              </label>
              
              <label className={`block cursor-pointer border rounded-xl p-3 transition-all ${portfolio.templateId === 'modern' ? 'border-cedar-forest bg-cedar-forest/5 ring-1 ring-cedar-forest' : 'border-black/5 hover:border-cedar-forest/30'}`}>
                <input type="radio" name="template" className="sr-only" checked={portfolio.templateId === 'modern'} onChange={() => setPortfolio({...portfolio, templateId: 'modern'})} />
                <div className="font-bold text-cedar-midnight text-sm">Modern</div>
                <div className="text-xs text-cedar-slate">Bold colors and structured layout.</div>
              </label>

              {(tier === 'professional' || tier === 'business') ? (
                <label className={`block cursor-pointer border rounded-xl p-3 transition-all ${portfolio.templateId === 'developer' ? 'border-cedar-forest bg-cedar-forest/5 ring-1 ring-cedar-forest' : 'border-black/5 hover:border-cedar-forest/30'}`}>
                  <input type="radio" name="template" className="sr-only" checked={portfolio.templateId === 'developer'} onChange={() => setPortfolio({...portfolio, templateId: 'developer'})} />
                  <div className="font-bold text-cedar-midnight text-sm flex items-center justify-between">
                    Developer <span className="text-[10px] uppercase tracking-wider bg-cedar-bronze/10 text-cedar-bronze px-2 py-0.5 rounded-full">Pro</span>
                  </div>
                  <div className="text-xs text-cedar-slate">Terminal-inspired dark mode theme.</div>
                </label>
              ) : (
                <div className="block border border-black/5 rounded-xl p-3 opacity-60 bg-cedar-alabaster">
                  <div className="font-bold text-cedar-midnight text-sm flex items-center justify-between">
                    Developer <span className="material-symbols-outlined text-cedar-slate text-[14px]">lock</span>
                  </div>
                  <div className="text-xs text-cedar-slate">Upgrade to Career or Creator Pro to unlock.</div>
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h3 className="font-bold text-red-900 mb-2 text-sm uppercase tracking-widest">Danger Zone</h3>
            <p className="text-xs text-red-700 mb-4">Once you delete a portfolio, there is no going back. Please be certain.</p>
            <button 
              onClick={handleDelete}
              className="w-full inline-flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span> Delete Portfolio
            </button>
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-cedar-alabaster border-b border-black/5 px-4 py-2 flex items-center gap-2 text-xs text-cedar-slate font-mono">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="ml-4 bg-white px-3 py-1 rounded-md border border-black/5 shadow-sm flex-1 max-w-md truncate">
              {publicUrl}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8 bg-cedar-alabaster/50">
            {/* Render a scaled-down preview based on the template */}
            <div className="bg-white shadow-xl rounded-xl overflow-hidden min-h-[800px] border border-black/5 pointer-events-none">
              <TemplateRenderer templateId={portfolio.templateId} data={portfolioData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Simple template renderer for preview
export function TemplateRenderer({ templateId, data }: { templateId: string, data: PortfolioData }) {
  if (templateId === 'modern') {
    return (
      <div className="font-sans text-slate-900">
        <header className="bg-indigo-600 text-white py-20 px-10 text-center">
          <h1 className="text-5xl font-bold mb-4">{data.name}</h1>
          <p className="text-2xl text-indigo-100 mb-8">{data.title}</p>
          
          {data.contactInfo && (
            <div className="flex flex-wrap justify-center gap-6 text-indigo-100 text-sm">
              {data.contactInfo.email && <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">mail</span> {data.contactInfo.email}</div>}
              {data.contactInfo.phone && <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">phone</span> {data.contactInfo.phone}</div>}
              {data.contactInfo.location && <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">location_on</span> {data.contactInfo.location}</div>}
              {data.contactInfo.linkedin && <a href={data.contactInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><span className="material-symbols-outlined text-[16px]">language</span> LinkedIn</a>}
              {data.contactInfo.website && <a href={data.contactInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><span className="material-symbols-outlined text-[16px]">language</span> Website</a>}
            </div>
          )}
        </header>
        <div className="max-w-4xl mx-auto px-10 py-16 space-y-16">
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-indigo-100 pb-2 mb-6 text-indigo-900">About Me</h2>
            <p className="text-lg leading-relaxed text-slate-700">{data.bio}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-indigo-100 pb-2 mb-6 text-indigo-900">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill: string, i: number) => (
                <span key={i} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-medium">{skill}</span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b-2 border-indigo-100 pb-2 mb-6 text-indigo-900">Experience</h2>
            <div className="space-y-8">
              {data.experience?.map((exp: ExperienceItem, i: number) => (
                <div key={i} className="relative pl-8 border-l-2 border-indigo-100">
                  <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-1"></div>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <div className="text-indigo-600 font-medium mb-2">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                  <p className="text-slate-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (templateId === 'developer') {
    return (
      <div className="font-mono bg-slate-900 text-green-400 min-h-full p-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm mb-8 text-slate-500">
            $ whoami<br/>
            <span className="text-green-400">{data.name}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">{data.name}</h1>
          <p className="text-xl text-green-400 mb-8">&gt; {data.title}</p>

          {data.contactInfo && (
            <div className="flex flex-wrap gap-6 text-slate-400 text-sm mb-12 border border-slate-700 p-4 bg-slate-800/50">
              {data.contactInfo.email && <div><span className="text-green-400">email:</span> {data.contactInfo.email}</div>}
              {data.contactInfo.phone && <div><span className="text-green-400">tel:</span> {data.contactInfo.phone}</div>}
              {data.contactInfo.location && <div><span className="text-green-400">loc:</span> {data.contactInfo.location}</div>}
              {data.contactInfo.linkedin && <div><span className="text-green-400">in:</span> <a href={data.contactInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-green-400 underline decoration-slate-600">Link</a></div>}
            </div>
          )}

          <div className="space-y-12">
            <section>
              <h2 className="text-white text-xl border-b border-slate-700 pb-2 mb-4"># BIO</h2>
              <p className="text-slate-300 leading-relaxed">{data.bio}</p>
            </section>

            <section>
              <h2 className="text-white text-xl border-b border-slate-700 pb-2 mb-4"># SKILLS</h2>
              <div className="flex flex-wrap gap-3">
                {data.skills?.map((skill: string, i: number) => (
                  <span key={i} className="border border-green-400/30 px-2 py-1 text-sm">{skill}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-white text-xl border-b border-slate-700 pb-2 mb-4"># EXPERIENCE</h2>
              <div className="space-y-6">
                {data.experience?.map((exp: ExperienceItem, i: number) => (
                  <div key={i}>
                    <h3 className="text-white font-bold">{exp.role} @ {exp.company}</h3>
                    <div className="text-xs text-slate-500 mb-2">[{exp.startDate} - {exp.endDate}]</div>
                    <p className="text-slate-300 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Minimal (Default)
  return (
    <div className="font-sans text-slate-900 max-w-3xl mx-auto px-10 py-20">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{data.name}</h1>
        <p className="text-xl text-slate-500 mb-6">{data.title}</p>
        
        {data.contactInfo && (
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {data.contactInfo.email && <a href={`mailto:${data.contactInfo.email}`} className="flex items-center gap-1.5 hover:text-slate-900"><span className="material-symbols-outlined text-[16px]">mail</span> {data.contactInfo.email}</a>}
            {data.contactInfo.phone && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">phone</span> {data.contactInfo.phone}</span>}
            {data.contactInfo.location && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">location_on</span> {data.contactInfo.location}</span>}
            {data.contactInfo.linkedin && <a href={data.contactInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-slate-900"><span className="material-symbols-outlined text-[16px]">language</span> LinkedIn</a>}
            {data.contactInfo.website && <a href={data.contactInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-slate-900"><span className="material-symbols-outlined text-[16px]">language</span> Website</a>}
          </div>
        )}
      </header>

      <div className="space-y-16">
        <section>
          <p className="text-lg leading-relaxed text-slate-700">{data.bio}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Experience</h2>
          <div className="space-y-8">
            {data.experience?.map((exp: ExperienceItem, i: number) => (
              <div key={i} className="grid md:grid-cols-4 gap-4">
                <div className="text-sm text-slate-500 pt-1">
                  {exp.startDate} — {exp.endDate}
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-lg">{exp.role}</h3>
                  <div className="text-slate-600 mb-2">{exp.company}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Education</h2>
          <div className="space-y-6">
            {data.education?.map((edu: EducationItem, i: number) => (
              <div key={i} className="grid md:grid-cols-4 gap-4">
                <div className="text-sm text-slate-500 pt-1">{edu.year}</div>
                <div className="md:col-span-3">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <div className="text-slate-600">{edu.institution}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Skills</h2>
          <p className="text-slate-700 leading-relaxed">
            {data.skills?.join(', ')}
          </p>
        </section>
      </div>
    </div>
  );
}
