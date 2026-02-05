import React from 'react';
import { useLocation } from "wouter";
import { Landmark, Coins, FileText, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "entity-core",
    title: "Entity & Core Accounting",
    icon: Landmark,
    description: "New entity formation, small business accounting, and existing entity restructuring for maximum protection.",
    tags: ["LLC/S-Corp", "Bookkeeping", "Restructuring"]
  },
  {
    id: "indirect-tax",
    title: "Indirect & Transaction Taxes",
    icon: Coins,
    description: "Expert management of Sales & Use tax filings and complex transaction-level tax tracking for high-volume firms.",
    tags: ["Sales & Use", "Transaction Taxes", "Excise"]
  },
  {
    id: "salt",
    title: "State & Local (SALT)",
    icon: Globe,
    description: "Navigating multi-jurisdictional tax exposure, nexus studies, and state-level compliance requirements.",
    tags: ["Nexus", "Multi-State", "Local Filings"]
  },
  {
    id: "compliance-payroll",
    title: "Compliance & Payroll",
    icon: ShieldCheck,
    description: "Full handling of Payroll, Employment taxes, and non-income regulatory compliance filings.",
    tags: ["Payroll", "Employment Tax", "Compliance"]
  },
  {
    id: "specialty-crypto",
    title: "Specialty & Non-Income",
    icon: FileText,
    description: "Crypto Tax Accounting, Franchise taxes, and specialized reporting for tech-forward and digital asset founders.",
    tags: ["Crypto Tax", "Non-Income", "Property Tax"]
  }
];

export default function SpecialtyGrid() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-20 bg-slate-950 px-6" id="accounting-services">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 italic">Accounting & Entity Formation</h2>
        <p className="text-slate-400 mb-12 max-w-2xl">Institutional-grade tax architecture for founders moving beyond the basics.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-yellow-500/50 transition-all group flex flex-col"
            >
              <div onClick={() => setLocation(`/accounting/${cat.id}`)} className="cursor-pointer flex-grow">
                <cat.icon className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-lg font-bold text-white mb-3 leading-tight">{cat.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{cat.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest bg-slate-800 px-2 py-1 rounded text-yellow-500/80 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-xs font-bold text-yellow-500 group-hover:translate-x-1 transition-transform mb-6">
                  LEARN MORE <ArrowRight size={14} className="ml-1" />
                </div>
              </div>

              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open("https://buy.stripe.com/mock_deposit_50", '_blank');
                }}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold h-10 rounded-lg text-xs"
              >
                $50 STRATEGY DEPOSIT
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
