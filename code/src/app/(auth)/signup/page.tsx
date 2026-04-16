"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const setAuthSession = (user: Record<string, unknown>) => {
    localStorage.setItem("cedar:auth-user", JSON.stringify(user));
    document.cookie = `cedar-auth-session=1; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      uid: "user-" + Date.now(),
      email: email,
      displayName: name,
      emailVerified: false,
      isAnonymous: false,
      tenantId: null,
      providerData: [],
    };
    setAuthSession(newUser);
    const redirectTarget = new URLSearchParams(window.location.search).get("redirect") || "/dashboard";
    router.push(redirectTarget);
  };

  return (
    <div className="flex min-h-screen bg-cedar-alabaster text-cedar-midnight font-body antialiased selection:bg-cedar-bronze/30">
      {/* Left: Visual Cover */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white flex-col justify-between p-12 overflow-hidden border-r border-black/5">
        <img
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.95]"
          alt="clean tech design showcase"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYHdS04CrbPyBYQIV5VKk-nF6obqlYT2cY9G-bGQY3eQafWRyOcS_hNVyy022DYWGfFSSXi4ELwyKdzU4tczw5oi3NPHTBEMUUeyjVw6IXsEUKHFRiNOi6-ImeYXAiOQysl3q_15qkoHSLPD7wMtllYHaw0FAHDqu63oYJIfKFRiCQ77l8lZLUWFcE2AVAhHaiHQ8qeQQ7J3hhi4SApI_6IOLEVFo5biL9hun4yeWJR2exZV6JvFAjC8RdYUv7GCe4ikgIIffF4ErM"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-cedar-midnight/60 via-transparent to-transparent"></div>

        <div className="relative z-10 w-full">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="w-8 h-8 rounded-lg bg-white flex justify-center items-center text-cedar-midnight font-headline font-bold italic shadow-md">
              C
            </div>
            <div className="font-headline text-2xl font-bold tracking-tight text-white drop-shadow-md">
              Cedar
            </div>
          </Link>
        </div>

        <div className="relative z-10 mb-10 max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="material-symbols-outlined text-cedar-bronze"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              Auto-Curator Studio
            </span>
          </div>
          <h2 className="font-headline text-3xl font-bold text-white mb-4">
            Let your work dictate the layout.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Join thousands of designers, developers, and visionaries building
            their digital sanctuaries with Cedar&apos;s intelligent portfolio engine.
          </p>
        </div>
      </div>

      {/* Right: Auth Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col pt-8 px-6 sm:px-12 md:px-24 justify-between bg-white">
        <Link href="/" className="lg:hidden flex items-center gap-3 w-fit group mb-8">
          <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic group-hover:bg-cedar-forest-dark transition-colors">
            C
          </div>
          <div className="font-headline text-2xl font-bold tracking-tight text-cedar-forest">
            Cedar
          </div>
        </Link>

        <div className="w-full justify-end hidden lg:flex">
          <div className="text-sm text-cedar-slate font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-cedar-forest hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-10 text-center lg:text-left">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-4">
              Join The Studio
            </span>
            <h1 className="font-headline text-4xl font-bold text-cedar-midnight mb-2">
              Create Account
            </h1>
            <p className="text-cedar-slate text-sm">
              Fill in your details to start curating your professional presence.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label
                className="block text-xs font-bold text-cedar-midnight uppercase tracking-widest mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Sarah Jenkins"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight"
              />
            </div>

            <div>
              <label
                className="block text-xs font-bold text-cedar-midnight uppercase tracking-widest mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="hello@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight"
              />
            </div>

            <div>
              <label
                className="block text-xs font-bold text-cedar-midnight uppercase tracking-widest mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  required
                  className="w-full p-4 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cedar-slate hover:text-cedar-midnight focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    visibility_off
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-start pt-2 mb-2 w-full">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 rounded border-black/20 text-cedar-forest focus:ring-cedar-bronze/30 bg-cedar-alabaster shrink-0"
              />
              <label
                htmlFor="terms"
                className="ml-3 text-xs text-cedar-slate leading-relaxed"
              >
                By creating an account or purchasing a plan, you agree to Cedar&apos;s{" "}
                <Link
                  href="/terms"
                  className="text-cedar-midnight font-semibold underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-cedar-midnight font-semibold underline"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-cedar-forest text-white py-4 rounded-xl font-bold text-base shadow-[0_4px_20px_rgba(27,48,34,0.15)] hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all"
              >
                Create Account{" "}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="pt-6 text-center text-sm text-cedar-slate lg:hidden">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-cedar-forest hover:underline"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>

        <div className="pb-8 text-center lg:text-right text-xs font-medium text-cedar-slate mt-auto">
          © 2026 Cedar.
        </div>
      </div>
    </div>
  );
}
