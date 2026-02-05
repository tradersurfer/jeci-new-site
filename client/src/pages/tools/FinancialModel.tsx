import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, TrendingUp, PieChart, ArrowLeft, Download, 
  Info, ChevronRight, Target, Shield, Rocket, Layout, Zap, Landmark, Globe, FileText, Share2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';

const FinancialModel = () => {
  const [, setLocation] = useLocation();
  const [scenario, setScenario] = useState('likely');
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      {/* Tool Header */}
      <header className="bg-green-600 text-white pt-32 pb-16 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Dynamic Financial Model</h1>
            <p className="max-w-3xl mx-auto text-lg text-green-50 leading-relaxed font-medium">
              Map your business trajectory with institutional precision. Build 3-5 year projections with multi-scenario simulations.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1500px] mx-auto">
          
          {/* Left Panel: Controls */}
          <aside className="lg:w-1/3 xl:w-1/4 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b pb-4">
                <Target className="text-green-600" /> Assumptions
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Starting Revenue ($)</label>
                    <Info size={14} className="text-slate-300 cursor-help" />
                  </div>
                  <input type="number" defaultValue="10000" className="w-full p-4 bg-slate-50 rounded-xl border-2 border-transparent focus:border-green-500 focus:bg-white transition-all font-bold text-lg outline-none" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Monthly Growth (%)</label>
                    <Info size={14} className="text-slate-300 cursor-help" />
                  </div>
                  <input type="number" defaultValue="5" className="w-full p-4 bg-slate-50 rounded-xl border-2 border-transparent focus:border-green-500 focus:bg-white transition-all font-bold text-lg outline-none" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Profit Margin (%)</label>
                    <Info size={14} className="text-slate-300 cursor-help" />
                  </div>
                  <input type="number" defaultValue="25" className="w-full p-4 bg-slate-50 rounded-xl border-2 border-transparent focus:border-green-500 focus:bg-white transition-all font-bold text-lg outline-none" />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-black h-14 rounded-xl shadow-lg shadow-green-600/20 text-lg uppercase tracking-wider">
                  Generate Model
                </Button>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button variant="outline" className="border-slate-200 text-slate-600 font-bold h-12 rounded-xl">
                    <Download size={18} className="mr-2" /> PDF
                  </Button>
                  <Button variant="outline" className="border-slate-200 text-slate-600 font-bold h-12 rounded-xl">
                    <Share2 size={18} className="mr-2" /> Share
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
                <Zap size={20} /> Pro-Tip
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                "Growth is rarely linear. Always model for a 'Burn Month' to ensure your liquidity rails can handle seasonal shifts."
              </p>
            </div>
          </aside>

          {/* Right Panel: Results */}
          <section className="lg:w-2/3 xl:w-3/4 space-y-8">
            {/* Scenario Selector */}
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-wrap items-center gap-6 shadow-sm">
              <span className="font-black text-green-800 uppercase text-sm tracking-widest">Simulation Mode:</span>
              <div className="flex bg-white p-1 rounded-xl shadow-inner border border-green-100">
                {['Bear Case', 'Most Likely', 'Bull Case'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScenario(s.toLowerCase())}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                      scenario === s.toLowerCase() ? "bg-green-600 text-white shadow-md" : "text-slate-500 hover:text-green-600"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Visuals */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="text-blue-500" /> Projected Revenue Growth
                </h2>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border">
                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Revenue
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border">
                    <div className="w-2 h-2 rounded-full bg-green-500" /> Profit
                  </span>
                </div>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-[400px] w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <PieChart size={64} strokeWidth={1} className="mb-4 opacity-20" />
                <p className="font-serif italic text-lg text-slate-500">Visualization Engine Initializing...</p>
                <p className="text-sm">Model calculated for {scenario} scenario</p>
              </div>
            </div>

            {/* Financial Statement Tab */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="flex bg-slate-50 border-b">
                <button className="px-8 py-4 text-sm font-black uppercase tracking-widest text-green-600 border-b-2 border-green-600 bg-white">
                  Income Statement
                </button>
                <button className="px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                  Cash Flow
                </button>
                <button className="px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                  KPI Dashboard
                </button>
              </div>
              
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Metric</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Year 1</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Year 2</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Year 3</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Year 4</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Year 5</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-green-50/50 transition-colors">
                      <td className="p-6 font-bold text-slate-700">Total Revenue</td>
                      <td className="p-6 text-right font-mono">$120,000</td>
                      <td className="p-6 text-right font-mono">$185,000</td>
                      <td className="p-6 text-right font-mono">$290,000</td>
                      <td className="p-6 text-right font-mono">$450,000</td>
                      <td className="p-6 text-right font-mono">$720,000</td>
                    </tr>
                    <tr className="hover:bg-green-50/50 transition-colors">
                      <td className="p-6 font-bold text-slate-700">Cost of Goods</td>
                      <td className="p-6 text-right font-mono text-red-500">($30,000)</td>
                      <td className="p-6 text-right font-mono text-red-500">($46,250)</td>
                      <td className="p-6 text-right font-mono text-red-500">($72,500)</td>
                      <td className="p-6 text-right font-mono text-red-500">($112,500)</td>
                      <td className="p-6 text-right font-mono text-red-500">($180,000)</td>
                    </tr>
                    <tr className="bg-green-50 font-black">
                      <td className="p-6 text-green-900 uppercase text-xs tracking-tighter">Net Operating Income</td>
                      <td className="p-6 text-right font-mono text-green-700">$90,000</td>
                      <td className="p-6 text-right font-mono text-green-700">$138,750</td>
                      <td className="p-6 text-right font-mono text-green-700">$217,500</td>
                      <td className="p-6 text-right font-mono text-green-700">$337,500</td>
                      <td className="p-6 text-right font-mono text-green-700">$540,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FinancialModel;
