import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Search, Share2, Zap, CheckCircle2, 
  ChevronDown, ChevronUp, Star, Globe, TrendingUp, 
  Bitcoin, Cpu, ExternalLink 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";
import EcosystemAdvisor from "@/components/EcosystemAdvisor";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const stripeDepositLink = "https://buy.stripe.com/mock_deposit_50";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-primary/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between w-full text-left font-bold hover:text-secondary transition-colors group"
      >
        <span className="text-lg text-primary">{question}</span>
        {isOpen ? <ChevronUp className="text-secondary" /> : <ChevronDown className="group-hover:text-secondary" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-slate-600 leading-relaxed text-sm">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Growth() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [, setLocation] = useLocation();

  const features = [
    {
      title: "SEO Mastery & Technical Audits",
      subtitle: "Foundational Visibility",
      icon: <Search className="w-8 h-8 text-secondary" />,
      summary: "We move you to the first page through deep technical audits and aggressive keyword positioning.",
      details: [
        "Foundational technical SEO audits & remediation",
        "Competitor keyword gap analysis",
        "On-page optimization (Meta, Header, Schema)",
        "Backlink profile strengthening",
        "Local SEO & GMB optimization",
        "Monthly organic traffic performance tracking"
      ],
      visual: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Content Strategy & Authority Mapping",
      subtitle: "The CEO as a Thought Leader",
      icon: <Zap className="w-8 h-8 text-secondary" />,
      summary: "Strategic content mapping that turns your expertise into a lead-generating machine.",
      details: [
        "Core content marketing calendars",
        "Strategic authority mapping (Topic Clusters)",
        "High-authority blog and article production",
        "Substack integration & newsletter strategy",
        "Conversion-focused landing page copy",
        "Asset-based marketing (E-books/Whitepapers)"
      ],
      visual: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Managed Social Media Execution",
      subtitle: "Omni-Channel Managed Strategy",
      icon: <Share2 className="w-8 h-8 text-secondary" />,
      summary: "Full-service management of your primary digital channels to ensure a consistent, 'Institutional' brand voice.",
      details: [
        "Multi-platform strategy development",
        "Daily managed posting & engagement",
        "Visual branding and creative direction",
        "Audience growth and community management",
        "Social-to-Sales funnel optimization",
        "Paid social ad management (Optional Add-on)"
      ],
      visual: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Bitcoin Ecosystem Advisory",
      subtitle: "Innovation Intelligence",
      icon: <Bitcoin className="w-8 h-8 text-secondary" />,
      summary: "For the tech-forward founder. Navigate on-chain opportunities and Bitcoin-native business integration.",
      details: [
        "Bitcoin-native business integration advisory",
        "Stablecoin utility & settlement strategy",
        "Regulatory briefing for crypto-native firms",
        "On-chain opportunity identification",
        "Institutional-grade digital asset custody education",
        "Innovation 'Alpha' research & policy tracking"
      ],
      visual: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <SubpageNav />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary text-primary overflow-hidden relative">
        <div className="container px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm mb-6">
              <Rocket size={20} /> Pillar 3: Digital Marketing & Innovation
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic tracking-tighter">The Growth</h1>
            <p className="text-xl md:text-2xl text-primary/80 leading-relaxed mb-10">
              Visibility meets strategy. We don't just generate clicks—we build the digital authority required to dominate your market and protect your alpha.
            </p>
            <Button 
              size="lg" 
              className="bg-primary text-white hover:bg-white hover:text-primary font-bold h-14 px-8 rounded-sm"
              onClick={() => window.open(stripeDepositLink, '_blank')}
            >
              Secure $50 Strategy Deposit
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing/Bundle Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4 italic">Managed Growth Bundles</h2>
            <p className="text-slate-600 max-w-xl mx-auto font-medium">Predictable scaling through integrated operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "$850", features: ["Foundational SEO Audit", "1 Managed Platform", "Basic Calendar"] },
              { name: "Growth", price: "$1,200", features: ["Advanced Keyword Strategy", "2 Blog Articles / Month", "Technical SEO Fixes", "Monthly Reports"] },
              { name: "Elite", price: "$2,000", features: ["Full Multi-Channel Managed", "Premium Content Strategy", "Competitor Gap Analysis", "Priority Innovation Support"] }
            ].map((pkg, i) => (
              <div key={i} className="bg-white p-8 rounded-sm border border-slate-200 hover:shadow-xl transition-all group">
                <h3 className="font-bold text-xl text-primary mb-2">{pkg.name}</h3>
                <div className="text-3xl font-black text-secondary mb-6">{pkg.price}<span className="text-sm text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-secondary mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => setLocation('/book-consultation')} className="w-full bg-primary group-hover:bg-secondary group-hover:text-primary font-bold transition-all">Select {pkg.name}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Deep Dive */}
      <section className="py-24 bg-white">
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-primary mb-8 italic">Strategic Visibility Protocols</h2>
              {features.map((feature, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <div>
                        <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                        <p className="text-xs text-secondary font-black uppercase tracking-widest mt-1">{feature.subtitle}</p>
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
                                <CheckCircle2 size={16} className="text-secondary mt-1 shrink-0" />
                                <span className="text-sm text-slate-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <img 
                    src={features[openIndex || 0].visual} 
                    alt="Growth Strategy" 
                    className="rounded-sm shadow-2xl h-[500px] w-full object-cover" 
                  />
                  <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-sm shadow-xl hidden xl:block border-r-4 border-secondary">
                    <p className="text-4xl font-serif font-bold text-secondary mb-1">2.4x</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black">Avg. Organic Lift</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-secondary font-bold tracking-widest uppercase mb-4">Innovation Advisory</h4>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 italic">Bitcoin Ecosystem Strategy</h2>
            <p className="text-slate-600 text-lg">
              For the tech-forward founder. Navigate on-chain opportunities and institutional-grade Bitcoin advisory through our proprietary tools.
            </p>
          </div>
          <EcosystemAdvisor />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container px-6 max-w-4xl mx-auto">
          <div className="bg-secondary p-10 md:p-16 rounded-[2rem] border border-primary/10 shadow-2xl relative overflow-hidden">
             <h2 className="text-3xl font-bold mb-10 italic uppercase tracking-tighter text-primary">
              Growth Intelligence FAQ
            </h2>
            <div className="space-y-2">
              <FAQItem 
                question="How long does SEO take to show results?" 
                answer="While technical fixes can show immediate crawl improvements, significant organic ranking lift typically occurs between months 3 and 6 of a consistent strategy." 
              />
              <FAQItem 
                question="What is an 'Alpha Strategy'?" 
                answer="It refers to the pursuit of excess returns—growth that outperforms the market average by leveraging high-authority content and innovative technology like Bitcoin." 
              />
              <FAQItem 
                question="Do you manage multiple social platforms?" 
                answer="Yes. Our Elite bundle handles multi-channel execution, while the Starter focus is on mastering one primary platform to build a core audience." 
              />
              <FAQItem 
                question="What is Bitcoin Ecosystem Advisory?" 
                answer="We advise on how to integrate Bitcoin and Stablecoins into your business operations for settlement, treasury, and regulatory positioning." 
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}