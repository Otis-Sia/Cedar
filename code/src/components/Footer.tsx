import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
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
        <Link
          className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors"
          href="/privacy"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors"
          href="/terms"
        >
          Terms & Conditions
        </Link>
        <Link
          className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors"
          href="/support"
        >
          Support
        </Link>
        <a
          className="text-[13px] font-medium text-cedar-slate hover:text-cedar-forest transition-colors"
          href="https://instagram.com/cedar"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
