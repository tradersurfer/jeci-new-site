import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";
import MethodicalActionPlan from "@/components/MethodicalActionPlan";
import { Shield, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Foundation() {
  const features = [
    {
      title: "700 Credit Club (90–120 Days)",
      description: "An interactive program to remove negative items—including collections and bankruptcies—restoring personal leverage for business funding."
    },
    {
      title: "Strategic Structural Selection",
      description: "Evaluating tax advantages and legal exposure to select the optimal business structure (LLC, S-Corp, C-Corp) tailored to your strategy."
    },
    {
      title: "Federal & State Compliance",
      description: "Complete handling of EIN applications, state licenses, and registrations to ensure your entity is legally bulletproof from day one."
    },
    {
      title: "Institutional Standards Alignment",
      description: "Ensuring your business structure and data meet the strict 'Anti-Fraud' standards required by major financial institutions and tier-1 lenders."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <SubpageNav />

      {/* Pillar 1 Hero */}
      <section className="pt-32 pb-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2" />
        <div className="container px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-secondary font-black uppercase tracking-widest text-sm mb-6">
              <Shield size={20} /> Pillar 1: Restoration & Formation
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic">The Foundation</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-10">
              We build the legal structure and borrowing power required to scale. We don't just file papers; we build your financial passport.
            </p>
          </div>
        </div>
      </section>

      {/* The Interactive MAP Section */}
      <MethodicalActionPlan />

      {/* Feature Deep Dive */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container px-6">
          <h2 className="text-3xl font-serif font-bold text-primary mb-12 italic">Institutional Readiness Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="mt-1 shrink-0">
                  <CheckCircle2 className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
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