import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Bitcoin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CreditClubDetails() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary text-white relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-1.5 mb-6 bg-secondary/20 border border-secondary/30 rounded-full text-secondary text-sm font-bold tracking-widest uppercase">
              700 Credit Club
            </div>
            <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6">Welcome to the 700 Credit Club</h1>
            <p className="text-xl md:text-2xl text-secondary italic mb-8">Fix, Build, Own – Your Path from Credit Repair to Crypto Wealth</p>
            <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto">
              The 700 Credit Club is your all-in-one community for transforming your credit score into real wealth. 
              Join thousands who've gone from 500s to 800+ FICO and passive income streams.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold h-14 px-8">
                Join the Club
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">What We Offer</h2>
            <p className="text-slate-600">Comprehensive tools for credit restoration and wealth creation.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { title: "Credit Sweep", desc: "3-Round AI Disputes", price: "$499", icon: <Shield className="w-8 h-8" /> },
              { title: "Installment Builder", desc: "Build Payment History", price: "$99/mo", icon: <TrendingUp className="w-8 h-8" /> },
              { title: "BTC Loan Setup", desc: "Prime Rate Access", price: "Free", icon: <Bitcoin className="w-8 h-8" /> },
              { title: "Wealth Club", desc: "Monthly Masterminds", price: "$197/mo", icon: <Users className="w-8 h-8" /> }
            ].map((service, i) => (
              <Card key={i} className="border-slate-200 hover:border-secondary transition-all group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary text-secondary flex items-center justify-center rounded-lg mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{service.desc}</p>
                  <p className="text-2xl font-black text-primary">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Phases Section */}
          <div className="bg-primary text-white p-12 md:p-20 rounded-2xl relative overflow-hidden mb-24">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-12 text-center">The 4 Phases</h2>
            <div className="grid gap-6 max-w-3xl mx-auto">
              {[
                { 
                  title: "Phase 1: Credit Repair", 
                  content: "Remove 80% negatives in 30–60 days with AI disputes. Average +100 points." 
                },
                { 
                  title: "Phase 2: Credit Building", 
                  content: "Boost to 800 FICO with secured loans and cards. +85 points in 6–12 months." 
                },
                { 
                  title: "Phase 3: 700 Crypto", 
                  content: "Unlock BTC-backed loans at 4.5%. Borrow without selling your stack." 
                },
                { 
                  title: "Phase 4: 800 Wealth Club", 
                  content: "Passive income, prime investments, legacy planning. Exclusive for 800+ FICO." 
                }
              ].map((phase, i) => (
                <details key={i} className="group border-b border-white/10 pb-4 cursor-pointer">
                  <summary className="flex items-center justify-between text-xl font-bold list-none">
                    <span>{phase.title}</span>
                    <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-4 text-white/60 leading-relaxed pl-4 border-l-2 border-secondary">
                    {phase.content}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Formspree Subscription */}
          <div className="max-w-2xl mx-auto text-center bg-white p-12 rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Subscribe for Updates & Join</h2>
            <p className="text-slate-500 mb-8">Join 4,200+ members building legacy through credit and crypto.</p>
            <form action="https://formspree.io/f/mqaeodkq" method="POST" className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
                className="flex-1 px-6 py-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
              />
              <Button type="submit" className="bg-primary text-white hover:bg-slate-800 font-bold px-8 h-14">
                Subscribe & Join
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
