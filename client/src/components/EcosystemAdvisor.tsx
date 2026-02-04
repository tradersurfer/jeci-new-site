import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, EyeOff, FileText, Share2, Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function EcosystemAdvisor() {
  const [isAlphaView, setIsAlphaView] = useState(true);

  const alphaData = "Sourced from IRS News and CFDR for crypto tax accuracy.";
  const clientContent = "Simplified strategy for readers, removing all internal technicalities.";

  return (
    <div className="bg-white rounded-sm border border-slate-100 shadow-xl overflow-hidden max-w-4xl mx-auto my-12">
      <div className="bg-primary p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-primary">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold">Bitcoin Ecosystem Advisory</h3>
            <p className="text-white/60 text-xs uppercase tracking-widest font-black">Strategic Policy & Tax Research</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white/10 p-2 rounded-full px-4 border border-white/10">
          <Label htmlFor="view-mode" className="text-xs font-bold uppercase cursor-pointer flex items-center gap-2">
            {isAlphaView ? <Eye size={14} className="text-secondary" /> : <Share2 size={14} className="text-secondary" />}
            {isAlphaView ? "Internal Alpha" : "Social Content"}
          </Label>
          <Switch
            id="view-mode"
            checked={!isAlphaView}
            onCheckedChange={(checked) => setIsAlphaView(!checked)}
            className="data-[state=checked]:bg-secondary"
          />
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {isAlphaView ? (
            <motion.div
              key="alpha"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4 p-4 bg-slate-50 border-l-4 border-primary">
                <Info className="text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Confidential Internal Briefing</h4>
                  <p className="text-sm text-slate-600">{alphaData}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-slate-400 tracking-widest">Compliance Markers</h5>
                  <ul className="space-y-2">
                    {["IRS Form 8949 Precision", "Cost Basis Analysis", "Stablecoin Yield Reporting"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <ChevronRight size={14} className="text-secondary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-slate-400 tracking-widest">Policy Updates</h5>
                  <ul className="space-y-2">
                    {["Hill-Ready Briefings", "CFDR Regulation Tracking", "Institutional Custody Prep"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <ChevronRight size={14} className="text-secondary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="client"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="aspect-video bg-slate-900 rounded-sm flex items-center justify-center relative overflow-hidden group border border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent" />
                <div className="relative z-10 text-center p-8">
                  <Share2 className="text-secondary mx-auto mb-4 opacity-50" size={32} />
                  <h4 className="text-2xl font-serif font-bold text-white mb-2">Market Insight Series</h4>
                  <p className="text-white/60 text-sm max-w-sm mx-auto">{clientContent}</p>
                </div>
                <Button className="absolute bottom-4 right-4 bg-secondary text-primary hover:bg-white text-xs font-black uppercase">
                  Download Post Asset
                </Button>
              </div>

              <div className="p-4 rounded-sm border border-dashed border-slate-200">
                <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                  "This view removes all backend identifiers and technical tax citations for high-level social media distribution."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
        <Button variant="ghost" className="text-xs font-bold text-slate-400 hover:text-primary">
          <FileText size={14} className="mr-2" /> View Full Documentation
        </Button>
      </div>
    </div>
  );
}
