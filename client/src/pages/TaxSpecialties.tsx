import React from 'react';
import { useParams () } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";
import { ShieldCheck, Coins, Building2, Leaf } from "lucide-react";

const specialtyContent: Record<string, any> = {
  "crypto": {
    title: "Crypto Specialist",
    icon: <Coins className="text-yellow-500 w-12 h-12" />,
    description: "Expert digital asset accounting for high-volume traders and tech-forward founders.",
    details: [
      "On-chain transaction reconciliation",
      "Cost-basis and capital gains reporting",
      "Stablecoin regulatory compliance",
      "DeFi and NFT tax positioning"
    ]
  },
  "real-estate": {
    title: "Real Estate Focus",
    icon: <Building2 className="text-yellow-500 w-12 h-12" />,
    description: "Strategic tax planning for property investors and real estate portfolios.",
    details: [
      "Portfolio legal restructuring",
      "1031 Exchange tax navigation",
      "Cost segregation oversight",
      "Passive loss strategy optimization"
    ]
  },
  "cannabis": {
    title: "Cannabis Compliance",
    icon: <Leaf className="text-yellow-500 w-12 h-12" />,
    description: "Specialized 280E navigation and state-specific regulatory tax filings.",
    details: [
      "Section 280E tax mitigation",
      "Inventory and COGS accounting",
      "State and local licensing compliance",
      "Seed-to-sale financial hygiene"
    ]
  }
};

export default function TaxSpecialties() {
  const params = useParams();
  const content = specialtyContent[params.id || 'crypto'] || specialtyContent['crypto'];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SubpageNav />
      <div className="max-w-5xl mx-auto py-32 px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mb-6 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            {content.icon}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {content.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.details.map((item: string) => (
            <div key={item} className="flex items-center gap-4 bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-yellow-500/30 transition-all">
              <ShieldCheck className="text-yellow-500 shrink-0" size={24} />
              <span className="text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-yellow-500 rounded-3xl text-slate-950 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 italic uppercase tracking-tighter">Ready for Institutional Readiness?</h2>
          <p className="text-lg font-medium mb-8">Schedule a deep-dive strategy session for your specific tax landscape.</p>
          <Link href="/book-consultation">
             <button className="bg-slate-950 text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer">
              Book My Consultation
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}