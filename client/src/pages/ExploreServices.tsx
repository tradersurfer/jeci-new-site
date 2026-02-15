import React, { useState } from 'react';
import { useLocation } from "wouter";
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between w-full text-left font-semibold hover:text-yellow-500 transition-colors"
      >
        {question} {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && <p className="mt-2 text-slate-400 text-sm leading-relaxed">{answer}</p>}
    </div>
  );
};

export default function ExploreServices() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('accounting'); 

  const sections = {
    accounting: [
      { name: "New Entity Formation", desc: "Strategic LLC/S-Corp/C-Corp full setup(the JECI Way) with Methodical Action Plans. You may now choose AI employees, powered by JECI AI." },
      { name: "Small Business Accounting", desc: "Full-service bookkeeping (monthly/quartely) and GL hygiene for bank-readiness, powered by JECI AI-agentic assistants." },
      { name: "Payroll & HR", desc: "Quarterly/Annual FICA, SUTA/FUTA, Employees & Contractors (W-2, W-4, 1099) and employee onboarding." },
      { name: "Individual & Business Taxes", desc: "Federal & state income tax filings (1040), Business Tax (Sch. C, 1120(S), 1065) with IRS-ready documentation." },
      { name: "Indirect Taxes", desc: "Sales & Use tax filings and transaction-level tracking." },
      { name: "State and Local Taxes (SALT)", desc: "Multi-jurisdictional compliance and nexus studies." },
      { name: "Compliance & Transaction Taxes", desc: "Payroll, Employment, and specific non-income tax filings." },
      { name: "Crypto Tax Accounting", desc: "On-chain transaction reconciliation and digital asset reporting." }
    ],
    marketing: [
      { name: "SEO Mastery", desc: "Advanced technical SEO and foundational keyword audits." },
      { name: "Content Strategy", desc: "Core content marketing calendars and strategic mapping." },
      { name: "Social Media", desc: "Full managed strategy for primary platforms." }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SubpageNav />
      <div className="max-w-6xl mx-auto py-24 px-6">
        <h1 className="text-5xl font-bold text-yellow-500 mb-8 text-center uppercase tracking-tighter italic">Service Catalog</h1>

        <div className="flex justify-center gap-4 mb-12">
          {['accounting', 'marketing'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tab === 'accounting' ? 'Accounting & Entity' : 'Digital Marketing'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {sections[activeTab as keyof typeof sections].map((service) => (
            <div key={service.name} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-yellow-500/50 transition-all group">
              <h3 className="text-xl font-bold text-yellow-500 mb-2">{service.name}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{service.desc}</p>
              <button 
                onClick={() => setLocation('/book-consultation')} 
                className="text-xs font-black text-yellow-500/80 hover:text-yellow-500 uppercase tracking-widest"
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/50 p-10 rounded-3xl border border-slate-800 shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 italic uppercase tracking-tighter">Service Intelligence FAQ</h2>
          <FAQItem 
            question="How does existing entity restructuring work?" 
            answer="We review your current legal exposure and tax structure to optimize for 'Institutional Readiness' and borrowing power." 
          />
          <FAQItem 
            question="What is included in the Crypto Tax package?" 
            answer="Full on-chain reconciliation, stablecoin regulation summaries, and IRS-ready reporting." 
          />
          <FAQItem 
            question="Do you handle multi-state nexus issues?" 
            answer="Yes, our SALT (State and Local Tax) services focus specifically on complex multi-jurisdictional compliance." 
          />
          <FAQItem 
            question="What is a 'Hill-Ready' briefing?" 
            answer="A high-level regulatory summary designed for tech-forward founders to navigate shifting legal landscapes." 
          />
          <FAQItem 
            question="Can I bundle SEO with Bookkeeping?" 
            answer="Absolutely. This is the foundation of our $3,000/mo Founders' Operations Suite." 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}