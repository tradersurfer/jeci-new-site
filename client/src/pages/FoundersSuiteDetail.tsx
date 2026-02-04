import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function FoundersSuiteDetail() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto py-32 px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">The Founders' Operations Suite</h1>
          <p className="text-2xl text-slate-400">Monthly Retainer for Total Financial Sovereignty.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-yellow-500">What is Sovereignty?</h2>
            <p className="text-slate-400 leading-relaxed">It is the end of vendor fatigue. No more separate calls with accountants, marketers, and advisors. We are your integrated back-office team.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-2xl border border-yellow-500/20">
            <h3 className="text-xl font-bold mb-6">Suite Inclusions:</h3>
            <ul className="space-y-4">
              {["Monthly Full-Service Bookkeeping", "Managed Social Platform (1)", "Monthly Policy Research Briefing", "Unlimited Consulting", "General Ledger Hygiene"].map(item => (
                <li key={item} className="flex items-center gap-3"><CheckCircle2 className="text-yellow-500" /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}