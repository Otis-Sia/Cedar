"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type TemplateCategory =
  | "bold-creative"
  | "high-contrast"
  | "minimalist-architect"
  | "playful-1-page"
  | "professional-developer"
  | "student"
  | "tech-1-page";

type TemplateCard = {
  category: TemplateCategory;
  badge: string;
  title: string;
  description: string;
  image: string;
};

const templates: TemplateCard[] = [
  {
    category: "bold-creative",
    badge: "Bold Creative",
    title: "Bold Creative",
    description: "High-impact layouts with expressive imagery and confident typography.",
    image: "/template_creative_director.png",
  },
  {
    category: "high-contrast",
    badge: "High Contrast 1 page",
    title: "High Contrast",
    description: "Monochrome visual language with striking spacing and editorial drama.",
    image: "/template_experimental.png",
  },
  {
    category: "minimalist-architect",
    badge: "Minimalist Architect",
    title: "Minimalist Architect",
    description: "Calm, structured compositions built around whitespace and precise hierarchy.",
    image: "/template_minimalist.png",
  },
  {
    category: "playful-1-page",
    badge: "Playful 1 page",
    title: "Playful",
    description: "Bright, character-driven layouts with a lively single-page rhythm.",
    image: "/hero.png",
  },
  {
    category: "professional-developer",
    badge: "Professional Developer",
    title: "Professional Developer",
    description: "Structured portfolio layouts for technical profiles and product teams.",
    image: "/template_corporate_tech.png",
  },
  {
    category: "student",
    badge: "Student",
    title: "Student",
    description: "Editorial layouts that present academic work and projects with clarity.",
    image: "/template_minimalist.png",
  },
  {
    category: "tech-1-page",
    badge: "Tech 1 page",
    title: "Tech 1 page",
    description: "Concise one-page layouts for tools, startups, and product storytelling.",
    image: "/template_corporate_tech.png",
  },
];

const templatePreviewUrls: Record<TemplateCategory, string> = {
  "bold-creative": "cedar.portfolio/bold-creative-demo",
  "high-contrast": "cedar.portfolio/high-contrast-demo",
  "minimalist-architect": "cedar.portfolio/minimalist-architect-demo",
  "playful-1-page": "cedar.portfolio/playful-1-page-demo",
  "professional-developer": "cedar.portfolio/professional-developer-demo",
  student: "cedar.portfolio/student-demo",
  "tech-1-page": "cedar.portfolio/tech-1-page-demo",
};

const templatePreviewImages: Record<TemplateCategory, string> = {
  "bold-creative": "/template_creative_director.png",
  "high-contrast": "/template_experimental.png",
  "minimalist-architect": "/template_minimalist.png",
  "playful-1-page": "/hero.png",
  "professional-developer": "/template_corporate_tech.png",
  student: "/template_minimalist.png",
  "tech-1-page": "/template_corporate_tech.png",
};

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | TemplateCategory>("all");
  const [visibleItems, setVisibleItems] = useState<Set<TemplateCategory>>(new Set());
  const [previewTemplate, setPreviewTemplate] = useState<TemplateCard | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredTemplates = useMemo(
    () => templates.filter((template) => activeFilter === "all" || template.category === activeFilter),
    [activeFilter]
  );

  useEffect(() => {
    const itemIds = templates.map((template) => template.category);
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            const category = (entry.target as HTMLElement).dataset.category as TemplateCategory | undefined;
            if (category && entry.isIntersecting) {
              next.add(category);
            }
          });
          return next;
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const nodes = itemIds
      .map((category) => document.querySelector<HTMLElement>(`[data-category="${category}"]`))
      .filter((node): node is HTMLElement => Boolean(node));

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewTemplate(null);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[rgba(255,255,255,0.85)] backdrop-blur-[20px] border-b border-black/5 flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 md:py-4 h-16 md:h-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic">C</div>
          <Link href="/" className="font-headline text-2xl font-bold tracking-tight text-cedar-forest">
            Cedar
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="/dashboard#services">Services</a>
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-forest border-b-2 border-cedar-bronze pb-0.5" href="/dashboard/templates">Templates</a>
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="/dashboard#showcase">Showcase</a>
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="/dashboard#pricing">Pricing</a>
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="/dashboard#faq">FAQ</a>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <a href="/login" className="hidden sm:block text-sm font-semibold text-cedar-slate hover:text-cedar-forest transition-colors uppercase tracking-widest">Log In</a>
          <Link href="/signup" className="hidden sm:inline-flex bg-cedar-forest text-cedar-alabaster px-7 py-3 rounded-full font-semibold text-sm shadow-md hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all">
            Build Portfolio
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-11 h-11 rounded-xl border border-black/5 bg-white flex items-center justify-center"
            aria-label="Open menu"
          >
            <span className="sr-only">Open menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block w-5 h-0.5 rounded-full bg-cedar-midnight"></span>
              <span className="block w-5 h-0.5 rounded-full bg-cedar-midnight"></span>
              <span className="block w-5 h-0.5 rounded-full bg-cedar-midnight"></span>
            </span>
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] bg-cedar-midnight/50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`fixed top-0 right-0 z-[70] h-full w-[88%] max-w-sm bg-white shadow-2xl transition-transform duration-300 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic">C</div>
            <div className="font-headline text-xl font-bold tracking-tight text-cedar-forest">Cedar</div>
          </div>
          <button type="button" onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-xl bg-cedar-alabaster flex items-center justify-center text-cedar-slate hover:text-cedar-midnight transition-colors" aria-label="Close menu">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 p-5 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-cedar-midnight font-medium hover:bg-cedar-alabaster transition-colors" href="/dashboard#services"><span className="material-symbols-outlined text-cedar-forest">design_services</span> Services</a>
          <a className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-cedar-alabaster text-cedar-forest font-semibold" href="/dashboard/templates"><span className="material-symbols-outlined text-cedar-forest">auto_awesome_motion</span> Templates</a>
          <a className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-cedar-midnight font-medium hover:bg-cedar-alabaster transition-colors" href="/dashboard#showcase"><span className="material-symbols-outlined text-cedar-forest">photo_library</span> Showcase</a>
          <a className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-cedar-midnight font-medium hover:bg-cedar-alabaster transition-colors" href="/dashboard#pricing"><span className="material-symbols-outlined text-cedar-forest">payments</span> Pricing</a>
          <a className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-cedar-midnight font-medium hover:bg-cedar-alabaster transition-colors" href="/dashboard#faq"><span className="material-symbols-outlined text-cedar-forest">help</span> FAQ</a>
        </nav>
        <div className="p-5 border-t border-black/5 space-y-3">
          <a href="/login" className="block w-full text-center py-3.5 rounded-xl border border-black/10 text-cedar-midnight font-bold text-sm hover:bg-cedar-alabaster transition-all">Log In</a>
          <Link href="/signup" className="block w-full text-center py-3.5 rounded-xl bg-cedar-forest text-white font-bold text-sm shadow-md hover:bg-cedar-forest-dark transition-all">Build Portfolio</Link>
        </div>
      </div>

      <main className="pt-16 md:pt-20 bg-cedar-alabaster text-cedar-midnight font-body leading-relaxed antialiased selection:bg-cedar-bronze/30">
        <section className="pt-12 md:pt-20 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 text-center max-w-4xl mx-auto">
          <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">Gallery</span>
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-cedar-midnight mb-6">Curated Templates</h1>
          <p className="text-lg text-cedar-slate mb-12">Select from a collection of premium layouts designed by leading creative directors.</p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              ["all", "All"],
              ["bold-creative", "Bold Creative"],
              ["high-contrast", "High Contrast"],
              ["minimalist-architect", "Minimalist"],
              ["playful-1-page", "Playful"],
              ["professional-developer", "Professional"],
              ["student", "Student"],
              ["tech-1-page", "Tech"],
            ].map(([filter, label]) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter as "all" | TemplateCategory)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${isActive ? "bg-cedar-forest text-cedar-alabaster border-cedar-forest shadow-[0_4px_14px_rgba(27,48,34,0.25)]" : "bg-cedar-alabaster border-black/5 text-cedar-slate hover:text-cedar-midnight"}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto min-h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTemplates.map((template, index) => {
              const visible = visibleItems.has(template.category);
              const cardClass = [
                "template-grid-item",
                visible ? "visible" : "",
                "group relative flex flex-col h-full bg-white rounded-[28px] overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-500",
                index === 0 ? "xl:col-span-2 xl:row-span-2" : "",
              ].join(" ");

              const imageWrapperClass = index === 0 ? "relative overflow-hidden aspect-[16/9] bg-gray-100" : "relative overflow-hidden aspect-[4/5] bg-gray-100";

              return (
                <div
                  key={template.category}
                  data-category={template.category}
                  className={cardClass}
                >
                  <div className={imageWrapperClass}>
                    <img
                      alt={`${template.title} template thumbnail`}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                      src={template.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cedar-forest/80 via-cedar-forest/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className={`p-6 flex flex-col flex-1 justify-between gap-5 ${index === 0 ? "lg:p-8" : ""}`}>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cedar-bronze mb-3 block">{template.badge}</span>
                      <h2 className={`font-headline font-bold text-cedar-midnight mb-3 ${index === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>{template.title}</h2>
                      <p className="text-cedar-slate text-sm leading-relaxed">{template.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Link href="/dashboard/portfolio-builder" className="flex-1 text-center bg-cedar-forest text-white py-3.5 rounded-2xl font-bold text-sm shadow-md hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all">
                        Use This Template
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(template)}
                        className="flex-1 text-center border border-black/10 text-cedar-midnight py-3.5 rounded-2xl font-semibold text-sm hover:bg-cedar-alabaster transition-all"
                      >
                        Live Preview
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-white border-y border-black/5">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-16">
              <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">At A Glance</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-cedar-midnight mb-4">Compare Templates</h2>
              <p className="text-cedar-slate text-lg max-w-2xl mx-auto">Every template ships with Cedar's core features. See what makes each one unique.</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-black/5 shadow-sm">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-cedar-forest text-white">
                    <th className="text-left py-5 px-6 font-semibold text-sm rounded-tl-3xl">Feature</th>
                    <th className="text-center py-5 px-4 font-semibold text-sm">Minimalist Architect</th>
                    <th className="text-center py-5 px-4 font-semibold text-sm">Bold Creative</th>
                    <th className="text-center py-5 px-4 font-semibold text-sm">Professional</th>
                    <th className="text-center py-5 px-4 font-semibold text-sm rounded-tr-3xl">Student</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {[
                    ["Responsive Design", true, true, true, true],
                    ["Dark Mode", true, "Default", true, true],
                    ["Parallax Animations", false, true, false, true],
                    ["Case Study Module", false, true, true, false],
                    ["Data Visualizations", false, false, true, false],
                    ["Video Background", false, true, false, true],
                    ["Custom Color Engine", false, false, false, true],
                    ["Best For", "Architects & Consultants", "Designers & Artists", "Engineers & PMs", "Students & Grads"],
                  ].map((row, rowIndex) => (
                    <tr key={rowIndex} className={`compare-row ${rowIndex % 2 === 1 ? "bg-cedar-alabaster/40" : ""}`}>
                      <td className="py-4 px-6 text-sm font-medium text-cedar-midnight">{row[0]}</td>
                      {rowIndex === 7 ? (
                        <>
                          <td className="text-center text-xs font-semibold text-cedar-slate">{row[1]}</td>
                          <td className="text-center text-xs font-semibold text-cedar-slate">{row[2]}</td>
                          <td className="text-center text-xs font-semibold text-cedar-slate">{row[3]}</td>
                          <td className="text-center text-xs font-semibold text-cedar-slate">{row[4]}</td>
                        </>
                      ) : (
                        <>
                          {[row[1], row[2], row[3], row[4]].map((cell, cellIndex) => (
                            <td key={cellIndex} className="text-center">
                              {cell === true ? (
                                <span className="material-symbols-outlined text-cedar-bronze text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                              ) : cell === false ? (
                                <span className="material-symbols-outlined text-black/15 text-xl">remove</span>
                              ) : (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-cedar-forest bg-cedar-alabaster px-2 py-1 rounded-full">{String(cell)}</span>
                              )}
                            </td>
                          ))}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 lg:px-12 bg-cedar-alabaster">
          <div className="max-w-[1280px] mx-auto rounded-[40px] lg:rounded-[60px] bg-cedar-forest p-10 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[#1B3022]">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <filter id="ctaNoise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
                <rect width="100%" height="100%" filter="url(#ctaNoise)" />
              </svg>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cedar-bronze/15 blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-sm mb-8">
                <span className="material-symbols-outlined text-cedar-bronze text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>rocket_launch</span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">Ready to Launch?</span>
              </span>

              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
                Your portfolio is<br />
                <span className="text-cedar-bronze italic">one upload away.</span>
              </h2>
              <p className="text-white/75 leading-relaxed text-lg mb-12 max-w-xl mx-auto">
                Upload your CV and our AI will auto-generate a stunning portfolio using your chosen template. No design skills needed.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link href="/signup" className="inline-flex justify-center items-center bg-white text-cedar-forest px-10 py-5 rounded-full font-bold text-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-cedar-alabaster hover:-translate-y-0.5 transition-all">
                  Start Building — It's Free
                </Link>
                <a href="/dashboard#pricing" className="inline-flex justify-center items-center bg-white/10 border text-white border-white/20 px-10 py-5 rounded-full font-semibold text-[15px] backdrop-blur-sm hover:bg-white/20 transition-all">
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 py-10 w-full border-t border-black/5">
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <div className="w-6 h-6 rounded bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic text-xs">C</div>
          <div className="text-[13px] font-medium text-cedar-slate">© 2026 Cedar. Curated with excellence in Nairobi.</div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          <a className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/privacy">Privacy Policy</a>
          <a className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/terms">Terms & Conditions</a>
          <a className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/support">Support</a>
          <a className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="https://instagram.com/cedar">Instagram</a>
        </div>
      </footer>

      <div className={`fixed inset-0 z-[200] bg-cedar-midnight/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 transition-all duration-500 ${previewTemplate ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setPreviewTemplate(null)}>
        <button
          type="button"
          onClick={() => setPreviewTemplate(null)}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Close preview"
        >
          <span className="material-symbols-outlined text-white text-2xl">close</span>
        </button>
        <div
          className={`w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 ${previewTemplate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="bg-cedar-alabaster flex items-center gap-2 px-5 py-3 border-b border-black/5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="ml-4 text-xs text-cedar-slate font-medium">{previewTemplate ? templatePreviewUrls[previewTemplate.category] : "cedar.portfolio/your-name"}</span>
          </div>
          <div className="relative overflow-y-auto max-h-[80vh]">
            {previewTemplate && (
              <img
                id="preview-image"
                alt="Template preview"
                className="w-full"
                src={templatePreviewImages[previewTemplate.category]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DraftPortfolio {
  sourceFile: string;
  generatedAt: string;
  portfolio: {
    name?: string;
    title?: string;
    bio?: string;
    skills?: string[];
  };
}

export default function TemplatesPage() {
  const [draft, setDraft] = useState<DraftPortfolio | null>(null);

  useEffect(() => {
    const storedDraft = sessionStorage.getItem('cedar:portfolio-draft');

    if (!storedDraft) {
      return;
    }

    try {
      setDraft(JSON.parse(storedDraft) as DraftPortfolio);
    } catch {
      sessionStorage.removeItem('cedar:portfolio-draft');
    }
  }, []);

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

        {draft && (
          <div className="mt-8 rounded-3xl bg-white border border-black/5 shadow-sm p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cedar-bronze mb-3">Latest backend scan</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-cedar-midnight">
                  {draft.portfolio.name || 'Untitled profile'}
                </h2>
                <p className="text-cedar-slate mt-1">
                  {draft.portfolio.title || 'No title extracted'} from {draft.sourceFile}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(draft.portfolio.skills || []).slice(0, 4).map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-cedar-alabaster text-cedar-slate text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
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
