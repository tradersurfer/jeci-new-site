import { useLocation, Link } from "wouter"; 
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import EcosystemAdvisor from "@/components/EcosystemAdvisor";
import SpecialtyGrid from "@/components/SpecialtyGrid";
import { Button } from "@/components/ui/button";
import { 
  Check, ArrowRight, TrendingUp, Users, Target, BarChart3, 
  Calculator, PieChart, Rocket, Zap, Shield, Globe, 
  Landmark, Briefcase, ChevronRight, Share2, Search, Layout, FileText, BarChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() { 
  const [location, setLocation] = useLocation(); 
  const [activeTab, setActiveTab] = useState("jeci");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary/30">
      <Navbar />

      {/* Mode Switcher */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/90 backdrop-blur-md border border-slate-200 p-1 rounded-full shadow-2xl flex items-center">
        <button
          onClick={() => setActiveTab("jeci")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
            activeTab === "jeci" ? "bg-primary text-white shadow-md" : "text-slate-500 hover:text-primary"
          )}
        >
          JECI Group
        </button>
        <button
          onClick={() => setActiveTab("moneyvibes")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2",
            activeTab === "moneyvibes" ? "bg-green-600 text-white shadow-md" : "text-slate-500 hover:text-green-600"
          )}
        >
          MoneyVibes Hub
        </button>
      </div>

      {activeTab === "jeci" ? (
        <motion.div
          key="jeci"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/hero-corporate.png" 
                alt="Corporate Strategy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="max-w-4xl mx-auto text-center text-white"
              >
                <motion.div variants={fadeIn} className="inline-block px-3 py-1 mb-6 border border-secondary/50 rounded-full bg-secondary/10 backdrop-blur-sm text-secondary font-medium tracking-wider text-sm uppercase">
                  The JECI Group ™
                </motion.div>
                <motion.h1 variants={fadeIn} className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Tailored Consulting <br/>
                  <span className="text-secondary italic">Solutions For You</span>
                </motion.h1>
                <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                  We empower individuals and businesses to navigate complex financial landscapes and achieve sustainable growth through expert accounting, tax services, and strategic development.
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-secondary text-primary hover:bg-white font-bold h-14 px-8 text-lg rounded-sm" 
                    onClick={() => setLocation('/book-consultation')}
                  >
                    Book Free Consultation
                  </Button>
                  <Button size="lg" variant="outline" className="bg-secondary text-primary hover:bg-white font-bold h-14 px-8 text-lg rounded-sm" onClick={() => setLocation('/explore')}>
                    Explore Services
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Desktop Banner Integration */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-20 hidden md:block w-full max-w-lg"
            >
              <div className="bg-secondary p-8 shadow-2xl border border-white/20 text-center">
                <h2 className="text-primary font-serif font-black text-3xl mb-2 uppercase tracking-tight">700 Credit Club</h2>
                <p className="text-primary/80 text-base mb-6 font-bold italic leading-snug">Fix Credit, Build to 800 FICO, Unlock BTC Loans & Wealth</p>
                <Button 
                  onClick={() => setLocation('/credit-club-details')}
                  className="bg-primary text-white hover:bg-slate-800 px-12 font-bold h-14 text-sm uppercase tracking-widest rounded-none shadow-lg"
                >
                  JOIN THE CLUB <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Mobile Banner Integration */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative z-20 md:hidden"
          >
            <div className="bg-gradient-to-r from-secondary to-yellow-500 p-8 shadow-2xl text-center border-4 border-primary/20 rounded-xl">
              <div className="container px-4">
                <h2 className="text-primary font-serif font-black text-2xl mb-1 uppercase tracking-tight">Join the 700 Credit Club Now!</h2>
                <p className="text-primary/90 text-sm mb-6 font-bold italic">Fix Credit, Build to 800 FICO, Unlock BTC Loans & Wealth</p>
                <Button 
                  onClick={() => setLocation('/credit-club-details')}
                  className="bg-primary text-white hover:bg-slate-800 w-full font-bold h-14 text-sm uppercase tracking-widest rounded-lg shadow-lg"
                >
                  Learn More & Join
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Specialty Grid Integration */}
          <SpecialtyGrid />

          {/* The Pillars Section */}
          <section id="pillars" className="py-24 bg-white">
            <div className="container px-4 md:px-6">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Pillar 1: Foundation", subtitle: "Restoration & Formation", desc: "Your Legal and Financial Passport.", icon: <Shield />, link: "/pillar-1" },
                  { title: "Pillar 2: Engine", subtitle: "Accounting & Operations", desc: "Back-Office Complexity, Managed.", icon: <Calculator />, link: "/pillar-2" },
                  { title: "Pillar 3: Growth", subtitle: "Digital Marketing & Innovation", desc: "Visibility Meets Strategy.", icon: <Rocket />, link: "/pillar-3" }
                ].map((pillar, i) => (
                  <motion.div key={i} className="bg-slate-50 p-8 rounded-sm border border-slate-100 hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-sm mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                      {pillar.icon}
                    </div>
                    <h3 className="text-sm font-black text-secondary uppercase tracking-tighter mb-2">{pillar.title}</h3>
                    <h4 className="font-serif text-2xl font-bold text-primary mb-4">{pillar.subtitle}</h4>
                    <p className="text-slate-600 mb-8 leading-relaxed">{pillar.desc}</p>
                    <button onClick={() => setLocation(pillar.link)} className="inline-flex items-center text-primary font-bold hover:text-secondary cursor-pointer">
                      Learn More <ChevronRight size={18} className="ml-1" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Founders' Suite Section */}
          <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
              <div className="bg-primary text-white p-12 md:p-20 rounded-sm shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2" />
                
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                    <div className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-xs font-black uppercase tracking-widest">Pillar 4:</div>
                    <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
                      The Founders’ <br/>Operations Suite
                    </h2>
                    <p className="text-xl text-white/70 leading-relaxed">Monthly Retainer for Total Financial Sovereignty. Invest in a dedicated operations team, not just a service.</p>
                    <div className="space-y-4">
                      {[
                        "Monthly Full-Service Bookkeeping",
                        "Managed Social Platform Strategy",
                        "Monthly Policy Research Briefing",
                        "Unlimited Expert Consultations"
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                            <Check size={12} strokeWidth={4} />
                          </div>
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-8">
                      <Button 
                        size="lg" 
                        className="bg-yellow-500 text-slate-950 font-bold px-8 h-14"
                        onClick={() => setLocation('/book-consultation')}
                      >
                        Apply for the Suite
                      </Button>
                      <Button 
                        variant="outline"
                        size="lg" 
                        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 font-bold px-8 h-14"
                        onClick={() => setLocation('/founders-suite-detail')}
                      >
                        View Suite Details
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md p-10 border border-white/10 rounded-sm">
                    <h3 className="font-serif text-3xl font-bold mb-8 text-secondary italic">Why The JECI Group?</h3>
                    <p className="text-white/80 leading-relaxed italic mb-8">
                      "Most businesses fail not because of a bad product, but because of The Fragmented Back-Office. We bridge the gap to Institutional Readiness."
                    </p>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="text-secondary shrink-0"><Shield /></div>
                        <p className="text-sm text-white/60">Your credit limits your capital.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-secondary shrink-0"><BarChart /></div>
                        <p className="text-sm text-white/60">Your messy books limit your decisions.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-secondary shrink-0"><Target /></div>
                        <p className="text-sm text-white/60">Your lack of SEO limits your visibility.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      ) : (
        <motion.div key="moneyvibes" className="pt-20">
          <section className="min-h-[90vh] flex flex-col justify-center items-center text-center p-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970795-87faff2f9050?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
            <div className="relative z-10 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8"
              >
                <Zap size={16} /> MoneyVibes Hub
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tight mb-6">
                Build <span className="text-green-600 italic">Wealth</span>,<br/>Not Just Income.
              </h1>
              <p className="text-2xl text-slate-600 mb-12 font-medium">Start Now.</p>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-100">
                  <p className="italic text-xl text-slate-700 leading-relaxed mb-4">
                    "The best time to plant a tree was 20 years ago. The second best time is now."
                  </p>
                  <p className="text-sm text-slate-500">— Chinese Proverb</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">What's your biggest money challenge?</h3>
                  <div className="grid gap-3">
                    <button className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 hover:bg-green-50 text-slate-700 hover:text-green-700 font-bold transition-all border border-transparent hover:border-green-200">
                      Saving Consistently <ChevronRight size={18} />
                    </button>
                    <button className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 hover:bg-green-50 text-slate-700 hover:text-green-700 font-bold transition-all border border-transparent hover:border-green-200">
                      Paying Off Debt <ChevronRight size={18} />
                    </button>
                    <button className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 hover:bg-green-50 text-slate-700 hover:text-green-700 font-bold transition-all border border-transparent hover:border-green-200">
                      Investing Wisely <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Market Ticker */}
          <section className="bg-slate-900 py-6 text-white overflow-hidden border-y border-white/10">
            <div className="flex gap-12 animate-marquee whitespace-nowrap px-4 hover:[animation-play-state:paused]">
              {[
                { label: "S&P 500", value: "5,824.21", change: "+1.2%" },
                { label: "NASDAQ", value: "18,672.45", change: "+0.8%" },
                { label: "BITCOIN", value: "$67,432.12", change: "+4.5%" },
                { label: "ETHEREUM", value: "$2,641.89", change: "+2.1%" },
                { label: "GOLD", value: "$2,734.50", change: "+0.3%" },
                { label: "SOLANA", value: "$164.21", change: "+6.7%" },
                // Duplicate for seamless loop
                { label: "S&P 500", value: "5,824.21", change: "+1.2%" },
                { label: "NASDAQ", value: "18,672.45", change: "+0.8%" },
                { label: "BITCOIN", value: "$67,432.12", change: "+4.5%" },
                { label: "ETHEREUM", value: "$2,641.89", change: "+2.1%" },
                { label: "GOLD", value: "$2,734.50", change: "+0.3%" },
                { label: "SOLANA", value: "$164.21", change: "+6.7%" },
              ].map((stock, i) => (
                <div key={i} className="flex items-center gap-3 px-4">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-sm">{stock.label}</span>
                  <span className="font-mono text-lg">{stock.value}</span>
                  <span className={cn(
                    "font-bold text-sm",
                    stock.change.startsWith('+') ? "text-green-400" : "text-red-400"
                  )}>{stock.change}</span>
                </div>
              ))}
            </div>
            <div className="container mt-4 px-4 text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium flex flex-wrap gap-x-4 justify-center text-center leading-loose">
              <span>Currency and cryptocurrency prices provided by Morningstar</span>
              <span className="hidden sm:inline">|</span>
              <span>Cryptocurrency metadata provided by Coinmarketcap</span>
              <span className="hidden sm:inline">|</span>
              <span>End of day prices provided by Morningstar</span>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-24 bg-white">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                <div className="max-w-2xl">
                  <h4 className="text-green-600 font-bold uppercase tracking-widest mb-4">Interactive Power</h4>
                  <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Financial Arsenal</h2>
                  <p className="text-slate-600 text-xl leading-relaxed">
                    Custom-built calculators and strategy dashboards to optimize your wealth engine.
                  </p>
                </div>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-8 rounded-full">
                  View All Tools
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Quantum Alpha Investing",
                    desc: "AI-powered dashboard to track, analyze, and simulate your investment portfolio performance.",
                    icon: <Rocket className="text-blue-500" />,
                    color: "border-blue-500"
                  },
                  {
                    title: "3-5 Year Financial Model Plan",
                    desc: "This interactive tool helps you build detailed 3-5 year financial projections, complete with best-case, worst-case, and most-likely scenarios.",
                    icon: <Layout className="text-blue-500" />,
                    color: "border-blue-500",
                    path: "/tools/financial-model"
                  },
                  {
                    title: "Retirement Calculator",
                    desc: "Calculate your path to financial independence with our interactive retirement planning suite.",
                    icon: <Calculator className="text-blue-500" />,
                    color: "border-blue-500",
                    path: "/tools/retirement-calculator"
                  },
                  {
                    title: "Weekly Finance Tracker",
                    desc: "Micro-level monitoring of income and expenses to maintain perfect cash flow hygiene.",
                    icon: <Zap className="text-yellow-500" />,
                    color: "border-yellow-500",
                    path: "/tools/weekly-tracker"
                  },
                  {
                    title: "Wealth Diversification",
                    desc: "The 'Master View' of your assets—equity, real estate, and alternative vehicles.",
                    icon: <Globe className="text-cyan-500" />,
                    color: "border-cyan-500",
                    path: "/tools/wealth-diversification"
                  },
                  {
                    title: "Income Stream Mapper",
                    desc: "Identify and track passive, active, and portfolio income sources in one visual map.",
                    icon: <Briefcase className="text-orange-500" />,
                    color: "border-orange-500"
                  }
                ].map((tool, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    className={cn(
                      "bg-slate-50 p-8 rounded-3xl border-2 border-transparent hover:border-slate-200 transition-all group",
                      tool.color && `hover:${tool.color}`
                    )}
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{tool.title}</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      {tool.desc}
                    </p>
                    <Button 
                      variant="ghost" 
                      className="p-0 text-green-600 hover:text-green-700 font-bold group-hover:gap-2 transition-all"
                      onClick={() => tool.path && setLocation(tool.path)}
                    >
                      Open Tool <ChevronRight size={18} />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Learn Section */}
          <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-green-500/5 blur-[120px]" />
            <div className="container px-4 md:px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-5xl font-bold mb-6 tracking-tight">Learn About Money</h2>
                <p className="text-slate-400 text-xl">Your roadmap to financial freedom, decoded.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                {[
                  {
                    title: "The Beginner's Guide to Stock Market Investing",
                    tag: "Investing 101",
                    img: "https://images.unsplash.com/photo-1611974717482-480928516139?auto=format&fit=crop&q=80&w=800"
                  },
                  {
                    title: "Is Crypto Right For You? A Risk-Taker's Guide",
                    tag: "Crypto Deep Dive",
                    img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800"
                  },
                  {
                    title: "5 High-Income Skills You Can Learn This Month",
                    tag: "Side Hustles",
                    img: "https://images.unsplash.com/photo-1454165833767-12d99c4c7c4b?auto=format&fit=crop&q=80&w=800"
                  }
                ].map((blog, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                      <img src={blog.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute top-4 left-4 bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                        {blog.tag}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-green-400 transition-colors">
                      {blog.title}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Store Section */}
          <section className="py-24 bg-white">
            <div className="container px-4 md:px-6">
              <div className="bg-green-50 rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Digital Store</h2>
                  <p className="text-slate-600 text-xl leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
                    Premium templates and playbooks to accelerate your wealth-building journey. Start with our best-sellers.
                  </p>
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-16 px-12 text-lg rounded-full shadow-2xl shadow-slate-900/20">
                    Browse All Products
                  </Button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-3xl shadow-xl transform rotate-3">
                    <div className="w-full aspect-square bg-blue-50 rounded-2xl mb-4 flex items-center justify-center text-blue-500">
                      <Calculator size={48} />
                    </div>
                    <h4 className="font-bold text-slate-900">Budget Planner</h4>
                    <p className="text-green-600 font-black mt-2">$29.00</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}
      <Footer />
    </div>
  );
}
