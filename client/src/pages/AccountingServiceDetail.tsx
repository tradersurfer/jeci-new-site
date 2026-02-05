import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, ArrowRight, Landmark, PieChart, BarChart3, Calculator, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

const stripeDepositLink = "https://buy.stripe.com/mock_deposit_50";

const serviceDetails = {
  'entity-core': {
    title: "Entity & Core Accounting",
    subtitle: "Foundational Tax Architecture",
    description: "New entity formation, small business accounting, and existing entity restructuring for maximum protection.",
    icon: <Shield className="w-12 h-12 text-secondary" />,
    features: ["LLC/S-Corp Formation", "Strategic Bookkeeping", "Entity Restructuring"],
    visual: "https://images.unsplash.com/photo-1454165833767-12d99c4c7c4b?auto=format&fit=crop&q=80&w=800"
  },
  'indirect-tax': {
    title: "Indirect & Transaction Taxes",
    subtitle: "Complex Compliance Managed",
    description: "Expert management of Sales & Use tax filings and complex transaction-level tax tracking for high-volume firms.",
    icon: <Globe className="w-12 h-12 text-secondary" />,
    features: ["Sales & Use Tax", "Transaction Level Tracking", "Excise Tax Management"],
    visual: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
  },
  'salt': {
    title: "State & Local (SALT)",
    subtitle: "Multi-Jurisdictional Mastery",
    description: "Navigating multi-jurisdictional tax exposure, nexus studies, and state-level compliance requirements.",
    icon: <Landmark className="w-12 h-12 text-secondary" />,
    features: ["Nexus Studies", "Multi-State Filings", "Local Compliance"],
    visual: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800"
  },
  'compliance-payroll': {
    title: "Compliance & Payroll",
    subtitle: "Regulatory Peace of Mind",
    description: "Full handling of Payroll, Employment taxes, and non-income regulatory compliance filings.",
    icon: <Calculator className="w-12 h-12 text-secondary" />,
    features: ["Payroll Processing", "Employment Tax Filings", "Regulatory Compliance"],
    visual: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800"
  },
  'specialty-crypto': {
    title: "Specialty & Non-Income",
    subtitle: "Digital Asset Sovereignty",
    description: "Crypto Tax Accounting, Franchise taxes, and specialized reporting for tech-forward and digital asset founders.",
    icon: <PieChart className="w-12 h-12 text-secondary" />,
    features: ["Crypto Tax Accounting", "Franchise Tax", "Property Tax Reporting"],
    visual: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800"
  }
};

export default function AccountingServiceDetail({ id }: { id: string }) {
  const [, setLocation] = useLocation();
  const service = serviceDetails[id as keyof typeof serviceDetails];

  if (!service) return <div>Service not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary text-white relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="mb-6">{service.icon}</div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-secondary italic mb-8">{service.subtitle}</p>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">{service.description}</p>
            <Button 
              size="lg" 
              className="bg-secondary text-primary hover:bg-white font-bold h-14 px-8"
              onClick={() => window.open(stripeDepositLink, '_blank')}
            >
              Secure $50 Strategy Deposit
            </Button>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-8">Strategic Implementation</h2>
              <div className="space-y-6">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-sm border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 mt-1">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">{feature}</h3>
                      <p className="text-sm text-slate-600">Institutional grade oversight for {feature.toLowerCase()}.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={service.visual} alt={service.title} className="rounded-sm shadow-2xl" />
              <div className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-sm shadow-xl hidden md:block">
                <p className="text-4xl font-serif font-bold text-secondary mb-1">99.9%</p>
                <p className="text-xs uppercase tracking-widest font-black">Compliance Accuracy</p>
              </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="bg-slate-900 text-white p-12 md:p-20 rounded-sm mb-24 relative overflow-hidden">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-8">Ready to Scale?</h2>
              <p className="text-lg text-white/60 mb-10">
                Stop managing complexity and start leading strategy. Secure your consultation today.
              </p>
              <Button 
                size="lg" 
                className="bg-secondary text-primary hover:bg-white font-bold h-16 px-12 text-lg"
                onClick={() => window.open(stripeDepositLink, '_blank')}
              >
                Book with $50 Deposit
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
