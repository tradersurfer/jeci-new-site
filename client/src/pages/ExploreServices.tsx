import React, { useState } from 'react';
import { useLocation } from "wouter";
import { ChevronDown, ChevronUp, Landmark, Coins, Globe, ShieldCheck, FileText } from 'lucide-react';

const FAQ = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between w-full text-left font-semibold hover:text-yellow-500 transition-colors">
        {question} {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && <p className="mt-2 text-slate-400 text-sm leading-relaxed">{answer}</p>}
    </div>
  );
};

export default function ExploreServices() {
  const [location, setLocation] = useLocation();
  // FIXED: Explicitly defining activeTab state to prevent ReferenceError
  const [activeTab, setActiveTab] = useState('accounting'); 

  const sections = {
    accounting: [
      { name: "New Entity Formation", desc: "Strategic LLC/S-Corp setup with Methodical Action Plans." },
      { name: "Indirect Taxes", desc: "Sales & Use tax filings and transaction-level tracking." },
      { name: "SALT", desc: "State and Local Tax multi-jurisdictional compliance." },
      { name: "Compliance Taxes", desc: "Payroll, Employment, and regulatory filings." },
      { name: "Crypto Tax Accounting", desc: "Specialized digital asset and on-chain reporting." }
    ],
    marketing: [
      { name: "SEO Mastery", desc: "Advanced technical SEO and foundational keyword audits." },
      { name: "Content Strategy", desc: "Core content marketing calendars and strategic mapping." },
      { name: "Social Media", desc: "Full managed strategy for primary platforms." }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-yellow-500 mb-8 text-center">Service Ecosystem</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('accounting')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'accounting' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
          >
            Accounting & Tax
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'marketing' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
          >
            Digital Marketing
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {sections[activeTab as keyof typeof sections].map((service) => (
            <div key={service.name} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-yellow-500 mb-2">{service.name}</h3>
              <p className="text-slate-400 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
          <h2 className="text-3xl font-bold mb-8">Service Intelligence FAQ</h2>
          <FAQ question="How does existing entity restructuring work?" answer="We review your current legal exposure and tax structure to optimize for 'Institutional Readiness' and borrowing power." />
          <FAQ question="What is included in the Crypto Tax package?" answer="Full on-chain reconciliation, stablecoin regulation summaries, and IRS-ready reporting." />
          <FAQ question="Do you handle multi-state nexus issues?" answer="Yes, our SALT (State and Local Tax) services focus specifically on complex multi-jurisdictional compliance." />
          <FAQ question="What is a 'Hill-Ready' briefing?" answer="A high-level regulatory summary designed for tech-forward founders to navigate shifting legal landscapes." />
          <FAQ question="Can I bundle SEO with Bookkeeping?" answer="Absolutely. This is the foundation of our $3,000/mo Founders' Operations Suite." />
        </div>
      </div>
    </div>
  );
}