          import { useLocation, Link } from "wouter"; 
          import { motion } from "framer-motion";
          import Navbar from "@/components/Navbar";
          import Footer from "@/components/Footer";
          import ContactForm from "@/components/ContactForm";
          import EcosystemAdvisor from "@/components/EcosystemAdvisor";
          import SpecialtyGrid from "@/components/SpecialtyGrid"; // Added the new specialty grid
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
            // HOOKS MUST BE INSIDE THE FUNCTION
            const [location, setLocation] = useLocation(); 
            const [activeTab, setActiveTab] = useState("jeci"); // Fixed the missing activeTab error

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
                            <Button size="lg" variant="outline" className="bg-secondary text-primary hover:bg-white font-bold h-14 px-8 text-lg rounded-sm" onClick={() => setLocation('/explore-services')}>
                              Explore Services
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </section>

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
                    <section className="py-24 bg-slate-50">
                      <div className="container px-4 md:px-6">
                        <div className="bg-primary text-white p-12 md:p-20 rounded-sm shadow-2xl relative overflow-hidden">
                          <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                              <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight">The Founders’ Operations Suite</h2>
                              <p className="text-xl text-white/70">Monthly Retainer for Total Financial Sovereignty.</p>
                              <div className="flex flex-col md:flex-row gap-4 mt-8">
                                <Button size="lg" className="bg-yellow-500 text-slate-950 font-bold px-8 h-14" onClick={() => setLocation('/book-consultation')}>Apply for the Suite</Button>
                                <Button variant="outline" size="lg" className="border-yellow-500 text-yellow-500 font-bold px-8 h-14" onClick={() => setLocation('/founders-suite-detail')}>View Suite Details</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </motion.div>
                ) : (
                  <motion.div key="moneyvibes" className="pt-20">
                    {/* MoneyVibes Content Here */}
                    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center p-6">
                       <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-6">Build <span className="text-green-600 italic">Wealth</span>.</h1>
                    </section>
                  </motion.div>
                )}
                <Footer />
              </div>
            );
          }