import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-bold mb-4">Last updated April 7, 2026</span>
      <h1 className="font-headline text-4xl md:text-5xl lg:text-3xl font-bold mb-10 text-cedar-forest underline decoration-cedar-bronze/30 decoration-8 underline-offset-[16px]">Privacy Policy</h1>
      
      <div className="text-cedar-slate space-y-10 leading-relaxed font-body">
        <p className="text-lg md:text-xl font-medium text-cedar-midnight/80 italic">
          Your privacy is at the core of Cedar's philosophy. We believe in providing a secure, transparent ecosystem for your professional digital life.
        </p>

        <section>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight mb-4">1. Data Stewardship</h2>
          <p>We only request personal information when it is vital to providing our curated services. We collect all data by fair and lawful means, ensuring your full knowledge and explicit consent at every intersection.</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight mb-4">2. Utilization of Information</h2>
          <p>The information you provide is utilized exclusively to generate, host, and refine your professional portfolios. Cedar does not share personally identifying information publicly or with third parties, except in high-level compliance with legal mandates.</p>
          <ul className="mt-6 space-y-4 list-disc list-inside text-sm">
            <li>Secure hosting of image and text assets.</li>
            <li>AI-driven layout generation based on user input.</li>
            <li>Account security and preference management.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight mb-4">3. Asset Retention</h2>
          <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.</p>
        </section>

        <section className="bg-cedar-forest text-white p-8 md:p-10 rounded-[32px] shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
          <h2 className="text-2xl font-headline font-bold mb-4 relative z-10">4. Your Right to Omission</h2>
          <p className="relative z-10 opacity-90">You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight mb-4">5. Contact</h2>
          <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact our support team.</p>
        </section>
      </div>
    </div>
  );
}
