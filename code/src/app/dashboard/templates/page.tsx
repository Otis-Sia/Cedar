"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    image: "/templates/bold-creative.png",
  },
  {
    category: "high-contrast",
    badge: "High Contrast 1 page",
    title: "High Contrast",
    description: "Monochrome visual language with striking spacing and editorial drama.",
    image: "/templates/high-contrast.png",
  },
  {
    category: "minimalist-architect",
    badge: "Minimalist Architect",
    title: "Minimalist Architect",
    description: "Calm, structured compositions built around whitespace and precise hierarchy.",
    image: "/templates/minimalist-architect.png",
  },
  {
    category: "playful-1-page",
    badge: "Playful 1 page",
    title: "Playful",
    description: "Bright, character-driven layouts with a lively single-page rhythm.",
    image: "/templates/playful-1-page.png",
  },
  {
    category: "professional-developer",
    badge: "Professional Developer",
    title: "Professional Developer",
    description: "Structured portfolio layouts for technical profiles and product teams.",
    image: "/templates/professional-developer.png",
  },
  {
    category: "student",
    badge: "Student",
    title: "Student",
    description: "Editorial layouts that present academic work and projects with clarity.",
    image: "/templates/student.png",
  },
  {
    category: "tech-1-page",
    badge: "Tech 1 page",
    title: "Tech 1 page",
    description: "Concise one-page layouts for tools, startups, and product storytelling.",
    image: "/templates/tech-1-page.png",
  },
];

const previewImages: Record<TemplateCategory, string> = {
  "bold-creative": "/templates/bold-creative.png",
  "high-contrast": "/templates/high-contrast.png",
  "minimalist-architect": "/templates/minimalist-architect.png",
  "playful-1-page": "/templates/playful-1-page.png",
  "professional-developer": "/templates/professional-developer.png",
  student: "/templates/student.png",
  "tech-1-page": "/templates/tech-1-page.png",
};

export default function TemplatesPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"all" | TemplateCategory>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCard | null>(null);

  const filteredTemplates = useMemo(
    () => templates.filter((template) => activeFilter === "all" || template.category === activeFilter),
    [activeFilter]
  );

  const handleUseTemplate = (template: TemplateCard) => {
    localStorage.setItem("cedar:selected-template", template.category);
    localStorage.setItem("cedar:selected-template-label", template.title);
    router.push("/dashboard/portfolio-builder");
  };

  return (
    <main className="px-4 sm:px-6 md:px-10 lg:px-12 py-8 md:py-10 bg-cedar-alabaster min-h-full">
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 text-cedar-bronze text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              Dashboard Only
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-cedar-midnight">
              Choose your template
            </h1>
            <p className="text-cedar-slate mt-4 max-w-2xl leading-relaxed">
              This gallery is available after login and is used to select the layout that will power your portfolio build.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {(["all", "bold-creative", "high-contrast", "minimalist-architect", "playful-1-page", "professional-developer", "student", "tech-1-page"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeFilter === filter ? "bg-cedar-forest text-white border-cedar-forest" : "bg-white text-cedar-slate border-black/5 hover:text-cedar-midnight"}`}
              >
                {filter === "all" ? "All" : templates.find((template) => template.category === filter)?.badge ?? filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredTemplates.map((template, index) => (
            <article
              key={template.category}
              className={`group overflow-hidden rounded-[28px] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 ${index === 0 ? "xl:col-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                <Image
                  src={template.image}
                  alt={`${template.title} template preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cedar-midnight/70 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-cedar-forest">
                  {template.badge}
                </div>
              </div>

              <div className="p-6 md:p-7 flex flex-col gap-5">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-cedar-midnight mb-2">
                    {template.title}
                  </h2>
                  <p className="text-cedar-slate text-sm leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 rounded-2xl bg-cedar-forest px-5 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-cedar-forest-dark"
                  >
                    Use in Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate(template)}
                    className="flex-1 rounded-2xl border border-black/10 px-5 py-3.5 text-sm font-semibold text-cedar-midnight transition-all hover:bg-cedar-alabaster"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedTemplate && (
        <div className="fixed inset-0 z-[200] bg-cedar-midnight/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8">
          <button
            type="button"
            onClick={() => setSelectedTemplate(null)}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close preview"
          >
            <span className="material-symbols-outlined text-white text-2xl">close</span>
          </button>
          <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-cedar-alabaster flex items-center gap-2 px-5 py-3 border-b border-black/5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-4 text-xs text-cedar-slate font-medium">
                cedar.portfolio/{selectedTemplate.category}
              </span>
            </div>
            <div className="relative overflow-y-auto max-h-[80vh]">
              <Image
                src={previewImages[selectedTemplate.category]}
                alt={`${selectedTemplate.title} preview`}
                width={1600}
                height={1200}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
