import { useLocation } from "wouter"; 
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialtyGrid from "@/components/SpecialtyGrid";
import { Button } from "@/components/ui/button";
import { 
  Check, ArrowRight, TrendingUp, Target, BarChart3, 
  Calculator, Rocket, Shield, 
  ChevronRight, BarChart, Wrench,
  Globe, Wifi
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() { 
  const [, setLocation] = useLocation(); 

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary/30">
      <Navbar />

      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-corporate.png" 
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

      {/* ── Popular Services ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Services</h2>
            <p className="text-slate-500">Expert solutions tailored for DMV entrepreneurs and investors.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Bookkeeping & Financial Reporting",
                price: "From $349/mo",
                desc: "Monthly bookkeeping, reconciliation, and clean financial statements.",
                link: "/accounting-services",
                icon: null
              },
              {
                title: "Tax Services",
                price: "From $399",
                desc: "Individual, business, and specialty tax preparation and planning.",
                link: "/tax-services",
                icon: null
              },
              {
                title: "Entity Formation (LLC)",
                price: "$599",
                desc: "Full entity setup with operating agreement and EIN registration.",
                link: "/services/llc-formation",
                icon: null
              },
              {
                title: "QuickBooks Setup",
                price: "$349",
                desc: "Bank-ready chart of accounts, integrations, and training.",
                link: "/services/quickbooks-setup",
                icon: null
              },
              {
                title: "Real Estate Tax Planning",
                price: "$399",
                desc: "Cost segregation, 1031 exchanges, and investor tax strategy.",
                link: "/services/real-estate-tax-planning",
                icon: null
              },
              {
                title: "Free Business Consultation",
                price: "Free",
                desc: "30-minute session to discuss your business challenges and goals.",
                link: "/services/business-strategy-session",
                icon: null
              },
              // ── JECI Digital ────────────────────────────────────────────
              {
                title: "Website & AI Plans",
                price: "From $999",
                desc: "Custom websites, e-commerce builds, hosting & maintenance. Essential to Enterprise.",
                link: "/digital-plans",
                icon: "globe",
                highlight: true
              },
              // ── Web Presence ────────────────────────────────────────────
              {
                title: "Web Presence & Local SEO",
                price: "From $600/mo",
                desc: "Google Business, Apple Maps, Yelp, Bing, niche directories & 30 blog posts/mo.",
                link: "/web-presence",
                icon: "wifi",
                highlight: true
              },
            ].map((service, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl border transition-all text-center group cursor-pointer hover:shadow-lg ${
                  service.highlight
                    ? "bg-primary text-white border-primary hover:bg-slate-800"
                    : "bg-slate-50 text-slate-900 border-slate-100"
                }`}
                onClick={() => setLocation(service.link)}
              >
                {service.icon === "globe" && (
                  <div className="flex justify-center mb-3">
                    <Globe size={28} className="text-secondary" />
                  </div>
                )}
                {service.icon === "wifi" && (
                  <div className="flex justify-center mb-3">
                    <Wifi size={28} className="text-secondary" />
                  </div>
                )}
                <h3 className={`font-bold text-lg mb-2 ${service.highlight ? "text-white" : "text-slate-900"}`}>
                  {service.title}
                </h3>
                <p className="text-secondary font-bold text-xl mb-4">{service.price}</p>
                <p className={`text-sm mb-6 ${service.highlight ? "text-white/70" : "text-slate-500"}`}>
                  {service.desc}
                </p>
                <span className={`text-xs font-bold uppercase tracking-widest group-hover:text-secondary transition-colors ${service.highlight ? "text-white/60" : "text-primary"}`}>
                  Learn More →
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button onClick={() => setLocation('/explore')} variant="outline" className="border-slate-300 text-slate-600 hover:text-primary">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      <SpecialtyGrid />

      {/* ── Digital Services Promo Banner ─────────────────────────────────── */}
      <section className="py-16 bg-black border-y border-yellow-400/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-2">
                JECI Consulting — Digital Services
              </p>
              <h2 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight">
                Rank Higher. Get Found. <br className="hidden md:block" />
                <span className="text-yellow-400">Grow Faster.</span>
              </h2>
              <p className="text-white/60 text-sm mt-3 max-w-md">
                From custom website builds to local SEO dominance — JECI's digital services are built for businesses serious about growth in the DC metro market and beyond.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button
                size="lg"
                className="bg-yellow-400 text-black hover:bg-yellow-300 font-black h-14 px-8 uppercase tracking-wide rounded-full"
                onClick={() => setLocation('/digital-plans')}
              >
                <Globe size={18} className="mr-2" />
                Website Plans
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-black h-14 px-8 uppercase tracking-wide rounded-full"
                onClick={() => setLocation('/web-presence')}
              >
                <Wifi size={18} className="mr-2" />
                SEO & Presence
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* ─────────────────────────────────────────────────────────────────── */}

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

      <section className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="bg-gradient-to-br from-primary to-slate-800 rounded-2xl p-10 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Wrench className="text-secondary" size={32} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Explore Our Tools & Resources Hub
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Everything you need to run a smarter, more efficient business — in one place. Financial calculators, tax checklists, business setup guides, and more.
              </p>
              <Button
                size="lg"
                onClick={() => setLocation('/resources')}
                className="bg-secondary text-primary hover:bg-white font-bold h-14 px-10 text-lg rounded-full"
                data-testid="button-tools-resources-cta"
              >
                Visit Tools & Resources <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="bg-primary text-white p-12 md:p-20 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2" />
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-xs font-black uppercase tracking-widest">Pillar 4:</div>
                <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
                  The Founders' <br/>Operations Suite
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

      <section className="py-24 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-center">
        <div className="container px-4">
          <h2 className="text-4xl font-black mb-4 tracking-tight">JECI Edge Weekly</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get weekly tips on tax optimization, bookkeeping best practices, and business growth strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#667eea] hover:bg-slate-100 font-bold px-8 h-14"
              onClick={() => window.open('https://adrianjordanio.substack.com', '_blank')}
            >
              Subscribe Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-bold px-8 h-14"
              onClick={() => setLocation('/newsletter')}
            >
              Read Archive
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}