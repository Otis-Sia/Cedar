"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useAiScanner } from "@/hooks/useAiScanner";

interface PortfolioState {
  fullName: string;
  professionalTitle: string;
  valueProp: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  behance: string;
  website: string;
  profileSummary: string;
  yearsExperience: string;
  experience: Array<{ company: string; role: string; location: string; startDate: string; endDate: string; achievements: string }>;
  education: Array<{ degree: string; institution: string; gradDate: string; honors: string }>;
  skills: string;
  certifications: string;
  projects: Array<{ title: string; role: string; problem: string; process: string; results: string; url: string }>;
  whoYouHelp: string;
  workingStyle: string;
  keyClients: string;
  toolsUsed: string;
  testimonials: Array<{ quote: string; name: string; title: string; company: string }>;
  availability: string;
  contactCta: string;
}

const emptyExperience = { company: "", role: "", location: "", startDate: "", endDate: "", achievements: "" };
const emptyEducation = { degree: "", institution: "", gradDate: "", honors: "" };
const emptyProject = { title: "", role: "", problem: "", process: "", results: "", url: "" };
const emptyTestimonial = { quote: "", name: "", title: "", company: "" };

export default function PortfolioBuilderPage() {
  const [formData, setFormData] = useState<PortfolioState>({
    fullName: "",
    professionalTitle: "",
    valueProp: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    behance: "",
    website: "",
    profileSummary: "",
    yearsExperience: "",
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
      profileSummary: data.bio || prev.profileSummary,
      email: data.contactInfo?.email || prev.email,
      phone: data.contactInfo?.phone || prev.phone,
      location: (data.contactInfo?.city && data.contactInfo?.country) ? `${data.contactInfo.city}, ${data.contactInfo.country}` : prev.location,
      linkedin: data.contactInfo?.linkedin || prev.linkedin,
      github: data.contactInfo?.github || prev.github,
      behance: data.contactInfo?.behance || prev.behance,
      website: data.contactInfo?.website || prev.website,
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
      availability: data.contact?.availability || prev.availability,
      contactCta: data.contact?.cta || prev.contactCta,
    }));
    setOpenSection("identity");
  };

  const SectionHeader = ({ id, icon, title, subtitle }: { id: string, icon: string, title: string, subtitle: string }) => (
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
      </header>

      <div className="px-4 sm:px-6 md:px-12 pb-20 flex-grow">
        <div className="max-w-[960px] mx-auto">
          {/* CV Upload Section */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            <div className="lg:col-span-5 space-y-8 pt-4 lg:pt-8">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/10 text-cedar-bronze font-semibold text-xs tracking-[0.2em] uppercase shadow-sm">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  AI Personalization
                </span>
                <h1 className="font-headline text-4xl font-bold text-cedar-midnight tracking-tight leading-[1.1]">
                  Let AI Curate Your <span className="text-cedar-bronze italic">Masterpiece.</span>
                </h1>
                <p className="text-cedar-slate text-base lg:text-lg leading-relaxed max-w-sm">
                  Upload your CV, and our engine will distill your career into a high-end editorial portfolio in seconds.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 w-full">
              <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cedar-bronze/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline text-2xl font-bold text-cedar-midnight">Import CV/Resume</h3>
                  </div>

                  {!selectedFile ? (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative border-2 border-dashed border-black/10 rounded-3xl p-12 transition-all duration-300 hover:border-cedar-bronze/50 hover:bg-cedar-alabaster/30 cursor-pointer flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-cedar-alabaster flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform border border-black/5 shadow-sm text-cedar-bronze">
                        <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                      </div>
                      <h4 className="font-headline text-xl font-bold text-cedar-midnight mb-2">Drag and drop your file here</h4>
                      <p className="text-cedar-slate text-sm mb-6">Or click to browse from your computer</p>
                      <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileSelect} className="hidden" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 w-full border-2 border-transparent bg-cedar-alabaster rounded-3xl p-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-cedar-midnight truncate">{selectedFile.name}</p>
                      </div>
                      <button onClick={() => setSelectedFile(null)} className="w-9 h-9 rounded-xl bg-white border border-black/10 flex items-center justify-center text-cedar-slate hover:text-red-500 transition-all shrink-0">
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => selectedFile && startAiScan(selectedFile, onScanComplete)}
                      disabled={scanState.isScanning || !selectedFile}
                      className="w-full bg-cedar-forest text-white font-semibold text-[15px] py-4 rounded-full flex items-center justify-center gap-2 hover:bg-cedar-forest-dark disabled:opacity-50 transition-all shadow-md group"
                    >
                      {scanState.isScanning ? (
                        <span className="material-symbols-outlined animate-spin">refresh</span>
                      ) : (
                        <span className="material-symbols-outlined text-lg">bolt</span>
                      )}
                      {scanState.isScanning ? "SCANNING..." : "START AI SCAN & FILL FORM"}
                    </button>
                    {scanState.error && <p className="text-red-500 text-xs text-center">{scanState.error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-6" noValidate>
            
            {/* 1. Identity & Contact */}
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="identity" icon="person" title="1. Identity &amp; Value" subtitle="Your professional identity, contact info, and summary." />
              {openSection === "identity" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Full Name</label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight placeholder:text-cedar-slate/50" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Professional Title / Headline</label><input type="text" name="professionalTitle" value={formData.professionalTitle} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">One-Sentence Value Prop</label><input type="text" name="valueProp" value={formData.valueProp} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Professional Summary</label><textarea name="profileSummary" value={formData.profileSummary} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight min-h-[100px]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Email</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Phone</label><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Location (City, Country)</label><input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">LinkedIn Profile</label><input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">GitHub Profile</label><input type="url" name="github" value={formData.github} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-cedar-slate mb-2">Behance / Other Portfolio</label><input type="url" name="behance" value={formData.behance} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Curated Work Samples */}
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="projects" icon="work" title="2. Curated Work Samples" subtitle="Your 3-6 best projects. Showcase problem solving and results." />
              {openSection === "projects" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8 space-y-8">
                  {formData.projects.map((proj, idx) => (
                    <div key={idx} className="p-6 bg-cedar-alabaster rounded-2xl border border-black/5 relative shadow-sm">
                      <button type="button" onClick={() => removeArrayItem("projects", idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><span className="material-symbols-outlined">delete</span></button>
                      <h4 className="font-bold text-lg mb-4">Project {idx + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Title</label><input type="text" value={proj.title || ""} onChange={e => handleArrayChange("projects", idx, "title", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Role & Context</label><input type="text" value={proj.role || ""} onChange={e => handleArrayChange("projects", idx, "role", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">The Problem Solved</label><textarea value={proj.problem || ""} onChange={e => handleArrayChange("projects", idx, "problem", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[60px]" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">The Process (Wireframes, sketches, etc.)</label><textarea value={proj.process || ""} onChange={e => handleArrayChange("projects", idx, "process", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[60px]" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Quantifiable Results</label><input type="text" value={proj.results || ""} onChange={e => handleArrayChange("projects", idx, "results", e.target.value)} placeholder="e.g. Increased conversion by 25%" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Live Demo Link</label><input type="url" value={proj.url || ""} onChange={e => handleArrayChange("projects", idx, "url", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("projects", emptyProject)} className="w-full py-4 border-2 border-dashed border-cedar-forest/30 text-cedar-forest font-bold rounded-2xl hover:bg-cedar-forest/5 flex justify-center items-center gap-2"><span className="material-symbols-outlined">add</span>Add Project</button>
                </div>
              )}
            </div>

            {/* 3. Work Experience */}
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="experience" icon="history" title="3. Work Experience" subtitle="Reverse chronological list of roles and achievements." />
              {openSection === "experience" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8 space-y-8">
                  {formData.experience.map((exp, idx) => (
                    <div key={idx} className="p-6 bg-cedar-alabaster rounded-2xl border border-black/5 relative shadow-sm">
                      <button type="button" onClick={() => removeArrayItem("experience", idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><span className="material-symbols-outlined">delete</span></button>
                      <h4 className="font-bold text-lg mb-4">Role {idx + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Company</label><input type="text" value={exp.company || ""} onChange={e => handleArrayChange("experience", idx, "company", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Job Title</label><input type="text" value={exp.role || ""} onChange={e => handleArrayChange("experience", idx, "role", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Start Date (MM/YYYY)</label><input type="text" value={exp.startDate || ""} onChange={e => handleArrayChange("experience", idx, "startDate", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">End Date (or Present)</label><input type="text" value={exp.endDate || ""} onChange={e => handleArrayChange("experience", idx, "endDate", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm" /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Achievements & Duties</label><textarea value={exp.achievements || ""} onChange={e => handleArrayChange("experience", idx, "achievements", e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[80px]" placeholder="Use numbers, e.g. Increased sales by 30%" /></div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("experience", emptyExperience)} className="w-full py-4 border-2 border-dashed border-cedar-forest/30 text-cedar-forest font-bold rounded-2xl hover:bg-cedar-forest/5 flex justify-center items-center gap-2"><span className="material-symbols-outlined">add</span>Add Role</button>
                </div>
              )}
            </div>

            {/* 4. Education */}
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="education" icon="school" title="4. Education" subtitle="Degrees, institutions, and dates." />
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
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="skills" icon="star" title="5. Technical & Trust Badges" subtitle="Skills, tools, and certifications." />
              {openSection === "skills" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 gap-y-5">
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Key Skills & Tools (Comma separated)</label><input type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="e.g. Figma, React, WordPress" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Certifications / Awards</label><input type="text" name="certifications" value={formData.certifications} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. About Page */}
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="about" icon="info" title="6. About Page" subtitle="Who you help, philosophy, and professional photo." />
              {openSection === "about" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Who you help and how</label><textarea name="whoYouHelp" value={formData.whoYouHelp} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight min-h-[80px]" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Working Style or Philosophy</label><textarea name="workingStyle" value={formData.workingStyle} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight min-h-[80px]" /></div>
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Key Clients</label><input type="text" name="keyClients" value={formData.keyClients} onChange={handleInputChange} className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* 7. Testimonials */}
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="testimonials" icon="format_quote" title="7. Testimonials / Social Proof" subtitle="Quotes from past clients or managers." />
              {openSection === "testimonials" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8 space-y-8">
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
            <div className="form-section bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <SectionHeader id="availability" icon="event_available" title="8. Clear Contact & Availability" subtitle="Call-to-action and current availability." />
              {openSection === "availability" && (
                <div className="section-body px-8 pb-8 animate-in slide-in-from-top-2 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 gap-y-5">
                    <div><label className="block text-xs font-bold uppercase text-cedar-slate mb-2">Current Availability</label><input type="text" name="availability" value={formData.availability} onChange={handleInputChange} placeholder="e.g. Open to roles, Available for freelance" className="w-full bg-cedar-alabaster border border-black/10 rounded-xl px-4 py-3 text-sm text-cedar-midnight" /></div>
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
