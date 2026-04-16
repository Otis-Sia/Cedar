"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const templatesList = [
  {
    id: "bold-creative",
    name: "Bold Creative",
    category: "bold-creative",
    description: "High-impact layouts with expressive imagery and confident typography.",
    image: "/template_creative_director.png",
  },
  {
    id: "high-contrast",
    name: "High Contrast",
    category: "high-contrast",
    description: "Monochrome visual language with striking spacing and editorial drama.",
    image: "/template_experimental.png",
  },
  {
    id: "minimalist-architect",
    name: "Minimalist Architect",
    category: "minimalist-architect",
    description: "Calm, structured compositions built around whitespace and precise hierarchy.",
    image: "/template_minimalist.png",
  },
  {
    id: "playful-1-page",
    name: "Playful",
    category: "playful-1-page",
    description: "Bright, character-driven layouts with a lively single-page rhythm.",
    image: "/hero.png",
  },
  {
    id: "professional-developer",
    name: "Professional Developer",
    category: "professional-developer",
    description: "Structured portfolio layouts for technical profiles and product teams.",
    image: "/template_corporate_tech.png",
  },
  {
    id: "student",
    name: "Student",
    category: "student",
    description: "Editorial layouts that present academic work and projects with clarity.",
    image: "/template_minimalist.png",
  },
  {
    id: "tech-1-page",
    name: "Tech 1 page",
    category: "tech-1-page",
    description: "Concise one-page layouts for tools, startups, and product storytelling.",
    image: "/template_corporate_tech.png",
  },
];

export default function PublicTemplatesPage() {
  const [filter, setFilter] = useState("all");
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "bold-creative", label: "Bold Creative" },
    { id: "high-contrast", label: "High Contrast" },
    { id: "minimalist-architect", label: "Minimalist" },
    { id: "playful-1-page", label: "Playful" },
    { id: "professional-developer", label: "Professional" },
    { id: "student", label: "Student" },
    { id: "tech-1-page", label: "Tech" },
  ];

  const filteredTemplates = filter === "all" ? templatesList : templatesList.filter(t => t.category === filter);
  const activePreview = templatesList.find((template) => template.id === selectedPreview) ?? null;

  useEffect(() => {
    if (selectedPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedPreview]);

  return (
    <>
      <Navigation />
      <main className="pt-16 md:pt-20">
        <section className="pt-12 md:pt-20 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 text-center max-w-4xl mx-auto">
          <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">
            Gallery
          </span>
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-cedar-midnight mb-6">
            Curated Templates
          </h1>
          <p className="text-lg text-cedar-slate mb-12">
            Select from a collection of premium layouts designed by leading
            creative directors.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === f.id
                    ? "bg-cedar-forest text-cedar-alabaster shadow-[0_4px_14px_rgba(27,48,34,0.25)]"
                    : "bg-cedar-alabaster border border-black/5 text-cedar-slate hover:text-cedar-midnight"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        <section className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto min-h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTemplates.map((template, idx) => (
              <div
                key={template.id}
                className="template-card group relative flex flex-col h-full bg-white rounded-[28px] overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-cedar-forest/80 via-cedar-forest/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <Image
                    src={template.image}
                    alt={`${template.name} template preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    priority={idx < 2}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between gap-5 relative z-20 bg-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cedar-bronze mb-3 block">
                      {template.name}
                    </span>
                    <h2 className="font-headline text-2xl font-bold text-cedar-midnight mb-3">
                      {template.name}
                    </h2>
                    <p className="text-cedar-slate text-sm leading-relaxed">
                      {template.description}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href="/signup"
                      className="flex-1 flex justify-center items-center bg-cedar-forest text-white py-3.5 rounded-2xl font-bold text-sm shadow-md hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all"
                    >
                      Use This Template
                    </Link>
                    <button
                      onClick={() => setSelectedPreview(template.id)}
                      className="flex-1 flex justify-center items-center border border-black/10 text-cedar-midnight py-3.5 rounded-2xl font-semibold text-sm hover:bg-cedar-alabaster transition-all"
                    >
                      Live Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-6 lg:px-12 bg-cedar-alabaster">
          <div className="max-w-[1280px] mx-auto rounded-[40px] lg:rounded-[60px] bg-cedar-forest p-10 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-sm mb-8">
                <span className="material-symbols-outlined text-cedar-bronze text-sm">
                  rocket_launch
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                  Ready to Launch?
                </span>
              </span>

              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
                Your portfolio is
                <br />
                <span className="text-cedar-bronze italic">
                  one upload away.
                </span>
              </h2>
              <p className="text-white/75 leading-relaxed text-lg mb-12 max-w-xl mx-auto">
                Upload your CV and our AI will auto-generate a stunning
                portfolio using your chosen template. No design skills needed.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex justify-center items-center bg-white text-cedar-forest px-10 py-5 rounded-full font-bold text-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-cedar-alabaster hover:-translate-y-0.5 transition-all"
                >
                  Start Building — It&apos;s Free
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex justify-center items-center bg-white/10 border text-white border-white/20 px-10 py-5 rounded-full font-semibold text-[15px] backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-[200] bg-cedar-midnight/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <button
            onClick={() => setSelectedPreview(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-white text-2xl">
              close
            </span>
          </button>
          <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-cedar-alabaster flex items-center gap-2 px-5 py-3 border-b border-black/5">
              <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              <span className="ml-4 text-xs text-cedar-slate font-medium">
                cedar.portfolio/{activePreview.id}
              </span>
            </div>
            <div className="relative overflow-y-auto max-h-[80vh]">
              <div className="relative aspect-[16/10] w-full bg-cedar-alabaster">
                <Image
                  src={activePreview.image}
                  alt={`${activePreview.name} preview`}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-t border-black/5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-cedar-bronze font-bold mb-2">
                    {activePreview.category}
                  </p>
                  <h3 className="font-headline text-2xl md:text-3xl font-bold text-cedar-midnight">
                    {activePreview.name}
                  </h3>
                </div>
                <Link
                  href="/signup"
                  className="inline-flex justify-center items-center bg-cedar-forest text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:bg-cedar-forest-dark transition-all"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
