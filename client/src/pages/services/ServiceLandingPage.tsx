import React from 'react';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Star, Shield, Clock, Users, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export interface ServiceLandingPageProps {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  benefits: string[];
  features: string[];
  process: string[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  ctaText?: string;
}

export default function ServiceLandingPage({
  title,
  subtitle,
  price,
  description,
  benefits,
  features,
  process,
  faqs,
  testimonials,
  ctaText = "Book Now"
}: ServiceLandingPageProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-white pt-32 pb-24 relative overflow-hidden">
        <div className="container px-4 relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl text-secondary mb-8 font-medium">{subtitle}</p>
          <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">{description}</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-white/60 uppercase tracking-widest font-bold mb-1">Starting at</p>
              <p className="text-4xl font-bold text-white">{price}</p>
            </div>
            <Button 
              size="lg"
              onClick={() => setLocation('/book')}
              className="bg-secondary text-primary hover:bg-white font-bold h-16 px-10 text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              {ctaText} <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why This Matters</h2>
            <div className="w-20 h-1 bg-secondary mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-bold text-slate-800 text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="bg-primary p-12 text-white md:w-1/3 flex flex-col justify-center">
              <h3 className="text-3xl font-serif font-bold mb-4">What's Included</h3>
              <p className="text-white/70">Everything you need to succeed, packaged for clarity and impact.</p>
            </div>
            <div className="p-12 md:w-2/3">
              <ul className="grid md:grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="container px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="space-y-12 relative before:absolute before:left-[19px] md:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200">
            {process.map((step, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-8 md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2" />
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-secondary border-4 border-white shadow-lg flex items-center justify-center font-bold text-primary z-10">
                  {i + 1}
                </div>
                <div className={`md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-800">{step}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-white">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Client Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="flex gap-1 text-secondary mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-white/80 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-bold text-white">{t.author}</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-bold text-slate-900">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="container px-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/60 mb-10">
            Secure your financial future with expert guidance from JECI Group.
          </p>
          <Button 
            size="lg"
            onClick={() => setLocation('/book')}
            className="bg-secondary text-primary hover:bg-white font-bold h-16 px-12 text-lg rounded-full"
          >
            Book Your Session Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
