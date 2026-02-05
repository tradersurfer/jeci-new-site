import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Target, Users, Zap, Mail, Phone, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Architecture"
          />
        </div>
        <div className="container relative z-10 px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 italic">Our Mission</h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Maximizing value while minimizing your time commitment through deep analytics and personalized strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="container px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-bold text-slate-900 italic">Built on Analytics, <br/>Driven by Results</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our core philosophy is built on a foundation of deep analytics, personalized strategies, and client-centric solutions. Whether you're an emerging entrepreneur or a growing business scaling, we design practical, high-impact services to meet your unique needs.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We serve a diverse clientele, from solo-preneurs and micro-businesses to established small businesses, with a focus on practical, results-driven solutions. Our dedicated client relationship managers ensure seamless communication, while our expert network provides holistic support beyond core services.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-secondary/10 rounded-2xl group-hover:bg-secondary/20 transition-all duration-500" />
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80" 
                className="relative rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                alt="Professional Profile"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Who We Are */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6 italic">Who Are We</h2>
            <p className="text-xl text-slate-600">
              JECI™ Group is a forward-thinking partner dedicated to empowering individuals and businesses to navigate complex financial landscapes and achieve sustainable growth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Shield className="mx-auto text-secondary mb-4" />, title: "Financial Clarity", desc: "Expertise in accounting and specialized tax services." },
              { icon: <Target className="mx-auto text-secondary mb-4" />, title: "Strategic Growth", desc: "Consulting for startups to established firms." },
              { icon: <Zap className="mx-auto text-secondary mb-4" />, title: "Innovation", desc: "Innovative digital marketing solutions." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                {item.icon}
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container px-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-12 italic text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "What types of businesses do you work with?", a: "We serve a diverse range from solo-preneurs and micro-businesses to established small businesses looking for institutional readiness." },
              { q: "What is the Founders' Operations Suite?", a: "It's our premium all-in-one back-office, growth engine, and policy advisory designed for modern entrepreneurs who want total sovereignty." },
              { q: "How do I get started?", a: "You can book a strategy session through our consultation page or contact us directly via email or phone." },
              { q: "Do you offer crypto-specific services?", a: "Yes, our Pillar 3 focus includes Bitcoin Ecosystem Advisory, helping tech-forward founders navigate the shifting financial landscape." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-slate-100 rounded-xl px-6 bg-slate-50">
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
        <div className="container px-6 relative z-10 text-center max-w-2xl mx-auto">
          <Mail className="mx-auto text-secondary mb-6" size={48} />
          <h2 className="text-4xl font-serif font-bold mb-6 italic">Stay Informed</h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Join our newsletter for the latest insights on institutional readiness, Bitcoin policy, and financial growth strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-full px-8 text-lg focus:ring-secondary"
            />
            <Button className="bg-secondary text-primary hover:bg-white font-bold h-14 px-10 rounded-full text-lg shrink-0">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
