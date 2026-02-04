import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function Consultation() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-secondary mb-12 font-bold group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 rounded-sm shadow-xl border border-slate-100">
          <h1 className="text-4xl font-serif font-bold text-primary mb-6">Book Your Strategy Session</h1>
          <p className="text-slate-600 mb-8 italic">"Bridge the gap between where you are and where the banks need you to be."</p>
          <div className="space-y-6">
            <div className="p-4 bg-secondary/10 border-l-4 border-secondary text-primary font-medium">
              A limited number of Suite spots are available to ensure bespoke service.
            </div>
            <button className="w-full bg-primary text-white h-14 rounded-sm font-bold text-lg hover:bg-secondary hover:text-primary transition-all">
              Schedule with Calendly
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
