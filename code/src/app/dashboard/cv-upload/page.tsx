"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CloudUpload, 
  FileText, 
  Check, 
  Sparkles, 
  Palette, 
  ArrowRight,
  Zap,
  ShieldCheck,
  FileIcon as FilePdf
} from 'lucide-react';

export default function CVUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startScan = () => {
    if (!file) return;
    setIsScanning(true);
    // Simulate AI scanning process
    setTimeout(() => {
      router.push('/dashboard/templates');
    }, 2500);
  };

  return (
    <div className="min-h-full flex flex-col md:flex-row items-stretch gap-12 lg:gap-20 p-8 md:p-12 lg:p-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Left Column: Context & Vision */}
      <div className="flex-1 space-y-10 py-4 max-w-xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-cedar-bronze/20 text-cedar-bronze font-bold text-[10px] uppercase tracking-[0.2em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            AI Personalization
          </div>
          <h1 className="font-headline text-5xl lg:text-6xl font-bold text-cedar-midnight tracking-tight leading-[1.05]">
            Let AI Curate Your <span className="text-cedar-bronze italic">Masterpiece.</span>
          </h1>
          <p className="text-cedar-slate text-lg lg:text-xl leading-relaxed opacity-90">
            Upload your CV, and our engine will distill your career into a high-end editorial portfolio in seconds.
          </p>
        </div>

        <div className="space-y-10 pt-4">
          <div className="flex gap-6 items-start group">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center shrink-0 text-cedar-bronze shadow-sm group-hover:scale-110 transition-transform duration-500">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-headline text-xl font-bold text-cedar-midnight mb-2">Smart Parsing</h4>
              <p className="text-cedar-slate text-sm leading-relaxed opacity-80">We extract roles, skills, and achievements with surgical precision from your document.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start group">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center shrink-0 text-cedar-forest shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-headline text-xl font-bold text-cedar-midnight mb-2">Visual Synthesis</h4>
              <p className="text-cedar-slate text-sm leading-relaxed opacity-80">Your professional history is seamlessly mapped to our exclusive editorial layouts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Upload Interface */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(27,48,34,0.06)] border border-black/5 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cedar-bronze/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex justify-between items-center">
              <h3 className="font-headline text-3xl font-bold text-cedar-midnight">Import CV/Resume</h3>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cedar-bronze"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-black/5"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-black/5"></div>
              </div>
            </div>

            {/* Drop Zone */}
            <div 
              className={`relative group border-2 border-dashed rounded-[32px] p-12 lg:p-16 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center
                ${dragActive 
                  ? 'border-cedar-bronze bg-cedar-bronze/5 scale-[0.99]' 
                  : 'border-black/10 hover:border-cedar-bronze/40 hover:bg-cedar-alabaster/50'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className={`w-20 h-20 rounded-full bg-cedar-alabaster flex items-center justify-center mb-8 transition-all duration-500 shadow-sm text-cedar-bronze
                ${dragActive ? 'scale-110 shadow-md' : 'group-hover:-translate-y-2 group-hover:shadow-md'}`}>
                <CloudUpload className="w-10 h-10" />
              </div>
              <h4 className="font-headline text-2xl font-bold text-cedar-midnight mb-3">Drag and drop your file</h4>
              <p className="text-cedar-slate text-base mb-8">Or click to browse from your computer</p>
              
              <div className="flex gap-4">
                <span className="px-5 py-2 rounded-xl bg-white text-cedar-slate text-[10px] font-bold tracking-[0.2em] uppercase border border-black/5 shadow-sm">PDF</span>
                <span className="px-5 py-2 rounded-xl bg-white text-cedar-slate text-[10px] font-bold tracking-[0.2em] uppercase border border-black/5 shadow-sm">DOCX</span>
              </div>
              
              <input 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                type="file" 
                accept=".pdf,.docx"
                onChange={handleChange}
              />
            </div>

            {/* File Status & Actions */}
            <div className="space-y-6">
              {file && (
                <div className="bg-cedar-alabaster/50 rounded-2xl p-6 border border-black/5 animate-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-cedar-forest shadow-sm">
                        <FilePdf className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-cedar-midnight truncate max-w-[200px]">{file.name}</p>
                        <p className="text-[10px] text-cedar-slate uppercase font-bold tracking-widest mt-1">{(file.size / (1024 * 1024)).toFixed(1)} MB • {isScanning ? 'Scanning...' : 'Ready'}</p>
                      </div>
                    </div>
                    {isScanning ? (
                      <div className="w-6 h-6 border-2 border-cedar-bronze border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-cedar-forest flex items-center justify-center text-white">
                        <Check className="w-4 h-4 font-bold" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button 
                onClick={startScan}
                disabled={!file || isScanning}
                className="w-full bg-cedar-forest text-white font-bold text-[16px] py-5 rounded-full flex items-center justify-center gap-3 hover:bg-cedar-forest-dark disabled:opacity-50 disabled:hover:bg-cedar-forest transition-all shadow-xl group active:scale-[0.98]"
              >
                {isScanning ? (
                  <>Synthesizing Portfolio...</>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current" />
                    START AI SCAN
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 pt-2">
              <ShieldCheck className="w-4 h-4 text-cedar-bronze" />
              <p className="text-[11px] text-cedar-slate/70 font-semibold tracking-wide uppercase px-4 text-center">
                Encrypted & Secure. View <Link href="/privacy" className="underline hover:text-cedar-forest transition-colors">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
