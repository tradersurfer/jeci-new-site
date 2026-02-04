import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageNav from "@/components/SubpageNav";
import EcosystemAdvisor from "@/components/EcosystemAdvisor";
import { Rocket, Search, Share2, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Growth() {
  const [, setLocation] = useLocation();

  const marketingPackages = [
    {
      name: "Online Presence Starter",
      price: "$850",
      desc: "Ideal for businesses new to digital marketing.",
      features: ["Foundational SEO Audit", "1 Managed Social Platform", "Basic Content Calendar"]
    },
    {
      name: "Content & SEO Growth",
      price: "$1,200",
      desc: "Improve search rankings and audience engagement.",
      features: ["Advanced Keyword Strategy", "2 Blog Articles / Month", "Technical SEO Fixes", "Monthly Performance Report"]
    },
    {
      name: "All-Inclusive Suite",
      price: "$2,000",
      desc: "Robust integrated approach for maximum expansion.",
      features: ["Full Multi-Channel Managed Social", "Premium Content Strategy", "Competitor Gap Analysis", "Priority Innovation Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <SubpageNav />

      {/* Pillar 3 Hero */}
      <section className="pt-32 pb-20 bg-secondary text-primary overflow-hidden relative">
        <div className="container px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm mb-6">
              <Rocket size={20} /> Pillar 3: Digital Marketing & Innovation
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic">The Growth</h1>
            <p className="text-xl md:text-2xl text-primary/80 leading-relaxed mb-10">
              Visibility meets strategy. We don't just generate "clicks"—we build the digital authority required to dominate your market and protect your alpha.
            </p>
          </div>
        </div>
      </section>

      {/* Marketing Bundle Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container px-6">
          <h2 className="text-3xl font-serif font-bold text-primary mb-12 italic text-center">Managed Growth Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketingPackages.map((pkg, i) => (
              <div key={i} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                <h3 className="font-bold text-xl text-primary mb-2">{pkg.name}</h3>
                <div className="text-3xl font-black text-secondary mb-4">{pkg.price}<span className="text-sm text-slate-400 font-normal">/mo</span></div>
                <p className="text-slate-600 text-sm mb-8">{pkg.desc}</p>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-secondary mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => setLocation('/book-consultation')}
                  className="w-full bg-primary text-white font-bold h-12 hover:bg-secondary hover:text-primary"
                >
                  Select Bundle
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bitcoin Innovation Section */}
      <section className="py-24 bg-white border-y border-slate-100">
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

      <Footer />
    </div>
  );
}