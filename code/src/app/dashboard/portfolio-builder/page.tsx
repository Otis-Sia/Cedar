"use client";

import React, { useState, useRef } from "react";
import { useAiScanner } from "@/hooks/useAiScanner";

interface PortfolioState {
  fullName: string;
  professionalTitle: string;
  valueProp: string;
  yearsExperience: string;
  industryKeywords: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  behance: string;
  website: string;
  cvDownloadUrl: string;
  profileSummary: string;
  relevantExperience: string;
  professionalPhotoUrl: string;
  experience: Array<{ company: string; role: string; location: string; startDate: string; endDate: string; achievements: string }>;
  education: Array<{ degree: string; institution: string; gradDate: string; honors: string }>;
  skills: string;
  certifications: string;
  projects: Array<{ title: string; role: string; teamSize: string; timeline: string; problem: string; process: string; results: string; url: string; prototypeAccess: string }>;
  whoYouHelp: string;
  workingStyle: string;
  keyClients: string;
  toolsUsed: string;
  testimonials: Array<{ quote: string; name: string; title: string; company: string }>;
  socialProofLinks: string;
  companyLogos: string;
  contactFormName: string;
  contactFormEmail: string;
  contactFormMessage: string;
  availability: string;
  contactCta: string;
}

const emptyExperience = { company: "", role: "", location: "", startDate: "", endDate: "", achievements: "" };
const emptyEducation = { degree: "", institution: "", gradDate: "", honors: "" };
const emptyProject = { title: "", role: "", teamSize: "", timeline: "", problem: "", process: "", results: "", url: "", prototypeAccess: "" };
const emptyTestimonial = { quote: "", name: "", title: "", company: "" };

export default function PortfolioBuilderPage() {
  const [formData, setFormData] = useState<PortfolioState>({
    fullName: "",
    professionalTitle: "",
    valueProp: "",
    yearsExperience: "",
    industryKeywords: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    behance: "",
    website: "",
    cvDownloadUrl: "",
    profileSummary: "",
    relevantExperience: "",
    professionalPhotoUrl: "",
    experience: [],
    education: [],
    skills: "",
    certifications: "",
    projects: [],
    whoYouHelp: "",
    workingStyle: "",
    keyClients: "",
    toolsUsed: "",
    testimonials: [],
    socialProofLinks: "",
    companyLogos: "",
    contactFormName: "",
    contactFormEmail: "",
    contactFormMessage: "",
    availability: "",
    contactCta: "",
  });

  const [openSection, setOpenSection] = useState<string>("identity");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { scanState, startAiScan } = useAiScanner();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    arrayName: keyof PortfolioState,
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const arr = [...(prev[arrayName] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [arrayName]: arr };
    });
  };

  const addArrayItem = (arrayName: keyof PortfolioState, emptyItem: any) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] as any[]), emptyItem],
    }));
  };

  const removeArrayItem = (arrayName: keyof PortfolioState, index: number) => {
    setFormData((prev) => {
      const arr = [...(prev[arrayName] as any[])];
      arr.splice(index, 1);
      return { ...prev, [arrayName]: arr };
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.match(/\.(pdf|docx)$/i)) {
        alert("Please upload a PDF or DOCX file.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.name.match(/\.(pdf|docx)$/i)) {
        alert("Please upload a PDF or DOCX file.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const onScanComplete = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      fullName: data.name || prev.fullName,
      professionalTitle: data.title || prev.professionalTitle,
      valueProp: data.valueProp || prev.valueProp,
      yearsExperience: data.yearsExperience || prev.yearsExperience,
      industryKeywords: data.industryKeywords || prev.industryKeywords,
      profileSummary: data.bio || prev.profileSummary,
      relevantExperience: data.about?.relevantExperience || prev.relevantExperience,
      professionalPhotoUrl: data.about?.professionalPhotoUrl || prev.professionalPhotoUrl,
      email: data.contactInfo?.email || prev.email,
      phone: data.contactInfo?.phone || prev.phone,
      location: (data.contactInfo?.city && data.contactInfo?.country) ? `${data.contactInfo.city}, ${data.contactInfo.country}` : prev.location,
      linkedin: data.contactInfo?.linkedin || prev.linkedin,
      github: data.contactInfo?.github || prev.github,
      behance: data.contactInfo?.behance || prev.behance,
      website: data.contactInfo?.website || prev.website,
      cvDownloadUrl: data.contactInfo?.cvDownloadUrl || prev.cvDownloadUrl,
      skills: data.skills?.join(', ') || prev.skills,
      certifications: data.certifications || prev.certifications,
      experience: data.experience?.length ? data.experience : prev.experience,
      education: data.education?.length ? data.education : prev.education,
      projects: data.projects?.length ? data.projects : prev.projects,
      whoYouHelp: data.about?.whoYouHelp || prev.whoYouHelp,
      workingStyle: data.about?.workingStyle || prev.workingStyle,
      keyClients: data.about?.keyClients || prev.keyClients,
      toolsUsed: data.about?.toolsUsed || prev.toolsUsed,
      testimonials: data.testimonials?.length ? data.testimonials : prev.testimonials,
      socialProofLinks: data.socialProof?.links || prev.socialProofLinks,
      companyLogos: data.socialProof?.logos || prev.companyLogos,
      contactFormName: data.contact?.form?.name || prev.contactFormName,
      contactFormEmail: data.contact?.form?.email || prev.contactFormEmail,
      contactFormMessage: data.contact?.form?.message || prev.contactFormMessage,
      availability: data.contact?.availability || prev.availability,
      contactCta: data.contact?.cta || prev.contactCta,
    }));
    setOpenSection("identity");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpenSection(id);
    }
  };

  const filledSections = [
    Boolean(formData.fullName.trim() && formData.email.trim()),
    Boolean(formData.professionalTitle.trim() && formData.valueProp.trim()),
    formData.experience.length > 0,
    formData.education.length > 0,
    Boolean(formData.skills.trim()),
    formData.projects.length > 0,
    Boolean(formData.whoYouHelp.trim() || formData.workingStyle.trim()),
    formData.testimonials.length > 0,
    Boolean(formData.availability.trim() || formData.contactCta.trim()),
  ].filter(Boolean).length;

  const totalSections = 9;
  const progressPercent = Math.round((filledSections / totalSections) * 100);
  const circumference = 94.25;
  const ringOffset = circumference - (progressPercent / 100) * circumference;
  const progressLineWidth = filledSections > 0 ? ((filledSections - 1) / (totalSections - 1)) * 90 : 0;

  const stepItems = [
    { id: "identity", label: "Identity" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "testimonials", label: "Proof" },
    { id: "contact", label: "Contact" },
  ];

  const SectionHeader = ({ id, icon, title, subtitle, badge }: { id: string, icon: string, title: string, subtitle: string, badge?: string }) => (
    <button
      type="button"
      className="section-toggle w-full flex items-center justify-between px-8 py-6 text-left"
      onClick={() => toggleSection(id)}
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-cedar-forest/10 flex items-center justify-center text-cedar-forest">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h3 className="font-headline text-xl font-bold text-cedar-midnight">{title}</h3>
          <p className="text-xs text-cedar-slate mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-cedar-slate bg-cedar-alabaster px-3 py-1 rounded-full">{badge}</span>
        )}
        <span className="material-symbols-outlined section-chevron text-cedar-slate transition-transform">
          {openSection === id ? "expand_less" : "expand_more"}
        </span>
      </div>
    </button>
  );

  return (
    <div className="flex flex-col h-full relative">
      <header className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-6 md:py-8 shrink-0">
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-cedar-forest">
            Portfolio Builder
          </h2>
          <p className="text-sm text-cedar-slate mt-1 italic font-medium">
            Craft your professional narrative, section by section.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
          <svg className="w-7 h-7" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#F9F7F2" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#1B3022"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={ringOffset}
              className="transition-all duration-500"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <span className="text-xs font-bold text-cedar-midnight tracking-widest uppercase">{progressPercent}%</span>
        </div>
      </header>

      <div className="px-4 sm:px-6 md:px-12 pb-20 flex-grow">
        <div className="max-w-[960px] mx-auto">
          <div className="mb-8 bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-headline text-2xl font-bold text-cedar-midnight">Import CV/Resume</h3>
              <button
                type="button"
                onClick={() => selectedFile && startAiScan(selectedFile, onScanComplete)}
                disabled={scanState.isScanning || !selectedFile}
                className="bg-cedar-forest text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-cedar-forest-dark disabled:opacity-50 transition-all"
              >
                <span className="material-symbols-outlined text-base">{scanState.isScanning ? "progress_activity" : "bolt"}</span>
                {scanState.isScanning ? "Scanning..." : "Start AI Scan"}
              </button>
            </div>
            <div className="mt-4">
              {!selectedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-black/10 rounded-2xl p-6 cursor-pointer text-center hover:border-cedar-bronze/50 transition-all"
                >
                  <p className="text-sm text-cedar-slate">Drag/drop PDF/DOCX or click to browse</p>
                  <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileSelect} className="hidden" />
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-2xl bg-cedar-alabaster p-4">
                  <p className="text-sm font-semibold text-cedar-midnight truncate">{selectedFile.name}</p>
                  <button type="button" onClick={() => setSelectedFile(null)} className="text-cedar-slate hover:text-red-500">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              )}
              {scanState.error && <p className="text-red-500 text-xs mt-2">{scanState.error}</p>}
            </div>
          </div>

          <div className="mb-10 bg-white rounded-2xl p-6 border border-black/5 shadow-sm hidden md:block">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-[5%] right-[5%] h-[2px] bg-black/5 z-0"></div>
              <div className="absolute top-5 left-[5%] h-[2px] bg-cedar-forest z-[1] transition-all duration-500" style={{ width: `${progressLineWidth}%` }}></div>
              {stepItems.map((step, idx) => {
                const isComplete = idx < filledSections;
                return (
                  <button key={step.id} type="button" onClick={() => scrollToSection(step.id)} className="step-item flex flex-col items-center z-10 cursor-pointer">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-[3px] border-white shadow-sm transition-all ${isComplete ? "bg-cedar-forest text-white" : "bg-black/10 text-cedar-slate"}`}>{idx + 1}</div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${isComplete ? "text-cedar-forest" : "text-cedar-slate"}`}>{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form className="space-y-6" noValidate>
            
            {/* 1. Identity & Contact */}
            <div id="identity" className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="identity" icon="person" title="Identity & Contact" subtitle="Your professional identity and how people reach you" badge="Required" />
              {openSection === "identity" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Full Name</label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight placeholder:text-cedar-slate/50" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Professional Title / Headline</label><input type="text" name="professionalTitle" value={formData.professionalTitle} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Email</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Phone (with voicemail)</label><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Location (City, Country)</label><input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">LinkedIn Profile (customized)</label><input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">GitHub Profile</label><input type="url" name="github" value={formData.github} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Behance / Other Portfolio</label><input type="url" name="behance" value={formData.behance} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Portfolio Website</label><input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Summary */}
            <div id="summary" className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="summary" icon="star" title="Professional Summary" subtitle="Your headline, value proposition, and career snapshot" badge="Required" />
              {openSection === "summary" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Role Title</label><input type="text" name="professionalTitle" value={formData.professionalTitle} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Years of Relevant Experience</label><input type="text" name="yearsExperience" value={formData.yearsExperience} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Value Proposition</label><input type="text" name="valueProp" value={formData.valueProp} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Professional Bio</label><textarea name="profileSummary" value={formData.profileSummary} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight min-h-[100px]" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Industry Keywords</label><input type="text" name="industryKeywords" value={formData.industryKeywords} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Curated Work Samples */}
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="projects" icon="work" title="Work Samples & Projects" subtitle="3-6 curated case studies that showcase your best work" badge={`${formData.projects.length} ${formData.projects.length === 1 ? "project" : "projects"}`} />
              {openSection === "projects" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8 space-y-8">
                  {formData.projects.map((proj, idx) => (
                    <div key={idx} className="p-6 bg-cedar-alabaster rounded-2xl border border-black/5 relative shadow-sm">
                      <button type="button" onClick={() => removeArrayItem("projects", idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><span className="material-symbols-outlined">delete</span></button>
                      <h4 className="font-bold text-lg mb-4">Project {idx + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Title</label><input type="text" value={proj.title || ""} onChange={e => handleArrayChange("projects", idx, "title", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Role & Context</label><input type="text" value={proj.role || ""} onChange={e => handleArrayChange("projects", idx, "role", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Team Size</label><input type="text" value={proj.teamSize || ""} onChange={e => handleArrayChange("projects", idx, "teamSize", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Timeline</label><input type="text" value={proj.timeline || ""} onChange={e => handleArrayChange("projects", idx, "timeline", e.target.value)} placeholder="e.g. 8 weeks" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">The Problem Solved</label><textarea value={proj.problem || ""} onChange={e => handleArrayChange("projects", idx, "problem", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[60px]" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">The Process (Wireframes, sketches, etc.)</label><textarea value={proj.process || ""} onChange={e => handleArrayChange("projects", idx, "process", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[60px]" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Quantifiable Results</label><input type="text" value={proj.results || ""} onChange={e => handleArrayChange("projects", idx, "results", e.target.value)} placeholder="e.g. Increased conversion by 25%" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Live Demo Link</label><input type="url" value={proj.url || ""} onChange={e => handleArrayChange("projects", idx, "url", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Password / Prototype Access Note</label><input type="text" value={proj.prototypeAccess || ""} onChange={e => handleArrayChange("projects", idx, "prototypeAccess", e.target.value)} placeholder="e.g. Password: cedar2026" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("projects", emptyProject)} className="w-full py-4 border-2 border-dashed border-cedar-forest/30 text-cedar-forest font-bold rounded-2xl hover:bg-cedar-forest/5 flex justify-center items-center gap-2"><span className="material-symbols-outlined">add</span>Add Project</button>
                </div>
              )}
            </div>

            {/* 3. Work Experience */}
            <div id="experience" className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="experience" icon="history" title="Work Experience" subtitle="Your career history in reverse chronological order" badge={`${formData.experience.length} ${formData.experience.length === 1 ? "entry" : "entries"}`} />
              {openSection === "experience" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8 space-y-8">
                  {formData.experience.map((exp, idx) => (
                    <div key={idx} className="p-6 bg-cedar-alabaster rounded-2xl border border-black/5 relative shadow-sm">
                      <button type="button" onClick={() => removeArrayItem("experience", idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><span className="material-symbols-outlined">delete</span></button>
                      <h4 className="font-bold text-lg mb-4">Role {idx + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Company</label><input type="text" value={exp.company || ""} onChange={e => handleArrayChange("experience", idx, "company", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Job Title</label><input type="text" value={exp.role || ""} onChange={e => handleArrayChange("experience", idx, "role", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Location</label><input type="text" value={exp.location || ""} onChange={e => handleArrayChange("experience", idx, "location", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Start Date (MM/YYYY)</label><input type="text" value={exp.startDate || ""} onChange={e => handleArrayChange("experience", idx, "startDate", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">End Date (or Present)</label><input type="text" value={exp.endDate || ""} onChange={e => handleArrayChange("experience", idx, "endDate", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Achievements (quantified)</label><textarea value={exp.achievements || ""} onChange={e => handleArrayChange("experience", idx, "achievements", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[80px]" placeholder="Use numbers, e.g. Increased sales by 30%" /></div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("experience", emptyExperience)} className="w-full py-4 border-2 border-dashed border-cedar-forest/30 text-cedar-forest font-bold rounded-2xl hover:bg-cedar-forest/5 flex justify-center items-center gap-2"><span className="material-symbols-outlined">add</span>Add Role</button>
                </div>
              )}
            </div>

            {/* 4. Education */}
            <div id="education" className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="education" icon="school" title="Education" subtitle="Degrees, institutions, and relevant coursework" badge={`${formData.education.length} ${formData.education.length === 1 ? "entry" : "entries"}`} />
              {openSection === "education" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8 space-y-8">
                  {formData.education.map((edu, idx) => (
                    <div key={idx} className="p-6 bg-cedar-alabaster rounded-2xl border border-black/5 relative shadow-sm">
                      <button type="button" onClick={() => removeArrayItem("education", idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><span className="material-symbols-outlined">delete</span></button>
                      <h4 className="font-bold text-lg mb-4">Education {idx + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Degree</label><input type="text" value={edu.degree || ""} onChange={e => handleArrayChange("education", idx, "degree", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Institution</label><input type="text" value={edu.institution || ""} onChange={e => handleArrayChange("education", idx, "institution", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Graduation Date</label><input type="text" value={edu.gradDate || ""} onChange={e => handleArrayChange("education", idx, "gradDate", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Honors / Coursework</label><input type="text" value={edu.honors || ""} onChange={e => handleArrayChange("education", idx, "honors", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("education", emptyEducation)} className="w-full py-4 border-2 border-dashed border-cedar-forest/30 text-cedar-forest font-bold rounded-2xl hover:bg-cedar-forest/5 flex justify-center items-center gap-2"><span className="material-symbols-outlined">add</span>Add Education</button>
                </div>
              )}
            </div>

            {/* 5. Key Skills, Tools & Badges */}
            <div id="skills" className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="skills" icon="star" title="Skills & Tools" subtitle="Hard skills, software proficiencies, and industry keywords" badge={`${formData.skills.split(",").filter((s) => s.trim()).length} skills`} />
              {openSection === "skills" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 gap-y-5">
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Key Skills & Tools (Comma separated)</label><input type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="e.g. Figma, React, WordPress" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Tools Stack (Detailed)</label><input type="text" name="toolsUsed" value={formData.toolsUsed} onChange={handleInputChange} placeholder="e.g. React, Next.js, Tailwind, Firebase" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Certifications / Awards</label><input type="text" name="certifications" value={formData.certifications} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Downloadable CV / PDF Link</label><input type="url" name="cvDownloadUrl" value={formData.cvDownloadUrl} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. About Page */}
            <div id="about" className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="about" icon="info" title="About You" subtitle="Your story, working style, and philosophy" badge="Optional" />
              {openSection === "about" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Who you help and how</label><textarea name="whoYouHelp" value={formData.whoYouHelp} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight min-h-[80px]" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Relevant Experience (years, key clients, tools)</label><textarea name="relevantExperience" value={formData.relevantExperience} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight min-h-[80px]" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Working Style or Philosophy</label><textarea name="workingStyle" value={formData.workingStyle} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight min-h-[80px]" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Key Clients</label><input type="text" name="keyClients" value={formData.keyClients} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Professional Photo URL (optional)</label><input type="url" name="professionalPhotoUrl" value={formData.professionalPhotoUrl} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* 7. Testimonials */}
            <div id="testimonials" className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="testimonials" icon="format_quote" title="Testimonials & Social Proof" subtitle="Quotes from clients, managers, and professional endorsements" badge={`${formData.testimonials.length} ${formData.testimonials.length === 1 ? "quote" : "quotes"}`} />
              {openSection === "testimonials" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8 space-y-8">
                  <div className="p-6 bg-cedar-alabaster rounded-2xl border border-black/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">LinkedIn Recommendations / Case Study Approval Links</label><textarea name="socialProofLinks" value={formData.socialProofLinks} onChange={handleInputChange} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[80px]" placeholder="Add one link per line" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Company Logos (URLs, comma separated)</label><input type="text" name="companyLogos" value={formData.companyLogos} onChange={handleInputChange} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                  </div>
                  {formData.testimonials.map((test, idx) => (
                    <div key={idx} className="p-6 bg-cedar-alabaster rounded-2xl border border-black/5 relative shadow-sm">
                      <button type="button" onClick={() => removeArrayItem("testimonials", idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><span className="material-symbols-outlined">delete</span></button>
                      <h4 className="font-bold text-lg mb-4">Testimonial {idx + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Quote</label><textarea value={test.quote || ""} onChange={e => handleArrayChange("testimonials", idx, "quote", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[60px]" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Name</label><input type="text" value={test.name || ""} onChange={e => handleArrayChange("testimonials", idx, "name", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Title</label><input type="text" value={test.title || ""} onChange={e => handleArrayChange("testimonials", idx, "title", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Company</label><input type="text" value={test.company || ""} onChange={e => handleArrayChange("testimonials", idx, "company", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("testimonials", emptyTestimonial)} className="w-full py-4 border-2 border-dashed border-cedar-forest/30 text-cedar-forest font-bold rounded-2xl hover:bg-cedar-forest/5 flex justify-center items-center gap-2"><span className="material-symbols-outlined">add</span>Add Testimonial</button>
                </div>
              )}
            </div>

            {/* 8. Availability */}
            <div id="contact" className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="contact" icon="event_available" title="Contact & Availability" subtitle="How visitors can reach you and your current status" badge="Optional" />
              {openSection === "contact" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 gap-y-5">
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Contact Form: Name</label><input type="text" name="contactFormName" value={formData.contactFormName} onChange={handleInputChange} placeholder="Your full name" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Contact Form: Email</label><input type="email" name="contactFormEmail" value={formData.contactFormEmail} onChange={handleInputChange} placeholder="name@domain.com" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Contact Form: Message</label><textarea name="contactFormMessage" value={formData.contactFormMessage} onChange={handleInputChange} placeholder="How can I help you?" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight min-h-[100px]" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Availability Status</label><input type="text" name="availability" value={formData.availability} onChange={handleInputChange} placeholder="e.g. Open to roles, Available for freelance" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Call to Action (CTA)</label><input type="text" name="contactCta" value={formData.contactCta} onChange={handleInputChange} placeholder="e.g. Let's work together!" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-cedar-forest text-xl">auto_awesome</span>
                <p className="text-sm text-cedar-slate"><span className="font-bold text-cedar-midnight">Ready to build?</span> Your data is encrypted and used only for portfolio generation.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
                <button type="button" className="px-6 py-3.5 rounded-xl border border-cedar-forest/20 text-cedar-forest font-bold text-sm hover:bg-cedar-forest hover:text-white transition-all w-full sm:w-auto">Save Draft</button>
                <button type="submit" className="px-8 py-3.5 rounded-xl bg-cedar-forest text-white font-bold text-sm hover:bg-cedar-forest-dark transition-all shadow-md flex items-center justify-center gap-2 group w-full sm:w-auto"><span className="material-symbols-outlined text-lg">rocket_launch</span>Generate Portfolio</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {scanState.isScanning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1B3022]/65 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/5"><div className="h-full bg-gradient-to-r from-cedar-forest to-cedar-bronze transition-all duration-700 ease-out" style={{ width: `${scanState.progress}%` }}></div></div>
            <div className="w-20 h-20 rounded-full bg-cedar-forest/10 flex items-center justify-center mx-auto"><span className="material-symbols-outlined text-4xl text-cedar-forest animate-spin">auto_awesome</span></div>
            <div>
              <h3 className="font-headline text-2xl font-bold text-cedar-midnight mb-2">AI Scan in Progress</h3>
              <p className="text-sm text-cedar-slate">{scanState.statusText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
