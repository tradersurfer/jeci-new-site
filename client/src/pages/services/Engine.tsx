import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Check, ArrowRight, Landmark, PieChart, 
  BarChart3, Calculator, Globe, ChevronDown, ChevronUp, 
  Star, ShieldAlert 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const stripeDepositLink = "https://buy.stripe.com/mock_deposit_50";

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between w-full text-left font-bold hover:text-yellow-500 transition-colors group"
      >
        <span className="text-lg text-white">{question}</span>
        {isOpen ? <ChevronUp className="text-yellow-500" /> : <ChevronDown className="group-hover:text-yellow-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-slate-400 leading-relaxed text-sm">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Engine() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [, setLocation] = useLocation();

  const features = [
    {
      id: 'entity-core',
      title: "Entity & Core Accounting",
      subtitle: "Foundational Tax Architecture",
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      summary: "New entity formation, small business accounting, and existing entity restructuring for maximum protection.",
      details: [
        "LLC/S-Corp/C-Corp Formation & Restructuring",
        "Strategic Bookkeeping & Monthly GL Hygiene",
        "Audit-trail establishment for total transparency",
        "Clean-up of historical 'messy' records",
        "Standardization of chart of accounts"
      ],
      visual: "https://images.unsplash.com/photo-1454165833767-12d99c4c7c4b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'indirect-tax',
      title: "Indirect & Transaction Taxes",
      subtitle: "Complex Compliance Managed",
      icon: <Globe className="w-8 h-8 text-yellow-500" />,
      summary: "Expert management of Sales & Use tax filings and complex transaction-level tax tracking for high-volume firms.",
      details: [
        "Sales & Use Tax registration and monthly filing",
        "Transaction-level tracking for high-volume firms",
        "Excise Tax management and compliance",
        "Indirect tax audit defense and readiness",
        "Regulatory updates on shifting tax landscapes"
      ],
      visual: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'salt',
      title: "State & Local (SALT)",
      subtitle: "Multi-Jurisdictional Mastery",
      icon: <Landmark className="w-8 h-8 text-yellow-500" />,
      summary: "Navigating multi-jurisdictional tax exposure, nexus studies, and state-level compliance requirements.",
      details: [
        "Multi-jurisdictional nexus studies",
        "Multi-State Filings and registrations",
        "Local compliance and gross receipts tax",
        "State-level tax mitigation strategies",
        "Apportionment reviews for remote-first teams"
      ],
      visual: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'specialty-crypto',
      title: "Specialty & Crypto Tax",
      subtitle: "Digital Asset Sovereignty",
      icon: <PieChart className="w-8 h-8 text-yellow-500" />,
      summary: "Crypto Tax Accounting, Franchise taxes, and specialized reporting for tech-forward and digital asset founders.",
      details: [
        "On-chain transaction reconciliation (DeFi/Trading)",
        "Cost-basis tracking (FIFO/LIFO) for capital gains",
        "Stablecoin regulatory compliance tracking",
        "Section 280E mitigation for crossover ventures",
        "Franchise tax and specialized property reporting"
      ],
      visual: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800",
      complianceNote: "On-chain monitoring includes 280E mitigation for crossover ventures."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <SubpageNav />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 transform translate-x-1/2" />
        <div className="container px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-3 text-yellow-500 font-black uppercase tracking-widest text-sm mb-6">
              <Calculator size={20} /> Pillar 2: Accounting & Operations
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic tracking-tighter">The Engine</h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-10">
              Back-office complexity, managed. We build the financial engine that powers your sovereignty, ensuring every transaction is a brick in your fortress.
            </p>
            <Button 
              size="lg" 
              className="bg-yellow-500 text-slate-950 hover:bg-white font-bold h-14 px-8 rounded-sm"
              onClick={() => window.open(stripeDepositLink, '_blank')}
            >
              Secure $50 Strategy Deposit
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Accordion Deep Dive */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 italic">Operational Integrity Protocols</h2>
              {features.map((feature, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                        <p className="text-xs text-yellow-600 font-black uppercase tracking-widest mt-1">{feature.subtitle}</p>
                      </div>
                    </div>
                    {openIndex === i ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="p-8 pt-0 border-t border-slate-100">
                          <p className="text-slate-600 mb-6 font-medium italic text-sm">{feature.summary}</p>
                          <div className="grid gap-3">
                            {feature.details.map((detail, j) => (
                              <div key={j} className="flex items-start gap-3">
                                <Check size={16} className="text-yellow-600 mt-1 shrink-0" strokeWidth={3} />
                                <span className="text-sm text-slate-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                          {feature.complianceNote && (
                            <div className="mt-6 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-sm text-xs font-bold flex items-center gap-2">
                              <ShieldAlert size={14} className="text-yellow-600" /> {feature.complianceNote}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Visual Context */}
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative"
                >
                  <img 
                    src={features[openIndex || 0].visual} 
                    alt="Service Intelligence" 
                    className="rounded-sm shadow-2xl h-[500px] w-full object-cover" 
                  />
                  <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-8 rounded-sm shadow-xl hidden xl:block border-l-4 border-yellow-500">
                    <p className="text-4xl font-serif font-bold text-yellow-500 mb-1">99.9%</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black">Compliance Accuracy</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container px-6 max-w-4xl mx-auto">
          <div className="bg-slate-900 p-10 md:p-16 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <h2 className="text-3xl font-bold mb-10 italic uppercase tracking-tighter text-yellow-500">
              Service Intelligence FAQ
            </h2>
            <div className="space-y-2">
              <FAQItem 
                question="How does existing entity restructuring work?" 
                answer="We review your current legal exposure and tax structure to optimize for 'Institutional Readiness' and borrowing power." 
              />
              <FAQItem 
                question="What is included in the Crypto Tax package?" 
                answer="Full on-chain reconciliation, stablecoin regulation summaries, and IRS-ready reporting." 
              />
              <FAQItem 
                question="Do you handle multi-state nexus issues?" 
                answer="Yes, our SALT (State and Local Tax) services focus specifically on complex multi-jurisdictional compliance." 
              />
              <FAQItem 
                question="What is a 'Hill-Ready' briefing?" 
                answer="A high-level regulatory summary designed for tech-forward founders to navigate shifting legal landscapes." 
              />
              <FAQItem 
                question="Can I bundle SEO with Bookkeeping?" 
                answer="Absolutely. This is the foundation of our $3,000/mo Founders' Operations Suite." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-24">
        <div className="container px-6">
          <div className="bg-yellow-500 text-slate-950 p-12 md:p-20 rounded-sm text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-bold mb-8 italic uppercase tracking-tighter">Ready to Scale?</h2>
              <p className="text-lg font-bold mb-10 opacity-80">
                Stop managing complexity and start leading strategy. Secure your consultation today.
              </p>
              <Button 
                size="lg" 
                className="bg-slate-900 text-white hover:bg-white hover:text-slate-900 font-bold h-16 px-12 text-lg rounded-sm transition-all"
                onClick={() => window.open(stripeDepositLink, '_blank')}
              >
                Book with $50 Deposit <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}