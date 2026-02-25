import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, TrendingUp, Scale, ChevronRight, CheckCircle2, Star,
  FileText, Lock, Zap, ArrowRight, Plus, Minus, Quote, User, ArrowLeft,
  Check, LayoutDashboard, LogOut, AlertCircle, BarChart3, MessageSquare,
  ChevronDown, Activity, Copy, MailQuestion, X, Award, Users, Eye, Send,
  Smartphone, Home, Briefcase, Mail, Menu, Building2, DollarSign,
  Target, Shield, TrendingDown, Clock, Phone, ChevronLeft, BookOpen,
  BadgeCheck, Landmark, Key, BarChart, PieChart, Layers, Globe
} from 'lucide-react';

// ─────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="border-b border-slate-800">
    <button onClick={onClick} className="w-full py-6 flex justify-between items-center text-left hover:text-yellow-500 transition-colors">
      <span className="text-lg font-bold uppercase tracking-tighter italic">{title}</span>
      {isOpen ? <Minus className="w-5 h-5 text-yellow-500" /> : <Plus className="w-5 h-5 text-slate-500" />}
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[600px] pb-6' : 'max-h-0'}`}>
      <div className="text-slate-400 leading-relaxed text-sm md:text-base">{children}</div>
    </div>
  </div>
);

const PriceCard = ({ title, price, subtitle, features, highlighted, badge, onAction, cta = "Join the Club" }) => (
  <div className={`relative p-8 rounded-3xl border transition-all duration-500 flex flex-col ${
    highlighted ? 'bg-slate-900 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.15)] scale-105 z-10'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'
  }`}>
    {highlighted && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
        {badge || 'Most Popular'}
      </span>
    )}
    <h3 className="text-2xl font-black text-yellow-500 uppercase italic tracking-tighter mb-1">{title}</h3>
    <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">{subtitle}</p>
    {price !== null && (
      <div className="mb-8">
        <span className="text-4xl font-black italic">$</span>
        <span className="text-6xl font-black italic tracking-tighter">{price}</span>
        <span className="text-slate-500 text-sm font-bold uppercase ml-2">/ month</span>
      </div>
    )}
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
          <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          {f}
        </li>
      ))}
    </ul>
    <button
      onClick={() => onAction(title)}
      className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
        highlighted ? 'bg-yellow-500 text-slate-950 hover:bg-yellow-400' : 'bg-slate-800 text-white hover:bg-slate-700'
      }`}
    >{cta}</button>
  </div>
);

const ScoreGauge = ({ score }) => {
  const percentage = (score - 300) / (850 - 300);
  const strokeDash = percentage * 283;
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="96" cy="96" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-800" />
        <circle cx="96" cy="96" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="283"
          style={{ strokeDashoffset: 283 - strokeDash }} className="text-yellow-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-black italic tracking-tighter leading-none">{score}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">FICO® 8</span>
      </div>
    </div>
  );
};

const SectionTag = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
    </span>
    {children}
  </div>
);

const StatBadge = ({ value, label, prefix = '' }) => (
  <div className="text-center p-8 bg-slate-900/50 rounded-[2rem] border border-slate-800">
    <div className="text-5xl md:text-6xl font-black italic tracking-tighter text-yellow-500 leading-none mb-2">{prefix}{value}</div>
    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">{label}</div>
  </div>
);

// ─────────────────────────────────────────
// LOGIN / PORTAL COMPONENTS
// ─────────────────────────────────────────

const LoginScreen = ({ onLogin, onBack }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setLoading(true); setTimeout(() => { onLogin(); setLoading(false); }, 1500); };
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Home
      </button>
      <div className="max-w-md w-full space-y-8 bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full" />
        <div className="text-center relative">
          <div className="w-16 h-16 bg-yellow-500 rounded-2xl rotate-12 flex items-center justify-center mx-auto mb-6">
            <Lock className="text-slate-950 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">Member Login</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">700 Credit Club Experts Portal</p>
        </div>
        <form className="space-y-4 relative" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
            <input type="email" required placeholder="member@700credit.com" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-yellow-500 outline-none transition-all text-white font-bold" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
            <input type="password" required placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-yellow-500 outline-none transition-all text-white font-bold" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-5 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> : "Authorize Entry"}
          </button>
        </form>
        <div className="text-center">
          <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-yellow-500 transition-colors">Forgot Credentials?</a>
        </div>
      </div>
    </div>
  );
};

const MemberPortal = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedSection, setExpandedSection] = useState(null);
  const disputeItems = [
    { bureau: "Experian", item: "LVNV Funding", type: "Collection", status: "In Investigation", date: "Feb 10, 2026" },
    { bureau: "TransUnion", item: "Medical Recoveries", type: "Debt", status: "Successful Deletion", date: "Jan 28, 2026" },
    { bureau: "Equifax", item: "Hard Inquiry (Unknown)", type: "Inquiry", status: "Pending Response", date: "Feb 02, 2026" },
    { bureau: "Experian", item: "Capital One (Late)", type: "Late Payment", status: "In Investigation", date: "Feb 14, 2026" },
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900/50 border-r border-slate-800 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg rotate-12 flex items-center justify-center">
            <ShieldCheck className="text-slate-950 w-5 h-5" />
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase leading-none">700<span className="text-yellow-500">Club</span></span>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'disputes', label: 'Dispute Center', icon: Scale },
            { id: 'intelligence', label: 'AI Intelligence', icon: Zap },
            { id: 'messages', label: 'Case Manager', icon: MessageSquare },
            { id: 'documents', label: 'Legal Docs', icon: FileText },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all ${activeTab === item.id ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:bg-slate-800 hover:text-white'}`}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>
      <main className="flex-grow p-4 md:p-10 max-h-screen overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Intelligence Briefing</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Client Profile: #3901-VX-22</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 px-5 py-3 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center"><User className="text-yellow-500 w-5 h-5" /></div>
            <div>
              <p className="text-xs font-black italic uppercase leading-none">Marcus V.</p>
              <p className="text-[10px] text-green-500 font-bold uppercase">700 Club VIP Member</p>
            </div>
          </div>
        </header>
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {[
                { label: "Score Gain", val: "+84 pts", color: "text-green-500" },
                { label: "Items Deleted", val: "7", color: "text-yellow-500" },
                { label: "Days Active", val: "38", color: "text-blue-400" },
                { label: "Debt Removed", val: "$14,200", color: "text-red-400" },
              ].map(s => (
                <div key={s.label} className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 text-center">
                  <div className={`text-2xl font-black italic ${s.color}`}>{s.val}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)]" />
                <ScoreGauge score={712} />
                <div className="flex items-center gap-2 text-green-500 font-black italic text-sm mt-4">
                  <TrendingUp className="w-4 h-4" /> +84 Points This Cycle
                </div>
                <p className="text-[10px] text-slate-600 font-bold uppercase mt-2">Started at 628</p>
              </div>
              <div className="lg:col-span-2 bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter">Profile Metrics</h3>
                  <BarChart3 className="text-slate-700 w-5 h-5" />
                </div>
                <div className="space-y-6">
                  {[
                    { label: "On-Time Payments", val: "92%", color: "text-yellow-500" },
                    { label: "Credit Utilization", val: "14%", color: "text-green-500" },
                    { label: "Profile Maturity", val: "4.2 Yrs", color: "text-blue-500" },
                    { label: "Negative Items", val: "3 Remaining", color: "text-red-400", bar: "40%" }
                  ].map(stat => (
                    <div key={stat.label}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold uppercase text-slate-500 tracking-widest">{stat.label}</span>
                        <span className={`text-sm font-black italic ${stat.color}`}>{stat.val}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-current ${stat.color} transition-all duration-1000`} style={{ width: stat.bar || (stat.val.includes('%') ? stat.val : '60%') }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">Active Dispute Tracker</h3>
                <span className="bg-slate-950 px-4 py-1.5 rounded-full border border-slate-800 text-[10px] font-black uppercase text-yellow-500 tracking-widest">4 Items Processing</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800">
                      {['Bureau','Entity / Case','Status','Initiated'].map(h => (
                        <th key={h} className={`pb-4 text-[10px] font-black uppercase tracking-widest text-slate-600 ${h === 'Status' ? 'text-center' : h === 'Initiated' ? 'text-right' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {disputeItems.map((item, i) => (
                      <tr key={i} className="group hover:bg-slate-800/20 transition-colors">
                        <td className="py-5 font-black italic uppercase text-xs text-yellow-500">{item.bureau}</td>
                        <td className="py-5">
                          <p className="font-bold text-sm text-white leading-none">{item.item}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">{item.type}</p>
                        </td>
                        <td className="py-5">
                          <div className={`mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter w-fit border ${
                            item.status === 'Successful Deletion' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                          }`}><Activity className="w-3 h-3" /> {item.status}</div>
                        </td>
                        <td className="py-5 text-right font-mono text-[10px] text-slate-500">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'intelligence' && (
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Intelligence Database</h2>
            {[
              { id: 'utilization', title: "The 10% Utilization Rule", desc: "While standard advice suggests keeping utilization under 30%, elite profiles keep this under 10%. Every percentage point lower creates a multiplier effect on your score calculation. Our AI monitors this daily and triggers alerts when you approach thresholds.", impact: "High Impact (45-80 Points)" },
              { id: 'age', title: "Average Age of Accounts", desc: "Closing an old card doesn't just reduce your limit—it resets your average age. Our AI calculates exactly which accounts should remain dormant vs active to preserve your history depth and maximize age contribution.", impact: "Medium Impact (15-30 Points)" },
              { id: 'law', title: "FCRA § 611(a) Leverage", desc: "If a bureau cannot verify the 'accuracy' of a disputed item within 30 days, it must be removed. 'Verification' does not just mean looking at a database; it means holding original documentation from the originating creditor. Most debt buyers cannot produce this.", impact: "Critical Deletion Tool" },
              { id: 'lexis', title: "LexisNexis & SageStream Clearing", desc: "Most credit firms only dispute the three major bureaus. We go deeper—clearing your LexisNexis risk file and SageStream profile, which insurance companies and specialty lenders use to make decisions that never appear on your standard report.", impact: "Advanced Level Protocol" },
            ].map(sect => (
              <div key={sect.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden transition-all hover:border-slate-700">
                <button onClick={() => setExpandedSection(expandedSection === sect.id ? null : sect.id)} className="w-full p-8 flex justify-between items-center text-left">
                  <div>
                    <span className="text-[10px] font-black uppercase text-yellow-500 tracking-[0.2em]">{sect.impact}</span>
                    <h4 className="text-xl font-black italic uppercase tracking-tighter mt-1">{sect.title}</h4>
                  </div>
                  <div className={`transition-transform duration-300 ${expandedSection === sect.id ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-6 h-6 text-slate-600" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedSection === sect.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-8 pb-8 border-t border-slate-800/50 pt-4">
                    <p className="text-slate-400 leading-relaxed text-sm">{sect.desc}</p>
                    <button className="mt-6 text-[10px] font-black uppercase tracking-widest text-yellow-500 flex items-center gap-2 hover:gap-3 transition-all">Read Full Dossier <ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {(activeTab === 'disputes' || activeTab === 'messages' || activeTab === 'documents') && (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-[3rem]">
            <AlertCircle className="w-12 h-12 text-slate-700 mb-4" />
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Module Synchronizing</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm font-bold uppercase tracking-widest mt-2">Connecting to secure JECI AI servers. Live updates available in 2-4 business hours.</p>
          </div>
        )}
      </main>
    </div>
  );
};

// ─────────────────────────────────────────
// EMAIL MODAL & INTAKE PORTAL
// ─────────────────────────────────────────

const EmailModal = ({ formData, tempPass, onClose }) => {
  const [activeView, setActiveView] = useState('desktop');
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-slate-950/95 backdrop-blur-md">
      <div className={`w-full transition-all duration-500 ${activeView === 'mobile' ? 'max-w-sm' : 'max-w-3xl'} bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col relative`}>
        <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2"><Smartphone className="w-5 h-5 text-yellow-500" />Welcome Briefing Simulation</h3>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Recipient: {formData.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveView(activeView === 'desktop' ? 'mobile' : 'desktop')} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors hidden md:block"><Eye className="w-5 h-5" /></button>
            <button onClick={onClose} className="p-2 hover:bg-red-500/10 rounded-full transition-colors group"><X className="w-6 h-6 text-slate-500 group-hover:text-red-500" /></button>
          </div>
        </div>
        <div className="flex-grow p-4 md:p-8 overflow-y-auto bg-slate-950/50">
          <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-xl font-sans">
            <div className="px-6 py-4 bg-slate-100 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">New Message • 700 Credit Club Experts</div>
            <div className="p-6 md:p-10 space-y-6">
              <header className="space-y-1">
                <p className="text-sm"><strong>From:</strong> Founders Team &lt;onboarding@700experts.com&gt;</p>
                <p className="text-sm"><strong>Subject:</strong> Your Audit Has Initiated – Welcome to the 700 Club</p>
              </header>
              <hr className="border-slate-200" />
              <div className="space-y-5 text-[15px] leading-relaxed">
                <p>Hello <strong>{formData.name}</strong>,</p>
                <p>Welcome to the JECI 700 Club community. This is more than a service; it's your institutional bridge to 6-figure funding and financial readiness.</p>
                <p>Our AI systems have officially initiated a deep-crawl of the three major bureaus and LexisNexis to identify every legal inaccuracy under the <strong>Fair Credit Reporting Act (FCRA)</strong>.</p>
                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-2xl rounded-full" />
                  <p className="font-black uppercase tracking-widest text-[10px] text-yellow-500">Secure Member Access</p>
                  <div className="space-y-1 font-mono text-sm">
                    <p><strong>Portal:</strong> members.700experts.com</p>
                    <p><strong>User:</strong> {formData.email}</p>
                    <p className="text-yellow-500"><strong>Password:</strong> {tempPass}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold text-slate-900 uppercase text-xs tracking-widest">Immediate Next Steps:</p>
                  <ul className="space-y-3">
                    {["Log in to your dashboard to track your live audit progress.", 'Review your first round of "Legal Shield" draftings available in the portal.', "Complete your ID verification to unlock full dispute capabilities."].map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center shrink-0 text-yellow-600 font-bold text-[10px]">{i+1}</div>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-slate-500 text-sm italic leading-tight">"We don't ask bureaus to remove items. We prove their non-compliance."</p>
                  <div className="mt-4">
                    <p className="font-black italic uppercase text-slate-900">Adrian Jordan</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Founding Expert • 700 Credit Club</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Review the copy above before finalizing the dispatch.</p>
          <div className="flex gap-3 w-full md:w-auto">
            <button onClick={onClose} className="flex-1 md:flex-none px-8 py-3 bg-slate-800 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all text-xs">Cancel</button>
            <button onClick={onClose} className="flex-1 md:flex-none px-10 py-3 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 text-xs"><Send className="w-4 h-4" /> Send Email Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntakePortal = ({ selectedPlan, onBack }) => {
  const [step, setStep] = useState(1);
  const [showEmail, setShowEmail] = useState(false);
  const [tempPass, setTempPass] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', currentScore: 'Unknown', majorIssues: [], goal: '', plan: selectedPlan || 'The 700 Club' });

  useEffect(() => {
    if (step === 3) {
      const pass = 'CLUB-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      setTempPass(pass);
    }
  }, [step]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const toggleIssue = (issue) => setFormData(prev => ({ ...prev, majorIssues: prev.majorIssues.includes(issue) ? prev.majorIssues.filter(i => i !== issue) : [...prev.majorIssues, issue] }));
  const progress = (step / 4) * 100;

  if (step === 4) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative">
        {showEmail && <EmailModal formData={formData} tempPass={tempPass} onClose={() => setShowEmail(false)} />}
        <div className="max-w-md w-full text-center space-y-8">
          <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(234,179,8,0.3)]">
            <Check className="w-12 h-12 text-slate-950 stroke-[4px]" />
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">Audit Initiated</h2>
          <p className="text-slate-400 leading-relaxed">Welcome to the Club, <span className="text-white font-bold">{formData.name}</span>. Our AI systems are now crawling the bureaus for your profile.</p>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-left space-y-4">
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest">Temporary Credentials</h4>
            <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <code className="text-yellow-500 font-black">{tempPass}</code>
              <button onClick={() => navigator.clipboard.writeText(tempPass)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all"><Copy className="w-4 h-4" /></button>
            </div>
            <p className="text-[10px] text-slate-600 uppercase font-bold text-center">Instructions sent to {formData.email}</p>
          </div>
          <div className="space-y-3">
            <button onClick={() => setShowEmail(true)} className="w-full py-5 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"><MailQuestion className="w-5 h-5" /> Review Welcome Email</button>
            <button onClick={onBack} className="w-full py-4 bg-slate-900 border border-slate-800 rounded-2xl text-yellow-500 font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Return to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="h-1 w-full bg-slate-900 fixed top-0 left-0 z-50">
        <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <nav className="p-6 flex justify-between items-center max-w-4xl mx-auto w-full">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Cancel</button>
        <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Step {step} of 3</span>
      </nav>
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-yellow-500/5 blur-[80px] rounded-full" />
          {step === 1 && (
            <div className="space-y-8">
              <header>
                <div className="text-[10px] font-black uppercase text-yellow-500 tracking-widest mb-2">Step 1 of 3</div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-yellow-500">Member Identity</h2>
                <p className="text-slate-500 text-xs mt-2">This information is encrypted and used only to create your secure profile.</p>
              </header>
              <div className="space-y-4">
                <input type="text" placeholder="Full Legal Name" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-yellow-500 outline-none transition-all text-white font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email Address" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-yellow-500 outline-none transition-all text-white font-bold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="tel" placeholder="Phone Number" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-yellow-500 outline-none transition-all text-white font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-yellow-500 outline-none transition-all text-slate-400 font-bold" value={formData.currentScore} onChange={e => setFormData({...formData, currentScore: e.target.value})}>
                  <option value="Unknown">Current Score – Unknown / Not Sure</option>
                  <option value="Below 500">Below 500</option>
                  <option value="500-580">500 – 580</option>
                  <option value="580-640">580 – 640</option>
                  <option value="640-680">640 – 680</option>
                  <option value="680-720">680 – 720</option>
                </select>
              </div>
              <button disabled={!formData.name || !formData.email} onClick={nextStep} className="w-full py-5 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 disabled:opacity-30">
                Continue to Audit Scope <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-8">
              <header>
                <div className="text-[10px] font-black uppercase text-yellow-500 tracking-widest mb-2">Step 2 of 3</div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-yellow-500">Audit Scope</h2>
                <p className="text-slate-500 text-xs mt-2">Select all items that may be on your report. Select multiple.</p>
              </header>
              <div className="grid grid-cols-2 gap-3">
                {['Collections','Late Payments','Bankruptcies','Medical Debt','Repossessions','Student Loans','Hard Inquiries','Charge-Offs'].map(issue => (
                  <button key={issue} onClick={() => toggleIssue(issue)} className={`p-4 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all text-left ${formData.majorIssues.includes(issue) ? 'bg-yellow-500 border-yellow-500 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>{issue}</button>
                ))}
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Primary Financial Goal</label>
                <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-yellow-500 outline-none transition-all text-slate-400 font-bold" value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})}>
                  <option value="">Select a goal...</option>
                  <option value="Buy a Home">Buy a Home</option>
                  <option value="Auto Financing">Auto Financing</option>
                  <option value="Business Funding">Business Funding</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Overall Improvement">Overall Score Improvement</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 py-4 bg-slate-800 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all">Back</button>
                <button onClick={nextStep} className="flex-[2] py-4 bg-yellow-500 text-slate-950 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">Review <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-8">
              <header>
                <div className="text-[10px] font-black uppercase text-yellow-500 tracking-widest mb-2">Step 3 of 3</div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-yellow-500">Verification</h2>
              </header>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3 text-sm font-bold uppercase tracking-tighter">
                <div className="flex justify-between border-b border-slate-900 pb-3"><span className="text-slate-500">Name</span><span>{formData.name}</span></div>
                <div className="flex justify-between border-b border-slate-900 pb-3"><span className="text-slate-500">Plan</span><span>{formData.plan}</span></div>
                <div className="flex justify-between border-b border-slate-900 pb-3"><span className="text-slate-500">Goal</span><span className="text-yellow-500">{formData.goal || 'General'}</span></div>
                <div className="flex justify-between border-b border-slate-900 pb-3"><span className="text-slate-500">Issues Selected</span><span>{formData.majorIssues.length} Items</span></div>
                <div className="flex justify-between border-b border-slate-900 pb-3"><span className="text-slate-500">Dues Today</span><span className="text-green-500">$0.00</span></div>
                <div className="flex justify-between"><span className="text-slate-500">User ID</span><span>{formData.email.split('@')[0]}</span></div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-xs text-yellow-500 font-bold">
                🔒 256-bit encrypted. Your data is never sold. Licensed & Certified Firm.
              </div>
              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 py-4 bg-slate-800 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all">Edit</button>
                <button onClick={nextStep} className="flex-[2] py-4 bg-yellow-500 text-slate-950 rounded-xl font-black uppercase tracking-widest text-xs">Initiate Audit</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// ─────────────────────────────────────────
// HOME OWNERSHIP PROGRAM PAGE
// ─────────────────────────────────────────

const HomeOwnershipPage = ({ onJoin, onBack }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sub-nav */}
      <div className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-colors text-xs font-black uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Home Ownership Program</span>
          </div>
          <button onClick={() => onJoin('Home Ownership')} className="px-6 py-2 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-full hover:bg-yellow-400 transition-all">Apply Now</button>
        </div>
      </div>

      <div className="pt-24">
        {/* Hero */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto relative">
            <div className="max-w-4xl mx-auto text-center">
              <SectionTag>Home Ownership Program</SectionTag>
              <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
                Your Keys Are <br /><span className="text-yellow-500 underline decoration-4 underline-offset-8">Waiting.</span>
              </h1>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                The mortgage world has a specific code — a set of numbers, ratios, and data points that banks use to say <em className="text-white not-italic font-bold">yes</em> or <em className="text-red-400 not-italic font-bold">no</em>. We reverse-engineer that code and rebuild your profile from the bank's point of view.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => onJoin('Home Ownership')} className="px-10 py-5 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center gap-3 shadow-[0_20px_40px_rgba(234,179,8,0.2)]">
                  Start My Home Audit <Home className="w-5 h-5" />
                </button>
                <button className="px-10 py-5 border border-slate-700 text-white font-black uppercase tracking-widest rounded-2xl hover:border-yellow-500 transition-all">
                  Free Consultation Call
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 px-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: TrendingDown, val: "620", label: "Typical Minimum FICO for FHA Loans", color: "text-red-400", note: "Most applicants are rejected here" },
                { icon: Target, val: "43%", label: "Maximum Debt-to-Income Ratio Allowed", color: "text-yellow-500", note: "We help you hit this target" },
                { icon: TrendingUp, val: "720+", label: "Score for Best Mortgage Rates", color: "text-green-500", note: "Our average client outcome" },
              ].map((s, i) => (
                <div key={i} className="p-8 bg-slate-900/60 rounded-[2rem] border border-slate-800 text-center">
                  <s.icon className={`w-10 h-10 mx-auto mb-4 ${s.color}`} />
                  <div className={`text-5xl font-black italic ${s.color} mb-2`}>{s.val}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-white mb-2">{s.label}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">{s.note}</div>
                </div>
              ))}
            </div>

            {/* Bridge Metaphor */}
            <div className="bg-slate-950 border border-slate-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-yellow-500/10 blur-[80px]" />
              <Landmark className="w-16 h-16 text-yellow-500 mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
                We Are <span className="text-yellow-500">The Bridge</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
                Between where your score is today and where the lender needs it to be tomorrow. Between the denial letter and the closing table. Between financial restriction and the keys to your first — or next — home.
              </p>
            </div>
          </div>
        </section>

        {/* What Banks Actually Look At */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <SectionTag>The Mortgage Blueprint</SectionTag>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">What Lenders <span className="text-yellow-500">Really</span> Check</h2>
              <p className="text-slate-500 mt-4 max-w-xl mx-auto">We don't guess. We build your file to match the exact criteria underwriters use when making approval decisions.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: BarChart, title: "Credit Score Composition", desc: "Payment history (35%), utilization (30%), age of accounts (15%), credit mix (10%), new inquiries (10%). We surgically optimize each category for maximum underwriter appeal.", tag: "Priority #1" },
                { icon: DollarSign, title: "Debt-to-Income Ratio (DTI)", desc: "Your total monthly debt payments vs. gross monthly income. We identify and strategically resolve accounts dragging your DTI above the 43% threshold that kills approvals.", tag: "Priority #2" },
                { icon: FileText, title: "Derogatory Mark Elimination", desc: "Foreclosures, short sales, charge-offs, and collections are instant red flags. Under 15 USC § 1681i, any item that cannot be verified with documentation must be removed.", tag: "Priority #3" },
                { icon: Clock, title: "Credit Profile Seasoning", desc: "Lenders want to see established, aged accounts. We advise on which accounts to preserve and which authorized user or primary tradeline additions create the fastest seasoning.", tag: "Priority #4" },
                { icon: Shield, title: "LexisNexis Risk File", desc: "Beyond the 3 bureaus lies your hidden risk file. Specialty lenders and mortgage underwriters pull this. Most firms miss it. We clear it.", tag: "Advanced Protocol" },
                { icon: Layers, title: "Rapid Rescore Coordination", desc: "After deletions are confirmed, we coordinate with lenders to submit rapid rescore requests — updating your score in days, not weeks, when you're mid-application.", tag: "Closing Accelerator" },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-slate-800 hover:border-yellow-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <item.icon className="w-8 h-8 text-yellow-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">{item.tag}</span>
                  </div>
                  <h3 className="text-xl font-black italic uppercase tracking-tighter mb-3 group-hover:text-yellow-500 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The 6-Phase Program */}
        <section className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">The 6-Phase <span className="text-yellow-500">Mortgage Readiness</span> Protocol</h2>
            </div>
            <div className="space-y-4">
              {[
                { phase: "01", title: "Full Credit Audit", time: "Days 1–5", desc: "Deep crawl of all 3 bureaus + LexisNexis + SageStream. We map every negative item, every inquiry, every account affecting your mortgage eligibility with precision scoring." },
                { phase: "02", title: "Violation Identification", time: "Days 5–10", desc: "Using FCRA § 611(a), FDCPA § 807, and related statutes, we identify every legally disputable inaccuracy. Bureaus have 30 days to verify or delete under federal law." },
                { phase: "03", title: "Legal Shield Dispatch", time: "Days 10–40", desc: "Certified dispute letters drafted and dispatched to all three bureaus plus original creditors. Our letters cite specific statutes and demand item-by-item documentation — a standard generic firms cannot meet." },
                { phase: "04", title: "Bureau Response Analysis", time: "Days 40–50", desc: "JECI AI cross-references bureau responses for verification failures. If they respond with data instead of documentation, Round 2 begins immediately with escalated federal language." },
                { phase: "05", title: "Profile Reconstruction", time: "Days 50–90", desc: "Deletion confirmed. Now we build — authorized user tradelines, secured product strategy, and utilization recalibration to hit underwriter sweet spots for FICO 8 and FICO 2/4/5 mortgage models." },
                { phase: "06", title: "Lender Readiness Certification", time: "Day 90+", desc: "Final review with your loan officer or our preferred mortgage partner. We coordinate rapid rescores, provide a written credit summary letter, and walk you to the closing table." },
              ].map((phase, i) => (
                <div key={i} className="flex gap-6 p-8 bg-slate-900/40 rounded-[2rem] border border-slate-800 hover:border-yellow-500/20 transition-all">
                  <div className="text-yellow-500/20 font-black italic text-5xl leading-none shrink-0 w-16">{phase.phase}</div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">{phase.title}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full w-fit">{phase.time}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial + CTA */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-yellow-500 p-12 md:p-20 rounded-[3rem] text-slate-950 relative overflow-hidden">
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-slate-950/10 rounded-full" />
              <Quote className="w-12 h-12 text-slate-950/20 mb-6" />
              <p className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter leading-tight mb-8">
                "I was denied twice. After 90 days in the Home Ownership Program, I was approved for $340,000 with a 3.75% rate. I literally cried at closing."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-950/20 rounded-full" />
                <div>
                  <p className="font-black italic uppercase tracking-tighter">Tanya R.</p>
                  <p className="text-[10px] font-bold uppercase text-slate-900">First-Time Homeowner • Houston, TX</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => onJoin('Home Ownership')} className="px-16 py-6 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xl rounded-3xl hover:scale-105 transition-all shadow-xl">
                Start My Home Ownership Audit
              </button>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-4">Licensed in Florida • FCRA / FDCPA Compliant • 256-Bit Encrypted</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 border-t border-slate-900">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-12 text-center">Mortgage Program FAQs</h3>
            {[
              { q: "How long before I can apply for a mortgage?", a: "Most clients reach mortgage-ready status within 90–120 days. Severe files (bankruptcy, foreclosure) may require 6–12 months depending on seasoning requirements. We give you an honest timeline after the initial audit." },
              { q: "What's the minimum score needed to benefit from this program?", a: "There is no minimum. Whether you're at 480 or 650, the same federal rights apply to inaccurate data on your report. The difference is the distance we need to travel together." },
              { q: "Will removing collections hurt my score?", a: "Removing negative items almost always improves your score. Modern FICO models (including the mortgage models 2, 4, and 5) treat paid collections and unpaid collections almost identically — so deletion is the superior outcome in both cases." },
              { q: "Do I need to stop applying for credit during this process?", a: "Yes. New inquiries and newly opened accounts can temporarily lower your score and signal instability to underwriters. We provide a complete 'credit freeze protocol' during the restoration phase." },
            ].map((item, i) => (
              <AccordionItem key={i} title={item.q} isOpen={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>{item.a}</AccordionItem>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// BUSINESS CREDIT PAGE
// ─────────────────────────────────────────

const BusinessCreditPage = ({ onJoin, onBack }) => {
  const [activeTab, setActiveTab] = useState('foundation');
  const [activeFaq, setActiveFaq] = useState(null);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-colors text-xs font-black uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
          <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-yellow-500" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Business Credit Division</span></div>
          <button onClick={() => onJoin('Business Credit')} className="px-6 py-2 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-full hover:bg-yellow-400 transition-all">Apply Now</button>
        </div>
      </div>

      <div className="pt-24">
        {/* Hero */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,179,8,0.08),transparent_50%)]" />
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionTag>Business Credit Division</SectionTag>
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
                  Borrow Under <span className="text-yellow-500 underline decoration-4 underline-offset-8">Your LLC.</span>
                </h1>
                <p className="text-slate-400 text-xl leading-relaxed mb-10">
                  Stop putting your personal credit on the line for business expenses. We build a fully autonomous business credit profile that accesses <span className="text-white font-bold">institutional funding without a personal guarantee.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => onJoin('Business Credit')} className="px-10 py-5 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center gap-3">
                    Build My Business Credit <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Net-30 Vendor Lines", amount: "$5K–$50K", note: "First 60–90 days — no PG required" },
                  { label: "Business Credit Cards (Tier 2)", amount: "$10K–$100K", note: "Reported to Dun & Bradstreet, Experian Biz" },
                  { label: "SBA-Backed Lines of Credit", amount: "$50K–$500K", note: "Requires Paydex 80+ and 2-yr entity history" },
                  { label: "Institutional Funding (Tier 3)", amount: "$250K–$2M+", note: "For established entities, full separation from personal" },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 flex justify-between items-center group hover:border-yellow-500/30 transition-all">
                    <div>
                      <p className="text-xs font-black uppercase text-slate-400">{item.label}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{item.note}</p>
                    </div>
                    <span className="text-yellow-500 font-black italic text-lg">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The 3-Tier System */}
        <section className="py-24 px-6 bg-slate-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <SectionTag>The Tier System</SectionTag>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Business Credit <span className="text-yellow-500">Tiers</span></h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Business credit is built in a specific sequence. Skipping steps destroys the profile. We guide you through each tier in the correct order.</p>
            </div>

            <div className="flex gap-3 mb-10 bg-slate-900/50 p-2 rounded-2xl border border-slate-800 max-w-lg mx-auto">
              {['foundation', 'growth', 'institutional'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === tab ? 'bg-yellow-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}>
                  {tab === 'foundation' ? 'Tier 1' : tab === 'growth' ? 'Tier 2' : 'Tier 3'}
                </button>
              ))}
            </div>

            {activeTab === 'foundation' && (
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="text-[10px] font-black uppercase text-yellow-500 tracking-[0.3em] mb-3">Tier 1 — Foundation</div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-6">Entity Formation & Vendor Lines</h3>
                  <p className="text-slate-400 leading-relaxed mb-8">Before you can borrow under a business, you need a properly structured entity. Most entrepreneurs skip critical steps that disqualify them from tier-2 and tier-3 funding. We build the foundation right — once.</p>
                  <div className="space-y-4">
                    {[
                      "LLC or S-Corp Formation Strategy (based on tax/funding goals)",
                      "EIN Registration & IRS Compliance",
                      "Business bank account with preferred institutions",
                      "Dun & Bradstreet (DUNS) number activation",
                      "Net-30 vendor accounts: Uline, Quill, Grainger",
                      "First 3–5 tradelines reporting to business bureaus",
                      "Paydex Score activation target: 80+",
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                  <div className="text-center border-b border-slate-800 pb-6">
                    <div className="text-5xl font-black italic text-yellow-500">$2,500</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">One-Time Setup Fee</div>
                  </div>
                  <div className="space-y-3 text-sm text-slate-400">
                    <p><strong className="text-white">Timeline:</strong> 30–60 days to first tradeline reporting</p>
                    <p><strong className="text-white">Funding Unlocked:</strong> $1,000–$10,000 in vendor lines</p>
                    <p><strong className="text-white">Best For:</strong> New LLCs, sole proprietors converting to entity, self-employed individuals</p>
                  </div>
                  <button onClick={() => onJoin('Business Tier 1')} className="w-full py-4 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all">
                    Start Tier 1
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'growth' && (
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="text-[10px] font-black uppercase text-yellow-500 tracking-[0.3em] mb-3">Tier 2 — Growth</div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-6">Business Credit Cards & Revolving Accounts</h3>
                  <p className="text-slate-400 leading-relaxed mb-8">With a Paydex of 80+ and 5+ seasoned tradelines, your entity qualifies for revolving business credit. These accounts don't touch your personal SSN. They're weapons for cash flow, operations, and leverage.</p>
                  <div className="space-y-4">
                    {[
                      "Experian Business & Equifax Business file building",
                      "Target: Nav Prime, Capital One Spark, Brex, Ramp",
                      "Business credit cards: $5K–$50K initial limits",
                      "Corporate fuel cards and supply accounts",
                      "Revolving credit strategy to build utilization intelligence",
                      "Separation of personal from business credit reporting",
                      "Monthly monitoring of all 3 business bureaus",
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900 border border-yellow-500 rounded-[2.5rem] p-8 space-y-6 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
                  <span className="block text-center text-[10px] font-black uppercase tracking-widest bg-yellow-500 text-slate-950 py-2 rounded-xl">Most Requested</span>
                  <div className="text-center border-b border-slate-800 pb-6">
                    <div className="text-5xl font-black italic text-yellow-500">$1,200</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Per Month (6-Month Engagement)</div>
                  </div>
                  <div className="space-y-3 text-sm text-slate-400">
                    <p><strong className="text-white">Requirement:</strong> Must complete Tier 1 or have 6+ months business history</p>
                    <p><strong className="text-white">Funding Unlocked:</strong> $25,000–$150,000 in revolving credit</p>
                    <p><strong className="text-white">Best For:</strong> Established LLCs, e-commerce, real estate investors, service businesses</p>
                  </div>
                  <button onClick={() => onJoin('Business Tier 2')} className="w-full py-4 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all">
                    Start Tier 2
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'institutional' && (
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="text-[10px] font-black uppercase text-yellow-500 tracking-[0.3em] mb-3">Tier 3 — Institutional</div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-6">SBA Lines, Private Capital & No-PG Funding</h3>
                  <p className="text-slate-400 leading-relaxed mb-8">This is the endgame. With a seasoned entity, clean business bureaus, and proper financial documentation, your LLC becomes a borrowing machine that accesses capital the way corporations do — no personal guarantee required.</p>
                  <div className="space-y-4">
                    {[
                      "SBA 7(a) and SBA Express Line applications",
                      "Private lender portfolio introductions",
                      "No-personal-guarantee credit facilities",
                      "UCC-1 filing strategy for asset protection",
                      "CPN / EIN-only lending navigation (legal framework only)",
                      "Institutional documentation package preparation",
                      "Dedicated relationship manager and direct legal counsel access",
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                  <div className="text-center border-b border-slate-800 pb-6">
                    <div className="text-3xl font-black italic text-yellow-500">By Application</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Custom Engagement — Contact for Pricing</div>
                  </div>
                  <div className="space-y-3 text-sm text-slate-400">
                    <p><strong className="text-white">Requirement:</strong> Tier 1 + Tier 2 complete, 12+ month entity, verifiable revenue</p>
                    <p><strong className="text-white">Funding Unlocked:</strong> $250,000–$2,000,000+</p>
                    <p><strong className="text-white">Best For:</strong> High-revenue LLCs, holding companies, real estate portfolios, established brands</p>
                  </div>
                  <button onClick={() => onJoin('Business Tier 3')} className="w-full py-4 bg-slate-800 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all border border-slate-700">
                    Request Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why Separate Personal from Business */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-8">Why <span className="text-red-400">Personal</span> Credit Is a Business Liability</h2>
                <div className="space-y-6 text-slate-400 leading-relaxed">
                  <p>Every time you sign a personal guarantee for a business loan, you create a legal pathway for creditors to come after your personal assets — your home, your car, your savings account.</p>
                  <p>When your business debt shows up on your personal credit report, it raises your utilization, can lower your score, and blocks you from personal financing like mortgages.</p>
                  <p>Business credit built under your EIN, reported to Dun & Bradstreet and Experian Business, does not appear on your personal report. It is a completely separate financial identity for your entity.</p>
                  <p className="text-white font-bold italic text-lg">"The wealthy don't borrow with their SSN. They borrow with their EIN."</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-yellow-500 mb-6">The Comparison</h3>
                <div className="overflow-hidden rounded-2xl border border-slate-800">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800">
                        <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Factor</th>
                        <th className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-red-400">Personal (SSN)</th>
                        <th className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-green-500">Business (EIN)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {[
                        ['Personal Guarantee', 'Always', 'Not Required (Tier 2+)'],
                        ['Shows on Personal Report', 'Yes', 'No'],
                        ['Credit Limit Potential', '$1K–$30K', '$10K–$2M+'],
                        ['Asset Protection', 'None', 'LLC Shield'],
                        ['Tax Deductibility', 'Limited', 'Business Expense'],
                        ['Hurt by Bad Business Month', 'Yes', 'Isolated to Entity'],
                      ].map(([factor, personal, business], i) => (
                        <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                          <td className="p-4 font-bold text-slate-300">{factor}</td>
                          <td className="p-4 text-center text-red-400 font-bold">{personal}</td>
                          <td className="p-4 text-center text-green-500 font-bold">{business}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 border-t border-slate-900 bg-slate-900/20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-12 text-center">Business Credit FAQs</h3>
            {[
              { q: "Do I need good personal credit to start building business credit?", a: "No. Business credit is built entirely on your entity's EIN and financial behavior. However, for Tier 3 institutional funding, some lenders will do a soft pull of your personal credit as a secondary reference — which is why we often pair personal and business restoration simultaneously." },
              { q: "How long does it take to build a business credit profile?", a: "Tier 1 (vendor lines and Paydex activation) typically takes 60–90 days. A complete Tier 2 profile with $50K+ in revolving credit typically takes 6–9 months of consistent, methodical tradeline building." },
              { q: "What's a Paydex score and why does it matter?", a: "Paydex is Dun & Bradstreet's business credit score, ranging from 0–100. A score of 80 means you pay on time. A score of 100 means you pay early. Most Tier 2 lenders require a Paydex of 80+, and Tier 3 institutional lenders require 80–100 plus additional bureau scores from Experian and Equifax business." },
              { q: "Can I build business credit without an LLC?", a: "Technically yes, as a sole proprietor — but we strongly advise against it. Without entity separation, business debts can still attach to you personally. Forming an LLC first costs $300–$800 depending on the state and creates the legal firewall that makes the rest of this system work." },
            ].map((item, i) => (
              <AccordionItem key={i} title={item.q} isOpen={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>{item.a}</AccordionItem>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// EMAIL SEQUENCE PAGE
// ─────────────────────────────────────────

const EmailSequencePage = ({ onBack }) => {
  const [activeEmail, setActiveEmail] = useState(0);

  const emails = [
    {
      day: "Day 1",
      subject: "You Left Something Behind — Your Credit Audit Is Incomplete",
      preview: "You started something powerful. Don't let it sit unfinished.",
      from: "Adrian Jordan <founders@700experts.com>",
      body: [
        "Hey {First Name},",
        "About an hour ago, you started your Credit Audit with 700 Credit Club Experts. You filled in your information, told us about your credit issues — and then life happened.",
        "No judgment. But I want you to understand what you left on the table.",
        "Right now, there are items on your report that are legally inaccurate — and under 15 USC § 1681i, those items must be removed if they cannot be verified. The bureaus are not going to volunteer that information. Neither is the debt collector calling your phone.",
        "You came to us for a reason. Let's finish what you started.",
        "👉 Click below to complete your self-enrollment and save $400 today.",
      ],
      cta: "Complete My Enrollment — Save $400",
      tag: "Re-Engagement"
    },
    {
      day: "Day 3",
      subject: "What 12,000+ Members Know That You Don't (Yet)",
      preview: "Here's what a completed audit looks like — real results.",
      from: "700 Club Results Team <results@700experts.com>",
      body: [
        "Hi {First Name},",
        "While you're waiting, members who completed their enrollment last month are now seeing results like these:",
        "→ Marcus V.: +84 points in 38 days. $14,200 in debt deleted.",
        "→ Tanya R.: Denied twice for a mortgage. Approved for $340K after 90 days.",
        "→ Darius W.: Business credit Tier 1 complete. $27,000 in vendor lines open, zero personal guarantee.",
        "These are not outliers. These are members who completed the same intake form you started.",
        "The difference between them and where you are right now? 3 minutes of paperwork.",
        "The $400 self-enrollment savings we offered you is still active — but it closes this Friday.",
      ],
      cta: "I'm Ready — Let's Do This",
      tag: "Social Proof"
    },
    {
      day: "Day 5",
      subject: "⚠️ $400 Savings Expires in 48 Hours",
      preview: "Your discounted self-enrollment window is closing. Here's why this matters.",
      from: "700 Club Enrollment <onboarding@700experts.com>",
      body: [
        "{First Name},",
        "The Option 2 Self-Enrollment rate — which saves you $400 over our standard enrollment department fee — expires in 48 hours.",
        "After that, you can still join. You'll just pay more for the same service because an enrollment specialist will have to manually process your file.",
        "Here's the simple math:",
        "Option 1 (Enrollment Department): Full fee + agent processing time",
        "Option 2 (Self-Enroll Online): Save $400 instantly, same program, same Certified Experts, same JECI AI system.",
        "This isn't a sales trick. It's how we've structured our business to reward self-sufficient clients who take action without needing a 45-minute phone call to make a decision.",
        "You've already done the hard part — you researched us, you know what you need. Don't pay more for the same result.",
      ],
      cta: "Lock In My $400 Savings Now",
      tag: "Urgency"
    },
    {
      day: "Day 8",
      subject: "A Certified Expert Wants to Ask You One Question",
      preview: "No pitch. Just one question about what's holding you back.",
      from: "Adrian Jordan <adrian@700experts.com>",
      body: [
        "Hey {First Name},",
        "I'm Adrian, one of the founding certified credit experts at 700 Club.",
        "I don't often email individually, but when someone starts our audit and doesn't finish, I want to know why. Not to sell you — but because the answer usually tells me exactly what's standing between someone and their financial freedom.",
        "Is it skepticism? Fair. The credit repair industry has a lot of noise.",
        "Is it the cost? We can talk about that. There are options.",
        "Is it that you're not sure it'll work for your specific situation? Then let me tell you — it works for collections, medical debt, late payments, bankruptcies, repossessions, inquiries, and more. Under federal law, the burden of proof is on the bureaus, not you.",
        "Just hit reply and tell me what's holding you back. I read these personally.",
        "Or — if you're ready right now — your audit link is waiting below.",
      ],
      cta: "Complete My Audit Now",
      tag: "Personal Touch"
    },
    {
      day: "Day 14",
      subject: "This Is the Last Time We'll Reach Out, {First Name}",
      preview: "Final notice. After today, your audit slot is reassigned.",
      from: "700 Club Founders <founders@700experts.com>",
      body: [
        "{First Name},",
        "This is our final outreach.",
        "Two weeks ago, you began a credit audit with us. We've sent you results from other members, a personal note from our founding expert, and a $400 savings window.",
        "Today, we're releasing your reserved audit slot back to our waiting list.",
        "If your credit situation isn't urgent enough to act on today — that's completely valid. Financial readiness happens when it happens.",
        "But if the reason you haven't finished is doubt, cost, or timing — I want to give you one final reason to believe in this process:",
        "Our guarantee: If we do not remove at least one inaccurate item from your credit report within your first 90 days as a member, you receive a full refund. No fine print. No hoops.",
        "The risk is ours. The result — if you act — is yours.",
        "Click below. Your audit takes 3 minutes to complete.",
      ],
      cta: "Complete My Audit — Final Chance",
      tag: "Final Notice"
    },
  ];

  const tagColors = {
    'Re-Engagement': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    'Social Proof': 'bg-green-500/10 border-green-500/30 text-green-500',
    'Urgency': 'bg-red-500/10 border-red-500/30 text-red-400',
    'Personal Touch': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    'Final Notice': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-colors text-xs font-black uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-yellow-500" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Audit Recovery Email Sequence</span></div>
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black uppercase text-slate-500">5-Part Series</div>
        </div>
      </div>

      <div className="pt-24 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <SectionTag>Email Automation</SectionTag>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Audit Recovery <span className="text-yellow-500">Sequence</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto">5-email sequence for members who started the audit flow but did not complete self-enrollment. Designed to re-engage, build urgency, and convert.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Email List */}
          <div className="space-y-3">
            {emails.map((email, i) => (
              <button key={i} onClick={() => setActiveEmail(i)}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${activeEmail === i ? 'bg-slate-900 border-yellow-500' : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">{email.day}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${tagColors[email.tag]}`}>{email.tag}</span>
                </div>
                <p className="text-sm font-black text-white leading-tight mb-1">{email.subject.replace('{First Name}', '[Name]').substring(0, 45)}...</p>
                <p className="text-[10px] text-slate-500">{email.preview}</p>
              </button>
            ))}
          </div>

          {/* Email Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white text-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="px-8 py-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email Preview</div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${tagColors[emails[activeEmail].tag]}`}>{emails[activeEmail].tag}</span>
              </div>
              <div className="p-8 md:p-12 space-y-6">
                <div className="space-y-2 pb-6 border-b border-slate-200">
                  <p className="text-sm text-slate-500"><strong className="text-slate-700">From:</strong> {emails[activeEmail].from}</p>
                  <p className="text-sm text-slate-500"><strong className="text-slate-700">Send Trigger:</strong> {emails[activeEmail].day} after audit start (incomplete enrollment)</p>
                  <p className="text-lg font-black text-slate-900">{emails[activeEmail].subject}</p>
                </div>
                <div className="space-y-4 text-[15px] leading-relaxed text-slate-800">
                  {emails[activeEmail].body.map((paragraph, i) => (
                    <p key={i} className={paragraph.startsWith('→') ? 'pl-4 border-l-2 border-yellow-400 italic' : ''}>{paragraph}</p>
                  ))}
                </div>
                <div className="pt-6">
                  <div className="bg-yellow-500 text-slate-950 font-black uppercase tracking-widest py-4 px-8 rounded-2xl text-center text-sm cursor-pointer hover:bg-yellow-400 transition-all">
                    {emails[activeEmail].cta}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="font-black italic uppercase text-slate-900 text-sm">700 Credit Club Experts</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Legal, Moral, Ethical & Factual Credit Services • Licensed in Florida</p>
                    <p className="text-[10px] text-slate-300 mt-2">To stop receiving these emails, <span className="underline cursor-pointer">unsubscribe here</span>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// SUBPAGE SHARED NAV WRAPPER
// ─────────────────────────────────────────

const SubPageNav = ({ onBack, setView, handleJoin, title, icon: Icon }) => (
  <div className="fixed top-0 w-full z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-yellow-500 transition-colors text-xs font-black uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-yellow-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setView('login')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors hidden md:block">Portal Login</button>
        <button onClick={() => handleJoin()} className="px-5 py-2 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-yellow-400 transition-all">Start Audit</button>
      </div>
    </div>
    {/* Sub-navigation within the page */}
    <div className="hidden md:flex border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center gap-8 h-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
        <button onClick={() => { setView('landing'); setTimeout(() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="hover:text-yellow-500 transition-colors">Unique Features</button>
        <button onClick={() => { setView('landing'); setTimeout(() => { document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="hover:text-yellow-500 transition-colors">The Audit</button>
        <button onClick={() => { setView('landing'); setTimeout(() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="hover:text-yellow-500 transition-colors">Programs</button>
        <button onClick={() => setView('home-ownership')} className="hover:text-yellow-500 transition-colors">Home Program</button>
        <button onClick={() => setView('business-credit')} className="hover:text-yellow-500 transition-colors">Business Credit</button>
      </div>
    </div>
  </div>
);
// ─────────────────────────────────────────
// UNIQUE FEATURES PAGE
// ─────────────────────────────────────────

const UniqueFeaturesPage = ({ onJoin, onBack }) => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: 'lifetime',
      icon: Shield,
      title: "Lifetime Deletion Guarantee",
      tag: "Industry-First Protection",
      color: "text-yellow-500",
      summary: "Once we delete it, it's gone forever. If a bureau illegally re-inserts a removed item, we pursue legal action on your behalf — at zero cost to you.",
      detail: [
        "Under 15 USC § 1681i(a)(5)(B), credit bureaus must notify you before re-inserting a previously deleted item and must certify that the information is complete and accurate. Most bureaus violate this routinely.",
        "Our Lifetime Guarantee means we monitor your file post-deletion. The moment an illegal re-insertion is detected, our legal team activates — filing formal FCRA violation complaints and pursuing statutory damages of up to $1,000 per occurrence.",
        "No other credit firm in our market offers this as a standard inclusion. It's not a upsell. It's our baseline commitment."
      ]
    },
    {
      id: 'tracker',
      icon: Smartphone,
      title: "Proprietary Credit Tracker App",
      tag: "Real-Time Intelligence",
      color: "text-blue-400",
      summary: "Monitor your score, active disputes, deletions, and profile metrics from your phone — in real time. No waiting for monthly reports.",
      detail: [
        "Our Credit Tracker App gives you a live dashboard of your FICO® score trajectory, active dispute statuses across all three bureaus, and projected score increases based on pending deletions.",
        "Receive push notifications the moment a bureau updates your file — deletions, insertions, inquiries, and balance changes — so you're never caught off guard.",
        "The app also includes an AI recommendation engine that tells you exactly which actions to take each week to accelerate your score increase toward your goal (home purchase, auto loan, business funding)."
      ]
    },
    {
      id: 'certified',
      icon: BadgeCheck,
      title: "Certified Credit Experts",
      tag: "Licensed & Credentialed",
      color: "text-green-500",
      summary: "Every case is handled by a Certified Credit Expert — not a call center agent reading from a script. We hold active certifications and are licensed by the State of Florida.",
      detail: [
        "Our experts hold certifications in Consumer Credit Law, FCRA compliance, and credit profile analysis. Certification is not a marketing badge — it requires demonstrated knowledge of federal statutes and credit scoring models.",
        "Licensed by the State of Florida as a Credit Services Organization (CSO), we operate under state and federal law. Our clients are protected by the Credit Repair Organizations Act (CROA), which gives you the right to cancel within 3 business days, among other consumer protections.",
        "Each client is assigned to a dedicated expert — not rotated through a queue. Your expert knows your file, your goals, and your timeline."
      ]
    },
    {
      id: 'affiliate',
      icon: Users,
      title: "Affiliate & Partner Tracking Portal",
      tag: "Revenue Share Platform",
      color: "text-purple-400",
      summary: "Refer clients, track every deletion and score increase in real time, and earn commissions — all through a dedicated institutional-grade affiliate dashboard.",
      detail: [
        "Mortgage brokers, auto dealers, financial planners, and real estate agents use our Affiliate Portal to refer clients who don't yet qualify for financing. When those clients graduate, your referral commission is automatic.",
        "The portal shows you every active client you've referred, their current score, active disputes, deletions to date, and projected completion timeline — so you can follow up intelligently.",
        "We handle all client service. You handle the introduction. Our affiliate partners average $200–$600 per closed referral, paid monthly."
      ]
    },
    {
      id: 'results',
      icon: BarChart3,
      title: "Client Results Portal",
      tag: "Transparent & Accountable",
      color: "text-yellow-500",
      summary: "Our results aren't hidden behind testimonials. Clients can view their full deletion history, score trajectory, and case timeline in a live portal 24/7.",
      detail: [
        "Every deleted item, every bureau response, every dispute round — logged and timestamped in your portal. You never have to wonder what's been done or what's next.",
        "The portal includes a Score Journey Graph showing your baseline score vs. your current score over time, with deletion events marked on the timeline so you can see exactly what moved the needle.",
        "Case Managers annotate your file with notes explaining each action taken and the legal basis for each dispute — so you understand the process, not just the outcome."
      ]
    },
    {
      id: 'unlimited',
      icon: Zap,
      title: "Unlimited Disputes & Legal Audits",
      tag: "No Caps, No Limits",
      color: "text-yellow-500",
      summary: "We don't cap the number of disputes we file on your behalf. Every inaccuracy, every bureau, every round — unlimited, until your file is clean.",
      detail: [
        "Many credit firms limit you to 3–5 dispute items per month to manage their workload. We don't. If your file has 40 inaccurate items across three bureaus, we address all 40.",
        "Each round of disputes is followed by a full Legal Audit — analyzing bureau responses for FCRA violations, verification failures, and re-insertion errors that trigger additional removal obligations.",
        "Our unlimited model means we don't have an incentive to slow-walk your case. Our business model is built on results and referrals — fast outcomes serve both."
      ]
    },
    {
      id: 'jeci',
      icon: Globe,
      title: "JECI AI Engine",
      tag: "Proprietary Technology",
      color: "text-blue-400",
      summary: "Our JECI AI doesn't just dispute — it reads bureau responses for verification failures, mismatches, and legal loopholes that human reviewers consistently miss.",
      detail: [
        "JECI AI cross-references your dispute responses against a database of known FCRA violation patterns, bureau response templates, and federal case precedents — in seconds.",
        "When a bureau responds to a dispute, JECI analyzes the response language for 'soft verifications' (bureau checked a database instead of contacting the original creditor), which do not meet the federal standard for verification under § 611(a).",
        "The result: our clients' second and third-round disputes hit with surgical precision, citing specific verification failures by name — dramatically increasing deletion rates compared to generic follow-up letters."
      ]
    },
    {
      id: 'vip',
      icon: Star,
      title: "VIP Membership & Coaching",
      tag: "High-Level Financial Literacy",
      color: "text-yellow-500",
      summary: "Beyond dispute letters — VIP members receive monthly 1-on-1 coaching sessions covering credit strategy, utilization management, tradeline building, and institutional readiness.",
      detail: [
        "VIP Coaching goes where dispute letters can't. Once your file is clean, most clients don't know how to keep it clean and grow it. Our coaching sessions cover the full credit score formula — and how to game every category legally.",
        "Monthly sessions cover: optimal utilization targets by account type, which new accounts to open and in what order, how to respond to creditor inquiries, and when to apply for higher-limit products for maximum impact.",
        "VIP members also receive our Institutional Readiness Report — a written assessment of your profile's borrowing capacity and specific recommendations to reach 6-figure funding eligibility."
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sub-nav */}
      <div className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-colors text-xs font-black uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unique Features</span>
          </div>
          <button onClick={() => onJoin('The 700 Club')} className="px-6 py-2 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-full hover:bg-yellow-400 transition-all">Start Audit</button>
        </div>
      </div>

      <div className="pt-24">
        {/* Hero */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(234,179,8,0.07),transparent_60%)]" />
          <div className="max-w-7xl mx-auto text-center relative">
            <SectionTag>Why We're Different</SectionTag>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
              Built to <span className="text-yellow-500 underline decoration-4 underline-offset-8">Win.</span><br />Not Just Dispute.
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed mb-6">
              Generic credit repair firms send mass letters and hope for the best. We built an institutional-grade system — certified experts, proprietary AI, legal enforcement, and unlimited dispute power — that treats your credit file like what it is: a financial weapon that needs to be forged, not patched.
            </p>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Click any feature below to read the full breakdown.</p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-4 px-6 pb-24">
          <div className="max-w-7xl mx-auto space-y-4">
            {features.map((feat, i) => (
              <div key={feat.id}
                className={`rounded-[2rem] border transition-all duration-400 overflow-hidden ${activeFeature === feat.id ? 'border-yellow-500 bg-slate-900' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'}`}>
                <button
                  onClick={() => setActiveFeature(activeFeature === feat.id ? null : feat.id)}
                  className="w-full p-8 flex items-center gap-6 text-left"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${activeFeature === feat.id ? 'bg-yellow-500' : 'bg-slate-800'}`}>
                    <feat.icon className={`w-7 h-7 ${activeFeature === feat.id ? 'text-slate-950' : feat.color}`} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1">
                      <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">{feat.title}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-800 px-3 py-1 rounded-full w-fit border border-slate-700">{feat.tag}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed hidden md:block">{feat.summary}</p>
                  </div>
                  <div className={`shrink-0 transition-transform duration-300 ${activeFeature === feat.id ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-6 h-6 text-slate-600" />
                  </div>
                </button>
                {/* Mobile summary */}
                <p className="text-slate-400 text-sm leading-relaxed px-8 pb-4 md:hidden">{feat.summary}</p>
                {/* Expanded Detail */}
                <div className={`overflow-hidden transition-all duration-400 ${activeFeature === feat.id ? 'max-h-[800px]' : 'max-h-0'}`}>
                  <div className="px-8 pb-8 border-t border-slate-800 pt-6 grid md:grid-cols-3 gap-6">
                    {feat.detail.map((para, j) => (
                      <div key={j} className="bg-slate-950/60 rounded-2xl p-6 border border-slate-800">
                        <div className="text-yellow-500/40 font-black italic text-3xl mb-3 leading-none">0{j + 1}</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{para}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-8 pb-8 flex gap-4">
                    <button onClick={() => onJoin('The 700 Club')}
                      className="px-8 py-3 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-yellow-400 transition-all flex items-center gap-2">
                      Get This Feature <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 px-6 bg-slate-900/30 border-t border-slate-900">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Us vs. <span className="text-yellow-500">Everyone Else</span></h2>
              <p className="text-slate-500">This is what institutional-grade credit restoration actually looks like.</p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800">
                    <th className="p-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 w-2/5">Feature</th>
                    <th className="p-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">Generic Firms</th>
                    <th className="p-5 text-center text-[10px] font-black uppercase tracking-widest text-yellow-500 bg-yellow-500/5">700 Club Experts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    ["Unlimited Disputes Per Month", "❌ Capped (3–5)", "✅ Unlimited"],
                    ["Certified Credit Experts on File", "❌ Call Center Reps", "✅ Every Case"],
                    ["JECI AI Response Analysis", "❌ Manual Letters Only", "✅ Proprietary AI"],
                    ["LexisNexis & SageStream Clearing", "❌ Not Offered", "✅ Included"],
                    ["Lifetime Deletion Guarantee", "❌ Not Offered", "✅ Standard"],
                    ["Business Credit Division", "❌ Not Offered", "✅ 3-Tier System"],
                    ["Home Ownership Program", "❌ Not Offered", "✅ 6-Phase Protocol"],
                    ["Live Client Results Portal", "❌ Monthly Email Only", "✅ 24/7 Real-Time"],
                    ["Affiliate Tracking Portal", "❌ Not Offered", "✅ Full Dashboard"],
                    ["State Licensed (Florida CSO)", "⚠️ Varies", "✅ Active License"],
                  ].map(([feat, them, us], i) => (
                    <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-5 font-bold text-slate-200">{feat}</td>
                      <td className="p-5 text-center text-slate-500 font-bold">{them}</td>
                      <td className="p-5 text-center font-black text-green-400 bg-yellow-500/5">{us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10 text-center">
              <button onClick={() => onJoin('The 700 Club')} className="px-14 py-6 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-lg rounded-2xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(234,179,8,0.2)]">
                Join the Club — Start Your Audit
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// AUDIT PROCESS PAGE
// ─────────────────────────────────────────

const AuditProcessPage = ({ onJoin, onBack }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const steps = [
    {
      step: "01", title: "Deep Credit Audit", icon: FileText, duration: "Days 1–5",
      headline: "We crawl deeper than any firm you've used before.",
      body: "Most credit firms pull your three-bureau report and call it an audit. We go further — pulling your LexisNexis Risk File, SageStream report, and ChexSystems data that mainstream firms never touch. These specialty files influence insurance rates, banking eligibility, and specialty lender decisions that never show on Experian, TransUnion, or Equifax.",
      actions: [
        "Full 3-bureau pull: Experian, TransUnion, Equifax",
        "LexisNexis Risk File extraction and analysis",
        "SageStream specialty consumer report review",
        "Line-by-line account verification vs. original creditor data",
        "Inquiry audit: authorized vs. unauthorized hard pulls",
        "Personal data audit: name variations, address history, SSN mismatches",
        "Score factor analysis: what's hurting you and by how much",
      ],
      stat: { val: "5+", label: "Data Sources Audited" }
    },
    {
      step: "02", title: "Legal Shield Drafting", icon: Scale, duration: "Days 5–12",
      headline: "We don't send letters. We send legal mandates.",
      body: "A 'dispute letter' from a template mill carries the same weight as a suggestion. Our Legal Shield letters are drafted by Certified Credit Experts under the specific statutory language of 15 USC § 1681, 15 USC § 1692 (FDCPA), and applicable state consumer protection law. Bureaus and collectors treat these differently — because the legal exposure is real.",
      actions: [
        "FCRA § 611(a) investigation demand letters — per bureau, per item",
        "FDCPA § 807 cease-and-desist to third-party collectors",
        "Debt validation demand letters to original creditors",
        "Method-of-verification requests (not just 'did you verify' — but HOW)",
        "Certified mail dispatch with delivery confirmation",
        "State attorney general complaint filing when warranted",
        "Full documentation chain maintained for potential litigation",
      ],
      stat: { val: "30", label: "Day Federal Bureau Deadline" }
    },
    {
      step: "03", title: "JECI AI Response Analysis", icon: Zap, duration: "Days 35–50",
      headline: "When bureaus respond, our AI reads between the lines.",
      body: "Bureaus are sophisticated. Their responses often contain technically compliant language that still fails to meet the legal standard for verification. JECI AI was built specifically to detect these 'soft verifications' — instances where a bureau checked a database instead of contacting the original creditor, which does not satisfy the FCRA's requirement that disputes be reinvestigated with accuracy.",
      actions: [
        "AI parsing of all bureau response language for soft-verification patterns",
        "Cross-reference: bureau response vs. federal verification standard (§ 611(a)(1))",
        "Identification of items verified without original-creditor documentation",
        "Detection of re-inserted items without proper advance notice (§ 1681i(a)(5)(B))",
        "Automatic escalation trigger: Round 2 dispute with violation citations",
        "Litigation referral flag: items with documented federal violation history",
        "Real-time portal update: client notified of each finding within 24 hours",
      ],
      stat: { val: "94%", label: "Round 1 Response Analysis Accuracy" }
    },
    {
      step: "04", title: "Deletion Confirmation & Escalation", icon: CheckCircle2, duration: "Days 50–65",
      headline: "Confirmed deletion or we escalate. Every time.",
      body: "When Round 1 results in deletion, we confirm across all three bureaus and update your portal. When a bureau denies or fails to respond, escalation is immediate — Round 2 goes harder, citing specific verification failures from their response. We do not accept denial as a final answer when the law gives us leverage.",
      actions: [
        "Deletion confirmed across all 3 bureaus (not just one)",
        "Re-insertion monitoring: 90-day watch period post-deletion",
        "Denial analysis: grounds for escalation and Round 2 language",
        "Regulatory complaint filing: CFPB, FTC, state AG when warranted",
        "Pre-litigation demand: when bureaus repeatedly fail to comply",
        "Score impact calculation: projected point gain from each deletion",
        "Client briefing: written summary of what was removed and why",
      ],
      stat: { val: "3x", label: "Escalation Rounds If Needed" }
    },
    {
      step: "05", title: "Profile Reconstruction", icon: TrendingUp, duration: "Days 65–120",
      headline: "Deletion is the beginning. Reconstruction is the goal.",
      body: "A clean report without positive accounts still scores low. After removing negative items, we rebuild — adding primary tradelines, optimizing utilization, and structuring your account mix to maximize FICO® score output. This is where clients hit 700+.",
      actions: [
        "Authorized user tradeline strategy (which accounts, in what order)",
        "Secured and unsecured card sequencing for credit mix optimization",
        "Utilization calibration: per-account and total utilization targeting",
        "Account age preservation: which existing accounts to keep active vs. dormant",
        "New account timing: when to apply without triggering score dips",
        "Rapid Rescore coordination (for clients mid-mortgage application)",
        "Institutional Readiness Report: written profile assessment at completion",
      ],
      stat: { val: "+84", label: "Average Points Gained" }
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-colors text-xs font-black uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
          <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-yellow-500" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Audit Process</span></div>
          <button onClick={() => onJoin('The 700 Club')} className="px-6 py-2 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-full hover:bg-yellow-400 transition-all">Start My Audit</button>
        </div>
      </div>

      <div className="pt-24">
        {/* Hero */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(234,179,8,0.07),transparent_60%)]" />
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionTag>Consumer Law Restoration</SectionTag>
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
                  This Is Not <br /><span className="text-yellow-500 underline decoration-4 underline-offset-8">Dispute Letters.</span>
                </h1>
                <p className="text-slate-400 text-xl leading-relaxed mb-10">
                  What we practice is <strong className="text-white">Consumer Law Restoration</strong> — a methodical, legally grounded process that uses federal statute to force bureaus to comply. Every step has a legal basis. Every letter has teeth.
                </p>
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2">15 USC § 1681i — The Law Behind Our Process</p>
                  <p className="text-slate-300 text-sm leading-relaxed font-mono italic">
                    "If, after any reinvestigation, an item of information is found to be inaccurate or incomplete or cannot be verified, the consumer reporting agency shall promptly delete that item of information..."
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "5", label: "Data Sources Audited", icon: Globe },
                  { val: "30", label: "Day Federal Deadline", icon: Clock },
                  { val: "94%", label: "Deletion Success Rate", icon: CheckCircle2 },
                  { val: "+84", label: "Avg Score Increase", icon: TrendingUp },
                ].map((s, i) => (
                  <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                    <s.icon className="w-6 h-6 text-yellow-500 mx-auto mb-3" />
                    <div className="text-3xl font-black italic text-yellow-500 leading-none mb-1">{s.val}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step Navigator */}
        <section className="py-4 px-6 bg-slate-900/20 border-y border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {steps.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest whitespace-nowrap transition-all ${activeStep === i ? 'bg-yellow-500 text-slate-950' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-white'}`}>
                  <span>{s.step}</span> {s.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Active Step Detail */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className={activeStep === i ? 'block' : 'hidden'}>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-yellow-500/20 font-black italic text-6xl leading-none">{s.step}</div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">{s.duration}</span>
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter">{s.title}</h2>
                        </div>
                      </div>
                      <p className="text-xl font-black italic text-white mb-4">{s.headline}</p>
                      <p className="text-slate-400 leading-relaxed text-lg">{s.body}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">What Happens in This Phase:</h4>
                      <div className="space-y-3">
                        {s.actions.map((action, j) => (
                          <div key={j} className="flex items-start gap-3 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                            <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-300 font-bold">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-yellow-500 p-8 rounded-[2rem] text-center text-slate-950">
                      <s.icon className="w-10 h-10 mx-auto mb-4" />
                      <div className="text-5xl font-black italic mb-2">{s.stat.val}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-70">{s.stat.label}</div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Navigation</p>
                      {i > 0 && (
                        <button onClick={() => setActiveStep(i - 1)} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-all text-xs font-black uppercase tracking-widest">
                          <ArrowLeft className="w-4 h-4" /> Previous: {steps[i - 1].title}
                        </button>
                      )}
                      {i < steps.length - 1 && (
                        <button onClick={() => setActiveStep(i + 1)} className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-yellow-500 text-slate-950 rounded-xl hover:bg-yellow-400 transition-all text-xs font-black uppercase tracking-widest">
                          Next: {steps[i + 1].title} <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {i === steps.length - 1 && (
                        <button onClick={() => onJoin('The 700 Club')} className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-yellow-500 text-slate-950 rounded-xl hover:bg-yellow-400 transition-all text-xs font-black uppercase tracking-widest">
                          Start My Audit <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Steps Overview */}
        <section className="py-24 px-6 bg-slate-900/20 border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">The Full <span className="text-yellow-500">5-Phase</span> Timeline</h2>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              {steps.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={`p-6 rounded-[1.5rem] border text-left transition-all hover:border-yellow-500/40 group ${activeStep === i ? 'border-yellow-500 bg-slate-900' : 'border-slate-800 bg-slate-900/30'}`}>
                  <div className="text-yellow-500/20 font-black italic text-3xl mb-3 group-hover:text-yellow-500/40 transition-colors">{s.step}</div>
                  <s.icon className="w-6 h-6 text-yellow-500 mb-3" />
                  <h4 className="text-sm font-black italic uppercase tracking-tighter mb-1">{s.title}</h4>
                  <p className="text-[10px] text-yellow-500 font-black uppercase">{s.duration}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 border-t border-slate-900">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-12 text-center">Audit Process FAQs</h3>
            {[
              { q: "What is the difference between an Audit and a Dispute?", a: "A dispute is a single letter challenging a single item. An Audit is a forensic review of your entire credit file — every account, every inquiry, every piece of personal data — looking for violations across all data sources including specialty files like LexisNexis. The Audit tells us exactly what to dispute, how to dispute it, and the legal grounds for removal." },
              { q: "Do I need to do anything during the process?", a: "Minimal. You will need to provide ID verification documents and monitor your portal for occasional requests from your Case Manager. The primary instruction during the dispute phase is to not apply for new credit, not close any existing accounts, and forward any collections calls or letters to us immediately." },
              { q: "What happens if a bureau doesn't respond within 30 days?", a: "Non-response is a violation. Under 15 USC § 1681i(a)(1), failure to complete reinvestigation within 30 days (or 45 days in limited circumstances) requires the item to be deleted. We track every deadline and file regulatory complaints with the CFPB and applicable state attorney general when bureaus miss them." },
              { q: "Can you dispute every negative item on my report?", a: "Yes — if it is inaccurate, unverifiable, or reported in violation of federal law. We cannot remove accurate, verifiable negative information that is being reported correctly. However, in our experience, a significant majority of collection accounts, medical debts, and older derogatory items cannot be verified to the federal standard when properly challenged." },
            ].map((item, i) => (
              <AccordionItem key={i} title={item.q} isOpen={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>{item.a}</AccordionItem>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// PROGRAMS & PRICING PAGE
// ─────────────────────────────────────────

const ProgramsPricingPage = ({ onJoin, onBack }) => {
  const [activeCategory, setActiveCategory] = useState('personal');
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-yellow-500 transition-colors text-xs font-black uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
          <div className="flex items-center gap-2"><Award className="w-4 h-4 text-yellow-500" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Programs & Pricing</span></div>
          <button onClick={() => onJoin('The 700 Club')} className="px-6 py-2 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-full hover:bg-yellow-400 transition-all">Enroll Now</button>
        </div>
      </div>

      <div className="pt-24">
        {/* Hero */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.06),transparent_60%)]" />
          <div className="max-w-7xl mx-auto text-center relative">
            <SectionTag>Find Your Program</SectionTag>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
              Every Goal.<br /><span className="text-yellow-500 underline decoration-4 underline-offset-8">One Platform.</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed mb-12">
              Whether you're starting from zero, rebuilding after a setback, buying a home, or building business funding — we have a specific program engineered for your exact situation.
            </p>
            {/* Self-Enroll Banner */}
            <div className="max-w-2xl mx-auto bg-white text-slate-950 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-widest text-yellow-600 mb-1">Option 2 — Recommended</div>
                <p className="font-black italic uppercase tracking-tighter text-xl">Self-Enroll Online & Save <span className="text-yellow-500">$400</span></p>
                <p className="text-slate-500 text-xs mt-1">Bypass the enrollment department. Same program, same experts, 256-bit encrypted.</p>
              </div>
              <button onClick={() => onJoin('Self-Enroll DIY')} className="shrink-0 px-8 py-4 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-yellow-400 transition-all whitespace-nowrap">
                Enroll & Save $400
              </button>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="px-6 bg-slate-900/20 border-y border-slate-900 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 overflow-x-auto">
              {[
                { id: 'personal', label: 'Personal Credit', icon: User },
                { id: 'specialty', label: 'Specialty Programs', icon: Target },
                { id: 'business', label: 'Business Credit', icon: Briefcase },
                { id: 'vip', label: 'VIP & Coaching', icon: Star },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest whitespace-nowrap transition-all ${activeCategory === tab.id ? 'bg-yellow-500 text-slate-950' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-white'}`}>
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PERSONAL CREDIT */}
        {activeCategory === 'personal' && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">Personal Credit <span className="text-yellow-500">Restoration</span></h2>
                <p className="text-slate-400 max-w-xl mx-auto">Month-to-month. No contracts. Cancel anytime. Every plan includes unlimited disputes and JECI AI analysis.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 items-stretch mb-16">
                <PriceCard title="Individual" subtitle="Single Profile Restore" price="99"
                  features={["Unlimited Bureau Disputes", "FCRA § 611(a) Legal Drafting", "Monthly Progress Reports & Score Tracking", "Credit Building Guidance Session", "24/7 Client Portal Access", "JECI AI Dispute Analysis"]}
                  onAction={onJoin} />
                <PriceCard title="The 700 Club" subtitle="Aggressive High-Limit Prep" price="149" highlighted badge="Most Popular"
                  features={["Everything in Individual", "LexisNexis & SageStream File Clearing", "Advanced Bankruptcy & Foreclosure Deletion", "Primary Trade Line Addition Strategy", "Dedicated Certified Case Manager", "Identity Theft Shield & Monitoring", "Mortgage Readiness Coaching Included"]}
                  onAction={onJoin} />
                <PriceCard title="Founder / Family" subtitle="Institutional Readiness" price="199"
                  features={["Two Adults + One Dependent", "Business Credit Foundation Included", "UCC-1 Filing Consultation", "Hard Inquiry Sweep (All Bureaus)", "Direct Legal Counsel Access", "VIP Priority Phone Support", "Home Ownership Program Included"]}
                  onAction={onJoin} />
              </div>

              {/* What's Included Details */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 md:p-16">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-center">Every Plan Includes</h3>
                <p className="text-slate-500 text-center text-sm mb-10">These are not upsells. They are your baseline rights as a 700 Club member.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Shield, title: "Lifetime Deletion Guarantee", desc: "Deleted items that are illegally re-inserted are fought at no cost to you." },
                    { icon: Zap, title: "JECI AI Engine", desc: "Proprietary AI cross-references every bureau response for verification failures." },
                    { icon: Globe, title: "LexisNexis Awareness", desc: "We monitor and flag specialty file data affecting your eligibility." },
                    { icon: BarChart3, title: "Live Results Portal", desc: "24/7 access to your deletion history, score trajectory, and case timeline." },
                    { icon: BadgeCheck, title: "Certified Expert Oversight", desc: "Every case is reviewed by a state-licensed, certified credit professional." },
                    { icon: FileText, title: "Full Legal Documentation", desc: "Every letter sent is documented. Every response is analyzed. Your full legal paper trail is in your portal." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-black italic uppercase tracking-tighter text-sm text-white mb-1">{item.title}</p>
                        <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SPECIALTY PROGRAMS */}
        {activeCategory === 'specialty' && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">Specialty <span className="text-yellow-500">Programs</span></h2>
                <p className="text-slate-400 max-w-xl mx-auto">Engineered for specific credit situations that standard dispute programs aren't built to handle.</p>
              </div>

              {/* Auto Express Program */}
              <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] border border-slate-800">
                <div className="bg-slate-900 p-10 md:p-14">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" /> Guaranteed Program
                  </div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Auto Express Program</h3>
                  <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                    A guaranteed program specifically designed to raise your credit score high enough to purchase a brand new vehicle. If your auto financing has been denied, this program targets the exact factors that car lenders use to approve or decline — and eliminates the obstacles standing between you and those keys.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      "Targeted removal of derogatory items that auto lenders flag",
                      "Utilization optimization for auto credit scoring models",
                      "Hard inquiry suppression before dealership applications",
                      "Collections and charge-off deletion strategy",
                      "Recommended account openings to improve lender confidence",
                      "Pre-qualification readiness assessment before you apply",
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onJoin('Auto Express')} className="px-10 py-4 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all flex items-center gap-2">
                    Start Auto Express <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-yellow-500 p-10 md:p-14 flex flex-col justify-center text-slate-950">
                  <div className="text-6xl font-black italic mb-2">✓</div>
                  <h4 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Guaranteed Results</h4>
                  <p className="font-bold leading-relaxed mb-8 text-slate-900">
                    We guarantee your score will increase to a level where auto financing is achievable. If we don't get you there, you receive a full refund — no fine print.
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Target Score for Auto Financing", val: "680+" },
                      { label: "Average Program Duration", val: "60–90 Days" },
                      { label: "Avg Points Gained", val: "+55–90 pts" },
                    ].map((s, i) => (
                      <div key={i} className="bg-slate-950/10 rounded-xl p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70">{s.label}</p>
                        <p className="text-2xl font-black italic mt-1">{s.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Credit Builder Plan */}
              <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] border border-slate-800">
                <div className="bg-yellow-500 p-10 md:p-14 flex flex-col justify-center text-slate-950 order-2 lg:order-1">
                  <BookOpen className="w-12 h-12 mb-6" />
                  <h4 className="text-3xl font-black italic uppercase tracking-tighter mb-6">What You Get</h4>
                  <div className="space-y-4">
                    {[
                      { label: "Guaranteed Credit Accounts", val: "$10,000+" },
                      { label: "Medical / Utility Collections Disputed", val: "Up to 2" },
                      { label: "Inquiry Sweep Included", val: "Up to 8" },
                      { label: "Personal Credit Coach Duration", val: "6 Months" },
                      { label: "Portal Access", val: "Full Dispute Software" },
                    ].map((s, i) => (
                      <div key={i} className="bg-slate-950/10 rounded-xl p-4 flex justify-between items-center">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">{s.label}</p>
                        <p className="font-black italic text-lg">{s.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900 p-10 md:p-14 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-400" /> Starting From Zero
                  </div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Credit Builder Plan</h3>
                  <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                    Designed for individuals with a score of N/A — or those with very thin files who need professional guidance opening the right accounts in the right order. No company wants to be first to extend credit. We know how to change that.
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-8">
                    Unsecured accounts are more valuable than secured to the bureaus. Secured cards can cost hundreds or thousands to open. Through this program, there are <strong className="text-yellow-500">no out-of-pocket expenses</strong> for opening secured cards. Over <strong className="text-white">$10,000 in guaranteed credit-reporting accounts</strong> is included. A personal Credit Coach will guide your account openings and remain on your case for 6 full months.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      "Score of N/A or 1–2 collections? This was built for you",
                      "Personal Credit Coach assigned for 6-month engagement",
                      "Credit Analysis Recommendation Sheet included",
                      "Up to 2 medical or utility collections disputed",
                      "Personal data audit: employment, addresses, name variations, SSN",
                      "Up to 8 hard inquiries reviewed and challenged",
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onJoin('Credit Builder')} className="px-10 py-4 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all flex items-center gap-2">
                    Start Credit Builder <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Fast Track Program */}
              <div className="bg-slate-950 border border-yellow-500/30 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full" />
                <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest mb-6">
                      <Zap className="w-3 h-3" /> Ultra-Fast Results
                    </div>
                    <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Fast Track Program</h3>
                    <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                      When you don't have months to wait — when you need results measured in weeks, not quarters — Fast Track deploys our full legal arsenal simultaneously across all bureaus and all items, compressing our standard timeline for clients with urgent financing needs.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-8">
                      Fast Track is built for clients facing a hard deadline: a mortgage closing date, a business funding application, an auto purchase, or a lease approval. We coordinate rapid rescores, expedited bureau responses, and priority Case Manager attention on a compressed timeline.
                    </p>
                    <div className="space-y-3 mb-8">
                      {[
                        "All disputes filed simultaneously (not in rounds)",
                        "Priority Case Manager — dedicated to your file daily",
                        "Rapid Rescore coordination with your lender",
                        "CFPB and state AG complaints filed faster if non-response",
                        "Expedited LexisNexis and SageStream clearance",
                        "Daily portal updates vs. standard weekly cadence",
                      ].map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0" />{f}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => onJoin('Fast Track')} className="px-10 py-4 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all flex items-center gap-2">
                      Start Fast Track <Zap className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Clock, val: "35–45", label: "Days to First Deletions", color: "border-yellow-500/30" },
                      { icon: Zap, val: "All At Once", label: "Simultaneous Disputes", color: "border-yellow-500/30" },
                      { icon: TrendingUp, val: "Priority", label: "Case Manager Access", color: "border-yellow-500/30" },
                      { icon: Target, val: "Deadline", label: "Driven Program", color: "border-yellow-500/30" },
                    ].map((s, i) => (
                      <div key={i} className={`p-6 bg-slate-900/60 rounded-2xl border ${s.color} text-center`}>
                        <s.icon className="w-6 h-6 text-yellow-500 mx-auto mb-3" />
                        <div className="text-xl font-black italic text-yellow-500 leading-none mb-1">{s.val}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BUSINESS CREDIT */}
        {activeCategory === 'business' && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto text-center py-16 border border-dashed border-slate-800 rounded-[3rem]">
              <Briefcase className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Business Credit Division</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8">Our full 3-tier business credit system — entity formation through institutional funding — is detailed on the dedicated Business Credit page.</p>
              <button onClick={onBack} className="px-10 py-4 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all">
                View Business Credit Division
              </button>
            </div>
          </section>
        )}

        {/* VIP */}
        {activeCategory === 'vip' && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">VIP Membership <span className="text-yellow-500">& Coaching</span></h2>
                <p className="text-slate-400 max-w-xl mx-auto">For clients who want more than deletion — they want mastery. High-level financial literacy and ongoing profile management.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    title: "VIP Monthly Coaching", price: "Included in Founder/Family",
                    features: ["Monthly 1-on-1 strategy session with a Certified Expert", "Full score formula breakdown and optimization plan", "Account-by-account utilization coaching", "When to apply for new credit and for what limits", "Institutional Readiness Report (written profile assessment)", "Priority queue — your calls answered first"],
                    cta: "Upgrade to Founder/Family"
                  },
                  {
                    title: "Ongoing Monitoring Membership", price: "Post-Graduation Retention",
                    features: ["Continuous 3-bureau monitoring after restoration completion", "Immediate alert on any new negative item", "Annual Legal Audit to catch new violations", "Score trajectory reporting — quarterly benchmarks", "Lifetime Guarantee remains active as long as enrolled", "Free re-dispute if any deleted item returns"],
                    cta: "Ask About Monitoring"
                  }
                ].map((plan, i) => (
                  <div key={i} className={`p-10 rounded-[2.5rem] border ${i === 0 ? 'border-yellow-500 bg-slate-900 shadow-[0_0_40px_rgba(234,179,8,0.1)]' : 'border-slate-800 bg-slate-900/40'}`}>
                    {i === 0 && <span className="block text-[10px] font-black uppercase tracking-widest bg-yellow-500 text-slate-950 py-2 px-4 rounded-full w-fit mb-6">Recommended</span>}
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-yellow-500 mb-1">{plan.title}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">{plan.price}</p>
                    <div className="space-y-4 mb-10">
                      {plan.features.map((f, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                          <span className="text-sm text-slate-300">{f}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => onJoin(plan.title)} className={`w-full py-4 font-black uppercase tracking-widest rounded-xl transition-all ${i === 0 ? 'bg-yellow-500 text-slate-950 hover:bg-yellow-400' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-24 px-6 border-t border-slate-900 bg-slate-900/20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-12 text-center">Program FAQs</h3>
            {[
              { q: "Which program is right for me?", a: "If you have an established credit file with negative items (collections, late payments, medical debt), start with Individual or The 700 Club. If you have no credit history at all, the Credit Builder Plan is your entry point. If you have a specific deadline (car purchase, mortgage), Fast Track or Auto Express is built for that. If you want full institutional readiness including business credit and home ownership, the Founder/Family plan is the comprehensive solution." },
              { q: "Can I upgrade my plan after enrollment?", a: "Yes. You can upgrade at any time and we will apply your paid months toward the new plan rate. Downgrades are available at the next billing cycle with no penalty." },
              { q: "Is there a contract or commitment?", a: "No contracts. Month-to-month for all plans. You can cancel at any time with no early termination fee. The only exception is the Fast Track program, which requires a 90-day minimum commitment because the compressed timeline requires us to front-load our legal team's effort." },
              { q: "What's the difference between Self-Enroll (Option 2) and using the Enrollment Department?", a: "The program is identical. The difference is process. When you self-enroll online, our system automatically creates your profile, generates your credentials, and queues your case for assignment — without requiring a 45-minute intake call with an enrollment agent. We pass the savings directly to you: $400 off. We recommend Option 2 for clients who are decisive and ready to begin." },
            ].map((item, i) => (
              <AccordionItem key={i} title={item.q} isOpen={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>{item.a}</AccordionItem>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// MAIN LANDING PAGE
// ─────────────────────────────────────────

export default function App() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [notification, setNotification] = useState(null);
  const [view, setView] = useState('landing');
  const [selectedPlan, setSelectedPlan] = useState('The 700 Club');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notify = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 3000); };

  const handleJoin = (planName) => {
    setSelectedPlan(typeof planName === 'string' ? planName : 'The 700 Club');
    setView('intake');
    window.scrollTo(0, 0);
  };

  const handleLogin = () => { setView('portal'); window.scrollTo(0, 0); };
  const goHome = () => { setView('landing'); window.scrollTo(0, 0); setMobileMenuOpen(false); };

  if (view === 'login') return <LoginScreen onLogin={handleLogin} onBack={goHome} />;
  if (view === 'portal') return <MemberPortal onLogout={goHome} />;
  if (view === 'intake') return <IntakePortal selectedPlan={selectedPlan} onBack={goHome} />;
  if (view === 'home-ownership') return <HomeOwnershipPage onJoin={handleJoin} onBack={goHome} />;
  if (view === 'business-credit') return <BusinessCreditPage onJoin={handleJoin} onBack={goHome} />;
  if (view === 'email-sequence') return <EmailSequencePage onBack={goHome} />;
  if (view === 'unique-features') return <UniqueFeaturesPage onJoin={handleJoin} onBack={goHome} />;
  if (view === 'audit-process') return <AuditProcessPage onJoin={handleJoin} onBack={goHome} />;
  if (view === 'programs-pricing') return <ProgramsPricingPage onJoin={handleJoin} onBack={goHome} />;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-500 selection:text-slate-900">

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-slate-950 px-6 py-3 rounded-full shadow-2xl font-black flex items-center gap-2">
          <Zap className="w-4 h-4" /> {notification}
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#1e293b' }}>
          {/* Header bar matching the nav */}
          <div className="flex items-center justify-between px-6 h-24 border-b border-slate-700 bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl rotate-12 flex items-center justify-center">
                <ShieldCheck className="text-slate-950 w-6 h-6" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter uppercase leading-none text-white">700<span className="text-yellow-500">Club</span></span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
              <X className="w-6 h-6 text-slate-300" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex-grow flex flex-col justify-center px-8 gap-1 bg-slate-800">
            {[
              { label: 'Unique Features', action: () => { setView('unique-features'); setMobileMenuOpen(false); }, icon: CheckCircle2 },
              { label: 'The Audit Process', action: () => { setView('audit-process'); setMobileMenuOpen(false); }, icon: FileText },
              { label: 'Programs & Pricing', action: () => { setView('programs-pricing'); setMobileMenuOpen(false); }, icon: Award },
              { label: 'Home Ownership Program', action: () => { setView('home-ownership'); setMobileMenuOpen(false); }, icon: Home },
              { label: 'Business Credit Division', action: () => { setView('business-credit'); setMobileMenuOpen(false); }, icon: Briefcase },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="flex items-center gap-4 px-6 py-5 rounded-2xl hover:bg-slate-700 transition-colors cursor-pointer group border border-transparent hover:border-slate-600 w-full text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-700 group-hover:bg-yellow-500 flex items-center justify-center transition-colors shrink-0">
                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-950 transition-colors" />
                </div>
                <span className="text-xl font-black italic uppercase tracking-tighter text-slate-200 group-hover:text-yellow-500 transition-colors">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="px-8 py-8 border-t border-slate-700 bg-slate-900 space-y-3">
            <button
              onClick={() => { handleJoin(); setMobileMenuOpen(false); }}
              className="w-full py-5 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-2xl text-sm hover:bg-yellow-400 transition-all"
            >
              Start Your Audit — Free
            </button>
            <button
              onClick={() => { setView('login'); setMobileMenuOpen(false); }}
              className="w-full py-4 bg-slate-800 border border-slate-700 text-slate-300 font-black uppercase tracking-widest rounded-2xl text-sm hover:bg-slate-700 transition-all"
            >
              Member Portal Login
            </button>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={goHome}>
            <div className="w-12 h-12 bg-yellow-500 rounded-xl rotate-12 flex items-center justify-center transition-transform group-hover:rotate-0">
              <ShieldCheck className="text-slate-950 w-7 h-7" />
            </div>
            <div>
              <span className="text-3xl font-black italic tracking-tighter uppercase leading-none block">700<span className="text-yellow-500 underline decoration-yellow-500 decoration-4 underline-offset-8">Club</span></span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 mt-1 block">Legal, Moral, Ethical & Factual</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <button onClick={() => setView('unique-features')} className="hover:text-yellow-500 transition-colors">Unique Features</button>
            <button onClick={() => setView('audit-process')} className="hover:text-yellow-500 transition-colors">The Audit</button>
            <button onClick={() => setView('programs-pricing')} className="hover:text-yellow-500 transition-colors">Programs</button>
            <button onClick={() => setView('home-ownership')} className="hover:text-yellow-500 transition-colors flex items-center gap-1"><Home className="w-3 h-3" />Home</button>
            <button onClick={() => setView('business-credit')} className="hover:text-yellow-500 transition-colors flex items-center gap-1"><Briefcase className="w-3 h-3" />Business</button>
            <button onClick={() => setView('login')} className="px-6 py-2 border border-slate-800 rounded-full hover:bg-slate-900 hover:border-yellow-500 transition-all">Member Login</button>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2"><Menu className="w-6 h-6 text-slate-400" /></button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-48 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <SectionTag>Now Accepting New Members</SectionTag>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
              Bridge the <span className="text-yellow-500 underline decoration-4 underline-offset-8">Gap</span> <br />
              to 700+ Score
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Stop paying for simple "disputes." Join an institutional-grade credit club that leverages <span className="text-white font-bold">Consumer Law (FCRA/FDCPA)</span> and AI systems to permanently erase inaccurate debt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button onClick={() => handleJoin()} className="px-10 py-5 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(234,179,8,0.2)]">
                Start Your Audit <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => handleJoin('Self-Enroll DIY')} className="px-10 py-5 border border-slate-700 text-white font-black uppercase tracking-widest rounded-2xl hover:border-yellow-500 transition-all">
                Self-Enroll + Save $400
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold">{i}</div>)}
              </div>
              <div className="text-xs">
                <div className="flex text-yellow-500">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}</div>
                <span className="text-slate-500 font-bold uppercase tracking-tighter">Joined by 12,000+ Members</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-500/10 blur-[120px] rounded-full -z-10" />
            <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-800 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h4 className="font-black italic uppercase tracking-tighter text-2xl">Live Audit View</h4>
                  <p className="text-slate-500 text-xs uppercase font-bold">Inaccurate Items Identified</p>
                </div>
                <TrendingUp className="text-yellow-500 w-10 h-10" />
              </div>
              <div className="space-y-4">
                {[
                  { label: "Medical Collection (Inaccurate)", value: "-$4,200", status: "Deleting", active: true },
                  { label: "Inquiry Removal (Unverified)", value: "12 Items", status: "Pending", active: true },
                  { label: "Late Payment (FCRA Violation)", value: "30-Day", status: "Deleted ✓", active: false },
                  { label: "LVNV Funding Collection", value: "-$2,800", status: "Legal Shield Sent", active: true },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${!item.active ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                      <div>
                        <p className="text-xs font-black uppercase text-white">{item.label}</p>
                        <p className="text-[10px] text-slate-500">{item.status}</p>
                      </div>
                    </div>
                    <span className={`font-black italic ${!item.active ? 'text-green-500' : 'text-yellow-500'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 px-6 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBadge value="12,000" label="Active Members" prefix="+" />
          <StatBadge value="84" label="Avg Score Increase" prefix="+" />
          <StatBadge value="96%" label="Deletion Success Rate" />
          <StatBadge value="$2.4M" label="Debt Erased for Clients" />
        </div>
      </section>

      {/* ── UNIQUE FEATURES ── */}
      <section id="features" className="py-24 px-6 bg-slate-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <header>
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">Our Unique <br /><span className="text-yellow-500 underline decoration-8 decoration-yellow-500">Features</span></h2>
                <p className="text-slate-400 text-xl font-bold italic">Why 700 Credit Mastered the Game.</p>
              </header>
              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                {[
                  "Lifetime Guarantee",
                  "Credit Tracker App",
                  "Certified Credit Experts",
                  "Affiliate Tracking Portal",
                  "Client Results Portal",
                  "Home Ownership Program",
                  "Unlimited Dispute Letters",
                  "Unlimited Legal Audits",
                  "Licensed in Florida",
                  "VIP Membership Site",
                  "Business Credit Division",
                  "JECI AI Engine",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                      <CheckCircle2 className="text-yellow-500 w-5 h-5 group-hover:text-slate-950" />
                    </div>
                    <span className="text-sm font-black uppercase italic tracking-tighter text-slate-300 group-hover:text-white transition-colors">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-500 p-12 rounded-[4rem] text-center shadow-[0_30px_60px_rgba(234,179,8,0.2)]">
                <Users className="w-16 h-16 text-slate-950 mx-auto mb-8" />
                <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-slate-950">Affiliate Portal</h3>
                <p className="text-slate-900 font-bold mb-10 leading-relaxed">Refer your clients to a firm that delivers results. Track every deletion and score increase in real-time through our institutional affiliate dashboard.</p>
                <button onClick={() => notify("Partner application portal opening...")} className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">Partner With Us</button>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-slate-800 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">JECI AI Technology</p>
                <p className="text-sm text-slate-300 font-bold italic leading-relaxed">"Our proprietary AI cross-references bureau responses against federal statutes in real time — identifying verification failures that human reviewers miss."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM PREVIEWS ── */}
      <section className="py-24 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionTag>Specialized Programs</SectionTag>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Built for Every <span className="text-yellow-500">Financial Goal</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Home Ownership Card */}
            <div className="group relative p-10 bg-slate-900/50 rounded-[3rem] border border-slate-800 hover:border-yellow-500/40 transition-all overflow-hidden cursor-pointer" onClick={() => setView('home-ownership')}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[80px] rounded-full group-hover:bg-yellow-500/10 transition-all" />
              <Home className="w-12 h-12 text-yellow-500 mb-6" />
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Home Ownership Program</h3>
              <p className="text-slate-400 leading-relaxed mb-8">We reverse-engineer exactly what your mortgage underwriter is looking for — and rebuild your profile to match. From first denial to closing table.</p>
              <div className="space-y-2 mb-8">
                {["Mortgage FICO® model optimization", "DTI ratio reduction strategy", "LexisNexis + Rapid Rescore coordination", "6-phase Lender Readiness Protocol"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0" />{f}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-yellow-500 font-black uppercase text-xs tracking-widest group-hover:gap-3 transition-all">
                Learn More About the Home Program <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Business Credit Card */}
            <div className="group relative p-10 bg-slate-900/50 rounded-[3rem] border border-slate-800 hover:border-yellow-500/40 transition-all overflow-hidden cursor-pointer" onClick={() => setView('business-credit')}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[80px] rounded-full group-hover:bg-yellow-500/10 transition-all" />
              <Briefcase className="w-12 h-12 text-yellow-500 mb-6" />
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Business Credit Division</h3>
              <p className="text-slate-400 leading-relaxed mb-8">Build a fully autonomous business credit profile under your EIN. Access institutional funding — vendor lines, revolving credit, SBA lines — without a personal guarantee.</p>
              <div className="space-y-2 mb-8">
                {["LLC / S-Corp entity formation strategy", "Net-30 vendors + Paydex 80+ activation", "$25K–$150K in revolving business credit", "No-personal-guarantee funding pathways"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0" />{f}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-yellow-500 font-black uppercase text-xs tracking-widest group-hover:gap-3 transition-all">
                Explore Business Credit Tiers <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE METHODOLOGY ── */}
      <section id="process" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">The Club Methodology</h2>
            <p className="text-slate-400">Aggressive. Legal. Methodical. This is Consumer Law Restoration — not mass letters.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: "Deep Audit", desc: "We crawl all 3 bureaus plus LexisNexis and SageStream to find every hidden data violation, misreport, and factual inaccuracy.", icon: FileText, step: "01" },
              { title: "Legal Shield", desc: "FCRA § 611(a) and FDCPA § 807 cease & desist orders drafted by Certified Experts — not software, not templates.", icon: Scale, step: "02" },
              { title: "JECI AI Disputes", desc: "Our proprietary AI cross-references bureau responses for verification failures in real time, triggering automatic escalation.", icon: Zap, step: "03" },
              { title: "Rebuilding", desc: "Adding primary tradelines, optimizing utilization, and building institutional readiness — the full profile transformation.", icon: TrendingUp, step: "04" },
            ].map((s, i) => (
              <div key={i} className="group p-8 bg-slate-900/40 rounded-[2rem] border border-slate-800 hover:border-yellow-500/50 transition-all">
                <div className="text-yellow-500/20 font-black italic text-4xl mb-6 group-hover:text-yellow-500/40 transition-colors">{s.step}</div>
                <s.icon className="w-10 h-10 text-yellow-500 mb-6" />
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSUMER LAW DEEP DIVE ── */}
      <section id="consumer-law" className="py-24 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-950 p-12 md:p-20 rounded-[4rem] border border-slate-800 flex flex-col items-center text-center">
            <Scale className="text-yellow-500 w-16 h-16 mb-10" />
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 max-w-4xl">
              Strict Adherence to <span className="text-yellow-500 underline decoration-yellow-500 decoration-4">Consumer Rights</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mb-4 italic">
              "If information is found to be inaccurate, incomplete, or cannot be verified, the consumer reporting agency shall promptly delete that item."
            </p>
            <p className="text-slate-600 font-black uppercase text-xs tracking-widest mb-12">— 15 USC § 1681i (The Fair Credit Reporting Act)</p>
            <div className="grid md:grid-cols-3 gap-8 w-full text-left">
              {[
                { t: "Factual Audit", d: "Every data point on your report is cross-referenced. Any mismatch between bureau records and original creditor documentation is a federal violation — and a deletion trigger." },
                { t: "No Pressure Consultation", d: "Call for a free analysis. A Certified Consultant will map every negative item, explain the legal basis for removal, and give you a real timeline — no scripts, no pressure." },
                { t: "Institutional Readiness", d: "Our goal is not just deletion. It's rebuilding your file to access 6-figure funding, home ownership, and business borrowing power. We build credit weapons." },
              ].map((law, i) => (
                <div key={i} className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 hover:border-yellow-500/30 transition-colors">
                  <h4 className="text-lg font-black italic uppercase tracking-tighter text-yellow-500 mb-3">{law.t}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-bold italic">{law.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SELF-ENROLL CTA ── */}
      <section className="py-24 px-6 border-y border-slate-900">
        <div className="max-w-5xl mx-auto bg-white text-slate-950 p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8"><CheckCircle2 className="w-20 h-20 text-slate-100" /></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 blur-[60px] rounded-full" />
          <span className="inline-block bg-yellow-500 text-slate-950 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-pulse">Option 2: Recommended — Save $400</span>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">Self-Enroll <br />DIY Kit</h2>
          <p className="text-xl font-bold text-slate-600 max-w-2xl mx-auto mb-4">
            This paperless process was designed to save you time and money. Bypass our enrollment department and
          </p>
          <p className="text-3xl font-black uppercase mb-10">
            <span className="bg-slate-900 text-yellow-500 px-4 py-2 rounded-xl inline-block">SAVE $400.00 INSTANTLY</span>
          </p>
          <button onClick={() => handleJoin("Self-Enroll DIY")} className="px-16 py-8 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-2xl rounded-3xl hover:scale-105 transition-all shadow-xl shadow-yellow-500/20">
            Click Here To Enroll Now!
          </button>
          <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>🔒 256-Bit Encryption</span>
            <span>✓ Licensed in Florida</span>
            <span>✓ FCRA Compliant</span>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionTag>Personal Credit Programs</SectionTag>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Select Your Entrance</h2>
            <p className="text-slate-400">Month-to-month flexibility. No long-term handcuffs. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <PriceCard title="Individual" subtitle="Single Profile Restoration" price="99"
              features={["Unlimited Bureau Disputes", "FCRA Legal Drafting", "Monthly Progress Reports", "Credit Building Guidance", "24/7 Client Portal Access", "JECI AI-Assisted Disputes"]}
              onAction={handleJoin} />
            <PriceCard title="The 700 Club" subtitle="Aggressive High-Limit Prep" price="149" highlighted badge="Most Popular"
              features={["All Individual Features", "LexisNexis & SageStream Clear", "Advanced Bankruptcy Deletion", "Primary Trade Line Strategy", "Dedicated Case Manager", "Identity Theft Protection", "Mortgage Readiness Coaching"]}
              onAction={handleJoin} />
            <PriceCard title="Founder / Family" subtitle="Institutional Readiness" price="199"
              features={["Two Adults + 1 Dependent", "Business Credit Foundations", "UCC-1 Filing Consultation", "Hard Inquiry Sweep", "Direct Legal Counsel Access", "VIP Phone Support", "Home Ownership Program Included"]}
              onAction={handleJoin} />
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] flex items-center gap-6 hover:border-yellow-500/30 transition-all cursor-pointer" onClick={() => setView('home-ownership')}>
              <Home className="w-12 h-12 text-yellow-500 shrink-0" />
              <div>
                <h4 className="text-lg font-black italic uppercase tracking-tighter text-yellow-500">Home Ownership Program</h4>
                <p className="text-slate-400 text-sm mt-1">6-phase mortgage readiness protocol. Full lender preparation.</p>
                <div className="flex items-center gap-2 text-yellow-500 font-black uppercase text-[10px] tracking-widest mt-3 hover:gap-3 transition-all">View Program Details <ChevronRight className="w-3 h-3" /></div>
              </div>
            </div>
            <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] flex items-center gap-6 hover:border-yellow-500/30 transition-all cursor-pointer" onClick={() => setView('business-credit')}>
              <Briefcase className="w-12 h-12 text-yellow-500 shrink-0" />
              <div>
                <h4 className="text-lg font-black italic uppercase tracking-tighter text-yellow-500">Business Credit Division</h4>
                <p className="text-slate-400 text-sm mt-1">3-tier business credit building. $250K+ in institutional capacity.</p>
                <div className="flex items-center gap-2 text-yellow-500 font-black uppercase text-[10px] tracking-widest mt-3 hover:gap-3 transition-all">Explore Business Tiers <ChevronRight className="w-3 h-3" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Real <span className="text-yellow-500">Results.</span> Real Members.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { quote: "Within 45 days, my score jumped from 580 to 712. They didn't just remove the negatives — they taught me how credit works as a weapon.", name: "Marcus V.", role: "Real Estate Investor", score: "+132 pts" },
              { quote: "I was denied for a mortgage twice. After 90 days in the Home Ownership Program, I was approved for $340K. I cried at closing.", name: "Tanya R.", role: "First-Time Homeowner, Houston TX", score: "$340K Approved" },
              { quote: "Medical debt from 2018 — $8,400 — completely deleted. 3 collections gone in 35 days. The legal audit process is real.", name: "Darius W.", role: "Business Owner & Investor", score: "$8,400 Deleted" },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 relative">
                <div className="flex text-yellow-500 mb-4">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}</div>
                <Quote className="w-8 h-8 text-yellow-500/20 mb-4" />
                <p className="text-slate-300 leading-relaxed italic mb-6">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black italic uppercase tracking-tighter text-sm">{t.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{t.role}</p>
                  </div>
                  <span className="text-green-500 font-black italic text-sm bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">{t.score}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-16 h-16 text-yellow-500/20 mx-auto mb-8" />
            <p className="text-3xl md:text-5xl font-black italic tracking-tight uppercase leading-none mb-10">
              "Within 45 days, my score jumped from 580 to 712. They didn't just remove the negatives; they <span className="text-yellow-500">taught me how credit works</span> as a weapon."
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-12 text-center underline decoration-yellow-500 decoration-4 underline-offset-8">
            Common Inquiries
          </h2>
          <div className="space-y-2">
            {[
              { q: "What makes 700 Club different from other credit repair companies?", a: "We practice Consumer Law Restoration — not mass dispute letters. Every case begins with a legal audit under FCRA § 611(a), uses our JECI AI to cross-reference bureau responses for verification failures, and results in personalized Certified Expert drafting. We build credit weapons, not credit bandages." },
              { q: "Is credit repair legal?", a: "Absolutely. The Fair Credit Reporting Act (15 USC § 1681) gives every consumer the right to dispute any item on their credit report. If it cannot be verified with 100% accuracy and original documentation, it must be removed. We act as your licensed legal agent in this process." },
              { q: "How long does it take?", a: "Most clients see their first round of deletions within 35-45 days. A full restoration to 700+ typically takes 4–6 months depending on the depth of the file. Our Home Ownership Program clients achieve mortgage readiness in 90–120 days." },
              { q: "What if deleted items come back?", a: "We provide a Permanent Deletion Guarantee. If a bureau re-inserts an item we successfully removed without following proper FCRA re-insertion notice laws (15 USC § 1681i(a)(5)(B)), we will pursue legal action on your behalf at no cost." },
              { q: "Do you offer a money-back guarantee?", a: "Yes. If we do not successfully remove at least one inaccurate item from your report within the first 90 days, you are entitled to a full refund of your service fees." },
              { q: "What is the Self-Enroll DIY Kit?", a: "This is our Option 2 — a paperless online enrollment that bypasses our enrollment department and saves you $400 instantly. You receive the exact same program, the same Certified Experts, and the same JECI AI system. It's designed for self-sufficient clients who are ready to act without a consultation call." },
            ].map((item, i) => (
              <AccordionItem key={i} title={item.q} isOpen={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}>
                {item.a}
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto text-center">
          <SectionTag>Your Move</SectionTag>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Your Score Won't Fix <br /><span className="text-yellow-500">Itself.</span>
          </h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">Every month you wait is another month of high interest rates, denied applications, and financial restriction. The bureaus are not on your side. We are.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => handleJoin()} className="px-12 py-6 bg-yellow-500 text-slate-950 font-black uppercase tracking-widest text-lg rounded-2xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(234,179,8,0.2)]">
              Start Your Free Audit
            </button>
            <button onClick={() => handleJoin('Self-Enroll DIY')} className="px-12 py-6 border border-yellow-500/40 text-yellow-500 font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-yellow-500/5 transition-all">
              Self-Enroll & Save $400
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <span className="text-3xl font-black italic tracking-tighter uppercase mb-4 block">700<span className="text-yellow-500 underline decoration-yellow-500 decoration-2">Experts</span></span>
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-6">
              Legal, Moral, Ethical & Factual Credit Services. 700 Credit Club Experts is a licensed credit services organization and Certified Credit Expert firm operating under the laws of the State of Florida.
            </p>
            <div className="flex gap-4 text-slate-700">
              <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Award className="w-5 h-5 fill-current" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-12">
            <div>
              <h5 className="text-[10px] font-black uppercase text-white tracking-widest mb-6 underline decoration-yellow-500 decoration-2">Programs</h5>
              <ul className="space-y-3 text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                <li><button onClick={() => setView('home-ownership')} className="hover:text-yellow-500 transition-colors">Home Ownership</button></li>
                <li><button onClick={() => setView('business-credit')} className="hover:text-yellow-500 transition-colors">Business Credit</button></li>
                <li><a href="#pricing" className="hover:text-yellow-500 transition-colors">VIP Membership</a></li>
                <li><a href="#pricing" className="hover:text-yellow-500 transition-colors">Self-Enroll</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase text-white tracking-widest mb-6 underline decoration-yellow-500 decoration-2">Resources</h5>
              <ul className="space-y-3 text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                <li><a href="#process" className="hover:text-yellow-500 transition-colors">The Audit</a></li>
                <li><button onClick={() => setView('email-sequence')} className="hover:text-yellow-500 transition-colors">Email System</button></li>
                <li><a href="#features" className="hover:text-yellow-500 transition-colors">Affiliate Portal</a></li>
                <li><button onClick={() => setView('login')} className="hover:text-yellow-500 transition-colors">Member Portal</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase text-white tracking-widest mb-6 underline decoration-yellow-500 decoration-2">Legal</h5>
              <ul className="space-y-3 text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">Florida License</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors">FCRA Rights</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
          <span>700creditclubexperts.com • Empowering Financial Freedom Since 2020</span>
          <span>Licensed Credit Services Org • State of Florida • FCRA / FDCPA Compliant</span>
        </div>
      </footer>
    </div>
  );
}
