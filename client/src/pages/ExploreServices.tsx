import React, { useState } from 'react';
import { useLocation } from "wouter";
import { ChevronDown, ChevronUp, Check, ArrowRight, Calculator, BookOpen, CreditCard, Megaphone, Rocket, Crown } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SERVICE_CATEGORIES } from '@/data/services';

const categoryIcons: Record<string, React.ReactNode> = {
  tax: <Calculator className="w-5 h-5" />,
  accounting: <BookOpen className="w-5 h-5" />,
  "credit-funding": <CreditCard className="w-5 h-5" />,
  "digital-marketing": <Megaphone className="w-5 h-5" />,
  "business-consulting": <Rocket className="w-5 h-5" />,
  "business-development": <Rocket className="w-5 h-5" />,
  premium: <Crown className="w-5 h-5" />,
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between w-full text-left font-bold hover:text-secondary transition-colors"
      >
        <span className="text-slate-900">{question}</span>
        {isOpen ? <ChevronUp className="text-secondary shrink-0 ml-2" /> : <ChevronDown className="text-slate-400 shrink-0 ml-2" />}
      </button>
      {isOpen && <p className="mt-3 text-slate-500 text-sm leading-relaxed">{answer}</p>}
    </div>
  );
};

export default function ExploreServices() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('tax');

  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="pt-32 pb-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-services-title">Our Services</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            From tax preparation to digital marketing, we provide the expert services entrepreneurs need to build, grow, and protect their businesses.
          </p>
        </div>
      </section>

      <section className="sticky top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="container px-4 md:px-6">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                data-testid={`tab-${cat.id}`}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === cat.id
                    ? 'bg-secondary text-primary shadow-md'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                {categoryIcons[cat.id]}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          {activeCategory && (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">{activeCategory.name}</h2>
                <p className="text-lg text-slate-500">{activeCategory.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="services-grid">
                {activeCategory.services.map(service => (
                  <Card key={service.id} className="flex flex-col hover:shadow-xl transition-all border-slate-200 group" data-testid={`card-service-${service.id}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{service.name}</CardTitle>
                      <CardDescription className="font-bold text-secondary text-xl">
                        {service.price === 0 ? "FREE" : (service.priceString || `$${service.price.toLocaleString()}`)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{service.duration}</p>
                      <ul className="space-y-2 mb-6 flex-1">
                        {service.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setLocation(`/services/${service.id}`)}
                          className="flex-1 font-bold text-primary border-primary hover:bg-primary hover:text-white"
                          data-testid={`button-learn-more-${service.id}`}
                        >
                          Learn More
                        </Button>
                        <Button
                          onClick={() => setLocation('/book')}
                          className="flex-1 bg-primary text-white hover:bg-secondary hover:text-primary font-bold"
                          data-testid={`button-book-${service.id}`}
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <FAQItem
              question="How do I know which service is right for me?"
              answer="Start with a FREE Business Consultation. We'll assess your current situation and recommend the exact services that match your goals and budget."
            />
            <FAQItem
              question="Can I bundle multiple services together?"
              answer="Absolutely. Many clients combine tax, accounting, and credit services. Our Business Development Packages bundle everything from financial tracking to brand development. Ask about our Founders' Operations Suite at $3,000/month."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards, ACH transfers, and offer payment plans for larger packages. A $50 deposit secures most consultations."
            />
            <FAQItem
              question="Do you work with businesses outside of Washington, DC?"
              answer="Yes! While we're headquartered in Washington, DC, we serve clients nationwide. All consultations can be conducted via Zoom."
            />
            <FAQItem
              question="How quickly can I get started?"
              answer="Most consultations can be scheduled within 24-48 hours. Ongoing services like bookkeeping typically start within one week of signing up."
            />
            <FAQItem
              question="What makes JECI different from other firms?"
              answer="We combine tax expertise, business strategy, credit building, and digital marketing under one roof. Our 3-Pillar approach ensures every aspect of your business is aligned for growth."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/70 mb-10">
            Book a free consultation and let us build a custom plan for your success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setLocation('/book')}
              className="bg-secondary text-primary hover:bg-white font-bold h-14 px-10 text-lg"
              data-testid="button-book-cta"
            >
              Book Free Consultation <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/contact')}
              className="border-white text-white hover:bg-white/10 font-bold h-14 px-10 text-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
