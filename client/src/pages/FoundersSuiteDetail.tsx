import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Check, Star } from "lucide-react";

export default function FoundersSuiteDetail() {
  return (
    <div className="min-h-screen bg-primary text-white pt-32 pb-20">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-secondary hover:text-white mb-12 font-bold group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="space-y-12">
          <div className="inline-block px-4 py-1 bg-secondary text-primary rounded-full text-xs font-black uppercase tracking-widest">Premium Retainer</div>
          <h1 className="text-6xl font-serif font-bold leading-tight">The Founders’ Operations Suite</h1>
          <p className="text-2xl text-white/70 italic">"$3,000/mo Retainer for Total Financial Sovereignty."</p>
          <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary italic">Complete Back-Office Management</h3>
              <ul className="space-y-4">
                {['Full-Service Bookkeeping', 'Managed Social Platform', 'Policy Research Briefing', 'Unlimited Expert Consultations'].map(item => (
                  <li key={item} className="flex items-center gap-3"><Check className="text-secondary" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 p-8 rounded-sm border border-white/10">
              <Star className="text-secondary mb-4" />
              <p className="text-white/80 italic">"Instead of buying a 'tax return', you are investing in a dedicated operations team."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
