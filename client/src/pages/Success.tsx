import { motion } from "framer-motion";
import { useLocation, Link } from "wouter";
import { CheckCircle2, Clock, Mail, Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Success() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />

      <div className="max-w-3xl mx-auto py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-yellow-500/10 p-6 rounded-full border border-yellow-500/20">
            <CheckCircle2 className="text-yellow-500 w-20 h-20" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-6 text-white tracking-tight"
        >
          Application Received
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-400 mb-12 leading-relaxed"
        >
          Your path to Financial Sovereignty has begun. Our team is currently reviewing your diagnostic profile to match you with the right advisor.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          {[
            { icon: <Clock className="text-yellow-500" />, title: "Review Period", desc: "Expect a response within 24 business hours." },
            { icon: <Mail className="text-yellow-500" />, title: "Check Email", desc: "We've sent a confirmation and next steps to your inbox." },
            { icon: <Calendar className="text-yellow-500" />, title: "Strategy Call", desc: "You will receive a link to book your deep-dive session." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="bg-yellow-500 text-slate-950 font-bold px-8 h-14 rounded-full"
            onClick={() => setLocation('/')}
          >
            Return Home
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="border-slate-700 text-white hover:bg-slate-800 font-bold px-8 h-14 rounded-full"
            onClick={() => setLocation('/explore')}
          >
            Explore Services <ArrowRight className="ml-2" size={18} />
          </Button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}