import ServiceDetail from "@/components/ServiceDetail";
import { Calculator, ShieldCheck, BarChart3, MessageSquare, Landmark } from "lucide-react";

export default function Engine() {
  return (
    <ServiceDetail
      pillar="2"
      title="The Engine"
      subtitle="Accounting & Operations"
      icon={Calculator}
      content="Once your business is formed, we take over the back-office complexity. We move your operations from 'survival mode' to 'Institutional Readiness' by ensuring every dollar is tracked and every account is bank-ready."
      features={[
        {
          title: "Full-Service Bookkeeping & P&L",
          description: "Monthly reconciliation of all bank accounts and credit cards. We generate detailed Profit & Loss statements that allow you to track operating performance and analyze real-time trends."
        },
        {
          title: "Embezzlement & Fraud Detection",
          description: "Our rigorous monthly ledger review identifies lost checks, prevents unwarranted bank charges, and detects potential embezzlement before it can damage your equity."
        },
        {
          title: "General Ledger Hygiene",
          description: "We don't just record transactions; we scrub them. Our team fixes discrepancies like double-billings and unrecorded payments that 'budget' bookkeepers often miss."
        },
        {
          title: "Operational Cost Control",
          description: "We establish procedures to monitor expenses effectively, turning your back-office into a cost-control system that protects your margins as you scale."
        },
        {
          title: "Cash Flow Budgeting",
          description: "Monthly projections of your cash requirements. We help you plan for the future so you can avoid the 'emotionally painful' surprises of unplanned business expenses."
        },
        {
          title: "Unlimited Strategic Consultations",
          description: "Expert support is just a call away. We help you interpret your financial data so you can make confident, high-stakes decisions about the future of your firm."
        }
      ]}
    />
  );
}