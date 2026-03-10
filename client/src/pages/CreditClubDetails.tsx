import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Bitcoin, Users, CheckCircle2, ArrowRight, Target, Zap, Globe, Star, CreditCard, Award, ExternalLink, Trophy, BadgeCheck, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const JOIN_LINK = "https://700creditclubexperts.getcredithelpnow.com/start";
const SKOOL_LINK = "https://www.skool.com/700-credit-club-experts-7830/about";

const PHASE_LINKS = {
  phase1: "https://discord.gg/qJPUJYGQ",
  phase2: "https://discord.gg/eD44WFUV",
  phase3: "https://discord.gg/EYX9udhS",
  phase4: "https://www.skool.com/funding",
};

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
    { name: 'Offers', icon: <Shield size={16} />, id: 'offers' },
    { name: 'Roadmap', icon: <TrendingUp size={16} />, id: 'roadmap' },
    { name: 'Results', icon: <Trophy size={16} />, id: 'results' },
    { name: 'Community', icon: <Users size={16} />, id: 'community' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Sub-nav */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 hidden md:block">
        <div className="container px-4 md:px-6 py-3 flex justify-center gap-8">
          {subNavItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest"
              data-testid={`subnav-${item.id}`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="pt-40 pb-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/vault-graphic.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary" />
        </div>
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-6">
              <img src="/logo.jpg" alt="700 Credit Club Experts" className="w-24 h-24 rounded-xl shadow-2xl" />
            </div>
            <div className="inline-block px-4 py-1.5 mb-6 bg-secondary text-primary rounded-full text-xs font-black uppercase tracking-[0.2em]">
              Elite Financial Circle
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6" data-testid="text-hero-title">700 Credit Club</h1>
            <p className="text-xl md:text-3xl text-secondary italic mb-4 max-w-3xl mx-auto leading-relaxed">
              Fix, Build, Own — Your Path from Credit Repair to Crypto Wealth
            </p>
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
              83 clients/month with 100+ point average boost. Your Win = Our Mission.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={JOIN_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold h-16 px-10 text-lg rounded-none shadow-xl" data-testid="button-join-hero">
                  JOIN THE CLUB NOW
                </Button>
              </a>
              <a href={SKOOL_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold h-16 px-10 text-lg rounded-none" data-testid="button-skool-hero">
                  JOIN SKOOL COMMUNITY
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Stats Bar — FIX: was missing md:px-6, now matches all other sections */}
      <section className="py-6 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Clients Served" },
              { value: "100+", label: "Avg Point Increase" },
              { value: "6", label: "Items Deleted Avg" },
              { value: "30-60", label: "Days to Results" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-secondary" data-testid={`stat-value-${i}`}>{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-black text-sm uppercase tracking-[0.2em]">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mt-3">Credit Repair & Building Services</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
              From removing negatives to building an 800+ FICO score, we've got every step covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Credit Sweep", desc: "AI-powered 3-round dispute process targeting collections, charge-offs, late payments, and inquiries. We challenge every inaccurate item across all 3 bureaus.", price: "$499", icon: <Shield className="w-8 h-8" />, features: ["All 3 bureaus targeted", "AI-generated dispute letters", "Average 6 items deleted", "80% negative removal rate"] },
              { title: "Credit Building Program", desc: "Strategic tradeline placement and authorized user accounts to build positive payment history fast.", price: "$99/mo", icon: <TrendingUp className="w-8 h-8" />, features: ["Secured card optimization", "Tradeline strategy", "Credit mix improvement", "+85 pts in 6-12 months"] },
              { title: "BTC Loan Setup", desc: "Leverage your Bitcoin holdings for prime-rate loans without selling your stack. Access DeFi lending at competitive rates.", price: "Free Consult", icon: <Bitcoin className="w-8 h-8" />, features: ["4.5% APR available", "No credit check needed", "Keep your BTC exposure", "Instant approval options"] },
              { title: "Wealth Club Mastermind", desc: "Exclusive monthly masterminds for members with 750+ FICO scores. Access premium investment opportunities and legacy planning.", price: "$197/mo", icon: <Target className="w-8 h-8" />, features: ["Monthly live sessions", "Investment deal flow", "Legacy planning", "Private community access"] }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="w-14 h-14 bg-slate-50 text-primary flex items-center justify-center rounded-sm mb-6 group-hover:bg-secondary transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2" data-testid={`offer-title-${i}`}>{service.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{service.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {service.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <p className="text-3xl font-serif font-bold text-primary mb-4">{service.price}</p>
                <a href={JOIN_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-primary text-white hover:bg-secondary hover:text-primary font-bold" data-testid={`button-offer-${i}`}>
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            ))}
          </div>

          {/* Bundle */}
          <div className="bg-gradient-to-r from-slate-900 to-primary p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-secondary font-bold text-sm uppercase tracking-widest">Bundle & Save</span>
                <h3 className="text-3xl font-serif font-bold mt-2 mb-4">Full Credit Transformation Package</h3>
                <p className="text-white/70 mb-6">
                  Get everything — Credit Sweep + Building Program + BTC Loan Setup + Wealth Club access. Our most popular package for clients serious about financial transformation.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete 3-bureau credit repair", "12-month building program", "BTC-backed loan setup", "Wealth Club membership", "Priority support & 1-on-1 coaching"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90">
                      <BadgeCheck className="w-5 h-5 text-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={JOIN_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold h-14 px-10 text-lg rounded-none shadow-xl" data-testid="button-bundle">
                    START YOUR TRANSFORMATION
                  </Button>
                </a>
              </div>
              <div className="text-center">
                <img src="/700-increase-your-score-graphic.jpg" alt="700 Club Wins" className="rounded-lg shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-24 bg-primary text-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-secondary font-black text-sm uppercase tracking-[0.2em]">Your Journey</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mt-3">The 4-Phase Roadmap</h2>
              <p className="text-lg text-white/50 mt-4 max-w-2xl mx-auto">
                Each phase is available in our Skool community classroom. Follow the roadmap and join the Discord channels for live support.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  link: PHASE_LINKS.phase1,
                  step: "Step 01",
                  title: "Phase 1: Credit Repair",
                  linkLabel: "Join Discord",
                  desc: "Remove 80% of negatives in 30-60 days with AI-powered disputes. Average +100 points.",
                  features: ["AI dispute letter generation", "All 3 bureaus challenged", "Collections & charge-offs removed", "Late payments disputed", "Hard inquiries challenged", "Results tracking dashboard"]
                },
                {
                  link: PHASE_LINKS.phase2,
                  step: "Step 02",
                  title: "Phase 2: Credit Building",
                  linkLabel: "Join Discord",
                  desc: "Boost to 800 FICO with secured loans, authorized user tradelines, and optimized credit mix. +85 points in 6-12 months.",
                  features: ["Secured card strategy", "Authorized user placement", "Credit utilization optimization", "Payment history building", "Credit mix diversification", "Score monitoring & alerts"]
                },
                {
                  link: PHASE_LINKS.phase3,
                  step: "Step 03",
                  title: "Phase 3: 700 Crypto",
                  linkLabel: "Join Discord",
                  desc: "Unlock BTC-backed loans at 4.5% APR. Borrow against your crypto without selling your stack. DeFi meets traditional finance.",
                  features: ["BTC-backed lending setup", "4.5% APR prime rates", "No credit check required", "Keep full BTC exposure", "DeFi lending platforms", "Crypto tax optimization"]
                },
                {
                  link: PHASE_LINKS.phase4,
                  step: "Step 04",
                  title: "Phase 4: 800 Wealth Club & Funding",
                  linkLabel: "Join on Skool",
                  desc: "Access business funding, passive income strategies, prime investments, and legacy planning. Exclusive for 800+ FICO members.",
                  features: ["Business funding access", "SBA loan qualification", "Investment deal flow", "Passive income strategies", "Legacy wealth planning", "Monthly mastermind calls"]
                }
              ].map((phase, i) => (
                <a key={i} href={phase.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="bg-white/5 border border-white/10 p-8 md:p-10 hover:bg-white/10 transition-colors group cursor-pointer">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-secondary font-black text-sm uppercase tracking-widest block mb-2">{phase.step}</span>
                        <h3 className="text-2xl md:text-3xl font-bold">{phase.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-secondary">
                        <span className="text-sm font-bold hidden md:block">{phase.linkLabel}</span>
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-xl text-white/60 leading-relaxed italic mb-6">{phase.desc}</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {phase.features.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-black text-sm uppercase tracking-[0.2em]">Real Results</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mt-3">Client Success Stories</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
              Real results from real clients. See the credit score increases and account deletions our members achieve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-50 border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img src="/ahmed-results-after-3-months.png" alt="Client Ahmed - Credit Score Improvement" className="w-full" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-bold text-green-600">Verified Result</span>
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">6 Negative Items Deleted</h3>
                <p className="text-slate-500 text-sm mb-3">
                  Equifax 661 (+69 pts), TransUnion 540 (+20 pts), Experian 699 (+168 pts). Verizon collections and Exeter Finance charge-offs completely removed across all bureaus.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">+168 pts Experian</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">6 Deletions</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img src="/credit_client_results.jpg" alt="Client Credit Scores - Very Good" className="w-full" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-bold text-green-600">Verified Result</span>
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">All Scores 760+ — "Very Good"</h3>
                <p className="text-slate-500 text-sm mb-3">
                  Equifax 763, TransUnion 761, Experian 768. 14 negative items deleted with zero new negatives added. Clean slate achieved.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">14 Deleted</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">760+ All Bureaus</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img src="/score-increase.jpg" alt="Client Credit Score Increase" className="w-full" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-bold text-green-600">Verified Result</span>
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">All Scores 725+ — "Very Good"</h3>
                <p className="text-slate-500 text-sm mb-3">
                  Equifax 735 (+31 pts), TransUnion 727 (+22 pts), Experian 727 (from no score). Complete credit profile built from scratch.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">+31 pts</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">725+ All Bureaus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img src="/card-approval.jpg" alt="Client Approved for Navy Federal Credit Card" className="w-full" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-bold text-secondary">Funding Win</span>
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">$20,000 Credit Card Approved</h3>
                <p className="text-slate-500 text-sm">
                  Client approved for a Navy Federal GO REWARDS Visa Signature card with a $20,000 credit limit at 18% APR — a direct result of our credit building program.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-slate-900 rounded-lg p-8 md:p-10 text-white flex flex-col justify-center">
              <Trophy className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Your Results Could Be Next</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                Every client featured here started exactly where you are now. Our proven 4-phase system has helped hundreds of clients remove negative items, boost their scores, and access real funding.
              </p>
              <div className="space-y-3 mb-8">
                {["Average 100+ point increase", "80% of negatives removed in 30-60 days", "Clients approved for $10K-$50K+ in funding"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
              <a href={JOIN_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold h-14 px-10 text-lg rounded-none shadow-xl w-full" data-testid="button-join-results">
                  START YOUR JOURNEY NOW
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm">
              Results shown are from real 700 Credit Club clients. Individual results may vary. Visit our{' '}
              <a href="https://www.facebook.com/700creditexperts" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-semibold">
                Facebook page
              </a>{' '}
              for more client success stories.
            </p>
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-24 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-black text-sm uppercase tracking-[0.2em]">Join The Movement</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">The 700 Credit Club Community</h2>
            <p className="text-lg text-white/50 mt-4 max-w-2xl mx-auto">
              Connect with fellow members, get live support, and access exclusive credit hacks in our communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a href={SKOOL_LINK} target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all h-full">
                <div className="w-14 h-14 bg-secondary/20 text-secondary flex items-center justify-center rounded-lg mb-6">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">Skool Community</h3>
                <p className="text-white/60 text-sm mb-4">
                  Our main community hub with classroom courses, direct access to fresh credit hacks, member discussions, and weekly live coaching calls.
                </p>
                <span className="text-secondary text-sm font-bold flex items-center gap-2">
                  Join on Skool <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>

            <a href="https://www.facebook.com/700creditexperts" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all h-full">
                <div className="w-14 h-14 bg-blue-500/20 text-blue-400 flex items-center justify-center rounded-lg mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">Facebook Community</h3>
                <p className="text-white/60 text-sm mb-4">
                  Follow us for daily credit tips, client success stories, live Q&A sessions, and the latest financial education content.
                </p>
                <span className="text-secondary text-sm font-bold flex items-center gap-2">
                  Follow on Facebook <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>

            <a href={PHASE_LINKS.phase1} target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all h-full">
                <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-lg mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">Discord Channels</h3>
                <p className="text-white/60 text-sm mb-4">
                  Phase-specific Discord channels for real-time support, member networking, and direct access to our credit repair specialists.
                </p>
                <span className="text-secondary text-sm font-bold flex items-center gap-2">
                  Join Discord <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-none p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[100px]" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Start Your Credit Journey Today</h2>
              <p className="text-xl text-white/60 mb-4 max-w-2xl mx-auto">
                Join the 700 Credit Club and begin your transformation. Sign up below or go directly to our enrollment page.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <a href={JOIN_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold h-14 px-10 text-lg rounded-none shadow-xl" data-testid="button-join-cta">
                    JOIN THE CLUB NOW <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <a href={SKOOL_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white hover:text-primary font-bold h-14 px-10 text-lg rounded-none">
                    Skool Community <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
              <div className="border-t border-white/10 pt-8">
                <p className="text-white/40 text-sm mb-4">Or get updates via email:</p>
                <form
                  onSubmit={(e) => { e.preventDefault(); signupMutation.mutate({ email, name: '' }); }}
                  className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
                >
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required 
                    data-testid="input-credit-club-email"
                    className="flex-1 px-8 py-5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Button
                    type="submit"
                    disabled={signupMutation.isPending || !email}
                    data-testid="button-credit-club-join"
                    className="bg-secondary text-primary hover:bg-white font-bold px-12 h-16 text-lg rounded-none shadow-2xl"
                  >
                    {signupMutation.isPending ? "JOINING..." : "JOIN NOW"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}