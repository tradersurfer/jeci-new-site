import React from 'react';
import { CheckCircle2, Shield, TrendingUp, Landmark, Search } from "lucide-react";

const steps = [
  {
    phase: "Phase 01",
    title: "The Forensic Audit",
    icon: <Search className="text-yellow-500" />,
    tasks: ["Tri-merge credit report analysis", "Negative item identification", "Public record verification"]
  },
  {
    phase: "Phase 02",
    title: "Restoration Engine",
    icon: <Shield className="text-yellow-500" />,
    tasks: ["Factual disputing process", "Identity theft protection setup", "Bureau communication management"]
  },
  {
    phase: "Phase 03",
    title: "Credit Architecture",
    icon: <TrendingUp className="text-yellow-500" />,
    tasks: ["Positive trade-line addition", "Utilization optimization", "Credit mix diversification"]
  },
  {
    phase: "Phase 04",
    title: "Institutional Bridge",
    icon: <Landmark className="text-yellow-500" />,
    tasks: ["LLC/EIN legal alignment", "Business bank account sync", "Initial Tier-1 vendor credit setup"]
  }
];

export default function MethodicalActionPlan() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-secondary font-bold tracking-widest uppercase mb-4">Pillar 1 Strategy</h4>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 italic">The Methodical Action Plan (MAP)</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A step-by-step technical blueprint to restore your borrowing power and build a legal foundation for growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative p-8 bg-slate-50 border border-slate-100 rounded-sm hover:shadow-xl transition-all">
              <div className="text-xs font-black text-secondary uppercase tracking-widest mb-4">
                {step.phase}
              </div>
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-6">{step.title}</h3>
              <ul className="space-y-3">
                {step.tasks.map((task, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-secondary mt-0.5 shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}