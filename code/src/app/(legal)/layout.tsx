import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="pt-24 md:pt-32 pb-24 md:pb-32 px-6 lg:px-12 max-w-[1000px] mx-auto min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
