"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CVUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
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

  const startScan = async () => {
    if (!file) return;

    setIsScanning(true);

    try {
      // Simulate a brief processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      sessionStorage.setItem(
        'cedar:portfolio-draft',
        JSON.stringify({
          sourceFile: file.name,
          generatedAt: new Date().toISOString(),
          portfolio: {
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
                institution: 'University of Nairobi',
                degree: 'BA in Visual Communication',
                year: '2018',
              },
            ],
            projects: [],
          },
        })
      );

      router.push('/dashboard/templates');
    } catch (error) {
      setScanError(error instanceof Error ? error.message : 'Failed to scan CV.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-stretch gap-12 lg:gap-20 p-8 md:p-12 lg:p-16">
      {/* Left Column: Context & Vision */}
      <div className="flex-1 space-y-10 py-4 max-w-xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-cedar-bronze/20 text-cedar-bronze font-bold text-[10px] uppercase tracking-[0.2em] shadow-sm">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
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
              <span className="material-symbols-outlined text-[24px]">description</span>
            </div>
            <div>
              <h4 className="font-headline text-xl font-bold text-cedar-midnight mb-2">Smart Parsing</h4>
              <p className="text-cedar-slate text-sm leading-relaxed opacity-80">We extract roles, skills, and achievements with surgical precision from your document.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start group">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center shrink-0 text-cedar-forest shadow-sm group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[24px]">palette</span>
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
                <span className="material-symbols-outlined text-[40px]">cloud_upload</span>
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
              {scanError && (
                <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {scanError}
                </div>
              )}

              {file && (
                <div className="bg-cedar-alabaster/50 rounded-2xl p-6 border border-black/5 animate-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-cedar-forest shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
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
                        <span className="material-symbols-outlined text-[18px]">check</span>
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
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    START AI SCAN
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="material-symbols-outlined text-[18px] text-cedar-bronze">shield</span>
              <p className="text-[11px] text-cedar-slate/70 font-semibold tracking-wide uppercase px-4 text-center">
                Encrypted & Secure. View <Link href="/privacy" className="underline hover:text-cedar-forest transition-colors">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Trusted By Section */}
      <div className="px-8 md:px-12 lg:px-16 pb-12 pt-8 border-t border-black/5">
        <h5 className="text-center font-semibold text-[10px] tracking-[0.3em] text-cedar-slate uppercase mb-8">Trusted by world-class creators from</h5>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <Image alt="Adobe" className="h-6 object-contain" width={80} height={24} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgd3UdcT9wJQx2EbsVSlCMcaz-LmLzYsOfOk_1-_W35Z1hAtNBkv4mcGuK517WcM1mcdpOMFNgG2DRnsHRkArGExiEkIM8xO89rVftnWXRdqlRXbxpN5xnuEoA0TbPsHdP_vmqFk0JuDGs6CahsfqLou3MdQyqA96b-3srsvjyFz9mZ_kD-kdfSrq3C9WyOYYuXJ7nOWEW2s4fquZivjpHjCp5tyHfDwR4MS-xC1iNKJlWFONMvHItQq3-UuWEX_nOFzJaRo2PipIf"/>
          <Image alt="Figma" className="h-6 object-contain" width={80} height={24} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPG5bgHnhNkNemKaaerygve3OtkJn0J-oL9wcT4iWm6cf9N8vEDRnS5kEr1Ue3zlk6TO4ZeKKMUGzFOI5a0I37zdpMuAbUnXlaXHZZ_tZhRXeteAdi08n-Owo1tuKb8DAgWdHT1ViqN92cuZR2rRExPEfXknr5osk-Rs9g9Ff5cTDwJhQ9EkLfqzH0adCiiCpYThnFHn-1gJ9aWg_FAZYsZBhFEEZNnVT16ALojmvoRy_v8ef-yCR6NoGwXCm4N6PrxREBHVeaXNdh"/>
          <Image alt="Netflix" className="h-5 object-contain" width={80} height={20} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmeLztM3AtYiisXzm--wz-ne_H77zjEOF_hyMzVSS0ChnLg5104dJVO6nkPwhDZerv99om9P_cR_wVvC9VRKdZeQS9qgWhcQRwHltfdLPuTUnKNfzWZyGQ3H-JLukeQQQ_7RP7DCqyGn3EuUZCnsxPlBg6M1U_S-1K04L0AujbEVWR7mEM37B_x8JNJ1gwUUIiGSdOhK4oSfC8i3Z45O-MDFp5c2Y_Pm5jbZPJNLLAy9NDal210LVz8p7hL2xWbxwBpTH_GFYEP99e"/>
          <Image alt="Notion" className="h-6 object-contain" width={80} height={24} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwBSzO0JHbsID0YgiJ_CuHZPU4I-o1JSUtEPwemEIgUhG60kezfZX64Ac6vos0orartFjhANVHP41rIiVlE4vWE7Iv3PUvJ1-7Fc3r7rVQT1t3xu94vemUbk7pKSi7S4CLliVGQ-dqzmuKI04FwLPDx6sV--AGcA_msCG7Iz27rxog5AYrgC7jLW4QwARESKRPAX3fTxMi0wWyFYM_8VvNAtoTR-xBqSHSegNkBN3AJpGQT5KORLeaL_XOCP3kin5VjFPwBpLU0zlF"/>
        </div>
      </div>

      {/* Fixed Floating Status Indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center gap-3 border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="w-2.5 h-2.5 rounded-full bg-cedar-forest animate-pulse shadow-[0_0_8px_rgba(27,48,34,0.5)]"></div>
          <p className="text-xs font-bold text-cedar-midnight tracking-wide uppercase">Engine Ready</p>
        </div>
      </div>
    </div>
  );
}
