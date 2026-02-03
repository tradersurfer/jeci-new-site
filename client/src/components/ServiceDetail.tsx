import { motion } from "framer-motion";
import { ArrowLeft, Check, Calculator, Shield, Rocket, Target, Users, Zap, Briefcase, Landmark } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ServiceDetail({ title, subtitle, content, features, pillar, icon: Icon }: any) {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container px-4 md:px-6">
        <Link href="/">
          <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-12 font-bold group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </Link>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-black uppercase tracking-widest">
                Pillar {pillar}: {title}
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary leading-tight">
                {subtitle}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                {content}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-sm shadow-sm border border-slate-100"
                >
                  <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <Check size={18} className="text-secondary" /> {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-primary p-8 rounded-sm text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Icon size={120} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-6 relative z-10">Institutional Readiness</h3>
              <p className="text-white/70 mb-8 relative z-10">
                We bridge the gap between where you are and where the banks and the markets need you to be.
              </p>
              <Button className="w-full bg-secondary text-primary hover:bg-white font-bold h-12 relative z-10">
                Apply for the Suite
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
