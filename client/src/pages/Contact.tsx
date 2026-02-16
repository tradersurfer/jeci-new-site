import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 italic">Connect With Us</h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Ready to navigate your financial and digital journey? Our team is here to provide the expert guidance you need.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-serif font-bold text-slate-900 italic">Get In Touch</h2>
                <p className="text-lg text-slate-600">
                  Whether you have a specific project in mind or just want to learn more about our framework, we're ready to talk.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Mail className="text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                    <p className="text-sm text-slate-600">info@jecigroup.com</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Phone className="text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Call/Text</h4>
                    <p className="text-sm text-slate-600">Office: (202) 430-5058</p>
                    <p className="text-sm text-slate-600">Direct: (202) 430-5051</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <MapPin className="text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Visit Us</h4>
                    <p className="text-sm text-slate-600">80 M St S.E.<br/>Washington, DC 20003, USA</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Clock className="text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Hours</h4>
                    <p className="text-sm text-slate-600">Mon - Fri: 9am - 6pm EST</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-primary text-white rounded-2xl flex items-center gap-6 shadow-xl">
                <ShieldCheck size={48} className="text-secondary shrink-0" />
                <div>
                  <h4 className="font-bold text-xl mb-1 italic">Institutional Quality Support</h4>
                  <p className="text-white/70 text-sm italic leading-relaxed">
                    "Our dedicated client relationship managers ensure seamless communication and holistic support beyond core services."
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <MessageSquare size={120} />
              </div>
              <form className="space-y-6 relative z-10" data-testid="contact-form" onSubmit={(e) => { e.preventDefault(); contactMutation.mutate(formData); }}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Full Name</label>
                    <Input data-testid="input-name" placeholder="John Doe" className="h-12 border-slate-200" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Email Address</label>
                    <Input data-testid="input-email" type="email" placeholder="john@example.com" className="h-12 border-slate-200" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Subject</label>
                  <Input data-testid="input-subject" placeholder="How can we help?" className="h-12 border-slate-200" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Message</label>
                  <Textarea data-testid="input-message" placeholder="Tell us about your venture..." className="min-h-[150px] border-slate-200" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>
                <Button data-testid="button-submit" className="w-full bg-primary text-white font-bold h-14 text-lg hover:bg-secondary hover:text-primary transition-all shadow-xl shadow-primary/10" disabled={contactMutation.isPending || !formData.name || !formData.email || !formData.message}>
                  {contactMutation.isPending ? "Sending..." : "Send Message"} <Send size={18} className="ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
