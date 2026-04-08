"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';
import { db, handleFirestoreError, OperationType } from '../../../../../lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ArrowLeft, Save, Globe, Lock, LayoutTemplate, Trash2, ExternalLink, Share2, Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

export default function PortfolioBuilder() {
  const params = useParams();
  const portfolioId = params?.portfolioId as string;
  const { user, tier } = useAuth();
  const router = useRouter();
  
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (!user || !portfolioId) return;

    const fetchPortfolio = async () => {
      try {
        const docRef = doc(db, 'portfolios', portfolioId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().userId === user.uid) {
          setPortfolio({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `portfolios/${portfolioId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [user, portfolioId, router]);

  const handleSave = async () => {
    if (!portfolio) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'portfolios', portfolio.id);
      await updateDoc(docRef, {
        title: portfolio.title,
        templateId: portfolio.templateId,
        isPublic: portfolio.isPublic,
        customDomain: portfolio.customDomain || null,
        updatedAt: new Date().toISOString()
      });
      // Show success toast or something
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `portfolios/${portfolio.id}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!portfolio || !window.confirm('Are you sure you want to delete this portfolio?')) return;
    try {
      await deleteDoc(doc(db, 'portfolios', portfolio.id));
      router.push('/dashboard');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `portfolios/${portfolio.id}`);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  if (!portfolio) return null;

  const portfolioData = JSON.parse(portfolio.data);
  const publicUrl = portfolio.customDomain ? `https://${portfolio.customDomain}` : `${window.location.origin}/p/${portfolio.id}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(publicUrl)}&text=${encodeURIComponent(`Check out my portfolio: ${portfolio.title}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}`
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Topbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <input 
              type="text" 
              value={portfolio.title}
              onChange={(e) => setPortfolio({...portfolio, title: e.target.value})}
              className="text-lg font-bold text-slate-900 bg-transparent border-none focus:ring-0 p-0 w-64"
            />
          </div>
          <div className="flex items-center gap-3">
            {portfolio.isPublic && (
              <div className="relative">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700">
                      <Globe className="w-4 h-4 text-blue-400" /> Twitter
                    </a>
                    <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700">
                      <Globe className="w-4 h-4 text-blue-700" /> LinkedIn
                    </a>
                    <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700">
                      <Globe className="w-4 h-4 text-blue-600" /> Facebook
                    </a>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(publicUrl);
                        alert('Link copied to clipboard!');
                        setShowShareMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 text-left"
                    >
                      <LinkIcon className="w-4 h-4 text-slate-400" /> Copy Link
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
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <ExternalLink className="w-4 h-4" /> View Live
              </a>
            )}
            <button 
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8 flex gap-8 max-w-7xl">
        {/* Sidebar Controls */}
        <aside className="w-80 shrink-0 space-y-6">
          {/* Publishing */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Publishing
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-600">Public Access</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={portfolio.isPublic}
                  onChange={(e) => setPortfolio({...portfolio, isPublic: e.target.checked})}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            {tier === 'business' ? (
              <div className="space-y-2">
                <label className="text-sm text-slate-600 block">Custom Domain</label>
                <input 
                  type="text" 
                  placeholder="e.g., myportfolio.com"
                  value={portfolio.customDomain || ''}
                  onChange={(e) => setPortfolio({...portfolio, customDomain: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            ) : (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                  <Lock className="w-4 h-4 text-amber-500" /> Custom Domain
                </div>
                <p className="text-xs text-slate-500">Upgrade to Premium to use your own custom domain.</p>
              </div>
            )}
          </div>

          {/* Templates */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" /> Templates
            </h3>
            <div className="space-y-3">
              <label className={`block cursor-pointer border rounded-xl p-3 transition-all ${portfolio.templateId === 'minimal' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'}`}>
                <input type="radio" name="template" className="sr-only" checked={portfolio.templateId === 'minimal'} onChange={() => setPortfolio({...portfolio, templateId: 'minimal'})} />
                <div className="font-medium text-slate-900">Minimal</div>
                <div className="text-xs text-slate-500">Clean, typography-focused design.</div>
              </label>
              
              <label className={`block cursor-pointer border rounded-xl p-3 transition-all ${portfolio.templateId === 'modern' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'}`}>
                <input type="radio" name="template" className="sr-only" checked={portfolio.templateId === 'modern'} onChange={() => setPortfolio({...portfolio, templateId: 'modern'})} />
                <div className="font-medium text-slate-900">Modern</div>
                <div className="text-xs text-slate-500">Bold colors and structured layout.</div>
              </label>

              {(tier === 'professional' || tier === 'business') ? (
                <label className={`block cursor-pointer border rounded-xl p-3 transition-all ${portfolio.templateId === 'developer' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'}`}>
                  <input type="radio" name="template" className="sr-only" checked={portfolio.templateId === 'developer'} onChange={() => setPortfolio({...portfolio, templateId: 'developer'})} />
                  <div className="font-medium text-slate-900 flex items-center justify-between">
                    Developer <span className="text-[10px] uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Pro</span>
                  </div>
                  <div className="text-xs text-slate-500">Terminal-inspired dark mode theme.</div>
                </label>
              ) : (
                <div className="block border border-slate-200 rounded-xl p-3 opacity-60 bg-slate-50">
                  <div className="font-medium text-slate-900 flex items-center justify-between">
                    Developer <Lock className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-xs text-slate-500">Upgrade to Pro to unlock.</div>
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h3 className="font-semibold text-red-900 mb-2">Danger Zone</h3>
            <p className="text-xs text-red-700 mb-4">Once you delete a portfolio, there is no going back. Please be certain.</p>
            <button 
              onClick={handleDelete}
              className="w-full inline-flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete Portfolio
            </button>
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2 text-xs text-slate-500 font-mono">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="ml-4 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md truncate">
              {publicUrl}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
            {/* Render a scaled-down preview based on the template */}
            <div className="bg-white shadow-xl rounded-xl overflow-hidden min-h-[800px] border border-slate-200 pointer-events-none">
              <TemplateRenderer templateId={portfolio.templateId} data={portfolioData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Simple template renderer for preview
export function TemplateRenderer({ templateId, data }: { templateId: string, data: any }) {
  if (templateId === 'modern') {
    return (
      <div className="font-sans text-slate-900">
        <header className="bg-indigo-600 text-white py-20 px-10 text-center">
          <h1 className="text-5xl font-bold mb-4">{data.name}</h1>
          <p className="text-2xl text-indigo-100 mb-8">{data.title}</p>
          
          {data.contactInfo && (
            <div className="flex flex-wrap justify-center gap-6 text-indigo-100 text-sm">
              {data.contactInfo.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4"/> {data.contactInfo.email}</div>}
              {data.contactInfo.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4"/> {data.contactInfo.phone}</div>}
              {data.contactInfo.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {data.contactInfo.location}</div>}
              {data.contactInfo.linkedin && <a href={data.contactInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><Globe className="w-4 h-4"/> LinkedIn</a>}
              {data.contactInfo.website && <a href={data.contactInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><Globe className="w-4 h-4"/> Website</a>}
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
              {data.experience?.map((exp: any, i: number) => (
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
                {data.experience?.map((exp: any, i: number) => (
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
            {data.contactInfo.email && <a href={`mailto:${data.contactInfo.email}`} className="flex items-center gap-1.5 hover:text-slate-900"><Mail className="w-4 h-4"/> {data.contactInfo.email}</a>}
            {data.contactInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4"/> {data.contactInfo.phone}</span>}
            {data.contactInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {data.contactInfo.location}</span>}
            {data.contactInfo.linkedin && <a href={data.contactInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-slate-900"><Globe className="w-4 h-4"/> LinkedIn</a>}
            {data.contactInfo.website && <a href={data.contactInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-slate-900"><Globe className="w-4 h-4"/> Website</a>}
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
            {data.experience?.map((exp: any, i: number) => (
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
            {data.education?.map((edu: any, i: number) => (
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
