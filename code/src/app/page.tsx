"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const templatesList = [
  {
    id: "bold-creative",
    name: "Bold Creative",
    category: "bold-creative",
    description: "High-impact layouts with expressive imagery and confident typography.",
    image: "/templates/bold-creative.png",
  },
  {
    id: "high-contrast",
    name: "High Contrast",
    category: "high-contrast",
    description: "Monochrome visual language with striking spacing and editorial drama.",
    image: "/templates/high-contrast.png",
  },
  {
    id: "minimalist-architect",
    name: "Minimalist Architect",
    category: "minimalist-architect",
    description: "Calm, structured compositions built around whitespace and precise hierarchy.",
    image: "/templates/minimalist-architect.png",
  },
  {
    id: "playful-1-page",
    name: "Playful",
    category: "playful-1-page",
    description: "Bright, character-driven layouts with a lively single-page rhythm.",
    image: "/templates/playful-1-page.png",
  },
  {
    id: "professional-developer",
    name: "Professional Developer",
    category: "professional-developer",
    description: "Structured portfolio layouts for technical profiles and product teams.",
    image: "/templates/professional-developer.png",
  },
  {
    id: "student",
    name: "Student",
    category: "student",
    description: "Editorial layouts that present academic work and projects with clarity.",
    image: "/templates/student.png",
  },
  {
    id: "tech-1-page",
    name: "Tech 1 page",
    category: "tech-1-page",
    description: "Concise one-page layouts for tools, startups, and product storytelling.",
    image: "/templates/tech-1-page.png",
  },
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const router = useRouter();

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const filteredTemplates = templatesList.slice(0, 3);
  const activePreview = templatesList.find((template) => template.id === selectedPreview) ?? null;

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch role to determine redirect path
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        
        if (profile?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    };
    checkUser();
  }, [router]);

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

      <main className="pt-16 md:pt-20 overflow-hidden">
        {/* Hero Section */}
        <section
          className="relative min-h-[85vh] md:min-h-[95vh] flex items-center px-4 sm:px-6 md:px-16 lg:px-24 py-12 md:py-20 bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1770110000509-6c8298224699?auto=format&fit=crop&w=2400&q=80')",
          }}
        >
          {/* Dark Overlay for foggy forest */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#121415]/50 via-[#121415]/70 to-[#1B3022]/85 z-0"></div>

          <div className="relative z-10 max-w-3xl pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-8">
              <span
                className="material-symbols-outlined text-cedar-bronze text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                The New Standard for Creators
              </span>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl md:text-[80px] font-bold tracking-tight mb-6 md:mb-8 leading-[1.05] text-white">
              Your Story,
              <br />
              <span className="text-cedar-bronze italic">Curated</span> by Design.
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed">
              Stop fighting with grids. Cedar helps you curate your experience and crafts a high-end, editorial portfolio that commands attention.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/signup"
                className="inline-flex justify-center items-center bg-cedar-forest text-white px-10 py-5 rounded-full font-semibold text-[15px] shadow-[0_8px_30px_rgba(27,48,34,0.5)] hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              >
                Build Your Portfolio
              </Link>
              <Link
                href="#showcase"
                className="inline-flex justify-center items-center bg-white/10 border text-white border-white/20 px-10 py-5 rounded-full font-semibold text-[15px] backdrop-blur-sm hover:bg-white/20 transition-all w-full sm:w-auto"
              >
                View Showcase
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-16 md:py-[100px] px-4 sm:px-6 max-w-[1280px] mx-auto border-t border-black/5"
        >
          <div className="text-center max-w-[700px] mx-auto mb-20">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">
              Our Services
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-cedar-forest mt-4 mb-4">
              Everything you need to look professional online
            </h2>
            <p className="text-cedar-slate text-lg">
              We don&apos;t just build websites. We curate your professional presence with a focus on authority, speed, and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 md:p-12 rounded-[24px] md:rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="w-16 h-16 bg-cedar-alabaster rounded-2xl mb-8 flex items-center justify-center text-2xl">
                ✒️
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-cedar-midnight">
                Bespoke Design
              </h3>
              <p className="text-cedar-slate text-sm leading-relaxed">
                A clean, modern site designed around your personal brand, niche, and professional goals.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="w-16 h-16 bg-cedar-alabaster rounded-2xl mb-8 flex items-center justify-center text-2xl">
                ☁️
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-cedar-midnight">
                Concierge Hosting
              </h3>
              <p className="text-cedar-slate text-sm leading-relaxed">
                We host your site so it stays online, fast, secure, and ready to share at a moment&apos;s notice.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="w-16 h-16 bg-cedar-alabaster rounded-2xl mb-8 flex items-center justify-center text-2xl">
                📱
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-cedar-midnight">
                Fluid Layouts
              </h3>
              <p className="text-cedar-slate text-sm leading-relaxed">
                Your portfolio looks impeccable on phones, tablets, and high-resolution desktops alike.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="w-16 h-16 bg-cedar-alabaster rounded-2xl mb-8 flex items-center justify-center text-2xl">
                🔄
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-cedar-midnight">
                Seamless Updates
              </h3>
              <p className="text-cedar-slate text-sm leading-relaxed">
                Send us your new projects, and we&apos;ll update your site within hours. No tech stress required.
              </p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section
          id="process"
          className="py-16 md:py-[120px] px-4 sm:px-6 md:px-12 bg-white border-y border-black/5 relative z-10"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-20">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-cedar-midnight">
                The Evolution of Effort
              </h2>
              <div className="w-24 h-1 bg-cedar-bronze"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:h-[600px]">
              <div className="md:col-span-5 bg-cedar-alabaster rounded-3xl p-10 lg:p-12 border border-black/5 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="font-headline font-bold text-6xl text-cedar-forest/20 group-hover:text-cedar-bronze transition-colors">
                    01
                  </span>
                  <h3 className="font-headline text-3xl font-bold mt-6 mb-4 text-cedar-midnight">
                    Define Identity
                  </h3>
                  <p className="text-cedar-slate text-base leading-relaxed">
                    Set your professional foundation. Our intuitive builder helps you structure your journey with precision.
                  </p>
                </div>
                <div className="mt-8 flex justify-end relative z-10">
                  <span className="material-symbols-outlined text-[80px] text-cedar-forest/40 group-hover:text-cedar-forest transition-colors">
                    edit_note
                  </span>
                </div>
              </div>

              <div className="md:col-span-7 bg-cedar-forest rounded-3xl p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="relative z-10">
                  <span className="font-headline font-bold text-6xl text-white/20 group-hover:text-cedar-bronze transition-colors">
                    02
                  </span>
                  <h3 className="font-headline text-3xl font-bold mt-6 mb-4 text-white">
                    Strategic Curation
                  </h3>
                  <p className="text-white/80 text-base max-w-md leading-relaxed">
                    Choose what defines you. Structure your work samples and achievements to highlight your unique value proposition.
                  </p>
                </div>
                <div className="absolute bottom-[-10%] right-[-5%] opacity-10">
                  <span
                    className="material-symbols-outlined text-[300px] text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    view_quilt
                  </span>
                </div>
              </div>

              <div className="md:col-span-7 bg-white rounded-3xl p-10 lg:p-12 border border-black/5 shadow-sm flex flex-col md:flex-row gap-8 items-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="flex-1">
                  <span className="font-headline font-bold text-6xl text-cedar-forest/20 group-hover:text-cedar-bronze transition-colors">
                    03
                  </span>
                  <h3 className="font-headline text-3xl font-bold mt-6 mb-4 text-cedar-midnight">
                    Choose Template
                  </h3>
                  <p className="text-cedar-slate text-base leading-relaxed">
                    Select from a curated collection of editorial-grade layouts designed by the world&apos;s leading UI directors.
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  <div className="w-full aspect-[4/5] bg-cedar-alabaster rounded-2xl overflow-hidden border border-black/5 shadow-sm">
                    <img
                      className="w-full h-full object-cover"
                      alt="minimal UI setup"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_XdtiQZf_9fYuO86YLL-lMNedL5xdgvBVY007zU9yQPGeDdvw0599YrqIvSA7sRlDLuh1iGmFgudBvgkVeSdHZ__b2-WIhPdHp8aZsujA4FXtVOwee_AL4gZP72YE_ooEdKwPK2OKNXNhNuf_ShVL472WqH0lT_VlR8af8ZGsUP9E8OlHkW1-bc_6EJTdzCsiKGSXU3RgHzoy1e2q9pxPpa2LGeYZjmgFz2JUn2cg32Nf53a9OcEkwMWpWtQ0uUsqSjXEL1p6KcmT"
                    />
                  </div>
                  <div className="w-full aspect-[4/5] bg-cedar-alabaster rounded-2xl overflow-hidden border border-black/5 shadow-sm mt-6">
                    <img
                      className="w-full h-full object-cover"
                      alt="dashboard ui mockup"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxNpdni3tVFgLkCBsQkLiBxdSZPOFSuVxKDJR7IDaS-ZPVgVf5FgRm-Vef1BXXphD9mbNZHxIs_rQX-Ffk5KY5YeweLSis4g1mfJfakfmbE75L5N_js7LR1j4XdWIAJVBP0B-tIU0088VJ8RE-NNsjgaNfPYOWaQdRkrY4phi-Q19vhQIh_kqm7QP-a3iPmI64188nGZmQ18fsqdhBHdYYG_i3XjLtDJvMXlb4aDJS7FixhD7SSOZfGZ7Us5TQq9lksL2hmiqsgbb9"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#C5AC81] rounded-3xl p-10 lg:p-12 flex flex-col justify-center items-center text-center group relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-cedar-bronze-light to-cedar-bronze/70 mix-blend-multiply opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-headline font-bold text-6xl text-white/40 mb-6">
                    04
                  </span>
                  <h3 className="font-headline text-4xl font-bold mb-6 text-white">
                    Publish
                  </h3>
                  <p className="text-white/90 text-lg mb-10 max-w-[280px]">
                    Deploy to your custom domain in one click. Zero code, infinite impact.
                  </p>
                  <Link
                    href="/signup"
                    className="inline-block bg-white text-cedar-forest px-10 py-4 rounded-full font-bold shadow-lg hover:bg-cedar-alabaster transition-colors"
                  >
                    Start Creating
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Database Section */}
        <section id="showcase" className="py-16 md:py-[120px] px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-[1280px] mx-auto text-center mb-16">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">
              Gallery
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-cedar-midnight mb-6">
              Curated Templates
            </h2>
            <p className="text-lg text-cedar-slate mb-12 max-w-2xl mx-auto">
              Select from a collection of premium layouts designed by leading
              creative directors.
            </p>

          </div>

          <div className="max-w-[1400px] mx-auto min-h-[50vh]">
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
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-[120px] px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-[1280px] mx-auto text-center mb-20">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">
              Plans
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-cedar-midnight">
              Built for Every Stage
            </h2>
            <p className="text-cedar-slate text-lg max-w-2xl mx-auto">
              From first portfolio launch to full client-ready website, choose the tier that fits your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-[1280px] mx-auto">
            <div className="bg-white border border-black/10 p-8 rounded-[32px] flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 shadow-sm">
              <span className="text-cedar-slate font-semibold text-[10px] uppercase tracking-[0.2em] mb-4">
                Starter Presence
              </span>
              <div className="font-headline font-bold text-[38px] text-cedar-midnight mb-2">
                Free
              </div>
              <p className="text-cedar-slate text-sm mb-8">
                Try Cedar with no pressure and launch your identity fast.
              </p>
              <ul className="space-y-3 mb-8 flex-grow w-full text-sm font-medium text-cedar-midnight">
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> 1-page portfolio
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> 3 clean templates
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> username.cedar.site domain
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Basic contact section
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Cedar branding badge in footer
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> 5 edits per month
                </li>
              </ul>
              <Link
                href="/signup"
                className="w-full text-center py-4 rounded-full border border-black/10 text-cedar-midnight font-bold shadow-sm hover:bg-gray-50 transition-all"
              >
                Start Free
              </Link>
            </div>

            <div className="bg-cedar-forest p-8 rounded-[32px] flex flex-col items-start relative overflow-hidden shadow-2xl lg:scale-[1.02]">
              <div className="absolute top-6 right-6 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
                Most Popular
              </div>
              <span className="text-cedar-bronze-light font-semibold text-[10px] uppercase tracking-[0.2em] mb-4">
                Student Pro
              </span>
              <div className="font-headline font-bold text-[38px] text-white mb-1">
                KES 150
              </div>
              <p className="text-white/70 text-xs uppercase tracking-widest mb-2">
                per month
              </p>
              <p className="text-white/85 text-sm mb-8">
                Built for students who need a strong portfolio before graduation.
              </p>
              <ul className="space-y-3 mb-8 flex-grow w-full text-sm font-medium text-white">
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Up to 3 pages
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Student-focused templates
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> No Cedar branding badge
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Basic visits analytics
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Project showcase + contact form
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Student verified badge
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Portfolio guidance prompts
                </li>
              </ul>
              <Link
                href="/signup"
                className="w-full text-center py-4 rounded-full bg-white text-cedar-forest font-bold shadow-lg hover:bg-cedar-alabaster active:scale-95 transition-all"
              >
                Choose Student Pro
              </Link>
            </div>

            <div className="bg-white border border-black/10 p-8 rounded-[32px] flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 shadow-sm">
              <span className="text-cedar-slate font-semibold text-[10px] uppercase tracking-[0.2em] mb-4">
                Career
              </span>
              <div className="font-headline font-bold text-[38px] text-cedar-midnight mb-1">
                KES 400
              </div>
              <p className="text-cedar-slate text-xs uppercase tracking-widest mb-2">
                per month
              </p>
              <p className="text-cedar-slate text-sm mb-8">
                For job seekers and serious freelancers optimizing to get hired.
              </p>
              <ul className="space-y-3 mb-8 flex-grow w-full text-sm font-medium text-cedar-midnight">
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Up to 7 pages
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Premium templates + customization
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Analytics dashboard (views + clicks)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Resume download + social links
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> SEO basics + custom forms
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Hire Me optimized layout
                </li>
              </ul>
              <Link
                href="/signup"
                className="w-full text-center py-4 rounded-full border border-black/10 text-cedar-midnight font-bold shadow-sm hover:bg-gray-50 transition-all"
              >
                Select Career
              </Link>
            </div>

            <div className="bg-white border border-black/10 p-8 rounded-[32px] flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 shadow-sm">
              <span className="text-cedar-slate font-semibold text-[10px] uppercase tracking-[0.2em] mb-4">
                Business / Creator Pro
              </span>
              <div className="font-headline font-bold text-[38px] text-cedar-midnight mb-1">
                KES 799
              </div>
              <p className="text-cedar-slate text-xs uppercase tracking-widest mb-2">
                per month
              </p>
              <p className="text-cedar-slate text-sm mb-8">
                A lightweight business website for creators, consultants, and side hustlers.
              </p>
              <ul className="space-y-3 mb-8 flex-grow w-full text-sm font-medium text-cedar-midnight">
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Unlimited pages + all templates
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Full customization + priority support
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Advanced analytics + inquiry forms
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> WhatsApp and booking sections
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Service listings + testimonials
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-2xl leading-none">•</span> Get Quote lead form
                </li>
              </ul>
              <Link
                href="/signup"
                className="w-full text-center py-4 rounded-full border border-black/10 text-cedar-midnight font-bold shadow-sm hover:bg-gray-50 transition-all"
              >
                Go Creator Pro
              </Link>
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cedar-alabaster border border-black/5 p-8 rounded-[28px]">
              <span className="text-cedar-bronze font-semibold text-[10px] uppercase tracking-[0.2em]">
                Add-On
              </span>
              <h3 className="font-headline text-3xl font-bold text-cedar-midnight mt-2">
                Custom Domain Setup
              </h3>
              <p className="text-cedar-slate text-sm mt-3 leading-relaxed">
                Simple setup without technical confusion. Pro includes free domain setup.
              </p>
              <ul className="space-y-3 mt-6 text-sm font-medium text-cedar-midnight">
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-xl leading-none">•</span> Setup fee: KES 1,500 to 3,000 (one time)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-xl leading-none">•</span> Renewal guide: around KES 1,200/year
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-xl leading-none">•</span> Domain connection + SSL + email setup guide
                </li>
              </ul>
            </div>

            <div className="bg-cedar-forest text-white border border-cedar-forest p-8 rounded-[28px] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <span className="text-cedar-bronze-light font-semibold text-[10px] uppercase tracking-[0.2em]">
                Done For You
              </span>
              <h3 className="font-headline text-3xl font-bold mt-2">
                Cedar Concierge
              </h3>
              <p className="text-white/85 text-sm mt-3 leading-relaxed">
                For busy professionals who want the result without the setup work.
              </p>
              <div className="font-headline text-3xl font-bold mt-5">
                KES 2,000 to 5,000
              </div>
              <p className="text-white/70 text-xs uppercase tracking-widest mt-1">
                one-time setup
              </p>
              <ul className="space-y-3 mt-6 text-sm font-medium text-white">
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-xl leading-none">•</span> We build and publish your portfolio
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-xl leading-none">•</span> We clean project descriptions and structure
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cedar-bronze text-xl leading-none">•</span> We optimize layout and connect your domain
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-16 md:py-[100px] px-4 sm:px-6 max-w-[1280px] mx-auto border-t border-black/5"
        >
          <div className="text-center max-w-[700px] mx-auto mb-20">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">
              Clarity
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-cedar-forest mt-4 mb-4">
              Common Questions
            </h2>
          </div>

          <div className="max-w-[800px] mx-auto divide-y divide-black/10">
            {[
              {
                q: "Do I need any technical knowledge?",
                a: "None at all. We handle the design, architecture, hosting, and all security updates for you.",
              },
              {
                q: "How do updates work?",
                a: "Simply email or message us with your new projects or bio changes, and our team will update your live site within 24 hours.",
              },
              {
                q: "Will I have my own custom domain?",
                a: "Yes. We assist with custom domain registration and pointing, ensuring your site is found at yourpreferredname.com.",
              },
              {
                q: "How fast is the turnaround?",
                a: "Most portfolios are designed and live within 24 to 72 hours of receiving your content.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className={`py-6 faq-item group cursor-pointer ${
                  activeFaq === i ? "active" : ""
                }`}
                onClick={() => toggleFaq(i)}
              >
                <div className="flex justify-between items-center font-semibold text-lg text-cedar-midnight group-hover:text-cedar-forest transition-colors">
                  {faq.q}
                  <span
                    className={`text-2xl font-light text-cedar-bronze transition-transform ${
                      activeFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
                <div
                  className={`overflow-hidden text-cedar-slate transition-all duration-300 ${
                    activeFaq === i ? "h-auto mt-4 opacity-100" : "h-0 mt-0 opacity-0"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          id="contact"
          className="py-16 md:py-[120px] px-4 sm:px-6 lg:px-12 bg-cedar-alabaster"
        >
          <div className="max-w-[1280px] mx-auto rounded-[28px] md:rounded-[40px] lg:rounded-[60px] bg-cedar-forest p-6 sm:p-10 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[#1B3022]">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
              >
                <filter id="noiseFilter">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              <div className="lg:w-1/2 text-center lg:text-left">
                <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-6">
                  Connect
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
                  Ready to let your <br />
                  <span className="text-cedar-bronze italic">work speak louder?</span>
                </h2>
                <p className="text-white/80 leading-relaxed text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                  Let&apos;s build a digital sanctuary for your professional work. Our team is ready to curate your legacy.
                </p>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl">
                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Successfully submitted!");
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        required
                        className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Professional Email"
                        required
                        className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Tell us about your work and goals..."
                        rows={4}
                        required
                        className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all resize-y text-cedar-midnight"
                      ></textarea>
                    </div>
                    <div className="text-xs text-cedar-slate text-center pb-1">
                      By submitting this form, you agree to our{" "}
                      <Link
                        href="/privacy"
                        className="underline text-cedar-midnight font-medium hover:text-cedar-forest transition-colors"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-cedar-forest text-white py-4 rounded-xl font-bold text-base shadow-[0_4px_20px_rgba(27,48,34,0.15)] hover:bg-cedar-forest-dark transition-all"
                    >
                      Request A Consultation
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* AI Floating Bar */}
      <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-white/95 backdrop-blur-md border border-black/5 flex items-center gap-4 sm:gap-6 shadow-[0_10px_40px_rgba(27,48,34,0.1)] max-w-[calc(100vw-32px)]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cedar-bronze animate-pulse shadow-[0_0_8px_#AA8C55]"></div>
          <span className="text-xs sm:text-sm font-semibold text-cedar-midnight whitespace-nowrap">
            Cedar is ready
          </span>
        </div>
        <div className="hidden sm:block h-6 w-px bg-black/10"></div>
        <Link
          href="/signup"
          className="hidden sm:flex items-center gap-4 cursor-pointer group"
        >
          <span className="text-sm text-cedar-slate font-medium group-hover:text-cedar-midnight transition-colors">
            Start your digital legacy today...
          </span>
          <span className="material-symbols-outlined text-cedar-bronze text-xl transform group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>

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
    </>
  );
}
