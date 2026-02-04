import React from 'react';
import { useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const specialtyContent: Record<string, any> = {
  "crypto": {
    title: "Crypto Specialist",
    description: "Digital asset accounting and on-chain compliance for innovative founders.",
    details: ["On-chain transaction reconciliation", "Stablecoin regulation summaries", "Cost-basis tracking", "DeFi/NFT tax positioning"]
  },
  "real-estate": {
    title: "Real Estate Focus",
    description: "Optimizing portfolios through specialized entity restructuring and SALT strategies.",
    details: ["Portfolio legal restructuring", "Cost segregation oversight", "Passive loss strategy", "Property tax nexus analysis"]
  },
  "cannabis": {
    title: "Cannabis Compliance",
    description: "Navigating the complexities of 280E and state-level regulatory filings.",
    details: ["280E tax navigation", "Seed-to-sale financial hygiene", "Inventory cost accounting", "State/Local licensing compliance"]
  }
};

export default function TaxSpecialties() {
  const params = useParams();
  const content = specialtyContent[params.id || 'crypto'];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-32 px-6 text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-6">{content.title}</h1>
        <p className="text-xl text-slate-400 mb-12">{content.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {content.details.map((item: string) => (
            <div key={item} className="bg-slate-900 p-4 rounded-lg border border-slate-800">
              <span className="text-yellow-500 mr-2">✓</span> {item}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}