import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Bitcoin, Users, CheckCircle2, ArrowRight, LayoutDashboard, Target, Zap, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function CreditClubDetails() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const signupMutation = useMutation({
    mutationFn: async (data: { email: string; name: string }) => {
      await apiRequest("POST", "/api/credit-club", data);
    },
    onSuccess: () => {
      toast({ title: "Welcome to the Club!", description: "We'll be in touch with your next steps." });
      setEmail('');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to sign up. Please try again.", variant: "destructive" });
    },
  });

  const subNavItems = [
    { name: 'Repair', icon: <Shield size={16} />, id: 'repair' },
    { name: 'Building', icon: <TrendingUp size={16} />, id: 'building' },
    { name: '700 Crypto', icon: <Bitcoin size={16} />, id: 'crypto' },
    { name: 'Wealth Club', icon: <Target size={16} />, id: 'wealth' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Sub-Navigation Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 hidden md:block">
        <div className="container px-4 py-3 flex justify-center gap-8">
          {subNavItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest"
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-primary text-white relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1.5 mb-6 bg-secondary text-primary rounded-full text-xs font-black uppercase tracking-[0.2em]">
              Elite Financial Circle
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6">700 Credit Club</h1>
            <p className="text-xl md:text-3xl text-secondary italic mb-8 max-w-3xl mx-auto leading-relaxed">
              Fix, Build, Own – Your Path from Credit Repair to Crypto Wealth
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold h-16 px-10 text-lg rounded-none shadow-xl">
                JOIN THE CLUB NOW
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Offers Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Credit Sweep", desc: "3-Round AI Disputes", price: "$499", icon: <Shield className="w-8 h-8" /> },
              { title: "Installment Builder", desc: "Build Payment History", price: "$99/mo", icon: <TrendingUp className="w-8 h-8" /> },
              { title: "BTC Loan Setup", desc: "Prime Rate Access", price: "Free", icon: <Bitcoin className="w-8 h-8" /> },
              { title: "Wealth Club", desc: "Monthly Masterminds", price: "$197/mo", icon: <Target className="w-8 h-8" /> }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-slate-50 text-primary flex items-center justify-center rounded-sm mb-6 group-hover:bg-secondary transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{service.desc}</p>
                <p className="text-3xl font-serif font-bold text-primary">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases Journey */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-16 text-center">The 4-Phase Roadmap</h2>
            
            <div className="space-y-4">
              {[
                { 
                  id: 'repair',
                  title: "Phase 1: Credit Repair", 
                  content: "Remove 80% negatives in 30–60 days with AI disputes. Average +100 points." 
                },
                { 
                  id: 'building',
                  title: "Phase 2: Credit Building", 
                  content: "Boost to 800 FICO with secured loans and cards. +85 points in 6–12 months." 
                },
                { 
                  id: 'crypto',
                  title: "Phase 3: 700 Crypto", 
                  content: "Unlock BTC-backed loans at 4.5%. Borrow without selling your stack." 
                },
                { 
                  id: 'wealth',
                  title: "Phase 4: 800 Wealth Club", 
                  content: "Passive income, prime investments, legacy planning. Exclusive for 800+ FICO." 
                }
              ].map((phase, i) => (
                <div id={phase.id} key={i} className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-secondary font-black text-sm uppercase tracking-widest block mb-2">Step 0{i+1}</span>
                      <h3 className="text-2xl md:text-3xl font-bold">{phase.title}</h3>
                    </div>
                    <ArrowRight className="w-8 h-8 text-secondary group-hover:translate-x-2 transition-transform" />
                  </div>
                  <p className="mt-6 text-xl text-white/60 leading-relaxed italic">
                    {phase.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-none p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[100px]" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Join the 700 Credit Club</h2>
              <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                Secure your spot in the next monthly mastermind and start your journey to 800 FICO today.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); signupMutation.mutate({ email, name: '' }); }} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required 
                  data-testid="input-credit-club-email"
                  className="flex-1 px-8 py-5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button type="submit" disabled={signupMutation.isPending || !email} data-testid="button-credit-club-join" className="bg-secondary text-primary hover:bg-white font-bold px-12 h-16 text-lg rounded-none shadow-2xl">
                  {signupMutation.isPending ? "JOINING..." : "JOIN NOW"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
