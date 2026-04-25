"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "@/services/auth.service";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const setAuthSession = async (user: Record<string, unknown>) => {
    localStorage.setItem("cedar:auth-user", JSON.stringify(user));
    await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName ?? null,
      }),
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const { data, error } = await signIn(email, password);

    if (error) {
      setErrorMessage(error.message || "Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    const user = data?.user;
    if (user) {
      if (supabase) {
        const { data: userData } = await supabase
          .from("users")
          .select("is_student, onboarding_completed")
          .eq("id", user.id)
          .single();

        if (userData?.is_student && !userData.onboarding_completed) {
          router.push("/onboarding/student");
          return;
        }
      }

      await setAuthSession({
        uid: user.id,
        email: user.email,
        displayName: user.user_metadata?.display_name || user.user_metadata?.full_name || null,
      });

      const redirectTarget = new URLSearchParams(window.location.search).get("redirect") || "/dashboard";
      router.push(redirectTarget);
    } else {
      setErrorMessage("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cedar-alabaster text-cedar-midnight font-body antialiased selection:bg-cedar-bronze/30">
      {/* Left: Auth Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col pt-8 px-6 sm:px-12 md:px-24 justify-between bg-white overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 w-fit group">
          <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic group-hover:bg-cedar-forest-dark transition-colors">
            C
          </div>
          <div className="font-headline text-2xl font-bold tracking-tight text-cedar-forest">
            Cedar
          </div>
        </Link>

        {/* Login Box */}
        <div className="w-full max-w-md mx-auto my-auto py-12">
          <div className="mb-10 text-center lg:text-left">
            <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-4">
              Welcome Back
            </span>
            <h1 className="font-headline text-4xl font-bold text-cedar-midnight mb-2">
              Log in to Cedar
            </h1>
            <p className="text-cedar-slate text-sm">
              Curate your legacy. Access your dashboard and portfolios.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
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
              <div className="flex justify-between items-end mb-2">
                <label
                  className="block text-xs font-bold text-cedar-midnight uppercase tracking-widest"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-cedar-forest hover:text-cedar-forest-dark transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pr-14 rounded-xl border border-black/10 bg-cedar-alabaster/50 font-body text-base outline-none focus:border-cedar-bronze focus:ring-4 focus:ring-cedar-bronze/10 transition-all text-cedar-midnight"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cedar-slate hover:text-cedar-midnight transition-colors w-11 h-11 flex items-center justify-center"
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center pt-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-black/20 text-cedar-forest focus:ring-cedar-bronze/30 bg-cedar-alabaster"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-cedar-slate"
              >
                Keep me logged in
              </label>
            </div>

            <div className="pt-4">
              {errorMessage && (
                <p className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 bg-cedar-forest text-white py-4 rounded-xl font-bold text-base shadow-[0_4px_20px_rgba(27,48,34,0.15)] hover:bg-cedar-forest-dark hover:-translate-y-0.5 transition-all"
              >
                {isSubmitting ? "Logging in..." : "Log In"}{" "}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="pt-6 text-center text-sm text-cedar-slate">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/signup"
                className="font-bold text-cedar-forest hover:underline"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>

        <div className="pb-8 text-center lg:text-left text-xs font-medium text-cedar-slate">
          © 2026 Cedar.{" "}
          <Link href="/privacy" className="hover:text-cedar-midnight">
            Privacy Policy
          </Link>{" "}
          •{" "}
          <Link href="/terms" className="hover:text-cedar-midnight">
            Terms & Conditions
          </Link>
        </div>
      </div>

      {/* Right: Visual Cover */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-cedar-forest flex-col justify-between p-12 overflow-hidden border-l border-black/5">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
          alt="architectural clean interior"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC72iK9ea6YugkWIKJMvCiAGJb5e3GZ6tqmw6a3uiIpubdh-frwlZav_0kldfOk7KCFOEJzdrMjUsCfCMORQkt4RbJCBGmVfxtkPxbHFl8roiorGeL6RLkYfp0P03Bq1o2bnsVR-hb8AHsvv1F-pCvu67Cgs9GhVw1lCkAUzI9abfwcPvpxzHem9o2ZOb2znCjADWk4NANU6kac7ZuaBBXxU8plphO0We2ui-vXPEq5myrRRbWHtcTmyTSeR2Gtg0uTLfQKD5VoViyx"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-cedar-midnight/90 via-transparent to-transparent"></div>

        <div className="relative z-10 flex justify-end w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-cedar-bronze animate-pulse shadow-[0_0_8px_#AA8C55]"></div>
            <span className="text-xs font-semibold text-white uppercase tracking-widest">
              Platform Operational
            </span>
          </div>
        </div>

        <div className="relative z-10 mb-10 max-w-lg">
          <h2 className="font-headline text-4xl font-bold text-white mb-4 line-clamp-3">
            "The only builder that respects the negative space."
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm">
              <img
                className="w-full h-full object-cover grayscale"
                alt="portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz7R0o4_SwDScB_gU1LxAzSxZhpqjml-7YKu3L6IgONXpA4Bcq6I_aPRXl1eQyo0z6wCPJ8YChJLWycJPuaZjtDQz2tO8NgRQHry0R6Bpo9jjPrY3Ow8VaGiDWEOqYW_m_qy5kRQVHiMqszoaReVLVd37DyGMGtHQG1NClhd5O1mexvI6WfAS1eZoP0j95mvHR4VlkgWVuDuTiph2eCQPtwy8kSZxLwLU5_7IP42RszVL4bT8ogiBuBL47tPxRs-QVY-vmWgclv1hA"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Sarah Jenkins</p>
              <p className="text-[10px] text-white/50 uppercase tracking-widest">
                Creative Director
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
