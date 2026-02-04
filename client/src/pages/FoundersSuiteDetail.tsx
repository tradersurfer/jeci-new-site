import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";
import { CheckCircle2, Shield, Rocket, Target, Briefcase } from "lucide-react";

export default function FoundersSuiteDetail() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SubpageNav />

      <div className="max-w-5xl mx-auto py-32 px-6">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-black uppercase tracking-[0.3em] text-sm italic">Pillar 4: Elite Operations</span>
          <h1 className="text-6xl font-bold mt-4 mb-6 tracking-tighter">The Founders’ Operations Suite</h1>
          <p className="text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Stop managing vendors. Start leading your vision. Our all-inclusive monthly retainer provides the fractional C-Suite team you need for total financial sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white italic border-l-4 border-yellow-500 pl-6">Institutional Readiness Checklist</h2>
            <p className="text-slate-400 leading-relaxed">
              We don't just "do tasks"—we build infrastructure. The Suite ensures your back-office meets the rigorous standards required for high-level institutional funding and capital.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: <Shield className="text-yellow-500" />, text: "Clean Ledger Hygiene (Lending-Ready)" },
                { icon: <Target className="text-yellow-500" />, text: "Strategic Tax Structure Optimization" },
                { icon: <Briefcase className="text-yellow-500" />, text: "Automated Operational Workflows" },
                { icon: <Rocket className="text-yellow-500" />, text: "Market-Leading Digital Presence" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  {item.icon}
                  <span className="font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-3xl border border-yellow-500/20 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 text-yellow-500">Suite Monthly Retainer Inclusions:</h3>
            <ul className="space-y-6">
              {[
                "Monthly Full-Service Bookkeeping",
                "Advanced SALT & Compliance Tax Management",
                "Managed Social Media Strategy (1 Platform)",
                "Monthly Policy Research Briefings",
                "Unlimited Priority Consulting Access",
                "Quarterly Financial Performance Audits"
              ].map(item => (
                <li key={item} className="flex items-start gap-4 text-slate-300">
                  <CheckCircle2 className="text-yellow-500 mt-1 shrink-0" size={20} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-yellow-500 p-12 rounded-[3rem] text-slate-950 text-center shadow-2xl shadow-yellow-500/10">
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter italic">Claim Your Sovereignty</h2>
          <p className="text-xl font-medium mb-10 max-w-xl mx-auto">Investment starts at $3,000/mo for the full managed operations experience.</p>
          <button className="bg-slate-950 text-white px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
            Apply for the Suite Retainer
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}