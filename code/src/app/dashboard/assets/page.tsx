import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cedar | Assets",
};

export default function AssetsPage() {
  return (
    <div className="px-4 sm:px-8 md:px-12 py-10">
      <h2 className="font-headline text-3xl font-bold text-cedar-midnight mb-6">
        Assets
      </h2>
      <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm text-cedar-slate">
        <p>This page is currently under implementation.</p>
      </div>
    </div>
  );
}
