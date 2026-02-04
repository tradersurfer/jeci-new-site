              import { motion, AnimatePresence } from "framer-motion";
              import { useLocation, Link } from "wouter";
              import { ArrowLeft, CheckCircle, ChevronRight, ClipboardCheck, Sparkles, Shield, Target } from "lucide-react";
              import { useState } from "react";
              import { Button } from "@/components/ui/button";
              import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
              import { Label } from "@/components/ui/label";

              export default function Consultation() {
                const [step, setStep] = useState(1);
                const [formData, setFormData] = useState({
                  status: "",
                  credit: "",
                  roadblock: "",
                  commitment: ""
                });

                const [, setLocation] = useLocation(); 

                const handleNext = () => {
                  if (step < 4) {
                    setStep(step + 1);
                  } else {
                    setLocation("/success"); 
                  }
                };

                const steps = [
                  {
                    id: "status",
                    question: "What is your Current Venture Status?",
                    options: [
                      { label: "Phase 0 (Vision)", value: "phase0", desc: "Concept stage, planning foundation." },
                      { label: "Phase 1 (New)", value: "phase1", desc: "Recently formed, establishing operations." },
                      { label: "Phase 2 (Established)", value: "phase2", desc: "Generating revenue, seeking sovereignty." }
                    ]
                  },
                  {
                    id: "credit",
                    question: "What is your current Credit Health?",
                    options: [
                      { label: "Above 700", value: "above", desc: "Institutional readiness level." },
                      { label: "Below 700", value: "below", desc: "Requires Pillar 1 restoration." }
                    ]
                  },
                  {
                    id: "roadblock",
                    question: "What is your Primary Roadblock?",
                    options: [
                      { label: "Capital", value: "capital", desc: "Funding and credit limits." },
                      { label: "Accounting", value: "accounting", desc: "Messy books and financial hygiene." },
                      { label: "Tax Compliance", value: "tax", desc: "IRS and regulatory complexity." },
                      { label: "Growth", value: "growth", desc: "Visibility and market strategy." }
                    ]
                  },
                  {
                    id: "commitment",
                    question: "Are you ready for the Founders' Suite?",
                    options: [
                      { label: "Yes, I need Total Sovereignty", value: "yes", desc: "$3,000/mo full-service operations." },
                      { label: "Not yet, I need Pillar services", value: "no", desc: "Focusing on specific foundations." }
                    ]
                  }
                ];

                const currentStep = steps[step - 1];

                return (
                  <div className="min-h-screen bg-slate-50 pt-32 pb-20">
                    <div className="container px-4 md:px-6 max-w-2xl mx-auto">
                      <Link href="/" className="flex items-center gap-2 text-primary hover:text-secondary mb-12 font-bold group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                      </Link>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-slate-100 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                          <motion.div 
                            className="h-full bg-secondary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                          />
                        </div>

                        <div className="flex justify-between items-center mb-12">
                          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary">
                            <ClipboardCheck size={16} /> Qualification Phase {step > 1 ? "1" : "0"}
                          </div>
                          <div className="text-xs font-bold text-slate-400">Step {step} of 4</div>
                        </div>

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                          >
                            <h1 className="text-3xl font-serif font-bold text-primary leading-tight">
                              {currentStep.question}
                            </h1>

                            <RadioGroup 
                              className="grid gap-4"
                              onValueChange={(val) => setFormData({ ...formData, [currentStep.id]: val })}
                              value={formData[currentStep.id as keyof typeof formData]}
                            >
                              {currentStep.options.map((option) => (
                                <Label
                                  key={option.value}
                                  className={`flex flex-col p-6 rounded-sm border-2 cursor-pointer transition-all ${
                                    formData[currentStep.id as keyof typeof formData] === option.value 
                                      ? "border-secondary bg-secondary/5" 
                                      : "border-slate-100 hover:border-slate-200"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lg text-primary">{option.label}</span>
                                    <RadioGroupItem value={option.value} className="sr-only" />
                                    {formData[currentStep.id as keyof typeof formData] === option.value && (
                                      <CheckCircle size={20} className="text-secondary" />
                                    )}
                                  </div>
                                  <span className="text-sm text-slate-500">{option.desc}</span>
                                </Label>
                              ))}
                            </RadioGroup>

                            <div className="pt-8 border-t border-slate-100 flex gap-4">
                              {step > 1 && (
                                <Button 
                                  variant="outline" 
                                  onClick={() => setStep(step - 1)}
                                  className="h-14 px-8 border-slate-200 font-bold"
                                >
                                  Previous
                                </Button>
                              )}
                              <Button 
                                onClick={handleNext}
                                disabled={!formData[currentStep.id as keyof typeof formData]}
                                className="flex-1 h-14 bg-primary text-white font-bold text-lg hover:bg-secondary hover:text-primary transition-all group"
                              >
                                {step === 4 ? "Complete Application" : "Continue"}
                                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </motion.div>

                      <div className="mt-12 grid grid-cols-3 gap-6 text-center">
                        {[
                          { icon: <Shield size={20} />, text: "Secure Data" },
                          { icon: <Target size={20} />, text: "Tailored Advice" },
                          { icon: <Sparkles size={20} />, text: "Institutional Prep" }
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <div className="text-secondary">{item.icon}</div>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }