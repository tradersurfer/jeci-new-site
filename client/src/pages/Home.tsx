import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, TrendingUp, Users, Target, BarChart3, Calculator, PieChart, MousePointerClick, Mail, Phone, Rocket, Zap, Shield, Globe, Landmark, Coins, Briefcase, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"jeci" | "moneyvibes">("jeci");

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
            {/* Background with overlay */}
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
                  <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold h-14 px-8 text-lg rounded-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                    Book Free Consultation
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 h-14 px-8 text-lg rounded-sm" onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}>
                    Explore Services
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-primary text-white relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-white/10">
                {[
                  { label: "Businesses Started", value: "1,352", icon: <TrendingUp className="w-6 h-6 text-secondary mb-2 mx-auto" /> },
                  { label: "Entrepreneurs Assisted", value: "1,500+", icon: <Users className="w-6 h-6 text-secondary mb-2 mx-auto" /> },
                  { label: "Active Projects", value: "193", icon: <Target className="w-6 h-6 text-secondary mb-2 mx-auto" /> },
                  { label: "Success Rate", value: "95%", icon: <BarChart3 className="w-6 h-6 text-secondary mb-2 mx-auto" /> },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="px-6 py-4"
                  >
                    {stat.icon}
                    <div className="text-4xl md:text-5xl font-serif font-bold mb-2 text-white">{stat.value}</div>
                    <div className="text-sm md:text-base text-white/60 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 bg-white">
            <div className="container px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-tl-3xl z-0" />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-br-3xl z-0" />
                  <img 
                    src="/images/about-consultant.png" 
                    alt="Consultant" 
                    className="relative z-10 rounded-sm shadow-2xl w-full aspect-[4/5] object-cover"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="text-secondary font-bold tracking-widest uppercase mb-4">Who We Are</h4>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">We Produce Results</h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    JECI™Group empowers individuals and businesses to navigate complex financial landscapes and achieve sustainable growth through expert accounting, specialized tax services (specifically JECI™ Tax), strategic business development, and innovative digital marketing solutions.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    We are your forward-thinking partner for financial clarity and future success. Our goal is to assist 5,000 entrepreneurs by the end of 2026.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {["Strategic Development", "Tax Specialization", "Digital Innovation", "Financial Clarity"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <span className="font-medium text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-24 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h4 className="text-secondary font-bold tracking-widest uppercase mb-4">Our Expertise</h4>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Comprehensive Solutions</h2>
                <p className="text-slate-600 text-lg">
                  We combine operations strategy, process optimization, and market expansion with robust digital solutions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Accounting Services",
                    desc: "Expert bookkeeping, financial reporting, and entity formation for small businesses. Cash flow management and strategic planning.",
                    image: "/images/service-accounting.png",
                    icon: <Calculator className="w-8 h-8" />
                  },
                  {
                    title: "Tax Prep & Planning",
                    desc: "Personalized tax preparation specializing in Cryptocurrency, Real Estate, and Cannabis Industries. Maximizing deductions and compliance.",
                    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
                    icon: <PieChart className="w-8 h-8" />
                  },
                  {
                    title: "Digital Marketing",
                    desc: "Robust solutions including SEO, Social Media Management, Web Development, and Targeted Ad Campaigns to drive growth.",
                    image: "/images/service-marketing.png",
                    icon: <MousePointerClick className="w-8 h-8" />
                  }
                ].map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-secondary"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all z-10" />
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8">
                      <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        {service.icon}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-primary mb-3">{service.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">{service.desc}</p>
                      <a href="#contact" className="inline-flex items-center text-secondary font-bold hover:gap-2 transition-all">
                        Learn More <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-24 bg-primary text-white">
            <div className="container px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h4 className="text-secondary font-bold tracking-widest uppercase mb-4">Growth Packages</h4>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Choose Your Path</h2>
                <p className="text-white/70 text-lg">
                  Tailored bundles designed to meet you where you are in your business journey.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    name: "Starter",
                    price: "99",
                    desc: "Affordable foundation for new businesses.",
                    features: ["30-min Consultation", "Financial Snapshot", "Ops Audit", "Tool Recs", "Basic Branding"]
                  },
                  {
                    name: "Scale-Up",
                    price: "199",
                    desc: "For ambitious entrepreneurs ready to invest.",
                    features: ["60-min Consultation", "Profit/Loss Analysis", "Weekly Check-ins", "Automation Setup", "Refined Branding"],
                    popular: true
                  },
                  {
                    name: "Pro Growth",
                    price: "399",
                    desc: "For established businesses optimizing operations.",
                    features: ["Growth Opportunities", "Process Maps", "SOPs", "Brand Audit", "Monthly Reports"]
                  },
                  {
                    name: "Enterprise",
                    price: "499",
                    desc: "Data-driven solutions for revenue plateaus.",
                    features: ["90-min Deep Dive", "Sales Funnel Analysis", "Workflow Mapping", "Vendor ROI", "Full Brand System"]
                  }
                ].map((tier, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "relative flex flex-col p-6 rounded-sm border",
                      tier.popular 
                        ? "bg-white text-primary border-secondary shadow-xl scale-105 z-10" 
                        : "bg-primary/50 text-white border-white/10 hover:bg-primary/80 transition-colors"
                    )}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-primary px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                        Most Popular
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className={cn("font-serif text-xl font-bold mb-2", tier.popular ? "text-primary" : "text-white")}>{tier.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">${tier.price}</span>
                        <span className={cn("text-sm", tier.popular ? "text-slate-500" : "text-white/50")}>/mo</span>
                      </div>
                      <p className={cn("text-xs mt-3 leading-relaxed", tier.popular ? "text-slate-600" : "text-white/60")}>
                        {tier.desc}
                      </p>
                    </div>
                    
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check className={cn("w-4 h-4 mt-0.5", tier.popular ? "text-secondary" : "text-secondary")} />
                          <span className={tier.popular ? "text-slate-700" : "text-white/80"}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={cn(
                        "w-full font-bold", 
                        tier.popular 
                          ? "bg-primary text-white hover:bg-primary/90" 
                          : "bg-white/10 hover:bg-white hover:text-primary text-white"
                      )}
                      onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                    >
                      Select Plan
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 bg-white relative">
            <div className="container px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h4 className="text-secondary font-bold tracking-widest uppercase mb-4">Contact Us</h4>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Let's Build Your Future</h2>
                  <p className="text-slate-600 text-lg mb-10">
                    Ready to take your business to the next level? Fill out the form or use our contact information below to get started.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
                        <Mail />
                      </div>
                      <div>
                        <h5 className="font-bold text-primary mb-1">Email Us</h5>
                        <p className="text-slate-600">contact@jecigroup.com</p>
                        <p className="text-slate-500 text-sm">We respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
                        <Phone />
                      </div>
                      <div>
                        <h5 className="font-bold text-primary mb-1">Call Us</h5>
                        <p className="text-slate-600">+1 (555) 123-4567</p>
                        <p className="text-slate-500 text-sm">Mon-Fri, 9am - 6pm EST</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                   <ContactForm />
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      ) : (
        <motion.div
          key="moneyvibes"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="pt-20"
        >
          {/* MoneyVibes Hero */}
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
            <div className="flex gap-12 animate-marquee whitespace-nowrap px-4">
              {[
                { label: "S&P 500", value: "5,824.21", change: "+1.2%" },
                { label: "NASDAQ", value: "18,672.45", change: "+0.8%" },
                { label: "BITCOIN", value: "$67,432.12", change: "+4.5%" },
                { label: "ETHEREUM", value: "$2,641.89", change: "+2.1%" },
                { label: "GOLD", value: "$2,734.50", change: "+0.3%" },
                { label: "SOLANA", value: "$164.21", change: "+6.7%" },
              ].map((stock, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-slate-500 font-bold">{stock.label}</span>
                  <span className="font-mono">{stock.value}</span>
                  <span className="text-green-400 font-bold text-sm">{stock.change}</span>
                </div>
              ))}
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
                    title: "Weekly Finance Tracker",
                    desc: "Micro-level monitoring of income and expenses to maintain perfect cash flow hygiene.",
                    icon: <Zap className="text-yellow-500" />,
                    color: "border-yellow-500"
                  },
                  {
                    title: "Tax Tracker (Self-Employed)",
                    desc: "Real-time liability estimation and expense categorization for the modern solopreneur.",
                    icon: <Landmark className="text-green-500" />,
                    color: "border-green-500"
                  },
                  {
                    title: "Retirement Comparison",
                    desc: "Deep-dive analysis between SEP IRAs, Solo 401(k)s, and Defined Benefit structures.",
                    icon: <Shield className="text-purple-500" />,
                    color: "border-purple-500"
                  },
                  {
                    title: "Wealth Diversification",
                    desc: "The 'Master View' of your assets—equity, real estate, and alternative vehicles.",
                    icon: <Globe className="text-cyan-500" />,
                    color: "border-cyan-500"
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
                    <Button variant="ghost" className="p-0 text-green-600 hover:text-green-700 font-bold group-hover:gap-2 transition-all">
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
                  <div className="bg-white p-6 rounded-3xl shadow-xl transform -rotate-2">
                    <div className="w-full aspect-square bg-purple-50 rounded-2xl mb-4 flex items-center justify-center text-purple-500">
                      <Briefcase size={48} />
                    </div>
                    <h4 className="font-bold text-slate-900">Biz Blueprint</h4>
                    <p className="text-green-600 font-black mt-2">$47.00</p>
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
