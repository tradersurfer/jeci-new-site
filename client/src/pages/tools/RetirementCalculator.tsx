import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Target, Shield, Users, ArrowLeft, Info, TrendingUp, Download, Share2, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';

const RetirementCalculator = () => {
  const [, setLocation] = useLocation();
  const [readiness, setReadiness] = useState(65);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <header className="bg-slate-900 text-white pt-32 pb-16 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Retirement Readiness</h1>
            <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed font-medium">
              Map your path to financial independence and see exactly when you can stop working.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1400px] mx-auto">
          
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-lg font-black mb-6 text-blue-800 flex items-center gap-2 uppercase tracking-widest">
                <Users size={20} /> Profile & Timeline
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Current Age</label>
                  <input type="number" defaultValue="30" className="w-full p-4 bg-slate-50 rounded-xl font-bold border-2 border-transparent focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Retire Age</label>
                  <input type="number" defaultValue="65" className="w-full p-4 bg-slate-50 rounded-xl font-bold border-2 border-transparent focus:border-blue-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-lg font-black mb-6 text-emerald-800 flex items-center gap-2 uppercase tracking-widest">
                <Target size={20} /> Assets & Savings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Current Assets ($)</label>
                  <input type="number" defaultValue="50000" className="w-full p-4 bg-slate-50 rounded-xl font-bold border-2 border-transparent focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Monthly Contribution ($)</label>
                  <input type="number" defaultValue="1000" className="w-full p-4 bg-slate-50 rounded-xl font-bold border-2 border-transparent focus:border-emerald-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-lg font-black mb-6 text-purple-800 flex items-center gap-2 uppercase tracking-widest">
                <Shield size={20} /> Future Lifestyle
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Desired Annual Income</label>
                  <input type="number" defaultValue="80000" className="w-full p-4 bg-slate-50 rounded-xl font-bold border-2 border-transparent focus:border-purple-500 outline-none" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black h-14 rounded-xl shadow-lg shadow-blue-600/20 uppercase tracking-widest">
                  Calculate Readiness
                </Button>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-blue-500 text-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Nest Egg</h3>
                <p className="text-3xl font-black text-slate-900">$2,450,000</p>
                <p className="text-[10px] text-slate-400 mt-2 italic">Adjusted for 3% inflation</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-emerald-500 text-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Projected Savings</h3>
                <p className="text-3xl font-black text-slate-900">$1,840,200</p>
                <p className="text-[10px] text-slate-400 mt-2 italic">At age 65</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-orange-500 text-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Readiness Score</h3>
                <p className="text-3xl font-black text-slate-900">{readiness}%</p>
                <div className="w-full bg-slate-100 h-2 mt-4 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${readiness}%` }} className="bg-orange-500 h-full" />
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <TrendingUp className="text-blue-500" /> Wealth Projection Timeline
              </h2>
              <div className="h-[400px] w-full bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                <p className="font-serif italic text-slate-500 text-lg">Timeline Engine Ready</p>
                <p className="text-xs text-slate-400 mt-2 uppercase font-black tracking-widest opacity-50">Rendering Projection Map...</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-8 border-blue-600 p-8 rounded-r-3xl">
              <h3 className="font-black text-blue-900 uppercase text-sm tracking-widest mb-2">Institutional Insight</h3>
              <p className="text-blue-800 leading-relaxed font-medium">
                "You have a gap of $609,800 to reach your retirement goal. To bridge this, consider increasing your monthly contributions by $450 or adjusting your target retirement age to 68."
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RetirementCalculator;
