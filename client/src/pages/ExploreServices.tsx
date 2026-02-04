import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";

export default function ExploreServices() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-secondary mb-12 font-bold group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h1 className="text-5xl font-serif font-bold text-primary mb-12">Explore All Solutions</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {['Tax Planning', 'Business Credit', 'Entity Formation', 'Bookkeeping', 'SEO Management', 'Bitcoin Advisory'].map((service, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-8 border border-slate-100 shadow-sm rounded-sm">
              <h3 className="font-bold text-xl mb-4">{service}</h3>
              <p className="text-slate-500 text-sm mb-6">Professional grade solutions tailored for institutional readiness.</p>
              <Link to={`/services/${service.toLowerCase().replace(' ', '-')}`} className="text-secondary font-bold hover:underline">Learn More</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
