'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-cedar-alabaster text-cedar-midnight font-body leading-relaxed antialiased selection:bg-cedar-bronze/30 overflow-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-nav flex justify-between items-center px-6 md:px-10 py-4 h-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic">
            C
          </div>
          <div className="font-headline text-2xl font-bold tracking-tight text-cedar-forest">Cedar</div>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="#services">Services</a>
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="#process">Process</a>
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="#showcase">Showcase</a>
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="#pricing">Pricing</a>
          <a className="text-sm tracking-widest font-semibold uppercase text-cedar-slate hover:text-cedar-forest transition-colors" href="#faq">FAQ</a>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/login" className="hidden sm:block text-sm font-semibold text-cedar-slate hover:text-cedar-forest transition-colors uppercase tracking-widest">
            Log In
          </Link>
          <Link href="/signup" className="bg-cedar-forest text-cedar-alabaster px-7 py-3 rounded-full font-semibold text-sm shadow-md hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all">
            Build Portfolio
          </Link>
        </div>
      </nav>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[95vh] flex items-center px-6 md:px-16 lg:px-24 py-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1770110000509-6c8298224699?auto=format&fit=crop&w=2400&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#121415]/50 via-[#121415]/70 to-[#1B3022]/85 z-0"></div>
          
          <div className="relative z-10 max-w-3xl pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-8">
              <span className="material-symbols-outlined text-cedar-bronze text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">The New Standard for Creators</span>
            </div>
            
            <h1 className="font-headline text-5xl md:text-[80px] font-bold tracking-tight mb-8 leading-[1.05] text-white">
              Your Story,<br/>
              <span className="text-cedar-bronze italic">Curated</span> by Intelligence.
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed">
              Stop fighting with grids. Cedar analyzes your experience and crafts a high-end, editorial portfolio that commands attention.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/signup" className="inline-flex justify-center items-center bg-cedar-forest text-white px-10 py-5 rounded-full font-semibold text-[15px] shadow-[0_8px_30px_rgba(27,48,34,0.5)] hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Build Your Auto-Portfolio
              </Link>
              <a href="#showcase" className="inline-flex justify-center items-center bg-white/10 border text-white border-white/20 px-10 py-5 rounded-full font-semibold text-[15px] backdrop-blur-sm hover:bg-white/20 transition-all w-full sm:w-auto">
                View Showcase
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-[100px] px-6 max-w-[1280px] mx-auto border-t border-black/5">
          <div className="text-center max-w-[700px] mx-auto mb-20">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">Our Services</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-cedar-forest mt-4 mb-4">Everything you need to look professional online</h2>
            <p className="text-cedar-slate text-lg">We don&apos;t just build websites. We curate your professional presence with a focus on authority, speed, and elegance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-12 rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="w-16 h-16 bg-cedar-alabaster rounded-2xl mb-8 flex items-center justify-center text-2xl">✒️</div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-cedar-midnight">Bespoke Design</h3>
              <p className="text-cedar-slate text-sm leading-relaxed">A clean, modern site designed around your personal brand, niche, and professional goals.</p>
            </div>
            <div className="bg-white p-12 rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="w-16 h-16 bg-cedar-alabaster rounded-2xl mb-8 flex items-center justify-center text-2xl">☁️</div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-cedar-midnight">Concierge Hosting</h3>
              <p className="text-cedar-slate text-sm leading-relaxed">We host your site so it stays online, fast, secure, and ready to share at a moment&apos;s notice.</p>
            </div>
            <div className="bg-white p-12 rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="w-16 h-16 bg-cedar-alabaster rounded-2xl mb-8 flex items-center justify-center text-2xl">📱</div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-cedar-midnight">Fluid Layouts</h3>
              <p className="text-cedar-slate text-sm leading-relaxed">Your portfolio looks impeccable on phones, tablets, and high-resolution desktops alike.</p>
            </div>
            <div className="bg-white p-12 rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="w-16 h-16 bg-cedar-alabaster rounded-2xl mb-8 flex items-center justify-center text-2xl">🔄</div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-cedar-midnight">Seamless Updates</h3>
              <p className="text-cedar-slate text-sm leading-relaxed">Send us your new projects, and we&apos;ll update your site within hours. No tech stress required.</p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-[120px] px-6 md:px-12 bg-white border-y border-black/5 relative z-10">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-20">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-cedar-midnight">The Evolution of Effort</h2>
              <div className="w-24 h-1 bg-cedar-bronze"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:h-[600px]">
              <div className="md:col-span-5 bg-cedar-alabaster rounded-3xl p-10 lg:p-12 border border-black/5 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="font-headline font-bold text-6xl text-cedar-forest/20 group-hover:text-cedar-bronze transition-colors">01</span>
                  <h3 className="font-headline text-3xl font-bold mt-6 mb-4 text-cedar-midnight">Upload CV</h3>
                  <p className="text-cedar-slate text-base leading-relaxed">Simply drop your LinkedIn PDF or CV. Our engine extracts the essence of your professional journey instantly.</p>
                </div>
                <div className="mt-8 flex justify-end relative z-10">
                  <span className="material-symbols-outlined text-[80px] text-cedar-forest/40 group-hover:text-cedar-forest transition-colors">upload_file</span>
                </div>
              </div>
              
              <div className="md:col-span-7 bg-cedar-forest rounded-3xl p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="relative z-10">
                  <span className="font-headline font-bold text-6xl text-white/20 group-hover:text-cedar-bronze transition-colors">02</span>
                  <h3 className="font-headline text-3xl font-bold mt-6 mb-4 text-white">AI Scan & Strategy</h3>
                  <p className="text-white/80 text-base max-w-md leading-relaxed">Our AI doesn&apos;t just read text; it understands your industry context, identifying your unique selling points to structure your narrative.</p>
                </div>
                <div className="absolute bottom-[-10%] right-[-5%] opacity-10">
                  <span className="material-symbols-outlined text-[300px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
                </div>
              </div>
              
              <div className="md:col-span-7 bg-white rounded-3xl p-10 lg:p-12 border border-black/5 shadow-sm flex flex-col md:flex-row gap-8 items-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="flex-1">
                  <span className="font-headline font-bold text-6xl text-cedar-forest/20 group-hover:text-cedar-bronze transition-colors">03</span>
                  <h3 className="font-headline text-3xl font-bold mt-6 mb-4 text-cedar-midnight">Choose Template</h3>
                  <p className="text-cedar-slate text-base leading-relaxed">Select from a curated collection of editorial-grade layouts designed by the world&apos;s leading UI directors.</p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  <div className="w-full aspect-[4/5] bg-cedar-alabaster rounded-2xl overflow-hidden border border-black/5 shadow-sm relative">
                    <Image fill className="object-cover" alt="minimal UI setup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_XdtiQZf_9fYuO86YLL-lMNedL5xdgvBVY007zU9yQPGeDdvw0599YrqIvSA7sRlDLuh1iGmFgudBvgkVeSdHZ__b2-WIhPdHp8aZsujA4FXtVOwee_AL4gZP72YE_ooEdKwPK2OKNXNhNuf_ShVL472WqH0lT_VlR8af8ZGsUP9E8OlHkW1-bc_6EJTdzCsiKGSXU3RgHzoy1e2q9pxPpa2LGeYZjmgFz2JUn2cg32Nf53a9OcEkwMWpWtQ0uUsqSjXEL1p6KcmT"/>
                  </div>
                  <div className="w-full aspect-[4/5] bg-cedar-alabaster rounded-2xl overflow-hidden border border-black/5 shadow-sm mt-6 relative">
                    <Image fill className="object-cover" alt="dashboard ui mockup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxNpdni3tVFgLkCBsQkLiBxdSZPOFSuVxKDJR7IDaS-ZPVgVf5FgRm-Vef1BXXphD9mbNZHxIs_rQX-Ffk5KY5YeweLSis4g1mfJfakfmbE75L5N_js7LR1j4XdWIAJVBP0B-tIU0088VJ8RE-NNsjgaNfPYOWaQdRkrY4phi-Q19vhQIh_kqm7QP-a3iPmI64188nGZmQ18fsqdhBHdYYG_i3XjLtDJvMXlb4aDJS7FixhD7SSOZfGZ7Us5TQq9lksL2hmiqsgbb9"/>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-5 bg-[#C5AC81] rounded-3xl p-10 lg:p-12 flex flex-col justify-center items-center text-center group relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-cedar-bronze-light to-cedar-bronze/70 mix-blend-multiply opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-headline font-bold text-6xl text-white/40 mb-6">04</span>
                  <h3 className="font-headline text-4xl font-bold mb-6 text-white">Publish</h3>
                  <p className="text-white/90 text-lg mb-10 max-w-[280px]">Deploy to your custom domain in one click. Zero code, infinite impact.</p>
                  <Link href="/signup" className="inline-block bg-white text-cedar-forest px-10 py-4 rounded-full font-bold shadow-lg hover:bg-cedar-alabaster transition-colors">Start Creating</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section id="showcase" className="py-[120px] px-6 lg:px-12 bg-cedar-alabaster overflow-hidden">
          <div className="max-w-[1280px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-end">
            <div>
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-cedar-midnight">The Showcase</h2>
              <p className="text-cedar-slate text-lg">Crafted for every creative discipline.</p>
            </div>
            <Link className="text-cedar-forest font-semibold text-sm uppercase tracking-widest border-b border-cedar-forest pb-1 mt-6 md:mt-0 hover:text-cedar-forest-dark transition-colors" href="/dashboard/templates">Browse All Templates</Link>
          </div>
          
          <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-6 lg:px-0 max-w-[1280px] mx-auto no-scrollbar snap-x">
            <div className="min-w-[85vw] sm:min-w-[450px] group snap-center shrink-0">
              <div className="aspect-[16/10] bg-white rounded-3xl overflow-hidden mb-6 relative border border-black/5 shadow-sm">
                <Image fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="high-end fashion portfolio layout" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB05_snhJLPD4RWwvY5WrXK_v1EKrY3_UfsyrH5kALM4YUSGmHJ43qUt0O1a4tA9jmC-4NSK35XTS_teLpMSYAeqq3RcTPEp_S-l9JlUNEuMgiuErds9CHeGaDgOOf_G-VaBSMgtQ3l8iHT5dZOqTNz5NLjE3bjdnoNYCpKxtovwcZ_HosPk8UOttwI8P_zplNedFpCReBNMHhO5GYAJEADlQbrhiK3Ze5k4pj68E-KOrdDMxIhiV9j3_0rOTGuHF266cXVrnqygleZ"/>
                <div className="absolute inset-0 bg-cedar-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button className="bg-white text-cedar-forest px-8 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Preview Layout</button>
                </div>
              </div>
              <h4 className="font-headline text-2xl font-bold text-cedar-midnight">Vanguard Editorial</h4>
              <p className="text-cedar-slate text-sm mt-2 uppercase tracking-widest font-medium text-[10px]">Best for Fashion & Lifestyle</p>
            </div>
            
            <div className="min-w-[85vw] sm:min-w-[450px] group snap-center shrink-0 md:mt-24">
              <div className="aspect-[16/10] bg-white rounded-3xl overflow-hidden mb-6 relative border border-black/5 shadow-sm">
                <Image fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="clean tech design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYHdS04CrbPyBYQIV5VKk-nF6obqlYT2cY9G-bGQY3eQafWRyOcS_hNVyy022DYWGfFSSXi4ELwyKdzU4tczw5oi3NPHTBEMUUeyjVw6IXsEUKHFRiNOi6-ImeYXAiOQysl3q_15qkoHSLPD7wMtllYHaw0FAHDqu63oYJIfKFRiCQ77l8lZLUWFcE2AVAhHaiHQ8qeQQ7J3hhi4SApI_6IOLEVFo5biL9hun4yeWJR2exZV6JvFAjC8RdYUv7GCe4ikgIIffF4ErM"/>
                <div className="absolute inset-0 bg-cedar-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button className="bg-white text-cedar-forest px-8 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Preview Layout</button>
                </div>
              </div>
              <h4 className="font-headline text-2xl font-bold text-cedar-midnight">System Neutral</h4>
              <p className="text-cedar-slate text-sm mt-2 uppercase tracking-widest font-medium text-[10px]">Best for Product Design & UX</p>
            </div>
            
            <div className="min-w-[85vw] sm:min-w-[450px] group snap-center shrink-0">
              <div className="aspect-[16/10] bg-white rounded-3xl overflow-hidden mb-6 relative border border-black/5 shadow-sm">
                <Image fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="modern bold web layout" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1zJh5mUz9dE2ajcuvUZB6XpehcQsXSfypUsUWYC8DttAskH4lMpsTVYwpZoxjRcYaLGEQ63uCAKN5-hnV_BvRof-awnvNSAMqXEfKMImVqfVMKexiyhjk5QSgW_ZCGr-XS0xhKXVOu6oIy9FbZYo6g6jq_64_FkFzuZBT2lCcnJsUza7V38eOjbqkTNqaPEQ_uPxOoFfEn51LnKdG7u2WxwegYqVZ4PO685Q_UJlkdD33bw5HpdGfFS0YzN5HC5oVyBE2vTxiFhGC"/>
                <div className="absolute inset-0 bg-cedar-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button className="bg-white text-cedar-forest px-8 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Preview Layout</button>
                </div>
              </div>
              <h4 className="font-headline text-2xl font-bold text-cedar-midnight">Modern Theory</h4>
              <p className="text-cedar-slate text-sm mt-2 uppercase tracking-widest font-medium text-[10px]">Best for Visual Artists</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-[120px] px-6 lg:px-12 bg-white">
          <div className="max-w-[1280px] mx-auto text-center mb-20">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">Investment</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-cedar-midnight">Built for Every Stage</h2>
            <p className="text-cedar-slate text-lg max-w-2xl mx-auto">Scale your online presence as your career evolves. No hidden fees, just pure creativity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
            <div className="bg-white border border-black/10 p-10 lg:p-12 rounded-[40px] flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 shadow-sm">
              <span className="text-cedar-slate font-semibold text-[10px] uppercase tracking-[0.2em] mb-4">Starter</span>
              <div className="font-headline font-bold text-[40px] text-cedar-midnight mb-2">KSh 3,500</div>
              <p className="text-cedar-slate text-sm mb-10 h-10">Perfect for students and early-career seekers looking to make a mark.</p>
              
              <ul className="space-y-4 mb-10 flex-grow w-full text-sm font-medium text-cedar-midnight">
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> 1-page portfolio</li>
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Mobile responsive design</li>
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Basic hosting included</li>
              </ul>
              <Link href="/signup" className="w-full text-center py-4 rounded-full border border-black/10 text-cedar-midnight font-bold shadow-sm hover:bg-gray-50 transition-all">Begin Here</Link>
            </div>
            
            <div className="bg-cedar-forest p-10 lg:p-12 rounded-[40px] flex flex-col items-start scale-100 md:scale-105 z-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">Popular</div>
              <span className="text-cedar-bronze-light font-semibold text-[10px] uppercase tracking-[0.2em] mb-4">Professional</span>
              <div className="font-headline font-bold text-[40px] text-white mb-2">KSh 7,500</div>
              <p className="text-white/80 text-sm mb-10 h-10">The standard for freelancers and established professionals.</p>
              
              <ul className="space-y-4 mb-10 flex-grow w-full text-sm font-medium text-white">
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Multi-section experience</li>
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Interactive project showcase</li>
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Integrated CV/Resume</li>
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Custom Domains</li>
              </ul>
              <Link href="/signup" className="w-full text-center py-4 rounded-full bg-white text-cedar-forest font-bold shadow-lg hover:bg-cedar-alabaster active:scale-95 transition-all">Select Pro</Link>
            </div>
            
            <div className="bg-white border border-black/10 p-10 lg:p-12 rounded-[40px] flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 shadow-sm">
              <span className="text-cedar-slate font-semibold text-[10px] uppercase tracking-[0.2em] mb-4">Premium</span>
              <div className="font-headline font-bold text-[40px] text-cedar-midnight mb-2">KSh 12,000+</div>
              <p className="text-cedar-slate text-sm mb-10 h-10">For high-end personal brands requiring a truly unique presence.</p>
              
              <ul className="space-y-4 mb-10 flex-grow w-full text-sm font-medium text-cedar-midnight">
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Custom architecture</li>
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Advanced animations</li>
                <li className="flex items-center gap-3"><span className="text-cedar-bronze text-2xl leading-none">•</span> Concierge edits</li>
              </ul>
              <Link href="/signup" className="w-full text-center py-4 rounded-full border border-black/10 text-cedar-midnight font-bold shadow-sm hover:bg-gray-50 transition-all">Elevate Now</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-[100px] px-6 max-w-[1280px] mx-auto border-t border-black/5">
          <div className="text-center max-w-[700px] mx-auto mb-20">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">Clarity</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-cedar-forest mt-4 mb-4">Common Questions</h2>
          </div>
          
          <div className="max-w-[800px] mx-auto divide-y divide-black/10">
            {[
              {
                q: "Do I need any technical knowledge?",
                a: "None at all. We handle the design, architecture, hosting, and all security updates for you."
              },
              {
                q: "How do updates work?",
                a: "Simply email or message us with your new projects or bio changes, and our team will update your live site within 24 hours."
              },
              {
                q: "Will I have my own custom domain?",
                a: "Yes. We assist with custom domain registration and pointing, ensuring your site is found at yourpreferredname.com."
              },
              {
                q: "How fast is the turnaround?",
                a: "Most portfolios are designed and live within 24 to 72 hours of receiving your content."
              }
            ].map((faq, i) => (
              <div key={i} className={`py-6 group cursor-pointer ${activeFaq === i ? 'active' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="flex justify-between items-center font-semibold text-lg text-cedar-midnight group-hover:text-cedar-forest transition-colors">
                  {faq.q} 
                  <span className={`text-2xl font-light text-cedar-bronze transition-transform ${activeFaq === i ? 'rotate-45' : ''}`}>+</span>
                </div>
                <div className={`overflow-hidden text-cedar-slate transition-all ${activeFaq === i ? 'h-auto mt-4' : 'h-0 mt-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section id="contact" className="py-[120px] px-6 lg:px-12 bg-cedar-alabaster">
          <div className="max-w-[1280px] mx-auto rounded-[40px] lg:rounded-[60px] bg-cedar-forest p-10 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[#1B3022]">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              <div className="lg:w-1/2 text-center lg:text-left">
                <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">Connect</span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
                  Ready to let your <br/><span className="text-cedar-bronze italic">work speak louder?</span>
                </h2>
                <p className="text-white/80 leading-relaxed text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                  Let&apos;s build a digital sanctuary for your professional work. Our team is ready to curate your legacy.
                </p>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl">
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Request Sent!"); }}>
                    <div>
                      <input type="text" placeholder="Your Full Name" required className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight" />
                    </div>
                    <div>
                      <input type="email" placeholder="Your Professional Email" required className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight" />
                    </div>
                    <div>
                      <textarea placeholder="Tell us about your work and goals..." rows={4} required className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all resize-y text-cedar-midnight"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-cedar-forest text-white py-4 rounded-xl font-bold text-base shadow-[0_4px_20px_rgba(27,48,34,0.15)] hover:bg-cedar-forest-dark transition-all">
                      Request A Consultation
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 py-10 w-full border-t border-black/5">
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <div className="w-6 h-6 rounded bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic text-xs">
            C
          </div>
          <div className="text-[13px] font-medium text-cedar-slate">
            © 2026 Cedar. Curated with excellence in Nairobi.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          <Link className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/legal/privacy">Privacy Policy</Link>
          <Link className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/legal/terms">Terms of Service</Link>
          <Link className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="/legal/support">Support</Link>
          <a className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors" href="https://instagram.com/cedar">Instagram</a>
        </div>
      </footer>

      {/* AI Floating Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-full bg-white/95 backdrop-blur-md border border-black/5 flex items-center gap-6 shadow-[0_10px_40px_rgba(27,48,34,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cedar-bronze ai-pulse"></div>
          <span className="text-sm font-semibold text-cedar-midnight whitespace-nowrap">Cedar is ready</span>
        </div>
        <div className="hidden sm:block h-6 w-px bg-black/10"></div>
        <Link href="/signup" className="hidden sm:flex items-center gap-4 cursor-pointer group">
          <span className="text-sm text-cedar-slate font-medium group-hover:text-cedar-midnight transition-colors">Start your digital legacy today...</span>
          <span className="material-symbols-outlined text-cedar-bronze text-xl transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
