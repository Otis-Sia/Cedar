import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cedar | Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-semibold mb-4">
        Legal
      </span>
      <h1 className="font-headline text-4xl md:text-5xl font-bold mb-8">
        Privacy Policy
      </h1>
      <div className="text-cedar-slate space-y-6 leading-relaxed">
        <p className="font-medium text-sm">
          Effective Date: April 9, 2026
          <br />
          Last Updated: April 9, 2026
        </p>
        <p>
          Cedar (“we,” “us,” “our”) respects your privacy and is committed to
          protecting your personal data.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store, disclose, and
          protect your information when you use our website and Services.
        </p>
        <p>By using Cedar, you agree to this Privacy Policy.</p>

        <h2 className="text-2xl font-headline font-bold text-cedar-midnight mt-8 mb-4">
          1. Information We Collect
        </h2>
        <p>We may collect the following categories of information:</p>

        <h3 className="text-xl font-headline font-semibold text-cedar-midnight mt-6 mb-3">
          a) Personal Information You Provide
        </h3>
        <p>
          When you sign up, contact us, make a purchase, or build your
          portfolio, we may collect:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Full name, Email address, Phone number</li>
          <li>
            Username, Password (stored securely in encrypted or hashed form)
          </li>
          <li>Billing details</li>
          <li>Portfolio/profile details</li>
          <li>Education and work experience details you choose to upload</li>
          <li>CV / resume content</li>
          <li>Images, project descriptions, links, and other content you submit</li>
        </ul>

        <h3 className="text-xl font-headline font-semibold text-cedar-midnight mt-6 mb-3">
          b) Automatically Collected Information
        </h3>
        <p>When you use Cedar, we may automatically collect:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>IP address, Browser type, Device information, Operating system</li>
          <li>Pages visited, Time spent on pages, Referral URLs</li>
          <li>Usage and interaction data</li>
          <li>Log data and error reports</li>
        </ul>

        <h3 className="text-xl font-headline font-semibold text-cedar-midnight mt-6 mb-3">
          c) Cookies and Similar Technologies
        </h3>
        <p>We may use cookies, analytics tags, and similar technologies to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Keep you logged in</li>
          <li>Improve performance</li>
          <li>Understand site usage</li>
          <li>Remember preferences</li>
          <li>Improve user experience</li>
        </ul>
        <p>
          You may disable cookies through your browser settings, but some
          features may not work properly.
        </p>
      </div>
    </>
  );
}
