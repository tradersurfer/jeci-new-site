import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, PieChart, ArrowLeft, Download, Info, ChevronRight, Zap, Landmark, BarChart3, Plus, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';

const WeeklyTracker = () => {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState([
    { id: 1, type: 'revenue', desc: 'Stripe Payout - Web Sales', amount: 4500, date: 'Feb 5' },
    { id: 2, type: 'opex', desc: 'AWS Infrastructure', amount: 120, date: 'Feb 4' },
    { id: 3, type: 'opex', desc: 'Monthly Rent - DC Office', amount: 1200, date: 'Feb 1' },
  ]);

  const totalRevenue = items.filter(i => i.type === 'revenue').reduce((acc, i) => acc + i.amount, 0);
  const totalExpenses = items.filter(i => i.type === 'opex').reduce((acc, i) => acc + i.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <header className="bg-emerald-600 text-white pt-32 pb-16 shadow-lg relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Business Finance Pulse</h1>
            <p className="text-emerald-50 text-lg font-medium opacity-80 uppercase tracking-[0.2em]">Weekly Profit & Loss Statement</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-emerald-600 font-bold h-12 px-6 rounded-xl">
              Export Statement
            </Button>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold h-12 px-6 rounded-xl">
              Clear Data
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 max-w-[1400px] mx-auto">
          {[
            { label: 'Gross Revenue', value: totalRevenue, color: 'border-emerald-500', text: 'text-emerald-600' },
            { label: 'Total OPEX', value: totalExpenses, color: 'border-amber-500', text: 'text-amber-600' },
            { label: 'Net Income', value: netIncome, color: 'border-blue-500', text: 'text-blue-600' },
            { label: 'Est. Take Home', value: netIncome * 0.75, color: 'border-indigo-600', text: 'text-indigo-700' },
          ].map((stat, i) => (
            <div key={i} className={cn("bg-white p-6 rounded-3xl shadow-xl border-b-8", stat.color)}>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</h3>
              <p className={cn("text-3xl font-black", stat.text)}>${stat.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1400px] mx-auto">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b pb-4">Line-Item Statement</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                  <span>Operating Revenue</span>
                  <span className="text-emerald-600 text-lg font-black">${totalRevenue.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                  <span>Operating Expenses (OPEX)</span>
                  <span className="text-amber-600 text-lg font-black">(${totalExpenses.toLocaleString()}.00)</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center mt-8">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Net Operating Income</span>
                  <span className="text-3xl font-black text-slate-900">${netIncome.toLocaleString()}.00</span>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl flex justify-between items-center shadow-2xl">
                  <div className="text-white">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] block mb-1">Final Take-Home</span>
                    <span className="text-emerald-400 text-3xl font-black">${(netIncome * 0.75).toLocaleString()}.00</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Est. Tax (25%)</span>
                    <span className="text-slate-400 font-mono text-sm">-${(netIncome * 0.25).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="text-emerald-600" /> Add Transaction
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Type</label>
                    <select className="w-full p-4 bg-slate-50 rounded-xl font-bold border-2 border-transparent focus:border-emerald-500 outline-none text-sm">
                      <option>Revenue</option>
                      <option>Expense (OPEX)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Amount ($)</label>
                    <input type="number" placeholder="0.00" className="w-full p-4 bg-slate-50 rounded-xl font-bold border-2 border-transparent focus:border-emerald-500 outline-none text-lg" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Description</label>
                  <input type="text" placeholder="e.g. Client Payout, Rent, etc." className="w-full p-4 bg-slate-50 rounded-xl font-bold border-2 border-transparent focus:border-emerald-500 outline-none" />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black h-14 rounded-xl shadow-lg shadow-emerald-600/20 text-lg">
                  Record Entry
                </Button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <h2 className="text-xl font-bold mb-6">Recent History</h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{item.type}</span>
                      <span className="text-sm font-bold text-slate-800">{item.desc}</span>
                      <span className="text-[10px] text-slate-400 block mt-1">{item.date}</span>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-lg font-black", item.type === 'revenue' ? 'text-emerald-600' : 'text-slate-900')}>
                        {item.type === 'revenue' ? '+' : '-'}${item.amount.toLocaleString()}
                      </p>
                      <button className="text-[10px] font-black text-red-400 uppercase tracking-tighter hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WeeklyTracker;
