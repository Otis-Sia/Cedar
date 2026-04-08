import React from 'react';

export default function TermsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-bold mb-4">Effective April 7, 2026</span>
      <h1 className="font-headline text-4xl md:text-5xl lg:text-3xl font-bold mb-10 text-cedar-forest underline decoration-cedar-bronze/30 decoration-8 underline-offset-[16px]">Terms of Service</h1>
      
      <div className="text-cedar-slate space-y-10 leading-relaxed font-body">
        <p className="text-lg md:text-xl font-medium text-cedar-midnight/80 italic">
          Welcome to Cedar. By accessing our studio and utilizing our services, you agree to uphold the following standards of engagement.
        </p>

        <section>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight mb-4">1. Acceptance of Terms</h2>
          <p>By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Cedar's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="mt-6 space-y-4 list-disc list-inside text-sm">
            <li>Modify or copy the materials for commercial gain.</li>
            <li>Attempt to decompile or reverse engineer any software contained on Cedar's website.</li>
            <li>Remove any copyright or other proprietary notations from the materials.</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight mb-4">3. Disclaimer & Limitations</h2>
          <p>The materials on Cedar's website are provided on an 'as is' basis. Cedar makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section className="bg-cedar-alabaster p-8 md:p-10 rounded-[32px] border border-black/5 shadow-sm">
          <h2 className="text-2xl font-headline font-bold text-cedar-midnight mb-4">4. Accuracy of Materials</h2>
          <p>The materials appearing on Cedar's website could include technical, typographical, or photographic errors. Cedar does not warrant that any of the materials on its website are accurate, complete or current. Cedar may make changes to the materials contained on its website at any time without notice.</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight mb-4">5. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of Kenya and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </section>
      </div>
    </div>
  );
}
