import ServiceDetail from "@/components/ServiceDetail";
import { Shield, Key, FileCheck, Landmark, PieChart, Construction } from "lucide-react";

export default function Foundation() {
  return (
    <ServiceDetail
      pillar="1"
      title="The Foundation"
      subtitle="Restoration & Formation"
      icon={Shield}
      content="This stage is designed for the aspiring entrepreneur who needs to build the legal structure and borrowing power required to scale. We don't just file papers; we build your financial passport."
      features={[
        {
          title: "700 Credit Club (90–120 Days)",
          description: "An interactive, self-paced restoration program to remove negative items—including collections, charge-offs, and bankruptcies—restoring the personal leverage needed for business funding."
        },
        {
          title: "Methodical Action Plan (MAP)",
          description: "Development of an initial business plan that clarifies your marketing strategy, management structure, and financial goals before you ever approach a lender."
        },
        {
          title: "Strategic Structural Selection",
          description: "We evaluate tax advantages and legal exposure to select the optimal business structure (LLC, S-Corp, C-Corp) tailored to your long-term wealth strategy."
        },
        {
          title: "Federal & State Compliance",
          description: "Complete handling of federal EIN applications, required state/local licenses, and regulatory registrations to ensure your entity is legally bulletproof from day one."
        },
        {
          title: "Capital Power Assessment",
          description: "We quantify your current borrowing power and identify specific start-up capital sources, providing a clear roadmap to funding your vision."
        },
        {
          title: "Institutional Standards Alignment",
          description: "Ensuring your business structure, address, and telecommunications meet the strict 'Anti-Fraud' standards required by major financial institutions and tier-1 lenders."
        }
      ]}
    />
  );
}