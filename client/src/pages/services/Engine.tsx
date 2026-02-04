import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";
import SpecialtyGrid from "@/components/SpecialtyGrid"; // Using the 5-category grid here
import { Calculator, CheckCircle2 } from "lucide-react";

export default function Engine() {
  const operationsFeatures = [
    { title: "General Ledger Hygiene", desc: "Monthly hunt for discrepancies, double-billings, and unrecorded expenses." },
    { title: "Bank Reconciliation", desc: "Identify lost checks and unauthorized wire transactions to prevent embezzlement." },
    { title: "Income Statement Reporting", desc: "Track revenue trends and operating performance for bank-readiness." },
    { title: "Balance Sheet Analysis", desc: "Quantify financial strength and receivables to prepare for expansion capital." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <SubpageNav />

      {/* Pillar 2 Hero */}
      <section className="pt-32 pb-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 transform translate-x-1/2" />
        <div className="container px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-yellow-500 font-black uppercase tracking-widest text-sm mb-6">
              <Calculator size={20} /> Pillar 2: Accounting & Operations
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic text-white">The Engine</h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-10">
              Back-office complexity, managed. We build the financial engine that powers your sovereignty, ensuring every transaction is a brick in your fortress.
            </p>
          </div>
        </div>
      </section>

      {/* The 5-Category Specialty Grid */}
      <div className="bg-slate-50 border-y border-slate-200">
        <SpecialtyGrid />
      </div>

      {/* Operations Deep Dive */}
      <section className="py-24 bg-white">
        <div className="container px-6">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-12 italic">Back-Office Integrity Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {operationsFeatures.map((feature, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="mt-1 shrink-0">
                  <CheckCircle2 className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}