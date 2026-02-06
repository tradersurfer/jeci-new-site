import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";
import MethodicalActionPlan from "@/components/MethodicalActionPlan";
import { Shield, CheckCircle2, ChevronDown, ChevronUp, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Foundation() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open the first one

  const features = [
    {
      title: "700 Credit Club (90–120 Days)",
      summary: "The #1 community for entrepreneurs to unlock 6-figure funding and turn credit into cash flow.",
      details: [
        "Step-by-step credit repair (remove collections/inquiries in 30 days). This $499 Full-Sweep package is for those who don't want the DIY, but want us to do it for you!",
        "Personal & business credit blueprints (700+ fast). Gems & Hacks that are verified proven, NOT guessing. We are data-driven and results-based.",
        "FULLY LOADED DIY Credit Repair Kit: $99 Value Pack, for those wanting to DIY, we have prepared a Full Kit for you.",
        "Blueprint to launch your own Credit Repair company - Our white-label system that give you the tools to start your own Credit Repair company.",
        "0% interest funding strategies & card maps. Join our Credit DAO and recieve Partnered-Funding options.",
        "3–4 weekly LIVE Workshops with Partner Adrian & Team on the Skool Community",
        "Lender-approved LLC structure & private lender rolodex: Created by Business Owners, for Business Owners."
      ],
      bonus: "3 FREE eBooks + Private Lender Rolodex + Lifetime Replays"
    },
    {
      title: "Strategic Structural Selection",
      summary: "Choose the entity structure that supports your financial goals, tax efficiency, and risk profile.",
      details: [
        "Comparative analysis of LLC, S-Corp, and C-Corp structures, to see which one is best for your business.",
        "Evaluation of federal and state tax implications for each option. We also do Sales & Use Tax filings for required businesses.",
        "Assessment of liability protection and legal exposure, which allows us to recommend a S-Corp or C-Corp conversion, a Holding Company, etc.",
        "Guidance on owner compensation, distributions, and payroll impact. We show you how to pay yourself from your business and how to classify it.",
        "Investor readiness and future fundraising needs assessment. This allows us to structure your business for your funding needs, from $1,000 credit card limits to $100K Revovling Lines of Credit.",
        "Recommendations aligned with growth, exit, and compliance strategy. You get unlimited consulting from our expert team for Life."
      ]
    },
    {
      title: "Federal & State Compliance",
      summary: "Full setup and compliance management to ensure your business is legally defensible from day one.",
      details: [
        "EIN application and verification with the IRS",
        "State business registration and entity filings",
        "Assistance with required state and local licenses",
        "Guidance on industry-specific permits and requirements",
        "Verification of good standing and compliance status",
        "Support to prevent costly filing errors and delays"
      ]
    },
    {
      title: "Institutional Standards Alignment",
      summary: "Optimizing your business data to meet the strict 'Anti-Fraud' standards of Tier-1 lenders.",
      details: [
        "Business address and phone verification (411 listing compliance)",
        "Professional email and website domain standards audit, to ensure you have Web Presence for Search & listings on directories and your niche platforms.",
        "NAICS code optimization for high-limit funding approval",
        "Verification of 'Lender-Ready' digital presence - We st up merchant accounts with your website and the Top Merchant platforms.",
        "Bank-readiness assessment before applying for credit to get your business ready for Business Funding NOW!",
        "Alignment with major financial institution internal filters"
      ]
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
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic tracking-tighter">The Foundation</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              We build the legal structure and borrowing power required to scale. We don't just file papers; we build your financial passport.
            </p>
          </div>
        </div>
      </section>

      {/* The Interactive MAP Section */}
      <MethodicalActionPlan />

      {/* Feature Deep Dive with Accordions */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 italic text-center">
            Institutional Readiness Features
          </h2>

          <div className="space-y-4">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-2 rounded-sm text-secondary font-bold text-sm">
                      0{i + 1}
                    </div>
                    <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                  </div>
                  {openIndex === i ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-8 pt-0 border-t border-slate-100">
                        <p className="text-slate-600 mb-6 font-medium italic">{feature.summary}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {feature.details.map((detail, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <CheckCircle2 size={18} className="text-secondary mt-0.5 shrink-0" />
                              <span className="text-sm text-slate-700">{detail}</span>
                            </div>
                          ))}
                        </div>

                        {feature.bonus && (
                          <div className="mt-8 p-4 bg-secondary/5 border border-secondary/20 rounded-sm flex items-center gap-3">
                            <Star className="text-secondary fill-secondary" size={20} />
                            <div className="text-sm font-bold text-primary">
                              <span className="uppercase text-[10px] tracking-widest block text-secondary">Member Bonuses</span>
                              {feature.bonus}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => window.location.href = '/book-consultation'}
              className="bg-primary text-white font-bold px-12 py-5 rounded-sm hover:bg-secondary hover:text-primary transition-all shadow-xl text-lg"
            >
              Apply for Foundation Phase
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}