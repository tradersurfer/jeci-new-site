import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, TrendingUp, Users, Target, BarChart3, Calculator, PieChart, MousePointerClick, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary/30">
      <Navbar />

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

      <Footer />
    </div>
  );
}
