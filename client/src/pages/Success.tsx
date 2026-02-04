import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 bg-white rounded-sm shadow-2xl border border-slate-100 max-w-md">
        <CheckCircle size={64} className="text-secondary mx-auto mb-6" />
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">Application Received</h1>
        <p className="text-slate-600 mb-8">Your journey toward institutional readiness has begun. A JECI Group advisor will contact you shortly.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-sm font-bold hover:bg-secondary hover:text-primary transition-all">
          Return Home <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
