"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Reset link sent if the email exists in our system.");
    router.push("/login");
  };

  return (
    <div className="flex bg-cedar-alabaster text-cedar-midnight font-body antialiased min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-white p-10 rounded-[32px] border border-black/5 shadow-xl m-4">
        <Link href="/" className="flex items-center justify-center gap-3 group mb-8">
          <div className="w-8 h-8 rounded-lg bg-cedar-forest flex justify-center items-center text-white font-headline font-bold italic group-hover:bg-cedar-forest-dark transition-colors">
            C
          </div>
          <div className="font-headline text-2xl font-bold tracking-tight text-cedar-forest">
            Cedar
          </div>
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl font-bold text-cedar-midnight mb-2">
            Reset Password
          </h1>
          <p className="text-cedar-slate text-sm">
            Enter your email and we&apos;ll send you instructions.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleReset}>
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
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-cedar-forest text-white py-4 rounded-xl font-bold text-base shadow-md hover:bg-cedar-forest-dark transition-all"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link
            href="/login"
            className="font-bold text-cedar-forest hover:underline flex justify-center items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
