import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const faqs = [
    { q: 'How do I connect a custom domain?', a: 'Elite tier members can connect custom domains in the Settings panel under the "Control" section. Simply enter your domain and follow the DNS propagation steps.' },
    { q: 'Can I export my portfolio data?', a: 'Yes, your assets are always yours. You can download your curated images and metadata anytime from the Assets dashboard.' },
    { q: 'What is the "Auto-Curator" engine?', a: 'Our proprietary AI that analyzes your work to suggest optimal layouts, color palettes, and typography that match your unique creative voice.' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      <span className="block text-xs uppercase tracking-[0.3em] text-cedar-bronze font-bold mb-4">Concierge Services</span>
      <h1 className="font-headline text-4xl md:text-5xl lg:text-3xl font-bold mb-10 text-cedar-forest underline decoration-cedar-bronze/30 decoration-8 underline-offset-[16px]">Support Center</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
        <section className="bg-white p-8 md:p-12 rounded-[40px] border border-black/5 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-cedar-bronze/5 blur-[80px] rounded-full"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-headline font-bold text-cedar-midnight mb-4">How can we assist you today?</h2>
              <p className="text-cedar-slate text-lg leading-relaxed">Our specialized concierge team is dedicated to ensuring your digital sanctuary is perfect. Reach out for technical assistance, billing inquiries, or creative consulting.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="p-6 bg-cedar-alabaster/50 rounded-[32px] border border-black/5 group hover:bg-white hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-cedar-forest mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                <h3 className="font-bold text-cedar-midnight text-lg">Direct Inquiry</h3>
                <p className="text-cedar-slate text-sm mt-2 mb-4">Send us an email for detailed assistance.</p>
                <a href="mailto:support@cedar.co" className="text-cedar-forest font-bold text-xs uppercase tracking-widest hover:underline">support@cedar.co</a>
              </div>
              
              <div className="p-6 bg-cedar-alabaster/50 rounded-[32px] border border-black/5 group hover:bg-white hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-cedar-bronze mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <h3 className="font-bold text-cedar-midnight text-lg">Elite Response</h3>
                <p className="text-cedar-slate text-sm mt-2 mb-4">Priority handling for our Elite members.</p>
                <p className="text-cedar-midnight font-bold text-xs uppercase tracking-widest underline decoration-cedar-bronze/50 decoration-2 underline-offset-4 font-body">Under 2 Hour Turnaround</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-cedar-midnight px-4">Frequently Asked</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <summary className="p-6 font-bold text-cedar-midnight cursor-pointer list-none flex justify-between items-center select-none group-open:bg-cedar-alabaster/50 transition-colors">
                  <span className="text-sm md:text-base leading-snug">{faq.q}</span>
                  <span className="material-symbols-outlined text-cedar-bronze transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-8 text-cedar-slate text-sm leading-relaxed border-t border-black/5 animate-in slide-in-from-top-2 duration-300">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-20 text-center">
        <Link href="/" className="inline-flex items-center gap-3 bg-cedar-forest text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl hover:bg-cedar-forest-dark hover:-translate-y-1 transition-all active:scale-95 group">
          Return to Sanctuary
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
