import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, PieChart, ArrowLeft, Download, Info, ChevronRight, Globe, Shield, Landmark, Briefcase, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';

const WealthDiversification = () => {
  const [, setLocation] = useLocation();
  const [totalNetWorth, setTotalNetWorth] = useState(1250000);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <header className="bg-slate-950 text-white pt-32 pb-16 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px]" />
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Wealth Architect</h1>
            <p className="text-slate-400 text-lg font-medium">Diversification Strategy & Concentration Risk Analysis</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-10 py-6 rounded-3xl shadow-2xl text-center min-w-[300px] border-b-4 border-blue-600">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2">Consolidated Net Worth</span>
            <p className="text-4xl font-black text-white tracking-tighter">${totalNetWorth.toLocaleString()}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-[1500px] mx-auto">
          
          <aside className="xl:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
              <h2 className="text-xs font-black text-blue-700 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Zap size={16} /> Liquid Assets
              </h2>
              <div className="space-y-4">
                {['Cash & Savings', 'Brokerage (Stocks/ETFs)', 'Crypto Holdings'].map((label) => (
                  <div key={label} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-blue-500 transition-all">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</label>
                    <input type="number" defaultValue="50000" className="w-full bg-transparent font-black text-xl outline-none" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
              <h2 className="text-xs font-black text-emerald-700 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Landmark size={16} /> Business & Real Estate
              </h2>
              <div className="space-y-4">
                {['Primary Business Value', 'Investment Real Estate', 'Private Equity'].map((label) => (
                  <div key={label} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-emerald-500 transition-all">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</label>
                    <input type="number" defaultValue="50000" className="w-full bg-transparent font-black text-xl outline-none" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="xl:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Liquidity Ratio', value: '24.2%', goal: '> 20% target', color: 'text-blue-600' },
                { label: 'Concentration Risk', value: 'Low', goal: 'Diversified portfolio', color: 'text-slate-900' },
                { label: 'Debt-to-Asset', value: '18.5%', goal: 'Well capitalized', color: 'text-emerald-600' },
              ].map((metric, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{metric.label}</h3>
                  <p className={cn("text-3xl font-black mb-1", metric.color)}>{metric.value}</p>
                  <p className="text-[10px] text-slate-400 font-bold italic">{metric.goal}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-8 border-b pb-4">Asset Allocation</h2>
                <div className="h-[300px] w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                  <PieChart className="text-slate-300 mb-2" size={48} />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Doughnut Render Area</p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-8 border-b pb-4">Liquidity Analysis</h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                      <span>Liquid (Cash/Stocks)</span>
                      <span className="text-blue-600">$450,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[35%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                      <span>Illiquid (Biz/RE)</span>
                      <span className="text-emerald-600">$800,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[65%]" />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-50">
                    <p className="text-xs italic text-slate-500 leading-relaxed font-medium">
                      "Entrepreneurs are often 'Asset Rich, Cash Poor.' This analysis ensures your lifestyle isn't trapped in your operations."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WealthDiversification;
