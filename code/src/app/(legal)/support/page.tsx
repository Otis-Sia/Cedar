import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cedar | Support Center",
};

export default function SupportPage() {
  return (
    <>
      <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-4">
        Assistance
      </span>
      <h1 className="font-headline text-4xl md:text-5xl font-bold mb-8">
        Support Center
      </h1>
      <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm text-cedar-slate space-y-6 leading-relaxed">
        <p>
          Need help with your portfolio? Our concierge team is ready to assist
          you.
        </p>
        <div className="mt-8">
          <h3 className="font-bold text-cedar-midnight text-lg mb-2">Email Us</h3>
          <p>
            Send an email to{" "}
            <a
              href="mailto:support@cedar.co"
              className="text-cedar-forest font-semibold"
            >
              support@cedar.co
            </a>{" "}
            for general inquiries or urgent help.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-cedar-midnight text-lg mb-2">
            Response Times
          </h3>
          <p>
            Elite tier members:{" "}
            <span className="font-semibold text-cedar-midnight">
              Under 2 hours
            </span>
          </p>
          <p>
            All other members:{" "}
            <span className="font-semibold text-cedar-midnight">
              Within 24 hours
            </span>
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex justify-center items-center bg-cedar-forest text-white px-8 py-4 rounded-full font-semibold text-sm shadow-md hover:bg-cedar-forest-dark transition-all"
        >
          Return to Home
        </Link>
      </div>
    </>
  );
}
