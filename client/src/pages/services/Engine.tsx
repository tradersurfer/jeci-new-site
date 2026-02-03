import ServiceDetail from "@/components/ServiceDetail";
import { Calculator } from "lucide-react";

export default function Engine() {
  return (
    <ServiceDetail
      pillar="2"
      title="The Engine"
      subtitle="Accounting & Operations"
      icon={Calculator}
      content="Back-Office Complexity, Managed. We scrub your accounts ensuring your data is always 'Bank-Ready'."
      features={[
        {
          title: "Full-Service Bookkeeping",
          description: "Monthly bank reconciliations and P&L generation to detect errors and prevent 'emotional spending'."
        },
        {
          title: "General Ledger Hygiene",
          description: "We hunt down discrepancies like double billings or unrecorded payments, keeping your books accurate."
        },
        {
          title: "Cash Flow Budgeting",
          description: "Strategic oversight to project requirements and control costs effectively for sustainable growth."
        },
        {
          title: "Clean Financial Reporting",
          description: "Generating balance sheets and income statements required for potential lenders and investors."
        }
      ]}
    />
  );
}
